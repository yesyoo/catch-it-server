import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bookmark, BookmarkDocument } from 'src/schemas/bookmarks/bookmarks-schema';


@Injectable()
export class BookmarkService {
    constructor(@InjectModel(Bookmark.name) private bookmarkModel: Model<BookmarkDocument>) {}

    async set(data: any): Promise<any> {
        const bookmark = await new this.bookmarkModel(data)
        bookmark.save()
    };

    async getAllByUserId(userId: any): Promise<any> {
        
        return await this.bookmarkModel.find(userId)
    };

    async getById(id: string): Promise<any> {

        return await this.bookmarkModel.findById(id)
    };

    async deleteById(id: string): Promise<any> {

        return await this.bookmarkModel.deleteOne({_id: id})
    };

    async deleteAllByUserId(userId: string): Promise<any> {

        return await this.bookmarkModel.deleteMany({userId: userId})
    };
}
