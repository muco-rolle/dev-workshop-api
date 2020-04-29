import { ProjectInput } from "./project.schema";
import { CurrentUser } from "@types";
import { logger } from "@utils";
import { projectModel, ProjectModel } from "./project.model";

export class ProjectService {
    async create(
        project: ProjectInput,
        user: CurrentUser
    ): Promise<ProjectModel> {
        const savedProject = await projectModel.create({
            ...project,
            user: user.id,
        });

        logger.info(`${savedProject.name} saved.`);

        return savedProject;
    }
}
