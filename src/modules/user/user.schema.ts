import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class UserType {
    @Field()
    id: string;

    @Field()
    username: string;

    @Field()
    email: string;

    @Field()
    active: boolean;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}
