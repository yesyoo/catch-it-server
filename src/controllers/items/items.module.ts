import { Module } from '@nestjs/common';
import { ItemsController } from './items/items.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemService } from 'src/services/item/item.service';
import { PersonalShoesSchema, Personal_Shoes } from 'src/schemas/item/personal/shoes-schema';
import { PersonalClothesSchema, Personal_Clothes } from 'src/schemas/item/personal/clothes-schema';


@Module({
  controllers: [ItemsController],
  imports: [
    MongooseModule.forFeature([{name: Personal_Shoes.name, schema: PersonalShoesSchema}]),
    MongooseModule.forFeature([{name: Personal_Clothes.name, schema: PersonalClothesSchema}])
  ],
  providers: [
    ItemService
  ]
})
export class ItemsModule {}
