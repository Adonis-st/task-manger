import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const columnRouter = router({
  getAllColumns: publicProcedure
    .input(z.string().cuid())
    .query(({ ctx, input }) => {
      return ctx.prisma.columns.findMany({
        where: {
          boardId: input,
        },
        include: {
          Tasks: {
            include: {
              SubTasks: true,
            },
          },
        },
      });
    }),
});
