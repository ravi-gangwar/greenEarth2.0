import { authRoutes } from "./routes/v1/authRoutes";
import { treeRoutes } from "./routes/v1/treeRoutes";
import { contactRoutes } from "./routes/v1/contactRoutes";
import { paymentRoutes } from "./routes/v1/paymentRoutes";
import orderRoutes from "./routes/v1/orderRoutes";
import { router } from "./trpc";
import { homeRoutes } from "./routes/v1/homeRoutes";

export const appRouter = router({
    treeRoutes,
    authRoutes,
    contactRoutes,
    paymentRoutes,
    orderRoutes,
    homeRoutes
})

export type AppRouter = typeof appRouter;