
import { Person } from "../../core/Person.js";

export class Student extends Person{
    #spells;
    constructor(name, age) {
        super(name, age);
        this.studyPass = true;
        this.role = 'Студент';
        this.#spells = new Set();
    }
    addSpell(nameSpell){
        if (!this.#spells.has(nameSpell)){
            console.log(`${this.role} ${this.name} изучил новое заклинание ${nameSpell}!`);
            this.#spells.add(nameSpell);
            return true;
        }
        console.log(`${this.role} ${this.name} уже знает это заклинание ${nameSpell}!`);
        return false;
    }
    get spells(){
        return Array.from(this.#spells);
    }
    speak(){
        return (`Привет! Меня зовут ${this.name}`);
    }
}