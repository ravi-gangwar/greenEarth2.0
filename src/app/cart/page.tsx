"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import {
  removeFromCart,
  updateQuantity,
  updateCheckoutForm,
} from "@/store/features/cartReducer";
import { QuantityControl } from "@/components/ui/QuantityControl";
import { ruppee } from "../constant/constant";
import { IoCloseSharp } from "react-icons/io5";
import { toast } from "sonner";
import useStripe from "@/hooks/useStripe";
import { trpc } from "../_trpc/client";
import { useRouter } from "next/navigation";

function CartPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { items, totalAmount, checkoutForm } = useSelector(
    (state: RootState) => state.cart
  );
  const user = useSelector((state: RootState) => state.user);

  const { mutateAsync: cashOnDelivery, isPending: isCashOnDeliveryProcessing } =
    trpc.paymentRoutes.cashOnDelivery.useMutation();

  const [isProcessing, setIsProcessing] = useState(false);
  const { handlePayment } = useStripe();

  const handleIncreaseQuantity = (id: number) => {
    const item = items.find((item) => item.id === id);
    if (item) {
      dispatch(updateQuantity({ id, quantity: item.quantity + 1 }));
    }
  };

  const handleDecreaseQuantity = (id: number) => {
    const item = items.find((item) => item.id === id);
    if (item && item.quantity > 1) {
      dispatch(updateQuantity({ id, quantity: item.quantity - 1 }));
    }
  };

  const handleRemoveItem = (id: number) => {
    const item = items.find((item) => item.id === id);
    if (item) {
      dispatch(removeFromCart(item));
      toast.success("Item removed from cart");
    }
  };

  const handleCheckoutFormChange = (
    field: keyof typeof checkoutForm,
    value: string
  ) => {
    dispatch(updateCheckoutForm({ field, value }));
  };

  const handleCheckout = async () => {
    if (!user.token) {
      router.push(`/auth/login?callback=/cart`);
      return;
    }

    if (
      !checkoutForm.address ||
      !checkoutForm.city ||
      !checkoutForm.state ||
      !checkoutForm.pin
    ) {
      toast.error("Please enter complete delivery address");
      return;
    }

    if (checkoutForm.paymentMethod === "cash") {
      try {
        const { orderId } = await cashOnDelivery({ cart: items });
        router.push(`/orders/${orderId}`);
        toast.success("Order placed successfully! Cash on delivery selected.");
      } catch (error) {
        console.error("Payment error:", error);
        toast.error("Failed to process payment. Please try again.");
      }
      return;
    }

    try {
      setIsProcessing(true);
      await handlePayment();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Failed to process payment. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[rgba(224,205,39,0.2)] to-[rgba(231,228,22,0.73)] p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-center text-4xl font-bold text-gray-800 mb-8">
          Your Cart
        </h1>

        <div className="lg:flex lg:gap-8">
          {/* Cart Items Section */}
          <div className="lg:flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-yellow-100 rounded-lg shadow-lg p-4 relative hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative w-full h-40 mb-3">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <h2 className="text-lg font-semibold text-gray-800 mb-1">
                      {item.name}
                    </h2>
                    <p className="text-sm text-gray-600 mb-2">
                      Category: {item.category || "Uncategorized"}
                    </p>
                    <p className="text-base font-bold text-gray-700 mb-2">
                      Price: {ruppee + item.price}
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <QuantityControl
                      quantity={item.quantity ?? 0}
                      onIncrease={() => handleIncreaseQuantity(item.id)}
                      onDecrease={() => handleDecreaseQuantity(item.id)}
                    />
                    <p className="text-sm font-semibold text-gray-800">
                      Total: {ruppee + item.price * (item.quantity ?? 0)}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
                  >
                    <IoCloseSharp className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary and Checkout Section */}
          <div className="lg:w-96 mt-8 lg:mt-0">
            <div className="bg-yellow-100 rounded-lg shadow-lg p-6 lg:sticky lg:top-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Order Summary
              </h2>
              <div className="space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Items ({items.length})</span>
                  <span>{ruppee + totalAmount}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="border-t border-gray-300 my-2 pt-2">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>{ruppee + totalAmount}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-bold text-gray-800">
                  Delivery Address
                </h3>
                <input
                  type="text"
                  value={checkoutForm.address}
                  onChange={(e) =>
                    handleCheckoutFormChange("address", e.target.value)
                  }
                  placeholder="Street address"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={checkoutForm.city}
                    onChange={(e) =>
                      handleCheckoutFormChange("city", e.target.value)
                    }
                    placeholder="City"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  <input
                    type="text"
                    value={checkoutForm.state}
                    onChange={(e) =>
                      handleCheckoutFormChange("state", e.target.value)
                    }
                    placeholder="State"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <input
                  type="text"
                  value={checkoutForm.pin}
                  onChange={(e) =>
                    handleCheckoutFormChange("pin", e.target.value)
                  }
                  placeholder="PIN code"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-gray-800">
                    Payment Method
                  </h3>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cash"
                        checked={checkoutForm.paymentMethod === "cash"}
                        onChange={(e) =>
                          handleCheckoutFormChange(
                            "paymentMethod",
                            e.target.value
                          )
                        }
                        className="mr-2"
                      />
                      Cash on Delivery
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="online"
                        checked={checkoutForm.paymentMethod === "online"}
                        onChange={(e) =>
                          handleCheckoutFormChange(
                            "paymentMethod",
                            e.target.value
                          )
                        }
                        className="mr-2"
                      />
                      Online Payment
                    </label>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isProcessing || isCashOnDeliveryProcessing}
                  className="w-full py-3 bg-yellow-400 text-gray-700 rounded-md hover:bg-yellow-500 transition-colors duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing || isCashOnDeliveryProcessing
                    ? "Processing..."
                    : "Proceed to Checkout"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyCart() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[rgba(224,205,39,0.2)] to-[rgba(231,228,22,0.73)] p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-center text-4xl font-bold text-gray-800 mb-8">
          Your Cart
        </h1>
        <div className="bg-yellow-100 rounded-lg shadow-lg p-8 text-center">
          <p className="text-xl text-gray-600 mb-4">Your cart is empty</p>
          <p className="text-gray-500">
            Add some beautiful plants to your cart!
          </p>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
