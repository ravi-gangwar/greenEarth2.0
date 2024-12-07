import { connectToMongoDB } from "@/db/mongoose";
import treeModel from "@/models/trees";
export const getAllTrees = async () => {
    try {
        await connectToMongoDB();
        const allTrees = await treeModel.find({});
        return allTrees;
    } catch (error) {
        throw new Error(error)
    }
}
