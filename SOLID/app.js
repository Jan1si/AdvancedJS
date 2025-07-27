'use strict';

// S - Принцип единой ответственности (Single Responsibility Principle)

// class Character{
//     #inventory = [];
//     #health = 10;
//     pickItem(item){
//         this.#inventory.push(item);
//     }
//     recieveDamage(damage){
//         this.#health -= damage;
//     }
// }

// class DB{
//     save(){
//         localStorage.setItem('char', this);
//     }

//     load(){
//         // .... 
//     }
// }

// O - Принцип открытости и закрытости

// class Treacsure {
//     value = 1;
// }

// class Coin extends Treacsure {
//     value = 100;
// }

// class Crystal extends Treacsure {
//     value = 500;
// }

// class Gem extends Treacsure {
//     value = 1000;
// }

// class Inventory{
//     #score;
//     pick(treacsure){
//         this.#score += treacsure.value;
//     }
// }

// L - принцип Барбары Лисков

// class User {
//     #role = 'user';

//     getRole() {
//         return this.#role;
//     }

// }

// class Admin extends User {
//     #role = ['user', 'admin']

//     getRole() {
//         return this.#role.join(', ');
//     }
// }

// function logRole(user){
//     console.log(`Role - ${user.getRole().toUpperCase()}`);
// }

// logRole(new User());
// logRole(new Admin());

// I - принцип разделения интерфейса

// class Weapon {
//     cost;
//     damage;
//     constructor(cost, damage){
//         this.cost = cost;
//         this.damage = damage;
//     }
//     upgrades = [];

//     dealDamage() {

//     }
// }

// class Rifle extends Weapon {
//     constructor(cost, damage){
//         super(cost, damage);
//     }

//     shoot(){
//         console.log(`shoot rifle`);
//     }
// }
// class Sword extends Weapon {
//     constructor(cost, damage){
//         super(cost, damage);
//     }
//     strike(){
//         console.log(`strike sword`);
        
//     }
// }

// D - принцип инфесии зависимостей

class DB {
    save(items){
        console.log(`Save to DB: ${items}`)
    }
}

class MongoDb extends DB {
    save(items){
        console.log(`Save ro MongoDb: ${items}`);
        
    }
}

class ToDoList {
    items = [1, 2, 3];
    db;
    constructor(db) {
        this.db = db;
    }
    saveToDb() {
        return this.db.save(this.items);
    }
}

const todu1 = new ToDoList(new DB());
todu1.saveToDb();

const todu2 = new ToDoList(new MongoDb());
todu2.saveToDb();