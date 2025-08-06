import { StatusEffect } from "../../core/StatusEffect.js";

export class Hungry extends StatusEffect{
    #hungredPersons;
    constructor(){
        super();
        this.#hungredPersons = new WeakSet();
    }

    apply(person){
        if (this.#hungredPersons.has(person)){
            throw new Error('Этот человек уже имеет статус "Голоден"');
        }
        this.#hungredPersons.add(person);
        return true;
    }

    has(person){
        return [person.name, person.role, `Статус голоден - ${this.#hungredPersons.has(person)}`] ;
    }
}