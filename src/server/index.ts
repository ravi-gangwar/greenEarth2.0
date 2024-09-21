import { publicProcedure, router } from "./trpc";

export const appRouter = router({
    getTodos: publicProcedure.query(async () => {

        //make DB call

        return { name: "Ravi", role: 'Dev' }
    })
})


export type AppRouter = typeof appRouter;