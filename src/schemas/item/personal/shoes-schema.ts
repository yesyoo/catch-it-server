import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ItemSchema } from '../item-schema';
import { Color, IItem, ShoesSize, ShoesType, IPersonalShoes, Season, Gender } from 'src/interfaces/items';

@Schema({_id: false})
export class Shoes implements IPersonalShoes {

    @Prop() type: ShoesType

    @Prop() size: ShoesSize

    @Prop() season: Season

    @Prop() color: Color

    @Prop() gender: Gender

    @Prop() adult: boolean
};

export const ShoesSchema = SchemaFactory.createForClass(Shoes);

@Schema()
export class Personal_Shoes {

    @Prop() user: string

    @Prop() collection: string
 
    @Prop() category: string

    @Prop() deal: string

    @Prop() date: number;

    @Prop() show: boolean;

    @Prop() reserved: boolean;

    @Prop() blocked: boolean;
 
    @Prop({type: ItemSchema}) item: IItem

    @Prop({type: ShoesSchema}) cat: IPersonalShoes

    @Prop() img: string
};

export const PersonalShoesSchema = SchemaFactory.createForClass(Personal_Shoes);
export type PersonalShoesDocument = HydratedDocument<Personal_Shoes>;