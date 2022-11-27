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
  createSubtaskSchema,
  updateTaskColSchema,
  toggleSubtaskSchema,
  updateSubtaskSchema,
} from "../../../schema/task.schema";

import {
  getAllColumnsSchema,
  createColumnSchema,
} from "../../../schema/column.schema";

import { router, publicProcedure } from "../trpc";
import { connect } from "http2";

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

  deleteBoard: publicProcedure
    .input(z.string().cuid())
    .mutation(({ ctx, input: id }) => {
      return ctx.prisma.boards.delete({
        where: {
          id,
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
      const { boardId: id, data } = input;
      const { title } = data;
      return ctx.prisma.columns.create({
        data: {
          title,
          board: {
            connect: {
              id,
            },
          },
        },
      });
    }),

  addTask: publicProcedure
    .input(createTaskSchema)
    .mutation(({ ctx, input }) => {
      const { columnId: id, taskForm, subtaskData } = input;
      const { title, description } = taskForm;
      return ctx.prisma.tasks.create({
        data: {
          title,
          description,
          SubTasks: {
            createMany: {
              data: subtaskData,
            },
          },
          columns: {
            connect: {
              id,
            },
          },
        },
      });
    }),

  deleteTask: publicProcedure
    .input(z.string().cuid())
    .mutation(({ ctx, input: id }) => {
      return ctx.prisma.tasks.delete({
        where: {
          id,
        },
      });
    }),

  updateTaskCol: publicProcedure
    .input(updateTaskColSchema)
    .mutation(({ ctx, input }) => {
      const { id, newColumnId: columnId, title, description } = input;
      return ctx.prisma.tasks.update({
        where: {
          id,
        },
        data: {
          title,
          description,
          columnId,
        },
      });
    }),

  addSubtask: publicProcedure
    .input(z.string().cuid())
    .mutation(({ ctx, input: id }) => {
      // const { id, data } = input;
      // const { title, isCompleted } = data;
      return ctx.prisma.subTasks.create({
        data: {
          title: "",
          isCompleted: false,
          tasks: {
            connect: {
              id,
            },
          },
        },
      });
    }),

  updateSubtask: publicProcedure
    .input(updateSubtaskSchema)
    .mutation(({ ctx, input }) => {
      const { id, title } = input;
      return ctx.prisma.subTasks.update({
        where: {
          id,
        },
        data: {
          title,
        },
      });
    }),

  deleteSubtask: publicProcedure
    .input(z.string().cuid())
    .mutation(({ ctx, input: id }) => {
      return ctx.prisma.subTasks.delete({
        where: {
          id,
        },
      });
    }),

  toggleSubTask: publicProcedure
    .input(toggleSubtaskSchema)
    .mutation(({ ctx, input }) => {
      const { id, isCompleted } = input;
      return ctx.prisma.subTasks.update({
        where: {
          id,
        },
        data: {
          isCompleted,
        },
      });
    }),

  findNewBoard: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.boards.findFirst({
      where: {
        User: {
          id: ctx.session?.user?.id,
        },
      },
      orderBy: {
        id: "desc",
      },
    });
  }),
});
