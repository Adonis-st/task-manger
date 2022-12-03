import { router } from "../trpc";
import { authRouter } from "./auth";
import { boardsRouter } from "./boards";
import { columnRouter } from "./columns";
import { tasksRouter } from "./tasks";

export const appRouter = router({
  auth: authRouter,
  boards: boardsRouter,
  columns: columnRouter,
  tasks: tasksRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
