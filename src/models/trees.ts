import mongoose, { Document, Schema } from "mongoose";

// Define an interface for the schema fields
interface ITree {
  id: number;
  name: string;
  price: number;
  category?: string;
  imageUrl: string;
  description?: string;
}

// Define the interface for the Mongoose Document
interface ITreeDocument extends ITree, Document {}

// Define the schema
const TreeListSchema: Schema = new Schema<ITreeDocument>(
  {
    id: {
      type: Number,
      required: [true, "Tree ID is required"],
      unique: true, // Ensures uniqueness
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
      default: "Uncategorized", // Default value
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

// Define the model
const TreeList = mongoose.models.TreeList || mongoose.model('treeList', TreeListSchema);

export default TreeList;
