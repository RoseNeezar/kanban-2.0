import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'dgram';

@WebSocketGateway({
  path: '/kanban/socket.io',
  cors: {
    origin: '*',
  },
  transports: ['polling', 'websocket'],
})
export class KanbanGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger('MessageGateway');
  @SubscribeMessage('setup')
  handleMessage(client: Socket, payload: any) {
    console.log('some connect !!!!', payload);
    client.emit('connected', 'from me here');
  }

  async handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: `);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: `);
  }
}
