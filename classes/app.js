'use strict';


class Person {
    #createAt;
    static #countPersone = 0;
    constructor(name, age){
        this.name = name;
        this.age = age;
        this.#createAt = new Date();
        Person.#countPersone++;
    };

    static get totalPerson(){
        return Person.#countPersone;
    }

    static isAdult(age) {
        return age >= 18;
    };

    get createAt(){
        const dateFormat = new Intl.DateTimeFormat('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: "numeric",
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        }).format(this.#createAt);
        
        return dateFormat;
    };

    #pluralFormatTime(num, select){
        const pluralObj = {
            one: {year: 'год', month: 'месяц', day: 'день', hour: 'час', minute: 'минута', second: 'секунда'},
            few: {year: 'года', month: 'месяца', day: 'дня', hour: 'часа', minute: 'минуты', second: 'секунды'},
            many:{year: 'лет', month: 'месяцев', day: 'дней', hour: 'часов', minute: 'минут', second: 'секунд'}
        }
        const pluraFormat = new Intl.PluralRules('ru-RU').select(num);
        return pluralObj[pluraFormat][select];
    };

    speak(){
        console.log(`Меня зовут ${this.name} мне ${this.age} ${this.#pluralFormatTime(this.age, 'year')} `);
    };

}

// Тестирование класса Person
const person = new Person('Ivan', 20);
console.log(person.createAt);
person.speak();
console.log(Person.isAdult(18));
console.log(Person.isAdult(17));
// Тестирование класса Person

class Student extends Person{
    #spells = new Set();

    constructor(name, age){
        super(name, age);
    };

    get spells(){
        return Array.from(this.#spells);
    };

    learnSpell(nameSpell){
        if(!this.#spells.has(nameSpell)){
            this.#spells.add(nameSpell);
            console.log(`${this.name} выучил новое заклинание "${nameSpell}"`);
            return;
        }
        console.log(`${this.name} уже знает это заклинане!`);
        return;
    };

    castSpell(nameSpell){
        if (!this.#spells.has(nameSpell)){
            console.log(`${this.name} не знает такого заклинания!`);
            return;
        }
        console.log(`${this.name} кастует заклинание ${nameSpell}!`);
        return;
    };

    speak(){
        super.speak();
        console.log('Я студент академии');
    };
}

//Тестирование класса Student
const student = new Student('Кирилл', 18);
const student2 = new Student('Мария', 17);
const student3 = new Student('Сергей', 19);
student.learnSpell('Огненный шар');
student.learnSpell('Огненный шар');
student.learnSpell('Цепная молния');
student.learnSpell('Снежная буря');
student2.learnSpell('Цепная молния');
student2.learnSpell('Снежная буря');
student.castSpell('Огненный шар');
student.castSpell('Ледяной шар');
student.speak();
//Тестирование класса Student

class Teacher extends Person{
    #students = new Map();

    constructor(name, age){
        super(name, age);
    };

    addStudent(student){
        if (!this.#students.has(student.name)){
            this.#students.set(student.name, student);
            console.log(`${this.name} обучает нового студента ${student.name}`);
            return;
        }
        console.log(`У ${this.name} уже есть ученик ${student.name}`);
        return;
    };

    listStudents(){
        this.#students.forEach(student => {
            const studentSpells = student.spells;
            if (studentSpells.length === 0){
                console.log(`Студент ${student.name} пока не знает заклинаний!`);
                return;
            };
            console.log(`Студент ${student.name} знает заклинания: ${studentSpells.join(", ")}`);
        });
    };

    exam(studentName){
        if (!this.#students.has(studentName)){
            console.log(`У учителя ${this.name} нет такого студента!`);
            return;
        };
        
        const foundStudent = this.#students.get(studentName);
        const spellsStudet = Array.from(foundStudent.spells);

        if (spellsStudet.length === 0){
            console.log(`Студент ${foundStudent.name} не знает заклинаний!`);
            return;
        }

        let attempt = 0;
        console.log('Начало экзамена!');

        const interval = setInterval(() => {
            const randomIndexSpell = Math.floor(Math.random() * spellsStudet.length);
            foundStudent.castSpell(spellsStudet[randomIndexSpell]);
            attempt += 1;
            if (attempt === 5) {
                console.log('Конец экзамена!');
                clearInterval(interval);
            } 
        }, 1000);
        
    }

    speak(){
        super.speak();
        console.log('Я преподаватель Академии!')
    }
}

// Тестирование класса Teacher
const teacher = new Teacher('Степан', 40);
teacher.addStudent(student);
teacher.addStudent(student2);
teacher.addStudent(student3);
teacher.addStudent(student);
teacher.listStudents();
teacher.speak();
teacher.exam('Кирилл');

console.log('____________________________');
console.log(Person.totalPerson);
console.log('____________________________');
// Тестирование класса Teacher