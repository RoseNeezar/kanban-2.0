export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {
      url: process.env.TASK_MICROSERVICE_URL,
      host: 'task_redis',
    };
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
