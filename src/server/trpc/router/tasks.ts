import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import {
  createTaskSchema,
  updateTaskSchema,
  toggleSubtaskSchema,
  updateSubtaskSchema,
} from "../../../schema/task.schema";

export const tasksRouter = router({
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

  updateTask: publicProcedure
    .input(updateTaskSchema)
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
});
