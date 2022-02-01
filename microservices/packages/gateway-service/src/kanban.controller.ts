import { ICreateBoard, IUpdateListOrder, KanbanEvent } from '@kanban2.0/shared';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

type IboardId = Pick<IUpdateListOrder, 'boardId'>['boardId'];

@Controller('api/kanban')
export class KanbanController {
  constructor(
    @Inject('KANBAN_SERVICE') private readonly kanbanService: ClientProxy,
  ) {}

  @Get('/all')
  getAllBoards() {
    console.log('getAllBoards--gateway');

    return this.kanbanService.send({ cmd: KanbanEvent.getAllBoards }, 'user');
  }

  @Post('/')
  async createBoard(@Body() boardDto: ICreateBoard) {
    return this.kanbanService.send({ cmd: KanbanEvent.createBoard }, boardDto);
  }

  @Get('/:boardId')
  getBoard(@Param('boardId') boardId: IboardId) {
    return this.kanbanService.send({ cmd: KanbanEvent.getBoard }, boardId);
  }

  @Delete('/:boardId')
  deleteBoard(@Param('boardId') boardId: IboardId) {
    return this.kanbanService.send({ cmd: KanbanEvent.deleteBoard }, boardId);
  }
}
