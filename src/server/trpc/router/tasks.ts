import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import {
  createTaskSchema,
  updateTaskSchema,
  toggleSubtaskSchema,
  updateSubtaskSchema,
} from "~/schema/task.schema";

export const tasksRouter = router({
  addTask: protectedProcedure
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

  deleteTask: protectedProcedure
    .input(z.string().cuid())
    .mutation(({ ctx, input: id }) => {
      return ctx.prisma.tasks.delete({
        where: {
          id,
        },
      });
    }),

  updateTask: protectedProcedure
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

  // Todo Fix this
  // updateTask: protectedProcedure
  //   .input(updateTaskSchema)
  //   .mutation(({ ctx, input }) => {
  //     const { id, newColumnId: columnId, title, description, subtasks } = input;
  //     return ctx.prisma.$transaction([
  //       ctx.prisma.subTasks.deleteMany({ where: { taskId: id } }),
  //       ctx.prisma.tasks.update({
  //         where: { id },
  //         data: {
  //           title,
  //           description,
  //           columnId,
  //           SubTasks: {
  //             createMany: {
  //               data: subtasks,
  //             },
  //           },
  //         },
  //       }),
  //     ]);
  //   }),

  changeTaskColumn: protectedProcedure
    .input(z.object({ id: z.string().cuid(), columnId: z.string() }))
    .mutation(({ ctx, input }) => {
      const { id, columnId } = input;
      return ctx.prisma.tasks.update({
        where: { id },
        data: { columnId },
      });
    }),

  addSubtask: protectedProcedure
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

  updateSubtask: protectedProcedure
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

  deleteSubtask: protectedProcedure
    .input(z.string().cuid())
    .mutation(({ ctx, input: id }) => {
      return ctx.prisma.subTasks.delete({
        where: {
          id,
        },
      });
    }),

  toggleSubTask: protectedProcedure
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
