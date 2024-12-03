import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { v4 as uuidv4 } from 'uuid';


export const baseRouter = createTRPCRouter({
    createBase: protectedProcedure
      .input(
        z.object({
          baseName: z.string(),
          data: z.object({}), // Flexible JSON data
        })
      )
      .mutation(async ({ input, ctx }) => {
        const { baseName, data} = input;
        const baseId = String(uuidv4());
  
        // Create a new Base in the database
        const newBase = await ctx.db.base.create({
          data: {
            baseId,
            userId: ctx.session.user.id,
            baseName,
            data,
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

      return base;
    }),
  
});
