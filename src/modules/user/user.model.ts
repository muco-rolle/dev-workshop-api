import { Document, model, Model, models, Schema } from "mongoose";

const userSchema: Schema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    code: { type: String, required: true },
    codeExpireTime: { type: Date, required: true },
    active: { type: Boolean, default: false },
});

export interface UserModel extends Document {
    username: string;
    email: string;
    password: string;
    code: string;
    codeExpireTime: Date;
    active: boolean;
}

export const userModel: Model<UserModel> =
    models.user || model<UserModel>("user", userSchema);
