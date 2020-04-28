import { join } from "path";
import { buildSchema } from "type-graphql";

export const generateSchema = async () => {
    return await buildSchema({
        resolvers: [join(process.cwd(), "/src/modules/**/*.resolver.ts")],
        emitSchemaFile: {
            path: join(process.cwd(), "src/schema.graphql"),
        },
    });
};
