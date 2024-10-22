import { z } from "zod";
import { publicProcedure, router } from "../trpc";

// Define the schema for the input object using zod
const TodoSchema = z.object({
  name: z.string(),
  role: z.string(),
});

const state: { name: string; role: string }[] = [{ name: "Ravi", role: "Dev" }];

export const demoRoutes = router({
  getTodos: publicProcedure.query(async () => {
    return state;
  }),

  addTodo: publicProcedure
    .input(TodoSchema)
    .mutation(async ({ input }) => {
      state.push(input);
      return { success: true };
    }),
});
