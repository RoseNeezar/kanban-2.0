import { IUpdateListOrder, KanbanEvent } from '@kanban2.0/shared';
import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Authorization } from './decorators/authorization.decorator';

type IboardId = Pick<IUpdateListOrder, 'boardId'>['boardId'];

@Controller('api/lists')
export class ListController {
  constructor(
    @Inject('KANBAN_SERVICE') private readonly kanbanService: ClientProxy,
  ) {}

  @Get('/all/:boardId')
  @Authorization(true)
  getKanbanBoardLists(@Param('boardId') boardId: IboardId) {
    return this.kanbanService.send(
      { cmd: KanbanEvent.getKanbanBoardLists },
      boardId,
    );
  }

  @Get('/list/:listId')
  @Authorization(true)
  getListDetails(@Param('listId') listId: IboardId) {
    return this.kanbanService.send({ cmd: KanbanEvent.getListDetails }, listId);
  }
}
