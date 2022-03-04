import { Logger, UseGuards } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WsAuthGuard } from 'src/guards/ws/ws.auth.guard';
import { KanbanService } from './kanban.service';

@WebSocketGateway({
  path: '/kanban/socket.io',
  cors: {
    credentials: true,
    origin: 'http://localhost:3000',
  },
  transports: ['polling', 'websocket'],
})
export class KanbanGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server!: Server;

  constructor(private kanbanService: KanbanService) {}

  private logger: Logger = new Logger('MessageGateway');

  afterInit(server: Server) {
    this.kanbanService.socket = server;
  }

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('setup')
  handleMessage(client: Socket, payload: any) {
    client.emit('connected', 'from me here');
  }

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('joinBoard')
  handleInBoard(client: Socket, room: string): void {
    client.join(room);
  }

  async handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: `);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: `);
  }
}
