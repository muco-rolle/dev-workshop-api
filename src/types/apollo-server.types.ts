import { IncomingMessage, ServerResponse } from "http";

export interface ICurrentUser {
    id: string;
    username: string;
    email: string;
}

export interface IContext {
    req: IncomingMessage;
    res?: ServerResponse;
    user?: ICurrentUser;
}

export type SchemaType = any;
