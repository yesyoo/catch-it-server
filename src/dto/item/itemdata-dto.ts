import { IItemState } from 'src/interfaces/items';

export class ItemDataDto implements IItemState {
    show: boolean
    reserved: boolean
    blocked: boolean
    
    constructor() {
        this.show = true
        this.reserved = false
        this.blocked = false
    };
};