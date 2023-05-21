import mongoose from "mongoose";
import { MONGODB_URI } from "../utils/secrets";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    // tslint:disable-next-line:no-console
    console.log("MongoDB Connected...");
  } catch (err: any) {
    // tslint:disable-next-line:no-console
    console.error("MongoDB fail to connect " + err.message);
    // Exit process with failure
    process.exit(1);
  }
};
