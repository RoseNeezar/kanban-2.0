export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {
      url: process.env.AUTH_MICROSERVICE_URL,
      host: 'auth_redis',
    };
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
