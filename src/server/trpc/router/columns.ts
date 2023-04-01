import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import {
  createColumnSchema,
  updateColumnSchema,
} from "../../../schema/column.schema";

export const columnRouter = router({
  getAllColumns: protectedProcedure
    .input(z.object({ boardId: z.string().cuid() }))
    .query(({ ctx, input }) => {
      const { boardId } = input;
      return ctx.prisma.columns.findMany({
        where: {
          boardId,
        },
      });
    }),

  addColumn: protectedProcedure
    .input(createColumnSchema)
    .mutation(({ ctx, input }) => {
      const { boardId: id } = input;
      return ctx.prisma.columns.create({
        data: {
          title: "",
          board: {
            connect: {
              id,
            },
          },
        },
      });
    }),

  updateColumn: protectedProcedure
    .input(updateColumnSchema)
    .mutation(({ ctx, input }) => {
      const { columnId: id, title } = input;
      return ctx.prisma.columns.update({
        where: {
          id,
        },
        data: {
          title,
        },
      });
    }),

  deleteColumn: protectedProcedure
    .input(z.string().cuid())
    .mutation(({ ctx, input: id }) => {
      return ctx.prisma.columns.delete({
        where: {
          id,
        },
      });
    }),
});
