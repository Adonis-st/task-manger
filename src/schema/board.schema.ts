import z from "zod";

export const createBoardSchema = z.object({
  title: z.string().max(35, "Max title length is 35"),
});

export type CreateBoardInput = z.TypeOf<typeof createBoardSchema>;

export const getSingleBoardSchema = z.object({
  boardId: z.string().cuid(),
});

export const boardSchema = z.object({
  boardForm: z.object({
    title: z.string().max(35, "Max title length is 35"),
  }),
  columnsForm: z
    .array(z.object({ title: z.string().max(35, "Max title length is 35") }))
    .min(1)
    .max(4),
});

export type boardInput = z.TypeOf<typeof boardSchema>;
