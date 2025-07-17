"use strict";

const Character = function(race, name, language) {
    this.race = race;
    this.name = name;
    this.language = language;
}

Character.prototype.talk = function() {
    console.log(`Меня зовут ${this.name} я говорю на ${this.language} языке`);
}

const character = new Character("Человек", "Астольфо", "Человеческий");
character.talk();

const Ork = function(race, name, language, weapon) {
    Character.call(this, race, name, language)
    this.weapon = weapon;
}
// наследование прототипа Персонажа прототипу Орка
Ork.prototype = Object.create(Character.prototype);
Ork.prototype.punch = function(enemy) {
    console.log(`${this.name} наносит удар своим ${this.weapon} по персонажу ${enemy.name}`);
}

const ork = new Ork("Орк", "Тралл", "Орочий", "Топор");
ork.talk();
ork.punch(character)

const Elf = function(race, name, language, spell) {
    Character.call(this, race, name, language);
    this.spells = [];
}
// наследование прототипа Персонажа прототипу Эльф
Elf.prototype = Object.create(Character.prototype);
Elf.prototype.createSpell = function(nameSpell) {
    if (this.spells.find(spell => spell == nameSpell)){
        console.log("Такое заклинание уже есть");
        return;
    }
    this.spells.push(nameSpell);
    console.log(`${this.name} создал заклинание ${nameSpell}`)
    console.log(`Все доступные заклинания ${this.spells.join(', ')}`);
    
}
Elf.prototype.castSpell = function(selectSpell, enemy) {
    if (!this.spells.find(spell => spell == selectSpell)) {
        console.log(`У ${this.name} нет такого заклинания`);
        return;
    }
    console.log(`${this.name} использует заклинание ${selectSpell} по персонажу ${enemy.name}`);
    
}
const elf = new Elf("Эльф", "Крутой эльф", "Эльфийский", "Снежная буря");

elf.talk();
elf.createSpell("Огненый шар");

elf.createSpell("Снежная буря")
elf.createSpell("Цепная молния")
elf.createSpell("Огненый шар");

elf.castSpell("Огненый шар", ork);