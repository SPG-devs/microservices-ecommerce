import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule, RmqModule } from '@app/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './users/schemas/user.schema';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { UsersRepository } from './users/users.repository';
import { APP } from '@app/common/constants/events';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        MONGODB_DB_NAME: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/auth/.env',
    }),
    DatabaseModule,
    UsersModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    RmqModule.register({
      name: APP.AUTH_SERVICE,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, UsersRepository],
})
export class AuthModule {
  constructor(private configService: ConfigService) {}
}
