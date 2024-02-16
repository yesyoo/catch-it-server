import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ItemBookmark, ItemBookmarkDocument } from 'src/schemas/bookmarks/bookmarks-schema';
import { IItemBookmark } from '../../interfaces/bookmark';
import { ItemBookmarkDto } from '../../dto/bookmark/bookmark-dto';


@Injectable()
export class BookmarkService {
    constructor(@InjectModel(ItemBookmark.name) private bookmarkModel: Model<ItemBookmarkDocument>) {}

    async createBookmark(dto: IItemBookmark): Promise<any> {
        const bookmarkItem = new ItemBookmarkDto(dto.userId, dto.itemId, dto.collection, dto.title)
        return new this.bookmarkModel(bookmarkItem).save()
    };

    async getAllByUserId(id: string): Promise<any> {
        return await this.bookmarkModel.find({userId: id})
    };

    async deleteOneByItemId(data: any): Promise<any> {
        return await this.bookmarkModel.findOneAndDelete({userId: data.userId, itemId: data.itemId})
    };

    async deleteAllByUserId(id: string): Promise<any> {
        return await this.bookmarkModel.deleteMany({userId: id})
    };
}
