import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Board } from 'src/models/board.model';
import { List } from 'src/models/list.model';
import { Task } from 'src/models/task.model';
import { KanbanGateway } from './kanban.gateway';
import { KanbanService } from './kanban.service';

@Module({
  imports: [TypegooseModule.forFeature([List, Board, Task])],
  providers: [KanbanService, KanbanGateway],
})
export class KanbanModule {}
