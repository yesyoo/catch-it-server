import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Data_users, DataUsersSchema } from 'src/schemas/user/user-data-schema';
import { User, UserSchema } from 'src/schemas/user/user-schema';
import { UserService } from 'src/services/user/user.service';
import { UsersController } from './users/users.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategyService } from 'src/services/auth/jwt-strategy/jwt-strategy.service';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from 'src/static/private/constants';

@Module({
  controllers: [UsersController],
  imports: [
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    MongooseModule.forFeature([{name: Data_users.name, schema: DataUsersSchema}]),
    PassportModule,
    JwtModule.register({
        secret: jwtConstants.secret
      })
  ],
  providers: [
    UserService,
    JwtStrategyService
  ]
})
export class UsersModule {}
