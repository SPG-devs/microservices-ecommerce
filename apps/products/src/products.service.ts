import { Injectable } from '@nestjs/common';
import {
  CreateProductDto,
  UpdateProductDto,
} from '@app/common/dto/create-user.dto';
import { RpcException } from '@nestjs/microservices';
import { Product } from './schemas/product.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async getProducts() {
    const products = await this.productModel.find({});
    return products;
  }

  async getProduct(id: Types.ObjectId) {
    try {
      const product = await this.productModel.findById(id);
      return product;
    } catch (error) {
      throw new RpcException('Error fetching Product');
    }
  }

  async createProducts(product: CreateProductDto) {
    try {
      const products = await this.productModel.create(product);
      return products; 
    } catch (error) {
      throw new RpcException('Product not created');
    }
  }

  async updateProductById(product: UpdateProductDto) {
    try {
      const updatedProduct = await this.productModel.findByIdAndUpdate(
        product.id,
        { $set: product }, // Update only the provided fields
        { new: true }, // Return the updated document
      );
  
      if (!updatedProduct) {
        throw new RpcException('Product not found');
      }
  
      return updatedProduct;
    } catch (error) {
      console.error('Error occured');
      if (error instanceof RpcException) {
        throw error;
      }
      throw new RpcException('Error updating product');
    }
  }
}
