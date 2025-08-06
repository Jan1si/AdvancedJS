export class AcademyStatistics {
    static #participants = new Map();
    
    static register(person){
        if (this.#participants.has(person.constructor.name)){
            this.#participants.set(person.constructor.name, this.#participants.get(person.constructor.name) + 1);
            return true;
        }
        this.#participants.set(person.constructor.name, 1);
        return true;
    }
    static report(){
        return this.#participants;
    }
}