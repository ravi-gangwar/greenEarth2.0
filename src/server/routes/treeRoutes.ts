import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import dbConnect from "@/db/mongoose";
import treeModel from "@/models/trees";

// Define the schema for the input object using zod
const TodoSchema = z.object({
  name: z.string(),
  role: z.string(),
});

const state: { name: string; role: string }[] = [{ name: "Ravi", role: "Dev" }];

export const treeRoutes = router({
  getTodos: publicProcedure.query(async () => {
    await dbConnect();

    const allTrees = await treeModel.find({});
    return allTrees;
  }),

  addTodo: publicProcedure
    .input(TodoSchema)
    .mutation(async ({ input }) => {
      state.push(input);
      return { success: true };
    }),
});
