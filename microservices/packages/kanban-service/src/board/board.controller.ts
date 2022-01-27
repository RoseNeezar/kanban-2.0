import { KanbanEvent } from '@kanban2.0/shared';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Types } from 'mongoose';
import { User } from 'src/models/user.model';
import { ICreateBoard } from './board.dto';
import { BoardService } from './board.service';

const user: User = {
  token: 'tokenNews',
  username: 'useruser',
};
@Controller()
export class BoardController {
  constructor(private boardService: BoardService) {}

  @MessagePattern({ cmd: KanbanEvent.getAllBoards })
  getAllBoards(data: string) {
    return this.boardService.getAllBoards(user);
  }

  @MessagePattern({ cmd: KanbanEvent.createBoard })
  createBoard(boardDto: ICreateBoard) {
    return this.boardService.createBoard(boardDto, user);
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
