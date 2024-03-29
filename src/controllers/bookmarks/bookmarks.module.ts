import { Module } from '@nestjs/common';
import { BookmarksController } from './bookmarks/bookmarks.controller';
import { BookmarkService } from '../../services/bookmark/bookmark.service';

import { MongooseModule } from '@nestjs/mongoose';
import { Item_bookmark, ItemBookmarkSchema } from 'src/schemas/bookmarks/bookmarks-schema';

@Module({
  controllers: [BookmarksController],
  imports: [
    MongooseModule.forFeature([{name: Item_bookmark.name, schema: ItemBookmarkSchema}])
  ],
  providers: [BookmarkService]
})
export class BookmarksModule {}
