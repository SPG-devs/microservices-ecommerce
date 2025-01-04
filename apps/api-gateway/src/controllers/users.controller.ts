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
import { APP, AUTH_REQUESTS, } from '@app/common/constants/events';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  CreateProductDto,
  UpdateProductDto,
} from '@app/common/dto/create-user.dto';
import { ParseObjectIdPipe } from '../pipes';
import { ApiParam } from '@nestjs/swagger';
import { Types } from 'mongoose';

@Controller('/auth')
export class UsersController {
  constructor(
    @Inject(APP.AUTH_SERVICE) private readonly userClient: ClientProxy, // Injecting the ClientProxy
  ) {}

  @Get('/users')
  async getUsers() {
    try {
      const users = await firstValueFrom(
        this.userClient.send(AUTH_REQUESTS.GET_USERS, {}),
      );

      return users; // Return the products from Product Service
    } catch (error) {
      console.error('Error fetching users', error);
      throw error; // Handle errors appropriately
    }
  }

  @Get('/user/:id')
  @ApiParam({ name: 'id', type: String, description: 'User ID' }) 
  async getUser(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    try {
      const user = await firstValueFrom(
        this.userClient.send(AUTH_REQUESTS.GET_USER_BY_ID, id),
      );

      return user; // Return the product from Product Service
    } catch (error) {
      console.error('Error fetching user', error);
      throw new BadRequestException(error); // Handle errors appropriately
    }
  }

  @Post()
  async createUser(@Body() body: CreateProductDto) {
    try {
      const user = await firstValueFrom(
        this.userClient.send(AUTH_REQUESTS.POST_USERS, body),
      );

      return user; // Return the products from Product Service
    } catch (error) {
      console.error('Error creating user', error);
      throw error; // Handle errors appropriately
    }
  }

  @Put('/user/:id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateProductDto) {
    try {
      body.id = id;
      const user = await firstValueFrom(
        this.userClient.send(AUTH_REQUESTS.PUT_USER_BY_ID, body),
      );

      return user; // Return the products from Product Service
    } catch (error) {
      console.error('Error updating user', error);
      throw new BadRequestException(error);
    }
  }
}
