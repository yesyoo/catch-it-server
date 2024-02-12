import { IItemBookmark } from "src/interfaces/bookmark";

export class ItemBookmarkDto implements IItemBookmark {
    userId: string;
    itemId: string;
    collection: string;
    title: string;
    constructor(userId: string, itemId: string, collection: string, title: string) {
        this.userId = userId;
        this.itemId = itemId;
        this.collection = collection;
        this.title = title
    }
}

