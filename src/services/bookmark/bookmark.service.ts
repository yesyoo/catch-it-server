import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item_bookmark, ItemBookmarkDocument } from 'src/schemas/bookmarks/bookmarks-schema';
import { IItemBookmark } from '../../interfaces/bookmark';
import { ItemBookmarkDto } from '../../dto/bookmark/bookmark-dto';


@Injectable()
export class BookmarkService {
    constructor(@InjectModel(Item_bookmark.name) private bookmarkModel: Model<ItemBookmarkDocument>) {}

    async createBookmark(dto: IItemBookmark): Promise<any> {
        const bookmarkItem = new ItemBookmarkDto(dto.user, dto.item, dto.collection, dto.title)
        return new this.bookmarkModel(bookmarkItem).save()
    };

    async getAllByUserId(id: string): Promise<any> {
        return await this.bookmarkModel.find({user: id})
    };

    async deleteOneByItemId(data: any): Promise<any> {
        return await this.bookmarkModel.findOneAndDelete({user: data.userId, item: data.itemId})
    };

    async deleteAllByUserId(id: string): Promise<any> {
        return await this.bookmarkModel.deleteMany({user: id})
    };
}
