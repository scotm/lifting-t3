import { z } from "zod";
import { Prisma } from "@prisma/client";
import { router, publicProcedure, protectedProcedure } from "../../trpc";

const includeobj = {
  licence: true,
  category: true,
  muscles: true,
  equipment: true,
};

export const exerciseRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.exercise.findMany({
      orderBy: { name: "asc" },
    });
  }),
  findByID: publicProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.prisma.exercise.findFirst({
      where: { id: input },
      include: includeobj,
    });
  }),
  getFiltered: publicProcedure
    .input(
      z.object({
        category: z.string(),
        search: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      // Construct the where object - using the category as filter
      const whereobj: Prisma.ExerciseWhereInput = {};
      if (input.category !== "All") {
        whereobj.category = {
          name: input.category,
        };
      }
      // Case-insensitive search - look at nam and inside equipment
      if (input.search !== undefined) {
        whereobj.OR = [
          {
            name: {
              contains: input.search,
              mode: "insensitive",
            },
          },
          {
            equipment: {
              some: {
                name: {
                  contains: input.search,
                  mode: "insensitive",
                },
              },
            },
          },
        ];
      }

      const result = ctx.prisma.exercise.findMany({
        include: includeobj,
        where: whereobj,
        orderBy: {
          name: "asc",
        },
      });
      return result;
    }),
  editExercise: protectedProcedure
    .input(
      z.object({
        id: z.number().int(),
        licenceId: z.number().int(),
        license_author: z.string().optional(),
        name: z.string(),
        name_original: z.string().optional(),
        status: z.string().optional(),
        description: z.string(),
        languageId: z.number().int(),
        categoryId: z.number().int(),
        variations: z.string().optional(),
        muscles: z.array(z.number().int()),
        equipment: z.array(z.number().int()),
      })
    )
    .mutation(({ ctx, input }) => {
      ctx.prisma.exercise.update({
        where: { id: input.id },
        data: {
          name: input.name,
          description: input.description,
          license_author: input.license_author,
          categoryId: input.categoryId,
          licenceId: input.licenceId,
          languageId: input.languageId,
          variations: input.variations,
          muscles: {
            set: input.muscles.map((e) => {
              return { id: e };
            }),
          },
          equipment: {
            set: input.equipment.map((e) => {
              return { id: e };
            }),
          },
        },
      });
    }),
});
