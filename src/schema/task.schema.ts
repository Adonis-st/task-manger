import z from "zod";

export const createTaskSchema = z.object({
  columnId: z.string().cuid(),
  taskForm: z.object({
    title: z
      .string()
      .min(3, "Title must be at least 3 characters")
      .max(30, "Title can't be longer than 30 characters"),
    description: z
      .string()
      .max(300, "Max description length 300 characters")
      .optional(),
  }),
  subtaskData: z
    .array(
      z.object({
        title: z.string().max(50, "Title can't be longer than 50 characters"),
        isCompleted: z.boolean(),
      })
    )
    .max(5),
});
export type CreateTaskInput = z.TypeOf<typeof createTaskSchema>;

export const updateTaskSchema = z.object({
  id: z.string().cuid(),
  newColumnId: z.string().cuid(),
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(30, "Title can't be longer than 30 characters"),
  description: z
    .string()
    .max(300, "Max description length 300 characters")
    .optional(),
  // subtasks: z
  //   .array(
  //     z.object({
  //       title: z.string().max(50, "Title can't be longer than 50 characters"),
  //       isCompleted: z.boolean(),
  //     })
  //   )
  //   .max(5),
});
export type UpdateTaskInput = z.TypeOf<typeof updateTaskSchema>;

//SubTasks
export const toggleSubtaskSchema = z.object({
  id: z.string().cuid(),
  isCompleted: z.boolean(),
});
export type ToggleSubTaskInput = z.TypeOf<typeof toggleSubtaskSchema>;

export const updateSubtaskSchema = z.object({
  id: z.string().cuid(),
  title: z
    .string()
    .min(1, "Can't be empty")
    .max(50, "Title can't be longer than 50 characters"),
});
export type updateSubtaskInput = z.TypeOf<typeof updateSubtaskSchema>;
