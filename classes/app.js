'use strict';

class Person {
    #createAt
    constructor(name, age, createAt){
        this.name = name;
        this.age = age;
        this.#createAt = createAt;
    }
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
    }
    #pluralFormatTime(num, select){
        const pluralObj = {
            one: {year: 'год', month: 'месяц', day: 'день', hour: 'час', minute: 'минута', second: 'секунда'},
            few: {year: 'года', month: 'месяца', day: 'дня', hour: 'часа', minute: 'минуты', second: 'секунды'},
            many:{year: 'лет', month: 'месяцев', day: 'дней', hour: 'часов', minute: 'минут', second: 'секунд'}
        }
        const pluraFormat = new Intl.PluralRules('ru-RU').select(num);
        return pluralObj[pluraFormat][select];
    }
    speak(){
        console.log(`Меня зовут ${this.name} мне ${this.age} ${this.#pluralFormatTime(this.age, 'year')} `);
    }
    static isAdult(age) {
        return age >= 18;
    }
}

// Тестирование класса Person
const person = new Person('Ivan', 20, new Date());
console.log(person.createAt);
person.speak();
console.log(Person.isAdult(18));
console.log(Person.isAdult(17));
// Тестирование класса Person

class Student extends Person{
    #spells = new Set();
    constructor(name, age, createAt){
        super(name, age, createAt);
    }
    learnSpell(nameSpell){
        if(!this.#spells.has(nameSpell)){
            this.#spells.add(nameSpell);
            return `${this.name} выучил новое заклинание "${nameSpell}"`;
        }
        return `${this.name} уже знает это заклинане!`;
    }

    castSpell(nameSpell){
        if (!this.#spells.has(nameSpell)){
            return `${this.name} не знает такого заклинания!`
        }
        return `${this.name} кастует заклинание ${nameSpell}!`
    }
    speak(){
        super.speak();
        console.log('Я студент академии');
    }
}

//Тестирование класса Student
const student = new Student('Кирилл', 18, new Date());
console.log(student.learnSpell('Огненный шар'));
console.log(student.learnSpell('Огненный шар'));
console.log(student.castSpell('Огненный шар'));
console.log(student.castSpell('Ледяной шар'));
student.speak();
//Тестирование класса Student