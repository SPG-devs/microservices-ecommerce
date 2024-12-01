import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { ConfigService } from '@nestjs/config';
import { connectMicroservicesQueues } from '@app/common/utils';
import { Queues } from './constants';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  connectMicroservicesQueues(app, Queues);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.listen(configService.get('PORT'));
  Logger.log(`App is running on PORT ${configService.get('PORT')}`);
}
bootstrap();
