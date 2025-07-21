"use strict";

class Car {
    #mark;
    #model;
    #run;
    constructor(mark, model, run) {
        this.#mark = mark;
        this.#model = model;
        this.#run = run;
    }
    get run() {
        return this.#run;
    }
    set run(newRun) {
        return this.#run = newRun;
    }
    info() {
        return `Марка - ${this.#mark}, Модель - ${this.#model}, Пробег - ${this.#run} км`;
    }

}

const car1 = new Car("Toyota", "Camry", 100);
console.log(car1.run);
car1.run = 50;
console.log(car1.run);
console.log(car1.info());


