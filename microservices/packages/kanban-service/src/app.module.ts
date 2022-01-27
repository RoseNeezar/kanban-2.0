import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KanbanGateway } from './gateway/kanban.gateway';
import { TypegooseModule } from 'nestjs-typegoose';
import { ListController } from './list/list.controller';
import { taskController } from './task/task.controller';
import { BoardController } from './board/board.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypegooseModule.forRoot(`mongodb://root:example@mongo:27017`, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }),
  ],
  controllers: [ListController, taskController, BoardController],
  providers: [AppService, KanbanGateway],
})
export class AppModule {}
