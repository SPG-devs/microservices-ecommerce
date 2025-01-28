import { Module } from '@nestjs/common';
import { RmqModule, RmqService } from '@app/common';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { APP } from '@app/common/constants/events';
import { ProductsController } from './controllers/products.controller';
import { UsersController } from './controllers/users.controller';
import { getEnvironment } from '@app/common/constants/config';

const serviceAppNames = [
  APP.PRODUCTS_SERVICE,
  APP.AUTH_SERVICE,
  // Add more services here as needed
];

const createRmqModules = (moduleNames: string[]) => {
  return moduleNames.map((serviceName) => {
    return RmqModule.register({
      name: serviceName,
    })
  });
};

@Module({
  imports: [
    ...createRmqModules(serviceAppNames),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
      }),
      envFilePath: `./apps/api-gateway/.env.${getEnvironment()}`,
    }),
  ],
  controllers: [UsersController, ProductsController],
  providers: [
    RmqService
  ],
})
export class ApiGatewayModule { }
