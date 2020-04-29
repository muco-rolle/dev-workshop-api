import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { ProjectType, ProjectInput } from "./project.schema";
import { AuthGuard } from "@middlewares";
import { ProjectService } from "./project.service";
import { GetUser } from "@decorators";
import { CurrentUser } from "@types";

@Resolver()
export class ProjectResolver {
    constructor(private readonly projectService: ProjectService) {}

    @AuthGuard()
    @Query(() => [ProjectType])
    async projects() {
        return await this.projectService.all();
    }

    // @AuthGuard()
    // @Query(() => ProjectType)
    // async project(
    //     @Arg("projectId") id: ObjectId,
    //     @GetUser() user: CurrentUser
    // ) {
    //     return await this.projectService.one(id, user.id);
    // }

    @AuthGuard()
    @Mutation(() => ProjectType)
    async createProject(
        @Arg("project") project: ProjectInput,
        @GetUser() user: CurrentUser
    ) {
        return await this.projectService.create(project, user);
    }
}
