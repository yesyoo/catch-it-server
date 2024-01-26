import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';
import { ItemSchema } from '../item-schema';
import { Color, IItem, ShoesSize, ShoesType, IPersonalShoes, IItemState, Season, Gender } from 'src/interfaces/items';
import { ItemStateSchema } from '../item-state.schema';


@Schema({_id: false})
export class Shoes implements IPersonalShoes {

    @Prop() type: ShoesType

    @Prop() size: ShoesSize

    @Prop() season: Season

    @Prop() color: Color

    @Prop() gender: Gender

    @Prop() age: string
};

export const ShoesSchema = SchemaFactory.createForClass(Shoes);

@Schema()
export class Personal_Shoes {

    @Prop() userId: string
 
    @Prop() dealType: string

    @Prop() subcategoryType: string

    @Prop({type: ItemStateSchema}) itemState: IItemState
 
    @Prop({type: ItemSchema}) itemProp: IItem

    @Prop({type: ShoesSchema}) categoryProp: IPersonalShoes
};

export const PersonalShoesSchema = SchemaFactory.createForClass(Personal_Shoes);
export type PersonalShoesDocument = HydratedDocument<Personal_Shoes>;