import z from "zod";

export const getSingleBoardSchema = z.object({
  boardId: z.string().cuid(),
});

export const boardSchema = z.object({
  title: z.string().max(35, "Max title length is 35"),
  columnsForm: z
    .array(z.object({ title: z.string().max(35, "Max title length is 35") }))
    .min(1)
    .max(4),
});
export type BoardInput = z.TypeOf<typeof boardSchema>;

export const updateBoardSchema = z.object({
  title: z.string().max(35, "Max title length is 35"),
  boardId: z.string().cuid(),
});
