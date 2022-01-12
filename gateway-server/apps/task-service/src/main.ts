import { NestFactory } from '@nestjs/core';
import { TaskServiceModule } from './task-service.module';

async function bootstrap() {
  console.log('test');
  const app = await NestFactory.create(TaskServiceModule);
  await app.listen(3002);
}
bootstrap();
