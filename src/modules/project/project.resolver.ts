import { Resolver, Query } from "type-graphql";
import { Project } from "./project.schema";
import { AuthGuard } from "@middlewares";

@Resolver()
export class ProjectResolver {
    @AuthGuard()
    @Query(() => [Project])
    projects() {
        return [{ id: "1", name: "Hello" }];
    }

    @Query(() => Project)
    project() {
        return { id: 1, name: "test" };
    }
}
