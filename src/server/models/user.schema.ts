import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, require: true, select: false},
    googleId: { type: String },
    isVarified: { type: Boolean, default: false },
});

export const userModel = mongoose.models?.User || mongoose.model("User", userSchema);

export interface RawUserDocument {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    role: string;
    password: string;
    googleId?: string;
    isVarified: boolean;
};
