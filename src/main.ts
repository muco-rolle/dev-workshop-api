import "reflect-metadata";

import { createApolloServer, runMongoDB, generateSchema } from "@config";
import * as express from "express";
import { logger, env } from "@utils";

const bootstrap = async () => {
    try {
        const port = env.get("app_port");
        const url = env.get("app_url");

        const schema = await generateSchema();

        const app = express();
        const apolloServer = createApolloServer(schema);

        apolloServer.applyMiddleware({ app, path: "/api" });

        runMongoDB();

        app.listen(port, () => logger.success(`[server] 🚀 running at ${url}`));
    } catch (error) {
        logger.error(error);
    }
};

bootstrap();
