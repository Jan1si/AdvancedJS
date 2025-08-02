'use strict';

import { IEventBehavior } from "./IEventBehavior.js";

export class Event extends IEventBehavior{
    title;
    #startAt;
    #durationMin;
    #participants;
    constructor(title, durationMin){
        if (new.target === Event) {
            throw new Error("Вы пытаетесь создать абстрактынй класс Person!")
        }
        super();
        this.title = title;
        this.#durationMin = durationMin;
        this.#participants = new Set();
    }

    get participants(){
        return this.#participants;
    }

    get durationMin(){
        return this.#durationMin;
    }

    get startAt(){
        return this.#startAt;
    }

    setStartTime(){
        this.#startAt = Date.now();
    }

    addParticipant(participant){
        if (this.#participants.has(participant)){
            throw new Error(`В событие ${this.title} уже есть ${participant.role} ${participant.name}`);
        }
        this.#participants.add(participant)
        console.log(`В событие ${this.title} был добавлен ${participant.role} ${participant.name}`);
    }

    removeParticipant(participant){
        if (!this.#participants.has(participant)){
            throw new Error(`В событие ${this.title} нет такого участника "${participant.role} ${participant.name}"`);
        }
        this.#participants.delete(participant);
        console.log(`Из события ${this.title} был удалён ${participant.role} ${participant.name}`);
    }

}
