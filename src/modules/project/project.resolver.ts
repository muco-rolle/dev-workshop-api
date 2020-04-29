import { Resolver, Query } from "type-graphql";
import { Project } from "./project.schema";

@Resolver()
export class ProjectResolver {
    @Query(() => [Project])
    projects() {
        return [{ id: "1", name: "Hello" }];
    }
}
