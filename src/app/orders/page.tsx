"use client";
import { motion } from "framer-motion";
import { trpc } from "@/app/_trpc/client";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Package, Clock, CheckCircle, XCircle } from "lucide-react";
import { ruppee } from "../constant/constant";
import { CartItem } from "@/types/TCart";
const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  paymentDone: "bg-purple-100 text-purple-800",
};

const statusIcons = {
  pending: Clock,
  processing: Package,
  completed: CheckCircle,
  cancelled: XCircle,
  paymentDone: CheckCircle,
};

export default function OrdersPage() {
  const router = useRouter();
  const { data: orders, isLoading } = trpc.orderRoutes.getAllOrders.useQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[rgba(224,205,39,0.2)] to-[rgba(231,228,22,0.73)] p-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Orders</h1>
          <div className="grid gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white/50 backdrop-blur-sm rounded-xl p-6 animate-pulse"
              >
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[rgba(224,205,39,0.2)] to-[rgba(231,228,22,0.73)] p-4">
        <div className="max-w-2xl mx-auto text-center py-16">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            No Orders Yet
          </h1>
          <p className="text-gray-600 mb-8">
            You haven&apos;t placed any orders yet. Start shopping to see your
            orders here!
          </p>
          <Button
            onClick={() => router.push("/plants")}
            className="bg-yellow-500 hover:bg-yellow-600 text-white"
          >
            Start Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[rgba(224,205,39,0.2)] to-[rgba(231,228,22,0.73)] p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Orders</h1>
        <div className="grid gap-4">
          {orders.map((order, index) => {
            const StatusIcon =
              statusIcons[order.status as keyof typeof statusIcons];
            const totalAmount = order.cart.reduce(
              (sum: number, item: CartItem) => sum + item.price * item.quantity,
              0
            );

            return (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/50 backdrop-blur-sm rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => router.push(`/orders/${order._id}`)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                      Order #{order._id.slice(-6).toUpperCase()}
                    </h2>
                    <p className="text-gray-600">
                      {format(new Date(order.createdAt), "MMMM d, yyyy")}
                    </p>
                  </div>
                  <div
                    className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                      statusColors[order.status as keyof typeof statusColors]
                    }`}
                  >
                    <StatusIcon className="w-4 h-4" />
                    <span className="text-sm font-medium capitalize">
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Items</p>
                    <p className="font-medium">{order.cart.length} items</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="font-medium">
                      {ruppee}
                      {totalAmount}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Payment Method</p>
                    <p className="font-medium capitalize">
                      {order.paymentMethod || "Online"}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    className="text-yellow-600 border-yellow-500 hover:bg-yellow-50"
                  >
                    View Details
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
