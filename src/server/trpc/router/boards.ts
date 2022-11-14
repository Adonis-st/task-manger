import { contextProps } from "@trpc/react-query/dist/internals/context";
import { z } from "zod";
import {
  createBoardSchema,
  getSingleBoardSchema,
  boardSchema,
} from "../../../schema/board.schema";

import {
  createTaskSchema,
  getAllTaskSchema,
  getSubTaskSchema,
  createSubTaskSchema,
  updateTaskColSchema,
} from "../../../schema/task.schema";

import {
  getAllColumnsSchema,
  createColumnSchema,
} from "../../../schema/column.schema";

import { router, publicProcedure } from "../trpc";

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
      const { boardId } = input;
      return ctx.prisma.boards.findUnique({
        where: {
          id: boardId,
        },
      });
    }),

  getAllColumns: publicProcedure
    .input(getAllColumnsSchema)
    .query(({ ctx, input }) => {
      const { boardId } = input;
      return ctx.prisma.columns.findMany({
        where: {
          boardId,
        },
      });
    }),

  addColumn: publicProcedure
    .input(createColumnSchema)
    .mutation(({ ctx, input }) => {
      const { boardId, data } = input;
      const { title } = data;
      return ctx.prisma.columns.create({
        data: {
          title,
          board: {
            connect: {
              id: boardId,
            },
          },
        },
      });
    }),

  addTask: publicProcedure
    .input(createTaskSchema)
    .mutation(({ ctx, input }) => {
      const { columnId, taskForm, subtaskForm } = input;
      const { title, description } = taskForm;
      return ctx.prisma.tasks.create({
        data: {
          title,
          description,
          SubTasks: {
            createMany: {
              data: subtaskForm,
            },
          },
          columns: {
            connect: {
              id: columnId,
            },
          },
        },
      });
    }),

  changeTaskCol: publicProcedure
    .input(updateTaskColSchema)
    .mutation(({ ctx, input }) => {
      const { id, newColumnId } = input;
      return ctx.prisma.tasks.update({
        where: {
          id,
        },
        data: {
          columnId: newColumnId,
        },
      });
    }),

  // SubTasks
  // getAllSubTasks: publicProcedure
  //   .input(getSubTaskSchema)
  //   .query(({ ctx, input }) => {
  //     const { tasksId } = input;
  //     return ctx.prisma.subTasks.findMany({
  //       where: {
  //         tasksId: tasksId,
  //       },
  //     });
  //   }),
  // addSubTask: publicProcedure
  //   .input(createSubTaskSchema)
  //   .mutation(({ ctx, input }) => {
  //     const { id, data } = input;
  //     const { status, title } = data;
  //     return ctx.prisma.subTasks.create({
  //       data: {
  //         title,

  //         tasks: {
  //           connect: {
  //             id,
  //           },
  //         },
  //       },
  //     });
  //   }),
});
