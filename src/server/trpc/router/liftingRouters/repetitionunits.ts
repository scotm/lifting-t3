import { z } from "zod";
import { router, publicProcedure } from "../../trpc";

export const repetitionUnitsRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.repetitionUnits.findMany({ orderBy: { name: "asc" } });
  }),
  findByID: publicProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.prisma.repetitionUnits.findFirst({
      where: { id: input },
    });
  }),
});
