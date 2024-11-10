import { Module } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { RmqModule } from '@app/common';
import { APP } from '@app/common/constants/events';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    RmqModule.register({
      name: APP.AUTH_SERVICE,
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
