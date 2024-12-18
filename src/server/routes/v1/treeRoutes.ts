
import { connectToMongoDB } from "@/db/mongoose";
import treeModel from "@/models/trees";
import { publicProcedure, router } from "@/server/trpc";
import { ITree } from "@/types/Ttree";


export const treeRoutes = router({
  getAllTrees: publicProcedure.query<ITree[]>(async () => {
    try {
      await connectToMongoDB();
      return await treeModel.find({});
    } catch (error) {
      throw new Error("Get all trees block error");
    }
  }),
});
