import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Condition, Delivery, IItem } from "src/interfaces/items"

@Schema({_id: false})
export class Item implements IItem {
    
    @Prop() title: string

    @Prop() description: string

    @Prop() condition?: Condition

    @Prop() amount?: number

    @Prop() city: string

    @Prop() district: string

    @Prop() delivery?: Delivery

};

export const ItemSchema = SchemaFactory.createForClass(Item);