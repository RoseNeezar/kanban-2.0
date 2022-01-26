import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { Types } from 'mongoose';
import { User } from 'src/models/user.model';
import { ICreateBoard, IUpdateListOrder } from './board.dto';
import { BoardService } from './board.service';

@Controller('api/boards')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Get('/all')
  getAllBoards() {
    return this.boardService.getAllBoards(User);
  }

  @Post('/')
  createBoard(@Body() boardDto: ICreateBoard) {
    return this.boardService.createBoard(boardDto, User);
  }

  @Patch('/')
  updateListOrder(@Body() boardDto: IUpdateListOrder) {
    return this.boardService.updateListOrder(boardDto);
  }

  @Get('/:boardId')
  getBoard(@Param('boardId') boardId: Types.ObjectId) {
    return this.boardService.getBoard({ boardId });
  }

  @Delete('/:boardId')
  deleteBoard(@Param('boardId') boardId: Types.ObjectId) {
    return this.boardService.deleteBoard({ boardId });
  }
}
