import { KanbanEvent } from '@kanban2.0/shared';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { Types } from 'mongoose';
import { ICreateList, IUpdateListTitle } from './list.dto';
import { ListService } from './list.service';

@Controller()
export class ListController {
  constructor(private listService: ListService) {}

  @Post('/')
  createList(@Body() listDto: ICreateList) {
    return this.listService.createList(listDto);
  }

  @Post('/:listId')
  updateListTitle(
    @Param('listId') listId: Types.ObjectId,
    @Body() listTitle: IUpdateListTitle,
  ) {
    return this.listService.updateListTitle(listTitle, listId);
  }

  @MessagePattern({ cmd: KanbanEvent.getListDetails })
  getListDetails(listId: Types.ObjectId) {
    return this.listService.getListDetails({ listId });
  }

  @MessagePattern({ cmd: KanbanEvent.getKanbanBoardLists })
  getKanbanBoardLists(boardId: Types.ObjectId) {
    return this.listService.getKanbanBoardLists({ boardId });
  }

  @Delete('/list/:listId')
  deleteList(@Param('listId') listId: string) {
    return this.listService.deleteList({ listId });
  }
}
