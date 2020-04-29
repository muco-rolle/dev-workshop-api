import { ObjectType, Field, InputType, ArgsType } from "type-graphql";
import { ObjectId } from "@types";
import { UserType } from "../user";

@ObjectType()
export class ProjectType {
    @Field()
    id: string;

    @Field()
    name: string;

    @Field({ nullable: true })
    description?: string;

    @Field()
    user: UserType;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}

@InputType()
export class ProjectInput {
    @Field()
    name: string;

    @Field({ nullable: true })
    description?: string;
}

@ArgsType()
export class ProjectArgs {
    projectId: ObjectId;
}
