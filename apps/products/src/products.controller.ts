import { REQUESTS } from '@app/common/constants/events';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductsService } from './products.service';
import {
  CreateProductDto,
  UpdateProductDto,
} from '@app/common/dto/create-user.dto';

@Controller()
export class ProductController {
  constructor(private productService: ProductsService) {}

  @MessagePattern(REQUESTS.GET_PRODUCTS)
  async getProducts() {
    const products = this.productService.getProducts();
    return products; // Send the product data back to the API Gateway
  }

  @MessagePattern(REQUESTS.POST_PRODUCTS)
  async createProduct(@Payload() data: CreateProductDto) {
    const product = this.productService.createProducts(data);
    return product;
  }

  @MessagePattern(REQUESTS.PUT_PRODUCT_BY_ID)
  async updateProduct(@Payload() data: UpdateProductDto) {
    const product = this.productService.updateProductById(data);
    return product;
  }
}
