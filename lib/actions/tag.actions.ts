"use server";


import Tag from "@/database/tag.model";
import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { GetAllTagsParams, GetTopInteractedTagsParams } from "./shared.types";






export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDatabase();

    // const {page = 1 , pageSize = 20 , filter , searchQuery} = params;

    const tags = await Tag.find({}).sort({ createdAt: -1 });
    return {tags};
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findById(userId);

    // Find interactions for the user and group by tags....

    return [
      { _id: "1", name: "tag1" },
      { _id: "2", name: "tag2" },
    ];

    if (!user) throw new Error("User not found");

    
  } catch (error) {}
}
