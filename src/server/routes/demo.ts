import { z } from "zod";
import { publicProcedure, router } from "../trpc";

// Define the schema for the input object using zod
const TodoSchema = z.object({
  name: z.string(),
  role: z.string(),
});

const state: { name: string; role: string }[] = [];

export const demoRoutes = router({
  getTodos: publicProcedure.query(async () => {
    return state;
  }),
  
  // Validate input using the schema
  addTodo: publicProcedure
    .input(TodoSchema) // Use the schema to validate the input
    .mutation(async ({ input }) => {
      // If validation passes, push the data into the state array
      state.push(input);
      return { success: true };
    }),
});
