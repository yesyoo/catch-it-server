import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User_data, UserDataSchema } from 'src/schemas/user/user-data-schema';
import { User, UserSchema } from 'src/schemas/user/user-schema';
import { UserService } from 'src/services/user/user.service';
import { UsersController } from './users/users.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategyService } from 'src/services/auth/jwt-strategy/jwt-strategy.service';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from 'src/static/private/constants';
import { ItemService } from 'src/services/item/item.service';
import { PersonalShoesSchema, Personal_Shoes } from 'src/schemas/item/personal/shoes-schema';
import { PersonalClothesSchema, Personal_Clothes } from 'src/schemas/item/personal/clothes-schema';

@Module({
  controllers: [UsersController],
  imports: [
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    MongooseModule.forFeature([{name: User_data.name, schema: UserDataSchema}]),
    MongooseModule.forFeature([{name: Personal_Shoes.name, schema: PersonalShoesSchema}]),
    MongooseModule.forFeature([{name: Personal_Clothes.name, schema: PersonalClothesSchema}]),
    
    PassportModule,
    JwtModule.register({
        secret: jwtConstants.secret
      })
  ],
  providers: [
    UserService,
    ItemService,
    JwtStrategyService
  ]
})
export class UsersModule {}
