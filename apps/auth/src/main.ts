import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ValidationPipe } from '@nestjs/common';
import { RmqService } from '@app/common';
import { APP } from '@app/common/constants/events';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.useGlobalPipes(new ValidationPipe());
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions(APP.API_GATEWAY_SERVICE));
  await app.startAllMicroservices();
}
bootstrap();
