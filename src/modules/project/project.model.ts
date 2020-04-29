import { model, Document, Model, Schema, models } from "mongoose";

const projectSchema = new Schema(
    {
        name: { type: String, required: "true" },
        description: String,
        user: { type: Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

export interface ProjectModel extends Document {
    name: string;
    description?: string;
    user: Schema.Types.ObjectId;
}

export const projectModel: Model<ProjectModel> =
    models.Project || model<ProjectModel>("Project", projectSchema);
