import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { BookmarkService } from '../../../services/bookmark/bookmark.service';
import { ItemBookmarkDto } from '../../../dto/bookmark/bookmark-dto';

@Controller('bookmarks')
export class BookmarksController {

    constructor(private bookmarkService: BookmarkService) {}

    @Post()
    create(@Body() dto: ItemBookmarkDto): Promise<any> {
        return this.bookmarkService.createBookmark(dto)
    };

    @Get('get-all/:id')
    getAll(@Param('id') id: string): Promise<any> {
        return this.bookmarkService.getAllByUserId(id)
    };

    @Delete('delete-one')
    deleteOne(@Query() params: any): Promise<any> {
        return this.bookmarkService.deleteOneByItemId(params)
    };
 
    @Delete('delete-all/:id')
    deleteAll(@Param('id') id: string): Promise<any> {
        return this.bookmarkService.deleteAllByUserId(id)
    };

}
