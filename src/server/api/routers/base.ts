import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
//import { v4 as uuidv4 } from 'uuid';


export const baseRouter = createTRPCRouter({
    createBase: publicProcedure
      .input(
        z.object({
          baseName: z.string(),
          data: z.array(z.object({})), // Flexible JSON data
        })
      )
      .mutation(async ({ input, ctx }) => {
        const { baseName, data} = input;
        const baseId = "test";
  
        // Create a new Base in the database
        const newBase = await ctx.db.base.create({
          data: {
            baseId,
            baseName,
            data,
          },
        });
  
        return newBase;
      }),
});