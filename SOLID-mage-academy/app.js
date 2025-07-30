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

class IEventBehavior{
    constructor(){
        if (new.target === IEventBehavior){
            throw new Error("Вы пытаетесь создать абстрактынй класс IEventBehavior!");
        }
    }
    start(){
        throw new Error('Метод "start" должен быть реализован!')
    }
    simulate(){
        throw new Error('Метод "simulate" должен быть реализован!');
    }
    end(){
        throw new Error('Метод "end" должен быть реализован!');
    }
    addParticipant(){
        throw new Error('Метод "addParticipant" должен быть реализован!');
    }
    logParticipant(){
        throw new Error('Метод "logParticipant" должен быть реализован!');
    }
}

class EventLogger{
    static logStart(event) {
        console.group();
            console.log(`Началось событие "${event.title}". Время на событие ${event.duracionMin} мин`);
            console.group();
                console.log('Список участников события:');
                [...event.logParticipant()].forEach(p => {
                    console.log(p + ';');
                });
            console.groupEnd()
        console.groupEnd();
    }

    static logEnd(event){
        console.group();
            console.log(`Событие "${event.title}" завешилось`);
            const passTime = Date.now() - event.startedAt;
            console.log(`Событие длилось ${new Intl.DateTimeFormat('ru-RU', {minute: 'numeric', second: 'numeric'}).format(passTime)}`);
        console.groupEnd()
    }
}

class Event extends IEventBehavior{
    #title;
    #duracionMin;
    #participants = new Set();
    #isPrivate;
    #startedAt;
    #interval;
    #timeout;
    constructor(title, duracionMin){
        if (new.target === Event) {
            throw new Error("Вы пытаетесь создать абстрактынй класс Person!")
        }
        super();
        this.#title = title;
        this.#duracionMin = duracionMin;
    }

    get title(){
        return this.#title
    };

    get duracionMin(){
        return this.#duracionMin
    };

    get startedAt(){
        return this.#startedAt
    };

    addParticipant(person){
        if (this.#isPrivate) {
            if (!person.studyPass){
                console.log(`Это событие только для студентов!`);
                return false;
            }
        }
        this.#participants.add(person);
        return true;
    }

    logParticipant(){
        return [...this.#participants].map(p => {            
            return p.name;
        });
    }

    start(){
        this.#startedAt = Date.now();
        EventLogger.logStart(this);
    }

    end(){
        clearInterval(this.#interval);
        clearTimeout(this.#timeout);
        EventLogger.logEnd(this);
    }

    simulate() {

        if (!this.#startedAt){
            console.log(`Вы не начали событие! Вызовите метод "start()" чтобы начать событие!`);
            return false;
        }

        let diffTime = this.#startedAt + (this.#duracionMin * 60 * 1000) - this.#startedAt;

        this.#interval = setInterval(() => {
            diffTime -= 1000;
            console.log(`осталось ${new Intl.DateTimeFormat('ru-RU', {minute: 'numeric', second:'numeric'}).format(diffTime)}`);
        }, 1000);

        this.#timeout = setTimeout(() => {
            this.end();
        }, 1000 * 60 * this.#duracionMin); 
    
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

console.log('---------------------------');
// const event1 = new Event('event 1', 5);
// event1.addParticipant(student1);
// event1.addParticipant(gues1);
// event1.start();
// event1.simulate();
// event1.end();
class StudyClass extends Event {
    constructor(title, duracionMin){
        super(title, duracionMin);
        
    }
}

class Meeting extends Event {

}

