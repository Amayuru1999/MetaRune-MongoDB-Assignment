import mongoose from "mongoose";

export const connectToMongoDB = async (uri: string) => {
  try {
    await mongoose.connect(uri, {
    
    
    });
    console.log("✅ Successfully connected to MongoDB");
  } catch (error: any) {
    console.error("🔴 Failed to connect to MongoDB:", error.message);
    throw error; // Re-throw the error to handle it at the call site
  }
};
