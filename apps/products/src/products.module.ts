import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule, RmqModule } from '@app/common';
import { APP } from '@app/common/constants/events';
import { ProductController } from './products.controller';
import { ProductsService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import { ProductRepository } from './product.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        MONGODB_DB_NAME: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/products/.env',
    }),
    RmqModule.register({ name: APP.PRODUCTS_SERVICE }),
    DatabaseModule,
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProductController],
  providers: [ProductsService, ProductRepository],
})
export class ProductsModule {}
