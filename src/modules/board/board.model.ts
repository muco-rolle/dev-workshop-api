import { model, Document, Model, Schema, models } from "mongoose";

const boardSchema = new Schema(
    {
        title: { type: String, required: "true" },
        description: String,
    },
    { timestamps: true }
);

export interface BoardModel extends Document {
    title: string;
    description?: string;
}

export const boardModel: Model<BoardModel> =
    models.Board || model<BoardModel>("Board", boardSchema);
