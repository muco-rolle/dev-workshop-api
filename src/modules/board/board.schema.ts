import { ObjectType, Field, InputType } from "type-graphql";

@ObjectType()
export class BoardType {
    @Field()
    id: string;

    @Field()
    title: string;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}

@InputType()
export class BoardInput {
    @Field()
    title: string;

    @Field({ nullable: true })
    description?: string;
}
