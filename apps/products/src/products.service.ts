import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import {
  CreateProductDto,
  UpdateProductDto,
} from '@app/common/dto/create-user.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly productRepository: ProductRepository) {}

  async getProducts() {
    const products = await this.productRepository.find({});
    return products;
  }

  async createProducts(product: CreateProductDto) {
    const products = await this.productRepository.create(product);
    return products;
  }

  async updateProductById(product: UpdateProductDto) {
    const filterQuery = {
      _id: product.id,
    };
    const productUpdate = await this.productRepository.findOneAndUpdate(
      filterQuery,
      product,
    );
    return productUpdate;
  }
}
