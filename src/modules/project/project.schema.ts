import { ObjectType, Field, InputType } from "type-graphql";

@ObjectType()
export class Project {
    @Field()
    id: string;

    @Field()
    name: string;

    @Field({ nullable: true })
    description?: string;
}

@InputType()
export class ProjectInput {
    @Field()
    name: string;

    @Field({ nullable: true })
    description?: string;
}
