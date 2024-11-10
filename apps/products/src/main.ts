import { NestFactory } from '@nestjs/core';
import { ProductsModule } from './products.module';
import { connectMicroservicesQueues } from '@app/common/utils';
import { Queues } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(ProductsModule);
  connectMicroservicesQueues(app, Queues);
}
bootstrap();
