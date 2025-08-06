
import { Person } from "../../core/Person.js";


export class Teacher extends Person{
    #students;
    #events;
    constructor(name, age){
        super(name, age);
        this.studyPass = false;
        this.role = 'Учитель';
        this.#students = new Map();
        this.#events = [];
    }

    get students(){
        return [...this.#students.values()].map(s => s.name);
    }

    createEvent(event){
        this.#events.push(event);
    }

    getEvent(title){
        if (!this.#events.some(e => e.title === title)){
            throw new Error(`События ${title} нет в списке событий у учителя!`);
        }
        const event = this.#events.find(e => e.title === title);
        return event;
    }

    showEvents(){
        return this.#events.map(e => e.title);
    }

    addStudent(student){
        if (this.#students.has(student.id)){
            console.log(`Студент ${student.name} уже обучается у этого учителя!`);
            return false;
        }
        if (!student.studyPass){
            console.log(`У нас учатся только студенты академии!`);
            return false;
        }
        this.#students.set(student.id, student);
        return true;
    }

    removeStudent(student){
         if (this.#students.has(student.id)){
            this.#students.delete(student.id);
            return true;
        }
        console.log(`Такого студента ${student.name} нет у этого учителя!`);
        return false;
    }

    speak(){
        return (`Здравствуйте! Меня зовут ${this.name}`);
    }
}