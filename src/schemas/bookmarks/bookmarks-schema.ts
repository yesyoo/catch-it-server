import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IItemBookmark } from 'src/interfaces/bookmark';


@Schema()
export class Item_bookmark implements IItemBookmark {

    @Prop() user: string
 
    @Prop() item: string

    @Prop() collection: string

    @Prop() title: string

}

export const ItemBookmarkSchema = SchemaFactory.createForClass(Item_bookmark);
export type ItemBookmarkDocument = HydratedDocument<Item_bookmark>;