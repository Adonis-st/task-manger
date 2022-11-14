import { router } from "../trpc";
import { authRouter } from "./auth";
import { boardsRouter } from "./boards";

export const appRouter = router({
  boards: boardsRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
