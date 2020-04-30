import { BoardInput } from "./board.schema";
import { BoardModel, boardModel } from "./board.model";
import { projectModel } from "../project";
import { error } from "@utils";

export class BoardService {
    async create(board: BoardInput, projectId: string): Promise<BoardModel> {
        const project = await projectModel.findOne({ _id: projectId }).exec();

        if (!project) {
            throw error(
                `You can't create a board on unexisting project.`,
                "404"
            );
        }

        const savedBoard = await boardModel.create({ ...board });

        project!.boards = [...project!.boards, savedBoard._id];
        await project.save();

        return savedBoard;
    }
}
