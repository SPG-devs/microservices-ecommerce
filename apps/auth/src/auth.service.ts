import { Injectable } from '@nestjs/common';
import {
  CreateUserDto,
  UpdateUserDto,
} from '@app/common/dto/create-user.dto';
import { RpcException } from '@nestjs/microservices';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async getusers() {
    const users = await this.userModel.find({});
    return users;
  }

  async getUser(id: Types.ObjectId) {
    try {
      const user = await this.userModel.findById(id);

      if (!user) {
        throw new RpcException({
          status: 404,
          message: `User with ID ${id} not found`,
        });
      }

      return user;
    } catch (error) {
      if (error instanceof RpcException) {
        throw error; // Re-throw existing RpcException
      }

      throw new RpcException({
        status: 500,
        message: 'An unexpected error occurred while fetching the user',
      });
    }
  }

  async createUser(payload: CreateUserDto) {
    try {
      const user = await this.userModel.create(payload);
      return user; 
    } catch (error) {
      throw new RpcException('user not created');
    }
  }

  async updateUserById(user: UpdateUserDto) {
    try {
      const updatedUser = await this.userModel.findByIdAndUpdate(
        user.id,
        { $set: user }, // Update only the provided fields
        { new: true }, // Return the updated document
      );
  
      if (!updatedUser) {
        throw new RpcException('user not found');
      }
  
      return updatedUser;
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }
      throw new RpcException('Error updating user');
    }
  }
}
