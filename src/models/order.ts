import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  cart: { type: Array, required: true },
  userId: { type: String, required: true },
  status: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  paymentMethod: { type: String, required: false },
  paymentId: { type: String, required: false },
  address: { type: Object, required: true },
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;