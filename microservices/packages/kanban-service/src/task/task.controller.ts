import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { Types } from 'mongoose';
import {
  ICreatetask,
  IGetAlltask,
  IUpdatetaskDifferentList,
  IUpdatetaskameList,
  IUpdatetask,
} from './task.dto';
import { taskService } from './task.service';

@Controller('api/task')
export class taskController {
  constructor(private taskervice: taskService) {}

  @Post('/')
  createtask(@Body() taskDto: ICreatetask) {
    return this.taskervice.createtask(taskDto);
  }

  @Post('/getalltask')
  getAlltask(@Body() taskDto: IGetAlltask) {
    return this.taskervice.getAlltask(taskDto);
  }

  @Post('/task/:taskId')
  updatetask(
    @Param('taskId') taskId: Types.ObjectId,
    @Body() taskDto: IUpdatetask,
  ) {
    return this.taskervice.updatetask(taskDto, taskId);
  }

  @Get('/task/:taskId')
  gettask(@Param('taskId') taskId: Types.ObjectId) {
    return this.taskervice.gettask(taskId);
  }

  @Post('/reorder/samelist')
  updatetaskameList(@Body() taskDto: IUpdatetaskameList) {
    return this.taskervice.updatetaskameList(taskDto);
  }

  @Post('/reorder/differentlist')
  updatetaskDifferentList(@Body() taskDto: IUpdatetaskDifferentList) {
    return this.taskervice.updatetaskDifferentList(taskDto);
  }

  @Delete('/task/:taskId')
  deletetask(@Param('taskId') taskId: string) {
    return this.taskervice.deletetask(taskId);
  }
}
