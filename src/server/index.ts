
import { authRoutes } from "./routes/v1/authRoutes";
import { treeRoutes } from "./routes/v1/treeRoutes";
import { router } from "./trpc";

export const appRouter = router({
    treeRoutes,
    authRoutes
})


export type AppRouter = typeof appRouter;