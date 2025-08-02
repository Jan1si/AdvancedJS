'use strict';

import { Person } from "../../core/Person.js";


export class Teacher extends Person{
    #students;
    #event;
    constructor(name, age){
        super(name, age);
        this.studyPass = false;
        this.role = 'Учитель';
        this.#students = new Map();
    }

    get students(){
        return [...this.#students.values()].map(s => s.name);
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