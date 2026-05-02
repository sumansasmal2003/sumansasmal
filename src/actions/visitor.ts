"use server";

import { connectToDatabase } from "@/lib/mongodb";
import Visitor from "@/models/Visitor";

export async function getVisitorCount() {
  try {
    await connectToDatabase();
    const counter = await Visitor.findOne({ identifier: "global" });
    return counter ? counter.count : 0;
  } catch (error) {
    console.error("Failed to fetch visitor count:", error);
    return 0;
  }
}

export async function incrementVisitorCount() {
  try {
    await connectToDatabase();
    // Find the global counter and increment it by 1.
    // upsert: true creates it if it doesn't exist yet.
    const counter = await Visitor.findOneAndUpdate(
      { identifier: "global" },
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );
    return counter.count;
  } catch (error) {
    console.error("Failed to increment visitor count:", error);
    return 0;
  }
}
