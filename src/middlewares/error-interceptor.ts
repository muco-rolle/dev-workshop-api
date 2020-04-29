import { MiddlewareFn } from "type-graphql";
import { checkProperty, logger, error } from "@utils";

export const ErrorInterceptor: MiddlewareFn<any> = async (_, next) => {
    try {
        return await next();
    } catch (err) {
        const { extensions } = err;

        if (checkProperty(err, "code") && err.code === 11000) {
            logger.error(err);
            throw error(`User is already registered.`, "400");
        } else if (
            checkProperty(err.extensions, "code") &&
            extensions.code !== "500"
        ) {
            logger.error(err);
            throw error(err.message, err.extensions.code);
        } else {
            logger.error(err);
            throw error("Internal Server Error", "500");
        }
    }
};
