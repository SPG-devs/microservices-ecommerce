import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { APP, EVENTS } from '@app/common/constants/events';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    @Inject(APP.AUTH_SERVICE) private authService: ClientProxy,
  ) {}

  async createUser(user: CreateUserDto) {
    const session = await this.usersRepository.startTransaction();
    try {
      const newUser = await this.usersRepository.create(user);
      await lastValueFrom(this.authService.emit(EVENTS.NewUser, { newUser }));
      await session.commitTransaction();
      return newUser;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  async getUsers() {
    const users = await this.usersRepository.find({});
    return users;
  }
}
