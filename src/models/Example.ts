import mongoose from "mongoose";

export type ExampleDocument = mongoose.Document & {
  exampleName: string;
  key: boolean;
};

const exampleSchema = new mongoose.Schema<ExampleDocument>({
  exampleName: { type: String, required: true },
  key: { type: Boolean, required: false },
});

export const ExampleModel = mongoose.model<ExampleDocument>(
  "User",
  exampleSchema
);
