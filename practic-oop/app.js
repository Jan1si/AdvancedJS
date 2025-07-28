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
// newWizard.speak();
// newWizard.createNewMagicSpell("Огненый шар");
// newWizard.createNewMagicSpell("Леденая стрела");
// newWizard.createNewMagicSpell("Снежная буря");
// newWizard.createNewMagicSpell("Цепная молния");
// newWizard.createNewMagicSpell("Огненый шар");
// newWizard.castSpell("Огненый шар")

const Warrior = function(race, name, language, createAt, weapon, strength){
    Character.call(this, race, name, language, createAt);
    this.weapon = weapon;
    this.strength = strength;
}
Warrior.prototype = Object.create(Character.prototype);

Warrior.prototype.attack = function(){
        console.log(`${this.name} атакует оружием ${this.weapon} с силой в ${this.strength} единиц!`);
}
Warrior.prototype.train = function(hours){
        const ratio = Number.parseFloat((Math.random() * 0.9 - 0.1).toFixed(2));
        const bonusStrength = Number.parseFloat((this.strength * ratio) * hours);
        this.strength = Number.parseInt(this.strength) + bonusStrength;
        const hoursPluraKey = new Intl.PluralRules("ru-RU").select(hours);
        const objPlurals = { one: {hours: "час"}, few: {hours: "часа"}, many: {hours: "часов"} }
        console.log(`${this.name} тренировался ${hours} ${objPlurals[hoursPluraKey].hours} и увеличил свою силу до ${this.strength}`);
}

const newWarrior = new Warrior("Орк", "Тралл", "Орочий", new Date(2020, 6, 1), "Топор", "40");

// newWarrior.attack();
// newWarrior.train(10);
// newWarrior.speak();
// newWarrior.showAge();
// newWarrior.attack();

const Merchant = function(race, name, language, createAt, gold, tradeLevel){
    Character.call(this, race, name, language, createAt);
    this.inventory = [];
    this.gold = gold;
    this.tradeLevel = tradeLevel;
}
Merchant.prototype = Object.create(Character.prototype);
/// доделать !!!
Merchant.prototype.sell = function(sellingItem){
    const foundItem = this.inventory.find(item => item.name == sellingItem);
    
    if (!foundItem){
        console.log(`Товара ${sellingItem} у вас нет!`);
        return;
    }

    const calcSellPrice = Math.round(foundItem.price + (foundItem.price * (this.tradeLevel / 100)));

    if (foundItem.count <= 1){
        this.inventory = this.inventory.filter(item => item.name !== sellingItem);
    }

    foundItem.count -= 1;
    this.gold += calcSellPrice;

    console.log(`Вы продали предмет ${sellingItem} по цене ${calcSellPrice} ваше текущее золото ${this.gold}`);
    
}

Merchant.prototype.buy = function(buyingItem, price){
    const calcBuyPrice = Math.round(price - (price * (this.tradeLevel / 100)));
    if(!this.inventory.find(yourItem => yourItem.name == buyingItem)){
        if (this.gold >= calcBuyPrice) {
            this.inventory.push({name: buyingItem, count: 1, price: price});
            this.gold = Number.parseInt(this.gold) - calcBuyPrice;
            console.log(`Вы преобрели товар ${buyingItem} по цене с учётом навыка ${calcBuyPrice}. Ваше золото:${this.gold}`);
        } else {
            console.log(`Недостаточно денег! Ваш баланс ${this.gold} золота, цена товара ${buyingItem} с учётом навыка равна ${calcBuyPrice} золота`);
        }
        return;
    } 
    this.inventory.map(item => {
        if (item.name == buyingItem) {
            if (this.gold >= price){
                item.count += 1;
                this.gold = Number.parseInt(this.gold) - calcBuyPrice;
                console.log(`Такой предмет у вас есть ${buyingItem}, увелививаю его колличесво, теперь их ${item.count}. У вас осталось ${this.gold} золота!`);
            } else {
                console.log(`Недостаточно денег! Ваш баланс ${this.gold} золота, цена товара ${buyingItem} равна ${calcBuyPrice} золота!`);
            }
        }
    });
}
Merchant.prototype.showInventory = function(){
    if (!this.inventory.length) {
        console.log("Нет товаров!");
    }
    for (const item of this.inventory){
        for (const key in item) {
            console.log(`${key} - ${item[key]}`);
        }
    }
}

