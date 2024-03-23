import { IItemBookmark } from "src/interfaces/bookmark";

export class ItemBookmarkDto implements IItemBookmark {
    user: string;
    item: string;
    collection: string;
    title: string;
    constructor(user: string, item: string, collection: string, title: string) {
        this.user = user;
        this.item = item;
        this.collection = collection;
        this.title = title
    }
    
}

