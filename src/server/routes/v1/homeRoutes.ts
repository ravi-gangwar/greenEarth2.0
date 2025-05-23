import TreeList from "@/models/trees";
import Order from "@/models/order";
import { publicProcedure, router } from "@/server/trpc";


export const homeRoutes = router({
  getRecentTrendingPlants: publicProcedure.query(async () => {
    const recentPlants = await TreeList.find({}).sort({ createdAt: -1 }).limit(4);
    return { recentPlants };
  }),
  getTrendingPlants: publicProcedure.query(async () => {
    try {
      // Get all trees first
      const allTrees = await TreeList.find({}).limit(4);
      
      // If there are no orders yet, return the most recent trees
      const orders = await Order.find({});
      if (!orders || orders.length === 0) {
        return { tree: allTrees };
      }

      // Get tree IDs from orders
      const treeIds = orders.map((order) => order.treeId);
      
      // Find trees that have been ordered
      const orderedTrees = await TreeList.find({ _id: { $in: treeIds } }).limit(4);
      
      // If no trees were found in orders, return the most recent trees
      if (!orderedTrees || orderedTrees.length === 0) {
        return { tree: allTrees };
      }

      // Sort trees by order count
      const sortedTree = orderedTrees.sort((a, b) => b.orderCount - a.orderCount);
      return { tree: sortedTree };
    } catch (error) {
      console.error("Error in getTrendingPlants:", error);
      // Return recent trees as fallback
      const recentTrees = await TreeList.find({}).sort({ createdAt: -1 }).limit(4);
      return { tree: recentTrees };
    }
  }),
});