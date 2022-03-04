import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ClientProxyFactory } from '@nestjs/microservices';
import { TypegooseModule } from 'nestjs-typegoose';
import { ConfigService } from 'src/config/config.service';
import { WsAuthGuard } from 'src/guards/ws/ws.auth.guard';
import { Board } from 'src/models/board.model';
import { List } from 'src/models/list.model';
import { Task } from 'src/models/task.model';
import { KanbanGateway } from './kanban.gateway';
import { KanbanService } from './kanban.service';

@Module({
  imports: [TypegooseModule.forFeature([List, Board, Task])],
  providers: [
    KanbanService,
    KanbanGateway,
    ConfigService,
    {
      provide: 'AUTH_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create(configService.get('authService'));
      },
      inject: [ConfigService],
    },
    {
      provide: APP_GUARD,
      useClass: WsAuthGuard,
    },
  ],
})
export class KanbanModule {}
