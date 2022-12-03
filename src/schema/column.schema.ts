import z from "zod";

export const getAllColumnsSchema = z.object({
  boardId: z.string().cuid(),
});

export const createColumnSchema = z.object({
  boardId: z.string().cuid(),
  // title: z.string().max(35, "Max title length is 35"),
});

export const updateColumnSchema = z.object({
  columnId: z.string().cuid(),
  title: z.string().max(35, "Max title length is 35"),
});

export type CreateColumnInput = z.TypeOf<typeof createColumnSchema>;
