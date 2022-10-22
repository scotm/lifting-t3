import { z } from "zod";
import { publicProcedure, router } from "../../trpc";

export const weightUnitsRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.weightUnits.findMany({ orderBy: { name: "asc" } });
  }),
  findByID: publicProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.prisma.weightUnits.findFirst({
      where: { id: input },
    });
  }),
});
