import { ProjectInput } from "./project.schema";
import { CurrentUser } from "@types";
import { logger, error } from "@utils";
import { projectModel, ProjectModel } from "./project.model";
import * as mongoose from "mongoose";

export class ProjectService {
    async all(userId?: string): Promise<ProjectModel[]> {
        return await projectModel
            .find({ user: userId as any })
            .populate("user")
            .populate("boards")
            .exec();
    }

    async one(id: string, userId: string): Promise<ProjectModel> {
        const projectId = mongoose.Types.ObjectId(id);

        const project = await projectModel
            .findOne({ _id: projectId, user: userId as any })
            .populate("user")
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

    async update(id: string, project: ProjectInput) {
        const updatedProject = await projectModel
            .findOneAndUpdate({ _id: id }, project, {
                new: true,
            })
            .exec();

        if (!updatedProject) {
            throw error(
                `Can't updated a project with id: ${id} not found`,
                "404"
            );
        }

        logger.info(`${updatedProject.name} updated.`);
        return updatedProject;
    }

    async delete(id: string, userId: string) {
        const deletedProject = await projectModel
            .findOneAndDelete({ _id: id, user: userId as any })
            .exec();

        if (!deletedProject) {
            throw error(
                `Can't delete a project with id: ${id} not found`,
                "404"
            );
        }

        logger.info(`${deletedProject.name} deleted.`);
        return deletedProject;
    }
}
