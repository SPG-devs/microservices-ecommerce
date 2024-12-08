import { Module } from '@nestjs/common';
import { RmqModule, RmqService } from '@app/common';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { APP } from '@app/common/constants/events';
import { ProductsController } from './controllers/products.controller';

@Module({
  imports: [
    RmqModule.register({
      name: APP.PRODUCTS_SERVICE,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/api-gateway/.env',
    }),
  ],
  controllers: [ProductsController],
  providers: [
    RmqService
  ],
})
export class ApiGatewayModule {}
