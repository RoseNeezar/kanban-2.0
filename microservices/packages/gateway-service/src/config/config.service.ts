import { ClientRedis, Transport } from '@nestjs/microservices';

export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;
  constructor() {
    this.envConfig = {};
    this.envConfig.port = process.env.API_GATEWAY_PORT;

    this.envConfig.calendarService = {
      options: {
        url: process.env.MICROSERVICE_URL,
      },
      transport: Transport.REDIS,
    };
    this.envConfig.taskService = {
      options: {
        url: process.env.MICROSERVICE_URL,
      },
      transport: Transport.REDIS,
    };
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
