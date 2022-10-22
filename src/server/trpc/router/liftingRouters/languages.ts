import { z } from "zod";
import { publicProcedure, router } from "../../trpc";

export const languageRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.language.findMany({ orderBy: { full_name: "asc" } });
  }),
  findByID: publicProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.prisma.language.findFirst({
      where: { id: input },
    });
  }),
});
