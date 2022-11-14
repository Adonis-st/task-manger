import z from "zod";

export const createTaskSchema = z.object({
  columnId: z.string().cuid(),
  taskForm: z.object({
    title: z.string().max(50, "Max title length is 50"),
    description: z.string(),
  }),
  subtaskForm: z
    .array(z.object({ title: z.string(), isCompleted: z.boolean() }))
    .max(5),
});

export const getAllTaskSchema = z.object({
  boardId: z.string().cuid(),
});

export const updateTaskColSchema = z.object({
  id: z.string().cuid(),
  newColumnId: z.string().cuid(),
});

export type CreateTaskInput = z.TypeOf<typeof createTaskSchema>;

export const getSubTaskSchema = z.object({
  tasksId: z.string().cuid(),
});

export const createSubTaskSchema = z.object({
  id: z.string().cuid(),
  data: z.object({
    title: z.string().max(50, "Max title length is 50"),
    status: z.boolean(),
  }),
});

export type CreateSubTaskInput = z.TypeOf<typeof createSubTaskSchema>;
