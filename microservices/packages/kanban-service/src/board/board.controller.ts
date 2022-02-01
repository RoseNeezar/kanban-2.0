import { KanbanEvent } from '@kanban2.0/shared';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Types } from 'mongoose';
import { ICreateBoard } from './board.dto';
import { BoardService } from './board.service';

@Controller()
export class BoardController {
  constructor(private boardService: BoardService) {}

  @MessagePattern({ cmd: KanbanEvent.getAllBoards })
  getAllBoards(userId: string) {
    return this.boardService.getAllBoards(userId);
  }

  @MessagePattern({ cmd: KanbanEvent.createBoard })
  createBoard(boardDto: ICreateBoard) {
    return this.boardService.createBoard(
      boardDto,
      Types.ObjectId('4edd40c86762e0fb12000003'),
    );
  }

  @MessagePattern({ cmd: KanbanEvent.getBoard })
  getBoard(boardId: Types.ObjectId) {
    return this.boardService.getBoard({ boardId });
  }

  @MessagePattern({ cmd: KanbanEvent.deleteBoard })
  deleteBoard(boardId: Types.ObjectId) {
    return this.boardService.deleteBoard({ boardId });
  }
}
