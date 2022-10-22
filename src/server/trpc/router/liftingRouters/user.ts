import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { protectedProcedure, router } from "../../trpc";

export const userRouter = router({
  getCurrentUser: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findUnique({
      where: { id: ctx.session.user.id },
    });
  }),
  setCurrentUserInfo: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      if (input.id !== ctx.session.user.id) {
        // will refactor to allow admins to edit user details.
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You can only update your own user info",
        });
      }
      return ctx.prisma.user.update({
        where: { id: input.id },
        data: { name: input.name },
      });
    }),
});
