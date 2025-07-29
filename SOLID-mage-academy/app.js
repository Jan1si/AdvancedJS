'use strict';

class IPersonBehavior {
    constructor(){
        if (new.target === IPersonBehavior) {
            throw new Error("Вы пытаетесь создать абстрактынй класс IPersonBehavior!");
        }
    }
    speak(){
        throw new Error('Метод "speak" должен быть реализован!');
    }
    describe(){
        throw new Error('Метод "describe" должен быть реализован!');
    }
}
class Person extends IPersonBehavior{
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

class Student extends Person{
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

const student1 = new Student("Иван", 20);
const student2 = new Student("Степан", 17);
const student3 = new Student("Мария", 22);
const student4 = new Student("Светлана", 15);

class Guest extends Person {
    constructor(name, age){
        super(name, age);
        this.studyPass = false;
        this.role = 'Гость';
    }
     speak(){
        return (`Здравствуйте! Меня зовут ${this.name}, я пришёл как гость!`);
    }
}

const gues1 = new Guest("Игнат", 14);
const gues2 = new Guest("София", 12);

class Teacher extends Person{
    #students;
    #event;
    constructor(name, age){
        super(name, age);
        this.studyPass = false;
        this.role = 'Учитель';
        this.#students = new Map();
    }

    get students(){
        return [...this.#students.keys()];
    }

    addStudent(student){
        if (this.#students.has(student.name)){
            console.log(`Студент ${student.name} уже обучается у этого учителя!`);
            return false;
        }
        if (!student.studyPass){
            console.log(`У нас учатся только студенты академии!`);
            return false;
        }
        this.#students.set(student.name, student);
        return true;
    }

    removeStudent(student){
         if (this.#students.has(student.name)){
            this.#students.delete(student.name);
            return true;
        }
        console.log(`Такого студента ${student.name} нет у этого учителя!`);
        return false;
    }

    createEvent(event){
         if (!event){
            throw new Error('Вы не передали активность!')
         }
         
        this.#event = event;
        return true;
    }

    get event(){
        return this.#event;
    }

    speak(){
        return (`Здравствуйте! Меня зовут ${this.name}`);
    }
}


const teacher1 = new Teacher("Евгений", 34);
const teacher2 = new Teacher("Ксения", 40);

console.log(teacher1.speak());
console.log(teacher1.describe());
console.log(teacher2.speak());
console.log(teacher2.describe());

console.log(teacher1.addStudent(gues1));
console.log(teacher1.addStudent(gues2));
console.log(teacher1.addStudent(student1));
console.log(teacher1.addStudent(student2));
console.log(teacher1.students);

class Event {
    title;
    durationMin;
    #participants;
    #startedAt;
    constructor(title, durationMin){
        if (title === undefined || durationMin === undefined){
            throw new Error('Не заданы начальные свойства!')
        }
        this.title = title;
        this.durationMin = durationMin;
        this.#participants = new Set();
    }

    get participants(){
        return Array.from(this.#participants);
    }

    addParticipants(participant){
        this.#participants.add(participant);
        return true;
    }
    
    start(){
        console.log("start");
    }

    end(){
        console.log("end");
    }

    simulate(){}
}

class EventLogger{
    static startEvent(event){}
    static endEvent(event){}
}

console.log(teacher1.createEvent(new Event('Открытый урок', 1)));
teacher1.event.addParticipants(student1);
teacher1.event.addParticipants(student2);
teacher1.event.addParticipants(student3);
teacher1.event.addParticipants(gues1);
teacher1.event.addParticipants(gues2);
teacher1.event.start();
console.log(teacher1.event.participants);


