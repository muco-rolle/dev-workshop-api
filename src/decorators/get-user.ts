import { createParamDecorator } from "type-graphql";
import { Context } from "@types";
import { AuthUtils } from "src/modules/auth";
import { ForbiddenError } from "apollo-server";

export function GetUser() {
    return createParamDecorator<Context>(({ context }) => {
        const authUtils = new AuthUtils();
        const user = authUtils.getUser(context.token as string);
        if (!user) {
            throw new ForbiddenError("Access denied, no token provided.");
        } else {
            return user;
        }
    });
}
