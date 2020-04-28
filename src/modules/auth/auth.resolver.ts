import { Resolver, Query } from "type-graphql";

@Resolver()
export class AuthResolver {
    @Query(() => String)
    demo() {
        return "Hello Demo";
    }
}
