import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { APP, REQUESTS } from '@app/common/constants/events';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateProductDto } from '@app/common/dto/create-user.dto';

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

  @Post()
  async createProducts(@Body() body: CreateProductDto) {
    try {
      const product = await firstValueFrom(
        this.productClient.send(REQUESTS.POST_PRODUCTS, body),
      );

      return product; // Return the products from Product Service
    } catch (error) {
      console.error('Error fetching products', error);
      throw error; // Handle errors appropriately
    }
  }
}
