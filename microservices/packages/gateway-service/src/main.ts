import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    credentials: true,
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    methods: ['GET', 'PUT', 'POST', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', '*'],
  });
  await app.listen(5000);
}
bootstrap();
