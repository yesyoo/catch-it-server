import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';
import { IItemBookmark } from 'src/interfaces/bookmark';


@Schema()
export class ItemBookmark implements IItemBookmark {

    @Prop() userId: string
 
    @Prop() itemId: string

    @Prop() collection: string

    @Prop() title: string

}

export const ItemBookmarkSchema = SchemaFactory.createForClass(ItemBookmark);
export type ItemBookmarkDocument = HydratedDocument<ItemBookmark>;