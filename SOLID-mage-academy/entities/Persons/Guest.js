import { Person } from "../../core/Person.js";

export class Guest extends Person {
    constructor(name, age){
        super(name, age);
        this.studyPass = false;
        this.role = 'Гость';
    }
     speak(){
        return (`Здравствуйте! Меня зовут ${this.name}, я пришёл как гость!`);
    }
}