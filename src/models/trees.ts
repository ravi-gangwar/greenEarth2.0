import { ITree } from "@/types/Ttree";
import mongoose, { Document, Schema } from "mongoose";

// Define an interface for the schema fields


// Define the interface for the Mongoose Document
type ITreeDocument = ITree & Document;

// Define the schema
const TreeListSchema: Schema = new Schema<ITreeDocument>(
  {
    id: {
      type: Number,
      required: [true, "Tree ID is required"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Tree name is required"],
      minLength: [3, "Name must be at least 3 characters"],
      maxLength: [30, "Name must be less than 30 characters"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Tree price is required"],
    },
    category: {
      type: String,
      trim: true,
      default: "Uncategorized",
    },
    imageUrl: {
      type: String,
      required: [true, "Tree image URL is required"],
    },
    description: {
      type: String,
      maxLength: [2000, "Description must be less than 2000 characters"],
    },
  },
  {
    timestamps: true,
  }
);

// Ensure the model is registered only once
const TreeList = mongoose.models.treeList || mongoose.model<ITreeDocument>("treeList", TreeListSchema);

export default TreeList;
