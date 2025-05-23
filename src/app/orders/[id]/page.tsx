"use client";
import { motion } from "framer-motion";
import { trpc } from "@/app/_trpc/client";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Package, Clock, CheckCircle, XCircle, ArrowLeft } from "lucide-react";
import { ruppee } from "../../constant/constant";
import Image from "next/image";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface Address {
  street: string;
  city: string;
  state: string;
  pin: string;
}

interface Order {
  _id: string;
  status: "pending" | "processing" | "completed" | "cancelled" | "paymentDone";
  createdAt: string;
  cart: CartItem[];
  address?: Address;
  paymentMethod?: string;
}

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

export default function OrderDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const { data: order, isLoading } = trpc.orderRoutes.getOrderById.useQuery({
    id: params.id,
  }) as { data: Order | undefined; isLoading: boolean };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[rgba(224,205,39,0.2)] to-[rgba(231,228,22,0.73)] p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[rgba(224,205,39,0.2)] to-[rgba(231,228,22,0.73)] p-4">
        <div className="max-w-2xl mx-auto text-center py-16">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Order Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The order you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Button
            onClick={() => router.push("/orders")}
            className="bg-yellow-500 hover:bg-yellow-600 text-white"
          >
            Back to Orders
          </Button>
        </div>
      </div>
    );
  }

  const StatusIcon = statusIcons[order.status as keyof typeof statusIcons];
  const totalAmount = order.cart.reduce(
    (sum: number, item: CartItem) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-[rgba(224,205,39,0.2)] to-[rgba(231,228,22,0.73)] p-4">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => router.push("/orders")}
          className="mb-6 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Orders
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/50 backdrop-blur-sm rounded-xl p-6 mb-6"
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Order #{order._id.slice(-6).toUpperCase()}
              </h1>
              <p className="text-gray-600">
                Placed on {format(new Date(order.createdAt), "MMMM d, yyyy")}
              </p>
            </div>
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                statusColors[order.status as keyof typeof statusColors]
              }`}
            >
              <StatusIcon className="w-5 h-5" />
              <span className="font-medium capitalize">{order.status}</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white/50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">
                Order Summary
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Items</span>
                  <span className="font-medium">{order.cart.length} items</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Amount</span>
                  <span className="font-medium">
                    {ruppee}
                    {totalAmount}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method</span>
                  <span className="font-medium capitalize">
                    {order.paymentMethod || "Online"}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white/50 rounded-lg p-4 md:col-span-2">
              <h3 className="font-semibold text-gray-800 mb-2">
                Delivery Address
              </h3>
              <p className="text-gray-600">
                {order.address?.street || "No address provided"}
              </p>
              <p className="text-gray-600">
                {order.address?.city}, {order.address?.state} -{" "}
                {order.address?.pin}
              </p>
            </div>
          </div>

          <div className="bg-white/50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-4">Order Items</h3>
            <div className="space-y-4">
              {order.cart.map((item: CartItem) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-3 bg-white/50 rounded-lg"
                >
                  <div className="relative w-16 h-16">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">{item.name}</h4>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-800">
                      {ruppee}
                      {item.price * item.quantity}
                    </p>
                    <p className="text-sm text-gray-600">
                      {ruppee}
                      {item.price} each
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
