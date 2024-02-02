import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';
import { IBookmark } from 'src/interfaces/bookmark';


@Schema()
export class Bookmark implements IBookmark {

    @Prop() userId: string
 
    @Prop() itemId: string

    @Prop() collection: string

}

export const BookmarkSchema = SchemaFactory.createForClass(Bookmark);
export type BookmarkDocument = HydratedDocument<Bookmark>;