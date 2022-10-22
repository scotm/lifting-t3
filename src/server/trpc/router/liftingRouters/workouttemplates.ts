import { z } from "zod";
import { protectedProcedure, router } from "../../trpc";

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
});
