import { getAllTrees } from "../controllers/treeControllers";
import { publicProcedure, router } from "../trpc";
import { ITree } from "@/types/Ttree";


export const treeRoutes = router({
  getAllTrees: publicProcedure.query<ITree[]>(getAllTrees),
});
