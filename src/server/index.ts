import { authRoutes } from "./routes/v1/authRoutes";
import { treeRoutes } from "./routes/v1/treeRoutes";
import { contactRoutes } from "./routes/v1/contactRoutes";
import { router } from "./trpc";

export const appRouter = router({
    treeRoutes,
    authRoutes,
    contactRoutes
})

export type AppRouter = typeof appRouter;