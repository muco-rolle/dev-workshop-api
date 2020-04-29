import {
    SignupInput,
    ActivateAccount,
    LoginInput,
    Login,
    MailOptions,
} from "@types";
import { UserModel, userModel } from "../user";
import { logger } from "@utils";
import { error } from "console";
import { UserInputError, AuthenticationError } from "apollo-server";
import { AuthUtils } from "./auth-utils";
import { mailer } from "@config";

export class AuthService extends AuthUtils {
    async signup(user: SignupInput): Promise<UserModel> {
        let { username, email, password } = user;

        const hashedPassword = await this.hash(password);
        const { hashedCode, code } = this.getEmailVerificationCode();
        const codeExpireTime = this.getUserCodeExpireTime();

        const savedUser = await userModel.create({
            username,
            email,
            code: hashedCode,
            codeExpireTime,
            password: hashedPassword,
        });

        logger.info(`[Signup] ${savedUser.username} signed up successfully.`);

        try {
            mailer.sendMail({
                from: "no-reply@devworkshop.com",
                to: email,
                subject: "Account Verification",
                template: "verification-code",
                context: { code, username },
            } as MailOptions);

            logger.info(
                `[Signup] Verification code sent to ${savedUser.email}`
            );
        } catch (error) {
            // TODO notify the user that email has failed to be sent
            // TODO provide to the user a way to resend the code
            logger.error(error);
        }

        return savedUser;
    }

    async activateAccount(code: string): Promise<ActivateAccount> {
        const hashedCode = this.hashEmailVerificationCode(code);

        const savedUser = await userModel
            .findOne({
                code: hashedCode,
                codeExpireTime: { $gt: Date.now() as any },
            })
            .exec();

        if (!savedUser) {
            throw error("Invalid or Expired code", "400");
        }

        savedUser.active = true;
        savedUser.code = "";
        savedUser.codeExpireTime = new Date(0);

        await savedUser.save({ validateBeforeSave: false });

        const token = this.generateToken(savedUser);

        logger.info(
            `[Activate Account] ${savedUser.username}'s account is activated.`
        );
        return {
            token,
            active: savedUser.active,
            username: savedUser.username,
        };
    }

    async login(user: LoginInput): Promise<Login> {
        const { email, password } = user;

        const foundUser = await userModel.findOne({ email }).exec();

        if (!foundUser) {
            throw new UserInputError(
                "No user found with this login credentials."
            );
        }

        if (!foundUser.active) {
            throw error(
                "Can't login your account has not been yet activated",
                "403"
            );
        }

        const isValidPassword = await this.compare(password, foundUser);

        if (!isValidPassword) {
            throw new AuthenticationError("Invalid Credentials");
        }

        const token = this.generateToken(foundUser);

        logger.info(`[Login] ${foundUser.username} logged in successfully.`);
        return { token };
    }
}
