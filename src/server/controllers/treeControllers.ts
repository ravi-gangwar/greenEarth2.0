import { connectToMongoDB } from "@/db/mongoose";
import treeModel from "@/models/trees";
export const getAllTrees = async () => {
    await connectToMongoDB();

    const allTrees = await treeModel.find({});
    return allTrees;
}