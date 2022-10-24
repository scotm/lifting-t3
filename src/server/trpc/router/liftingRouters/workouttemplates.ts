import { z } from "zod";
import { protectedProcedure, router } from "../../trpc";

const rep_pairschema = z.object({
  reptypeId: z.number().int(),
  reps: z.number().int(),
});

const templateExerciseSchema = z.object({
  exerciseId: z.number().int(),
  rep_pair: z.array(rep_pairschema).nonempty(),
});

const workoutTemplateSchema = z.object({
  name: z.string(),
  pieces: z.array(templateExerciseSchema).nonempty(),
});

export const workoutTemplateRouter = router({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.workoutTemplate.findMany({
      where: { userId: ctx.session.user.id },
      include: {
        pieces: {
          include: {
            exercise: true,
            rep_pair: {
              include: {
                reptype: true,
              },
            },
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });
  }),
  findByID: protectedProcedure.input(z.number()).query(({ ctx, input }) => {
    console.log("input", input);
    return ctx.prisma.workoutTemplate.findFirstOrThrow({
      where: {
        AND: [{ id: input }, { userId: ctx.session.user.id }],
      },
      include: {
        pieces: {
          include: {
            exercise: true,
            rep_pair: {
              include: {
                reptype: true,
              },
            },
          },
        },
      },
    });
  }),
  create: protectedProcedure
    .input(workoutTemplateSchema)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.workoutTemplate.create({
        data: {
          name: input.name,
          userId: ctx.session.user.id,
          pieces: {
            create: input.pieces.map((e) => {
              return {
                exercise: { connect: { id: e.exerciseId } },
                rep_pair: {
                  create: e.rep_pair.map((r) => {
                    return {
                      reptype: { connect: { id: r.reptypeId } },
                      reps: r.reps,
                    };
                  }),
                },
              };
            }),
          },
        },
      });
    }),
  deletebyID: protectedProcedure
    .input(z.number())
    .mutation(({ ctx, input }) => {
      // unclear if this is the best way to do this
      return ctx.prisma.workoutTemplate.deleteMany({
        where: {
          AND: [{ id: input }, { userId: ctx.session.user.id }],
        },
      });
    }),
});
