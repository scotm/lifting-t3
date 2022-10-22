import { z } from "zod";
import { publicProcedure, router } from "../../trpc";

export const equipmentRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.equipment.findMany({ orderBy: { name: "asc" } });
  }),
  findByID: publicProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.prisma.equipment.findFirst({
      where: { id: input },
    });
  }),
});
