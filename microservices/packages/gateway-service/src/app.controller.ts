import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('TASK_SERVICE') private readonly firstClient: ClientProxy,
  ) {}

  @Get('/first')
  async testFirstService(): Promise<string> {
    const tasksResponse: any = await firstValueFrom(
      this.firstClient.send({ cmd: 'ping' }, 'auth-some'),
    );

    console.log(tasksResponse);
    return 'first';
  }
}
