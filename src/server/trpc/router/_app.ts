import { router } from "../trpc";
import { authRouter } from "./auth";
import { boardsRouter } from "./boards";
import { columnRouter } from "./columns";

export const appRouter = router({
  boards: boardsRouter,
  auth: authRouter,
  columns: columnRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
