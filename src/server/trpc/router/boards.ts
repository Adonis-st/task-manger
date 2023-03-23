import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import {
  getSingleBoardSchema,
  boardSchema,
  updateBoardSchema,
} from "~/schema/board.schema";

export const boardsRouter = router({
  getAllBoards: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.boards.findMany({
      where: {
        userId: ctx.session?.user?.id,
      },
    });
  }),

  addBoard: protectedProcedure.input(boardSchema).mutation(({ ctx, input }) => {
    const { title, columnsForm } = input;
    return ctx.prisma.boards.create({
      data: {
        title,
        columns: {
          createMany: {
            data: columnsForm,
          },
        },
        User: {
          connect: {
            id: ctx.session?.user?.id,
          },
        },
      },
    });
  }),

  singleBoard: protectedProcedure
    .input(getSingleBoardSchema)
    .query(({ ctx, input }) => {
      const { boardId } = input;
      return ctx.prisma.boards.findUnique({
        where: {
          id: boardId,
        },
        include: {
          columns: {
            include: {
              Tasks: {
                include: {
                  SubTasks: true,
                },
              },
            },
          },
        },
      });
    }),

  getSingleBoard: protectedProcedure
    .input(getSingleBoardSchema)
    .query(({ ctx, input }) => {
      const { boardId: id } = input;
      return ctx.prisma.boards.findUnique({
        where: {
          id,
        },
      });
    }),

  updateBoard: protectedProcedure
    .input(updateBoardSchema)
    .mutation(({ ctx, input }) => {
      const { boardId: id, title } = input;
      return ctx.prisma.boards.update({
        where: {
          id,
        },
        data: {
          title,
        },
      });
    }),

  deleteBoard: protectedProcedure
    .input(z.string().cuid())
    .mutation(({ ctx, input: id }) => {
      return ctx.prisma.boards.delete({
        where: {
          id,
        },
      });
    }),
});
