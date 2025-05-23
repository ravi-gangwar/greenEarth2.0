import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  cart: { type: Array, required: true },
  sessionId: { type: String, required: false },
  userId: { type: String, required: true },
  status: { type: String, required: true },
  paymentMethod: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}); 

const Payment = mongoose.models.Payment || mongoose.model("Payment", paymentSchema);

export default Payment;