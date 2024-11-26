import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
//import { v4 as uuidv4 } from 'uuid';


export const baseRouter = createTRPCRouter({
    createBase: protectedProcedure
      .input(
        z.object({
          baseName: z.string(),
          data: z.array(z.object({})), // Flexible JSON data
        })
      )
      .mutation(async ({ input, ctx }) => {
        const { baseName, data} = input;
        const userId = ctx.session.user.id;
        const baseId = "test";
  
        // Create a new Base in the database
        const newBase = await ctx.db.base.create({
          data: {
            userId,
            baseId,
            baseName,
            data,
          },
        });
  
        return newBase;
      }),
});