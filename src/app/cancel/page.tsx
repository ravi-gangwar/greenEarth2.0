"use client";
import { motion } from "framer-motion";
import { XCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[rgba(224,205,39,0.2)] to-[rgba(231,228,22,0.73)]">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="backdrop-blur-sm rounded-2xl shadow-2xl p-8 text-center border border-yellow-200"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex justify-center mb-6"
          >
            <div className="relative">
              <XCircle className="w-28 h-28 text-red-500 drop-shadow-lg" />
              <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl"></div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent"
          >
            Payment Cancelled
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 mb-8 text-lg leading-relaxed"
          >
            Your payment was cancelled. No charges were made. You can try again
            or contact our support if you need assistance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-4 max-w-md mx-auto"
          >
            <Link href="/cart" className="block">
              <Button className="w-full mb-5 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Return to Cart
              </Button>
            </Link>
            <Link href="/" className="block">
              <Button
                variant="outline"
                className="w-full border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-50 font-semibold py-3 rounded-xl transition-all duration-300"
              >
                Continue Shopping
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
