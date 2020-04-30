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

    async update(board: BoardInput, boardId: string): Promise<BoardModel> {
        const updatedBoard = await boardModel.findOneAndUpdate(
            { _id: boardId },
            board,
            { new: true }
        );

        if (!updatedBoard) {
            throw error(
                `Can't update a board with id: ${boardId} not found`,
                "404"
            );
        }

        return updatedBoard;
    }

    async delete(boardId: string): Promise<BoardModel> {
        const deletedBoard = await boardModel.findOneAndDelete({
            _id: boardId,
        });

        if (!deletedBoard) {
            throw error(
                `Can't delete a board with id: ${boardId} not found`,
                "404"
            );
        }

        return deletedBoard;
    }
}
