import { z } from "zod";
import { publicProcedure, router } from "../../trpc";

export const musclesRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.muscles.findMany({ orderBy: { name: "asc" } });
  }),
  findByID: publicProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.prisma.muscles.findFirst({
      where: { id: input },
    });
  }),
});
