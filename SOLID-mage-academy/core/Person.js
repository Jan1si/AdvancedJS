 
import { IPersonBehavior } from '../interfaces/IPersonBehavior.js'
import { AcademyStatistics } from '../static/AcademyStatistics.js';

export class Person extends IPersonBehavior{
    name;
    age;
    studyPass;
    role;
    #createdAt;
    #id;
    #notes;

    constructor(name, age) {
        if (new.target === Person) {
            throw new Error("Вы пытаетесь создать абстрактынй класс Person!")
        }
        super();
        this.name = name;
        this.age = age;
        this.#createdAt = new Date();
        this.#id = Math.random().toString(36).slice(2);
        this.#notes = [];    
        AcademyStatistics.register(this);
    }

    get id(){
        return this.#id;
    }
   
    addNote(note){
        if (typeof note !== "string"){
            return false;
        }
        this.#notes.push(note);
        return true;
    }
    getNotes() {
        return this.#notes;
    }
    describe(){
        return (`${this.role}\nИмя - ${this.name}\nВозраст - ${this.age}`);
    }
}