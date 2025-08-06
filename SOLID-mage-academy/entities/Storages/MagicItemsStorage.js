import { Storage } from "../../core/Storage.js";

export class MagicItemsStorage extends Storage{
    #items;
    constructor(){
        super();
        this.#items = new WeakMap();
    }
    giveItem(person, item){
        if (!this.#items.has(person)) {
            this.#items.set(person, [item]);
            return true;
        }
        const currentItems = this.#items.get(person);
        this.#items.set(person, [...currentItems, item]);
        return true;
    }
    getItems(person){
        return this.#items.get(person);
    }
}