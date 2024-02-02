import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { BookmarkService } from '../../../services/bookmark/bookmark.service';

@Controller('bookmarks')
export class BookmarksController {

    constructor(private bookmarkService: BookmarkService) {}

    @Post()
    set(@Body() dto): Promise<any> {
        return this.bookmarkService.set(dto)
    };

    @Get()
    get(@Query('id') id: string): Promise<any> {
        return this.bookmarkService.getById(id)
    };

    @Get()
    getAll(@Query('userId') userId: string): Promise<any> {
        return this.bookmarkService.getAllByUserId(userId)
    };

    @Delete()
    delete(@Query('id') id: string): Promise<any> {
        return this.bookmarkService.deleteById(id)
    };

    @Delete()
    deleteAll(@Query('userId') userId: string): Promise<any> {
        return this.bookmarkService.deleteAllByUserId(userId)
    };

}
