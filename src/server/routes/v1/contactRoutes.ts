import { z } from "zod";
import { publicProcedure, router } from "@/server/trpc";
import { connectToMongoDB } from "@/db/mongoose";
import Contact from "@/models/contact";
import axios from "axios";
const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

export const contactRoutes = router({
  submitContact: publicProcedure
    .input(contactSchema)
    .mutation(async ({ input }) => {
      try {
        await connectToMongoDB();
        const contact = await Contact.create(input);
        
        // Send email notification
        const emailSent = await axios.post(process.env.MAILLER_URL!, {
            to: "ravigangwar7465@gmail.com",
            subject: "Contact Form Submission",
            text: `Name: ${input.name}\nEmail: ${input.email}\nSubject: ${input.subject}\nMessage: ${input.message}`
        });
        if (!emailSent) {
          console.error("Failed to send contact form email");
        }

        return {
          success: true,
          message: "Message sent successfully",
          data: contact,
        };
      } catch (error) {
        throw new Error("Failed to send message");
      }
    }),
}); 