const newMerchant = new Merchant("Человек", "Томас", "Русский", new Date(2006, 2, 12), 1000, 5);

// newMerchant.showInventory();
// newMerchant.buy("Яблоко", 5);
// newMerchant.buy("Яблоко", 5);
// newMerchant.buy("Яблоко", 5);
// newMerchant.buy("Яблоко", 5);
// newMerchant.buy("Меч", 55);
// newMerchant.buy("Алмаз", 5500);
// newMerchant.showInventory();
// console.log("---------");
// newMerchant.sell("Меч");
// newMerchant.sell("Груша");

// newMerchant.sell("Яблоко");
// newMerchant.sell("Яблоко");

// newMerchant.showInventory();

const Traveler = function(race, name, language, createAt){
    Character.call(this, race, name, language, createAt);
    this.visitedPlaces = [];
}
Traveler.prototype = Object.create(Character.prototype);

Traveler.prototype.visit = function(place, date) {
    const formatedDate = new Intl.DateTimeFormat("ru-RU", {
        year: "numeric",
        month:"long",
        day: "numeric",
        hour:"numeric",
        minute:"numeric"
    }).format(date);
    this.visitedPlaces.push({place: place, date: formatedDate});
}

Traveler.prototype.showTravelHistory = function(){
    for (const item of this.visitedPlaces){
        console.log(`${this.name} ${item.date} посещал ${item.place}.`);
    }
}

const newTraveler = new Traveler("Гном", "Сигвард", "Катаринский", new Date(2025, 1, 5));
newTraveler.speak();
newTraveler.showAge()
newTraveler.visit("Лордерон", new Date());
newTraveler.visit("Луносвет", new Date());
newTraveler.visit("Огриммар", new Date());
newTraveler.showTravelHistory();

const TimeKeeper = function(race, name, language, createAt){
    Character.call(this, race, name, language, createAt)
    this.timeStamps = [];
}
TimeKeeper.prototype = Object.create(Character.prototype);

TimeKeeper.prototype.markTime = function(){
    const now = new Date();
    this.timeStamps.push(now);
    console.log(`${this.name} установил временную метку в ${Intl.DateTimeFormat("ru-RU", {
        year: "numeric",
        month:"long",
        day: "numeric",
        hour:"numeric",
        minute:"numeric",
        second: "numeric"
    }).format(now)}`);
}

TimeKeeper.prototype.showTimeStamps = function() {
    for (const timeMark of this.timeStamps) {
        console.log(`Все временные метки ${new Intl.DateTimeFormat("ru-RU", {
            year: "numeric",
            month:"long",
            day: "numeric",
            hour:"numeric",
            minute:"numeric",
            second: "numeric"
        }).format(timeMark)}`);
    }
}

TimeKeeper.prototype.timeSinceLastMark = function(){
    const lastTimeMark = this.timeStamps[this.timeStamps.length - 1]
    const now = new Date();
    const diffTime = now.getTime() - new Date(`${lastTimeMark}`);
    const totalPassSeconds = Math.floor(diffTime / 1000);
    const secondPluraKey = new Intl.PluralRules("ru-RU").select(totalPassSeconds);
    const objPlurals = {
        one: {second: "секунда"},
        few: {second: "секунды"},
        many: {second: "секунд"}
    };
    console.log(`С последней созданной метки прошло ${totalPassSeconds} ${objPlurals[secondPluraKey].second}`);
}

const newTimeKeeper = new TimeKeeper("Человек", "Игорь", "Испанский", new Date(2017, 8, 10));
let time = 4000;
newTimeKeeper.speak();

const interval = setInterval(() => {
    time -= 1000;
    newTimeKeeper.markTime();
    if (time <= 0){
        clearInterval(interval);
        newTimeKeeper.showTimeStamps();
        setTimeout(() => {
            newTimeKeeper.timeSinceLastMark();
        },5000);
    }
}, 2000);



