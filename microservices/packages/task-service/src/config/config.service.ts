export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {
      url: process.env.MICROSERVICE_URL,
    };
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
