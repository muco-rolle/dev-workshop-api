import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { UserType } from "../user";
import { AuthService } from "./auth.service";
import { SignupInput } from "./auth.schema";

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Query(() => String)
    demo() {
        return "Hell demo";
    }

    @Mutation(() => UserType)
    async signup(@Arg("user") user: SignupInput) {
        return await this.authService.signup(user);
    }
}
