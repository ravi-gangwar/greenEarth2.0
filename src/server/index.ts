import { treeRoutes } from "./routes/treeRoutes";
import { router } from "./trpc";

export const appRouter = router({
    treeRoutes,
})


export type AppRouter = typeof appRouter;