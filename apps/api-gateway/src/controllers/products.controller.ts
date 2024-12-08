import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { APP, REQUESTS } from '@app/common/constants/events';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  CreateProductDto,
  UpdateProductDto,
} from '@app/common/dto/create-user.dto';
import { ParseObjectIdPipe } from '../pipes';
import { ApiParam } from '@nestjs/swagger';
import { Types } from 'mongoose';

@Controller('/products')
export class ProductsController {
  constructor(
    @Inject(APP.PRODUCTS_SERVICE) private readonly productClient: ClientProxy, // Injecting the ClientProxy
  ) {}

  @Get()
  async getProducts() {
    try {
      const products = await firstValueFrom(
        this.productClient.send(REQUESTS.GET_PRODUCTS, {}),
      );

      return products; // Return the products from Product Service
    } catch (error) {
      console.error('Error fetching products', error);
      throw error; // Handle errors appropriately
    }
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String, description: 'Product ID' }) 
  async getProduct(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    try {
      const product = await firstValueFrom(
        this.productClient.send(REQUESTS.GET_PRODUCT_BY_ID, id),
      );

      return product; // Return the product from Product Service
    } catch (error) {
      console.error('Error fetching product', error);
      throw error; // Handle errors appropriately
    }
  }

  @Post()
  async createProducts(@Body() body: CreateProductDto) {
    try {
      const product = await firstValueFrom(
        this.productClient.send(REQUESTS.POST_PRODUCTS, body),
      );

      return product; // Return the products from Product Service
    } catch (error) {
      console.error('Error creating product', error);
      throw error; // Handle errors appropriately
    }
  }

  @Put(':id')
  async updateProduct(@Param('id') id: string, @Body() body: UpdateProductDto) {
    try {
      body.id = id;
      const product = await firstValueFrom(
        this.productClient.send(REQUESTS.PUT_PRODUCT_BY_ID, body),
      );

      return product; // Return the products from Product Service
    } catch (error) {
      console.error('Error updating product', error);
      throw new BadRequestException(error);
    }
  }
}
