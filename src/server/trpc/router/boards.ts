import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import {
  getSingleBoardSchema,
  boardSchema,
  updateBoardSchema,
} from "../../../schema/board.schema";

export const boardsRouter = router({
  getAllBoards: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.boards.findMany({
      where: {
        userId: ctx.session?.user?.id,
      },
    });
  }),

  addBoard: publicProcedure.input(boardSchema).mutation(({ ctx, input }) => {
    const { boardForm, columnsForm } = input;
    const { title } = boardForm;
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

  singleBoard: publicProcedure
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

  getSingleBoard: publicProcedure
    .input(getSingleBoardSchema)
    .query(({ ctx, input }) => {
      const { boardId: id } = input;
      return ctx.prisma.boards.findUnique({
        where: {
          id,
        },
      });
    }),

  updateBoard: publicProcedure
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

  deleteBoard: publicProcedure
    .input(z.string().cuid())
    .mutation(({ ctx, input: id }) => {
      return ctx.prisma.boards.delete({
        where: {
          id,
        },
      });
    }),
});
