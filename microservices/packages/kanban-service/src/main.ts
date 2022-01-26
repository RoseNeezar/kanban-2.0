import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.set('trust proxy', 1);
  app.enableCors();

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      url: new ConfigService().get('url'),
      host: new ConfigService().get('host'),
    },
  });

  await app.startAllMicroservices();
  await app.listen(5010);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
