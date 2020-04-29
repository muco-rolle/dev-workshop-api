import { join } from "path";
import { buildSchema } from "type-graphql";
import { Container } from "typedi";
import { ErrorInterceptor } from "@middlewares";

export const generateSchema = async () => {
    return await buildSchema({
        resolvers: [join(process.cwd(), "/src/modules/**/*.resolver.ts")],
        container: Container,
        validate: false,
        globalMiddlewares: [ErrorInterceptor],
        emitSchemaFile: {
            path: join(process.cwd(), "src/schema.graphql"),
        },
    });
};
