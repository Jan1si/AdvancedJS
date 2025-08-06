
import { IEventBehavior } from "../interfaces/IEventBehavior.js";

export class Event extends IEventBehavior{
    title;
    #startAt;
    #durationMin;
    #participants;
    constructor(title, durationMin){
        super();
        if (new.target === Event) {
            throw new Error("Вы пытаетесь создать абстрактынй класс Event!")
        }
        this.title = title;
        this.#durationMin = durationMin;
        this.#participants = new Set();
    }

    get participants(){ return this.#participants };
    get durationMin(){ return this.#durationMin };
    get startAt(){ return this.#startAt };
    setStartTime(){ this.#startAt = Date.now() };
}
