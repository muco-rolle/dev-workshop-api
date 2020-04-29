import { IncomingMessage, ServerResponse } from "http";
import { ObjectId } from "./mongoose";

export interface CurrentUser {
    id: ObjectId;
    username: string;
    email: string;
}

export interface Context {
    req: IncomingMessage;
    res?: ServerResponse;
    user?: CurrentUser;
    token?: string;
}

export type SchemaType = any;
