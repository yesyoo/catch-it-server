export interface IItemBookmark {
    _id?: string,
    userId: string,
    itemId: string,
    collection: string,
    title: string
}
export interface IUserListItem {
    id: string;
    collection: string
}
export interface IUserListItemAccess extends IUserListItem {
    show: boolean
}