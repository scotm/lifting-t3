import { z } from "zod";
import { publicProcedure, router } from "../../trpc";

export const licenceRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.licence.findMany();
  }),
  findByID: publicProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.prisma.licence.findFirst({
      where: { id: input },
    });
  }),
});
