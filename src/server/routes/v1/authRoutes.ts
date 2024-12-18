import { z } from "zod";
import { publicProcedure, router } from "@/server/trpc";

const userSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    name: z.string().min(1, "Name is required"),
});

const userSingupSchema = userSchema.omit({ name: true });

export const authRoutes = router({
    signin: publicProcedure
        .input(userSchema)
        .mutation(async ({ input }) => {
            const { email, password, name } = input;
            console.log("User input:", email, password, name);
            return { success: true, message: "User signed in successfully" };
        }),
    signup: publicProcedure
        .input(userSingupSchema)
        .mutation(async ({ input }) => {
            const { email, password, } = input;
            console.log("User input:", email, password);
            return { success: true, message: "User signup in successfully" };
        }),
});
