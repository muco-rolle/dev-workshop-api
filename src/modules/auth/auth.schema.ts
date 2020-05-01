import { ObjectType, Field, InputType } from "type-graphql";

@ObjectType()
export class ActivateAccountType {
    @Field()
    username: string;

    @Field()
    active: boolean;

    @Field()
    token: string;
}

@ObjectType()
export class LoginType {
    @Field()
    token: string;
}

@InputType()
export class LoginInput {
    @Field()
    email: string;

    @Field()
    password: string;
}

@InputType()
export class SignupInput {
    @Field()
    username: string;

    @Field()
    email: string;

    @Field()
    password: string;
}

@InputType()
export class ActivateAccountInput {
    @Field()
    code: string;
}
