'use strict';

const userCart1  = {id: 1, name:'product 1', count:1}
const userCart2  = {id: 2, name:'product 2', count:1}


const Cart = function() {
    this.products = [];
}

Cart.prototype.addProduct = function(data) {
    const existing = this.products.find(item => item.id == data.id);
    console.log(existing);
    
    if (existing) {
        existing.count += data.count;
        return;
    }
    this.products.push(data);
}

Cart.prototype.increaseAmount = function(id){
    this.products = this.products.map((product) => {
        if (product.id == id){
            product.count ++;
            return product;
        }
        return product;
    })
}

Cart.prototype.decreaseAmount = function(id){
    this.products = this.products.map((product) => {
        if (product.id == id){
            product.count --;
            return product;
        }
        return product;
    }).filter((product) => product.count > 0);
}

const cart1 = new Cart();
cart1.addProduct(userCart1); 
cart1.addProduct(userCart1); 
cart1.addProduct(userCart2); 
console.log(cart1);
cart1.increaseAmount(1);
cart1.decreaseAmount(1);
cart1.decreaseAmount(1);
cart1.decreaseAmount(1);

console.log(cart1);





