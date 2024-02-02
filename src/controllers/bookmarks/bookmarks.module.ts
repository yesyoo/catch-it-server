import { Module } from '@nestjs/common';
import { BookmarksController } from './bookmarks/bookmarks.controller';
import { BookmarkService } from '../../services/bookmark/bookmark.service';

import { MongooseModule } from '@nestjs/mongoose';
import { Bookmark, BookmarkSchema } from 'src/schemas/bookmarks/bookmarks-schema';

@Module({
  controllers: [BookmarksController],
  imports: [
    MongooseModule.forFeature([{name: Bookmark.name, schema: BookmarkSchema}])
  ],
  providers: [BookmarkService]
})
export class BookmarksModule {}
