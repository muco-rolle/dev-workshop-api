import { Resolver, Mutation, Arg } from "type-graphql";
import { UserType } from "../user";
import { AuthService } from "./auth.service";
import {
    SignupInput,
    ActivateAccountType,
    LoginType,
    LoginInput,
} from "./auth.schema";

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Mutation(() => UserType)
    async signup(@Arg("user") user: SignupInput) {
        return await this.authService.signup(user);
    }

    @Mutation(() => ActivateAccountType)
    async activateAccount(@Arg("code") code: string) {
        return await this.authService.activateAccount(code);
    }

    @Mutation(() => LoginType)
    async login(@Arg("user") user: LoginInput) {
        return await this.authService.login(user);
    }
}
