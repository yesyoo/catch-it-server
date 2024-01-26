import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ItemSchema } from '../item-schema';
import { ClothesSize, ClothesType, Color, Gender, IPersonalClothes, IItem, IItemState, Season } from 'src/interfaces/items';
import { ItemStateSchema } from '../item-state.schema';



@Schema({_id: false})
export class Clothes implements IPersonalClothes {

    @Prop() type: ClothesType

    @Prop() size: ClothesSize

    @Prop() season: Season

    @Prop() color: Color

    @Prop() gender: Gender

    @Prop() age: string
};

export const ClothesSchema = SchemaFactory.createForClass(Clothes);

@Schema()
export class Personal_Clothes {
  
    @Prop() userId: string
 
    @Prop() dealType: string

    @Prop() subcategoryType: string
    
    @Prop({type: ItemStateSchema}) itemState: IItemState
 
    @Prop({type: ItemSchema}) itemProp: IItem

    @Prop({type: ClothesSchema}) categoryProp: IPersonalClothes
};

export const PersonalClothesSchema = SchemaFactory.createForClass(Personal_Clothes);
export type PersonalClothesDocument = HydratedDocument<Personal_Clothes>;
