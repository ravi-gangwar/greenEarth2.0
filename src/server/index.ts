import { demoRoutes } from "./routes/demo";
import { router } from "./trpc";

export const appRouter = router({
    demoRoutes,
})


export type AppRouter = typeof appRouter;