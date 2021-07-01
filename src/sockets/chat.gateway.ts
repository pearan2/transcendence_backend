import { UseGuards } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketsGuard } from './sockets.guard';

@UseGuards(SocketsGuard)
@WebSocketGateway({
  handlePreflightRequest: (req, res) => {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': process.env.FRONT_END_URI,
      'Access-Control-Allow-Methods': 'GET,POST',
      'Access-Control-Allow-Credentials': true,
    });
    res.end();
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() message: string,
    @ConnectedSocket() client: Socket,
  ) {
    this.server.emit('message', client!.user!.nickname + ' : ' + message);
  }

  afterInit(server: Server): any {
    console.log('server initialized');
  }

  handleConnection(@ConnectedSocket() client: Socket) {
    console.log(`client connected ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`client disconnected ${client.id}`);
  }
}
