'use strict';

class Character{
    #health;
    constructor(name, race, language) {
        this.name = name;
        this.race = race;
        this.language = language;
        this.#health = 100;
    }

    get health(){
        return this.#health;
    }
    recivedDamage(damage){
        this.#health = this.#health - damage;
    }

    speak(){
        console.log(`Меня зовут ${this.name}, я ${this.race}, я говорю на ${this.language} языке`);
    }
}

class Ork extends Character{
    constructor(name, race, language, weapon){
        super(name, race, language);
        this.weapon = weapon;
    }
    attack(enemy){
        enemy.recivedDamage(10);
        console.log(`${this.race} ${this.name} атакует ${enemy.race} ${enemy.name} и наности 10 урона. Здоровье ${enemy.name} - ${enemy.health}HP`);
    }

    speak(){
        const normalSpeach = `Меня зовут ${this.name}, я ${this.race}, я говорю на ${this.language} языке`.toLowerCase();
        const orkSpeach = Array.from(normalSpeach).reduce((acc, item, index) => {
            if (index % 2 == 0){
                acc += item.toUpperCase();  
            } else {
                acc += item;
            }
            return acc
        }, "");
        console.log(orkSpeach);
    }

}

const ork1 = new Ork('Орк подкастер', 'Орк', 'Орочий', 'Топор');
const ork2 = new Ork('Рексар', 'Орк', 'Орочий', 'Молот');

ork1.attack(ork2);
ork1.speak();

class Elf extends Character{
    #spells
    constructor(name, race, language){
        super(name, race, language);
        this.#spells = new Set();
    }

    createSpell(nameSpell){
        if (!this.#spells.has(nameSpell)) {
            this.#spells.add(nameSpell);
            console.log(`${this.race} ${this.name} создал новое заклинание "${nameSpell}"!`);
            return;
        }
        console.log(`У ${this.race} ${this.name} уже есть заклинание "${nameSpell}"!`);
    }
    castSpell(nameSpell, enemy){
        if (!this.#spells.has(nameSpell)) {
            console.log(`У ${this.race} ${this.name} нет такого заклинания "${nameSpell}"!`);
            return;
        }
        enemy.recivedDamage(15);
        console.log(`${this.race} ${this.name} использует заклинание "${nameSpell}" на ${enemy.race} ${enemy.name} и наности 15 урона. Здоровье ${enemy.name} - ${enemy.health}HP`);
    }
    speak(){
        const normalSpeach = `Меня зовут ${this.name}, я ${this.race}, я говорю на ${this.language} языке`.toLowerCase();
        const elfSpeach = Array.from(normalSpeach).reduce((acc, item, index) => {
            if (index % 6 == 0){
                acc += item.toUpperCase();  
            } else {
                acc += item;
            }
            return acc
        }, "");
        console.log(elfSpeach);
    }
}

const elf1 = new Elf('Кель`Тас', 'Эльф', 'Эльфийский');
const elf2 = new Elf('Фурион', 'Эльф', 'Эльфийский');
elf1.createSpell('Огненный шар');
elf1.createSpell('Огненный шар');
elf1.castSpell('Огненный шар', ork2);
elf1.castSpell('Огненный шар1', ork2);
elf1.speak();