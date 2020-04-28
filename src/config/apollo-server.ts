import { ApolloServer } from "apollo-server-express";
import { SchemaType } from "@types";

export const createApolloServer = (schema: SchemaType) => {
    return new ApolloServer({
        schema,
        context: async ({ req }) => {
            let token = req.headers.authorization;
            return { token, req };
        },
    });
};
