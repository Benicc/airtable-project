import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { v4 as uuidv4 } from 'uuid';


export const baseRouter = createTRPCRouter({
    createBase: protectedProcedure
      .input(
        z.object({
          baseName: z.string(),
          baseData: z.record(z.any()), // Flexible JSON data
        })
      )
      .mutation(async ({ input, ctx }) => {
        const { baseName, baseData} = input;
        const baseId = String(uuidv4());
        // console.log("++++++++++++" + JSON.stringify(baseData))
  
        // Create a new Base in the database
        const newBase = await ctx.db.base.create({
          data: {
            baseId,
            userId: ctx.session.user.id,
            baseName,
            baseData,
          },
        });
  
        return newBase;
      }),

    getAllBaseIds: protectedProcedure.query(async ({ ctx }) => {
      // Fetch all baseIds for the current user from the database
      const bases = await ctx.db.base.findMany({
        where: {
          userId: ctx.session.user.id, // Filter by the current user's ID
        },
        select: {
          baseId: true,
          baseName: true,
          baseData:true,
        },
      });
    
      // Return a list of baseIds
      return bases;
    }),


    getBaseById: protectedProcedure
    .input(
      z.object({
        baseId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { baseId } = input;

      const base = await ctx.db.base.findUnique({
        where: {
          baseId_userId: {
            baseId,
            userId: ctx.session.user.id,
          },
      },
      });

      if (!base) {
        throw new Error("Base not found or you do not have permission to access it");
      }

      // console.log("TESTTTTTTTT" + JSON.stringify(base, null, 2));

      const jsonData = base.baseData as Record<string, any>;

      return base;
    }),
    updateBase: protectedProcedure
    .input(
      z.object({
        baseId: z.string(), 
        baseName: z.string().optional(), // Optional baseName update
        baseData: z.record(z.any()).optional(), // Optional baseData update
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { baseId, baseName, baseData } = input;
  
      // Check if the base exists and belongs to the current user
      const existingBase = await ctx.db.base.findFirst({
        where: {
          baseId,
          userId: ctx.session.user.id,
        },
      });
  
      if (!existingBase) {
        throw new Error("Base not found or you do not have access.");
      }
  
      // Update the base with any provided fields
      const updatedBase = await ctx.db.base.update({
        where: { baseId },
        data: {
          ...(baseName && { baseName }),
          ...(baseData && { baseData }),
        },
      });
  
      return updatedBase;
    }),
    deleteBase: protectedProcedure
    .input(
      z.object({
        baseId: z.string(), // baseId is required for deletion
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { baseId } = input;

      // Check if the base exists and belongs to the current user
      const existingBase = await ctx.db.base.findFirst({
        where: {
          baseId,
          userId: ctx.session.user.id,
        },
      });

      if (!existingBase) {
        throw new Error("Base not found or you do not have access.");
      }

      // Delete the base from the database
      await ctx.db.base.delete({
        where: { baseId },
      });

      return { message: "Base deleted successfully" };
    }),
  
  
});
