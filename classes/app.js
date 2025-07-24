'use strict';

class Person {
    #createAt

    constructor(name, age, createAt){
        this.name = name;
        this.age = age;
        this.#createAt = createAt;
    };

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
    };

    get spells(){
        return Array.from(this.#spells);
    };

    learnSpell(nameSpell){
        if(!this.#spells.has(nameSpell)){
            this.#spells.add(nameSpell);
            return `${this.name} выучил новое заклинание "${nameSpell}"`;
        }
        return `${this.name} уже знает это заклинане!`;
    };

    castSpell(nameSpell){
        if (!this.#spells.has(nameSpell)){
            return `${this.name} не знает такого заклинания!`
        }
        return `${this.name} кастует заклинание ${nameSpell}!`
    };

    speak(){
        super.speak();
        console.log('Я студент академии');
    };
}

//Тестирование класса Student
const student = new Student('Кирилл', 18, new Date());
const student2 = new Student('Мария', 17, new Date());
const student3 = new Student('Сергей', 19, new Date());
console.log(student.learnSpell('Огненный шар'));
console.log(student.learnSpell('Огненный шар'));
console.log(student.learnSpell('Цепная молния'));
console.log(student.learnSpell('Снежная буря'));
console.log(student2.learnSpell('Цепная молния'));
console.log(student2.learnSpell('Снежная буря'));
console.log(student.castSpell('Огненный шар'));
console.log(student.castSpell('Ледяной шар'));
student.speak();
//Тестирование класса Student

class Teacher extends Person{
    #students = new Map();

    constructor(name, age, createAt){
        super(name, age, createAt);
    };

    addStudent(student){
        if (!this.#students.has(student.name)){
            this.#students.set(student.name, student);
            return `${this.name} обучает нового студента ${student.name}`;
        }
        return `У ${this.name} уже есть ученик ${student.name}`;
    };

    listStudents(){
        this.#students.forEach(student => {
            const studentSpells = student.spells;
            if (studentSpells.length === 0){
                console.log(`Студент ${student.name} пока не знает заклинаний!`);
                return;
            }
            console.log(`Студент ${student.name} знает заклинания: ${studentSpells.join(", ")}`);
        });
    };
    speak(){
        super.speak();
        console.log('Я преподователь Академии!')
    }
}

// Тестирование класса Teacher
const teacher = new Teacher('Степан', 40, new Date());
console.log(teacher.addStudent(student));
console.log(teacher.addStudent(student2));
console.log(teacher.addStudent(student3));
console.log(teacher.addStudent(student));
teacher.listStudents();
teacher.speak();
// Тестирование класса Teacher