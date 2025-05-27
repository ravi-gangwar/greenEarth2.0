import { protectedProcedure } from "@/server/trpc";
import { router } from "@/server/trpc";
import { z } from "zod";
import Stripe from "stripe";
import { connectToMongoDB } from "@/db/mongoose";
import Payment from "@/models/payments";
import Order from "@/models/order";
import TreeList from "@/models/trees";


const cartItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  category: z.string().optional(),
  imageUrl: z.string(),
  description: z.string().optional(),
  quantity: z.number()
});

export const paymentRoutes = router({
  checkout: protectedProcedure.input(
    z.object({
      cart: z.array(cartItemSchema),
      address: z.object({
        address: z.string(),
        city: z.string(),
        state: z.string(),
        pin: z.string(),
      })
    })
  ).mutation(async ({ input, ctx }) => {
    try {               
      const { cart, address } = input;
      const userId = ctx.user.id; // Get user ID from context
      await connectToMongoDB();
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

      // fist check all the items are available in the database
      const items = await TreeList.find({ id: { $in: cart.map(item => item.id) } });
      if(items.length !== cart.length) throw new Error("Item not found");

      // caclulate the total amount of the cart 
      const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
      
      const lineItems = cart.map(item => ({
        price_data: {
          currency: 'inr',
          product_data: {
            name: item.name,
            images: [item.imageUrl],
          },
          unit_amount: totalAmount * 100,
        },
        quantity: 1,
      }));

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `${process.env.NODE_ENV === "development" ? "http://localhost:3000" : process.env.NEXT_PUBLIC_APP_URL}/success`,
        cancel_url: `${process.env.NODE_ENV === "development" ? "http://localhost:3000" : process.env.NEXT_PUBLIC_APP_URL}/cancel`,
      });
      if(!session) throw new Error("Failed to create session");
      
      // save in the database
      const payment = await Payment.create({
        cart: cart,
        sessionId: session.id,
        userId: userId,
        status: "done",
        createdAt: new Date(),
        updatedAt: new Date(),
        paymentMethod: "card",
        address: address,
      });

      console.log(address);

        const order = await Order.create({
        cart: cart,
        userId: userId,
        status: "done",
        createdAt: new Date(),
        updatedAt: new Date(),
        paymentMethod: "card",
        paymentId: payment._id.toString(),
        address: address,
      });

      console.log("Payment created successfully");

      return {
        id: session.id,
        url: session.url,
        orderId: order._id.toString(),
      };
    } catch (error) {
      console.log(error);
      throw new Error("Failed to create session");
    }
  }),
  cashOnDelivery: protectedProcedure.input(
    z.object({
      cart: z.array(cartItemSchema),
      address: z.object({
        address: z.string(),
        city: z.string(),
        state: z.string(),
        pin: z.string(),
      })
    })
  ).mutation(async ({ input, ctx }) => {
    try {
      const { cart, address } = input;
      const userId = ctx.user.id;
      await connectToMongoDB();
      // check all the items are available in the database
      const items = await TreeList.find({ id: { $in: cart.map(item => item.id) } });
      if(items.length !== cart.length) throw new Error("Item not found");

      console.log(address);
      
      const order = await Order.create({
        cart: items,
        userId: userId,
        status: "paymentDone",
        createdAt: new Date(),
        updatedAt: new Date(),
        paymentMethod: "cash",
        address: address,
      });
      console.log("Payment created successfully");
      return {
        message: "Payment created successfully",
        orderId: order._id.toString(),
      };
    } catch (error) {
      console.log(error);
      throw new Error("Failed to create session");
    }
  }),
});