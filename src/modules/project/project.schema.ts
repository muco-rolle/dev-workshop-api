import { ObjectType, Field, InputType, ArgsType } from "type-graphql";
import { UserType } from "../user";
import { BoardType } from "../board/board.schema";

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

    @Field(() => [BoardType])
    boards: BoardType[];

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
    projectId: string;
}
