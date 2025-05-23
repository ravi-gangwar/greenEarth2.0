import { router } from "@/server/trpc";
import { protectedProcedure } from "@/server/trpc";
import Order from "@/models/order";
import { z } from "zod";

const orderRoutes = router({
  getAllOrders: protectedProcedure.query(async ({ ctx }) => {
    const orders = await Order.find({ userId: ctx.user.id });
    return orders;
  }),
  getOrderById: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
    const order = await Order.findById(input.id);
    return order;
  }),
});

export default orderRoutes;