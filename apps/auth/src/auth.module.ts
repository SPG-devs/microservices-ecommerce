import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule, RmqModule } from '@app/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { APP } from '@app/common/constants/events';

const NODE_ENV = process.env.NODE_ENV
const envPath = NODE_ENV === 'production' ? NODE_ENV : 'development'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        MONGODB_DB_NAME: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
      envFilePath: `./apps/auth/.env.${envPath}`,
    }),
    RmqModule.register({
      name: APP.AUTH_SERVICE,
    }),
    DatabaseModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, ConfigService],
})
export class AuthModule {

  constructor(private config: ConfigService) {
    console.log(config.get('MONGODB_URI'), 'MONGODB_URI', envPath)
  }
}
