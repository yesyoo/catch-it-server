export interface IItemBookmark {
    _id?: string,
    user: string,
    item: string,
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