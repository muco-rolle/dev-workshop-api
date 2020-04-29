import { ProjectInput } from "./project.schema";
import { CurrentUser, ObjectId } from "@types";
import { logger, error } from "@utils";
import { projectModel, ProjectModel } from "./project.model";

export class ProjectService {
    async all(): Promise<ProjectModel[]> {
        return await projectModel.find().populate("user").exec();
    }

    async one(id: ObjectId, userId: ObjectId): Promise<ProjectModel> {
        const project = await projectModel
            .findOne({ _id: id, user: userId })
            .exec();

        if (!project) {
            throw error(`A project with id: ${id} not found`, "404");
        }

        return project;
    }

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
