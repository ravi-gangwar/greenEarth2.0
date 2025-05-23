import { z } from "zod";
import { publicProcedure, router } from "@/server/trpc";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { TRPCError } from "@trpc/server";
import User from "@/models/user";
import crypto from "crypto";
import { sendPasswordResetEmail } from "@/utils/emailConfig";
import { connectToMongoDB } from "@/db/mongoose";

const userSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    name: z.string().min(1, "Name is required"),
});

const userSignupSchema = userSchema;
const forgotPasswordSchema = z.object({
    email: z.string().email("Invalid email address"),
});

const resetPasswordSchema = z.object({
    token: z.string(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

// In a real app, these would be in environment variables
const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const authRoutes = router({
    signin: publicProcedure
        .input(userSchema.omit({ name: true }))
        .mutation(async ({ input }) => {
            await connectToMongoDB();
            const { email, password } = input;
            
            // Find user
            const user = await User.findOne({ email });
            if (!user) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "User not found",
                });
            }

            // Verify password
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                throw new TRPCError({
                    code: "UNAUTHORIZED",
                    message: "Invalid password",
                });
            }

            // Generate JWT token
            const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });

            return { 
                success: true, 
                message: "User signed in successfully",
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    isAdmin: user.isAdmin,
                    avatar: user.avatar
                }
            };
        }),

    signup: publicProcedure
        .input(userSignupSchema)
        .mutation(async ({ input }) => {
            await connectToMongoDB();
            const { email, password, name } = input;
            
            // Check if user already exists
            const user = await User.findOne({ email });
            if (user) {
                throw new TRPCError({
                    code: "CONFLICT",
                    message: "User already exists",
                });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

            // Create new user
            const newUser = await User.create({
                email,
                name,
                password: hashedPassword,
            });

            // Generate JWT token
            const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, { expiresIn: "7d" });

            return {
                success: true, 
                message: "User signed up successfully",
                token,
                user: {
                    id: newUser.id,
                    email: newUser.email
                }
            };
        }),

    forgotPassword: publicProcedure
        .input(forgotPasswordSchema)
        .mutation(async ({ input }) => {
            await connectToMongoDB();
            const { email } = input;
            
            // Check if user exists
            const user = await User.findOne({ email });
            if (!user) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "User not found",
                });
            }

            // Generate reset token
            const resetToken = crypto.randomBytes(32).toString('hex');
            const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

            // Save reset token to user
            user.resetPasswordToken = resetToken;
            user.resetPasswordExpires = resetTokenExpiry;
            await user.save();

            // Send reset email
            const emailSent = await sendPasswordResetEmail(email, resetToken);
            if (!emailSent) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Failed to send reset email",
                });
            }

            return { 
                success: true, 
                message: "Password reset instructions sent to your email" 
            };
        }),

    resetPassword: publicProcedure
        .input(resetPasswordSchema)
        .mutation(async ({ input }) => {
            await connectToMongoDB();
            const { token, password } = input;

            // Find user with valid reset token
            const user = await User.findOne({
                resetPasswordToken: token,
                resetPasswordExpires: { $gt: Date.now() }
            });

            if (!user) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Invalid or expired reset token",
                });
            }

            // Hash new password
            const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

            // Update user's password and clear reset token
            user.password = hashedPassword;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            await user.save();

            return {
                success: true,
                message: "Password has been reset successfully"
            };
        }),
});
