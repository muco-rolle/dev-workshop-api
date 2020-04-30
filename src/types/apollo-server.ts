import { IncomingMessage, ServerResponse } from "http";

export interface CurrentUser {
    id: string;
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
