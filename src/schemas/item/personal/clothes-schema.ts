import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ItemSchema } from '../item-schema';
import { ClothesSize, ClothesType, Color, Gender, IPersonalClothes, IItem, IItemState, Season } from 'src/interfaces/items';

@Schema({_id: false})
export class Clothes implements IPersonalClothes {

    @Prop() type: ClothesType

    @Prop() size: ClothesSize

    @Prop() season: Season

    @Prop() color: Color

    @Prop() gender: Gender

    @Prop() adult: boolean
};

export const ClothesSchema = SchemaFactory.createForClass(Clothes);

@Schema()
export class Personal_Clothes {
  
    @Prop() user: string

    @Prop() collection: string
 
    @Prop() category: string

    @Prop() deal: string

    @Prop() date: number;

    @Prop() show: boolean;

    @Prop() reserved: boolean;

    @Prop() blocked: boolean;
 
    @Prop({type: ItemSchema}) item: IItem

    @Prop({type: ClothesSchema}) cat: IPersonalClothes

    @Prop() img: string
};

export const PersonalClothesSchema = SchemaFactory.createForClass(Personal_Clothes);
export type PersonalClothesDocument = HydratedDocument<Personal_Clothes>;
