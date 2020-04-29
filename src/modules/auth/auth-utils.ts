import { env } from "@utils";
import { UserModel } from "../user";
import { createHash, randomBytes } from "crypto";
import * as jwt from "jsonwebtoken";
import { compare, hash } from "bcryptjs";

export class AuthUtils {
    getUser(token: string) {
        try {
            if (token) {
                // remove bearer words which comes with the actual token
                token = token.replace("bearer ", "");

                return jwt.verify(token, env.get("secret_key") as string);
            }

            return null;
        } catch (err) {
            return null;
        }
    }
    async hash(text: string): Promise<string> {
        return await hash(text, 10);
    }

    async compare(text: string, user: UserModel): Promise<boolean> {
        return await compare(text, user.password);
    }

    generateToken(user: UserModel) {
        const { _id, username, email } = user;
        return jwt.sign(
            { id: _id, username, email },
            env.get("secret_key") as string,
            {
                expiresIn: "1d",
            }
        );
    }

    hashEmailVerificationCode(code: string): string {
        return createHash("sha256").update(code).digest("hex");
    }

    getEmailVerificationCode(): { code: string; hashedCode: string } {
        const code = randomBytes(3).toString("hex").toUpperCase();
        const hashedCode = this.hashEmailVerificationCode(code);

        return { code, hashedCode };
    }

    getUserCodeExpireTime() {
        // return Date.now() + 60 + 60 + 1000; // 1 hour
        return Date.now() + 1 * (24 * 3600) * 1000; // 1 day
    }
}
