import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { BoardType, BoardInput } from "./board.schema";
import { BoardService } from "./board.service";

@Resolver()
export class BoardResolver {
    constructor(private readonly boardService: BoardService) {}
    @Query(() => String)
    demo() {
        return "Hello demo";
    }

    @Mutation(() => BoardType)
    async createBoard(
        @Arg("board") board: BoardInput,
        @Arg("projectId") projectId: string
    ) {
        return await this.boardService.create(board, projectId);
    }

    @Mutation(() => BoardType)
    async updateBoard(
        @Arg("board") board: BoardInput,
        @Arg("boardId") boardId: string
    ) {
        return await this.boardService.update(board, boardId);
    }

    @Mutation(() => BoardType)
    async deleteBoard(@Arg("boardId") boardId: string) {
        return await this.boardService.delete(boardId);
    }
}
