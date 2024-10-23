import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialProvider from "next-auth/providers/credentials"
import { RawUserDocument, userModel } from "./server/models/user.schema";
import connectDb from "./lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        CredentialProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "johndoe@example.com" },
                password: { label: "Password", type: "password" },
            },
            authorize: async ({ email, password }) => {
                if (!email || !password) throw new Error("Invalid Credentials");

                await connectDb();

                const user: RawUserDocument | null = await userModel.findOne({ email }).select("+password").exec();

                if (!user) {
                    throw new Error("Invalid Credentials");
                }

                if (user.password !== password) {
                    throw new Error("Invalid Credentials");
                }

                return user;
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    theme: {
        colorScheme: "light",
    },
});
