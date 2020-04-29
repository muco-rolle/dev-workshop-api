import { createMethodDecorator } from "type-graphql";
import { Context } from "@types";
import { AuthenticationError, ForbiddenError } from "apollo-server";
import { AuthUtils } from "src/modules/auth";

export function AuthGuard(): any {
    return createMethodDecorator(async ({ context }, next) => {
        const { token } = context as Context;

        if (token) {
            const authUtils = new AuthUtils();

            const user = authUtils.getUser(token);

            if (user) {
                return next();
            } else {
                throw new AuthenticationError("Access denied, Invalid Token");
            }
        } else {
            throw new ForbiddenError("Access denied, no token provided.");
        }
    });
}
