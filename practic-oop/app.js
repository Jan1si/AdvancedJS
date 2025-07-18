"use strict";


const Character = function(race, name, language, createAt){
    this.race = race;
    this.name = name;
    this.language = language;
    this.createAt = createAt;
}

Character.prototype.speak = function(){
    console.log(`${this.name} говорит на ${this.language}`);
}
Character.prototype.showAge = function(){
    const diffTime = Date.now() - this.createAt.getTime();
    const fullYear = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30.25 * 12));
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const yearsPluraKey = new Intl.PluralRules("ru-RU").select(fullYear);
    const daysPluraKey = new Intl.PluralRules("ru-RU").select(totalDays);
    const objPlurals = {
        one: {years: "год", days: "день"},
        few: {years: "года", days: "дня"},
        many: {years: "лет", days: "дней"}
    };
    
    console.log(`Персонажу ${fullYear} ${objPlurals[yearsPluraKey].years}, с момента создания персонажа прошло ${totalDays} ${objPlurals[daysPluraKey].days}`);
}
const newChar = new Character("human", "John", "English", new Date(2014, 11, 31));


const Wizard = function(race, name, language, createAt, magicLevel) {
    Character.call(this, race, name, language, createAt);
    this.magicLevel = magicLevel;
    this.listSpells = [];
}
Wizard.prototype = Object.create(Character.prototype);

Wizard.prototype.createNewMagicSpell = function(nameSpell){
    if (!this.listSpells.find(spell => spell == nameSpell)){
        this.listSpells.push(nameSpell);
        console.log(`${this.name} создал новое заклинание ${nameSpell}.\nВсе доступные заклинания ${this.listSpells.join(", ")}`);
        return;
    }
    console.log(`Заклинание "${nameSpell}" уже есть!`);
}

Wizard.prototype.castSpell = function(nameSpell) {
    if(!this.listSpells.find(spell => spell == nameSpell)){
        console.log(`${this.name} не знает такого заклининания!`);
    }
    console.log(`${this.name} использует заклинаение ${nameSpell} ${this.magicLevel} уровня!`);
}

const newWizard = new Wizard("Эльф", "Кель`тас", "Эльфийский", new Date(2018, 4, 2), 40);
newWizard.speak();
newWizard.createNewMagicSpell("Огненый шар");
newWizard.createNewMagicSpell("Леденая стрела");
newWizard.createNewMagicSpell("Снежная буря");
newWizard.createNewMagicSpell("Цепная молния");
newWizard.createNewMagicSpell("Огненый шар");
newWizard.castSpell("Огненый шар")