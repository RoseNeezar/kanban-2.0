export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {
      url: process.env.CALENDAR_MICROSERVICE_URL,
      host: 'calendar_redis',
    };
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
