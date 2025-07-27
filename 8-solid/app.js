'use strict';

class Billing{
    constructor(amount){
        this.amount = amount;
    }
    calculateTotal(){}
}

class FixBilling extends Billing{
    constructor(amount){
        super(amount);
    }
    calculateTotal(){
        return this.amount;
    }
}

class HourBilling extends Billing{
    constructor(amount, hours){
        super(amount);
        this.hours = hours;
    }
    calculateTotal(){
        return this.amount * this.hours;
    }
}

class ItemBilling extends Billing{
    constructor(amount, countItems){
        super(amount);
        this.countItems = countItems;
    }
    calculateTotal(){
        return this.amount * this.countItems;
    }
}

const test1 = new FixBilling(100);
console.log(test1.calculateTotal());
const test2 = new HourBilling(100, 12);
console.log(test2.calculateTotal());

const test3 = new ItemBilling(50, 22);
console.log(test3.calculateTotal());