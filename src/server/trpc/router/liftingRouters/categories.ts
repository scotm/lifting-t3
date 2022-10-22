import { router, publicProcedure } from "../../trpc";
import { z } from "zod";

export const categoryRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.category.findMany({ orderBy: { name: "asc" } });
  }),
  findByID: publicProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.prisma.category.findFirst({
      where: { id: input },
    });
  }),
});
