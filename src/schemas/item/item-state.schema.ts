import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { IItemState } from "src/interfaces/items"


@Schema({_id: false})
export class ItemState implements IItemState {
    
    @Prop() date: number;

    @Prop() show: boolean;

    @Prop() reserved: boolean;

    @Prop() blocked: boolean;
};

export const ItemStateSchema = SchemaFactory.createForClass(ItemState);