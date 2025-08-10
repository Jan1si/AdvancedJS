'use strict';

function calcAveragePrice() {
    const request = new XMLHttpRequest();
    request.open('GET', 'https://dummyjson.com/products');
    request.send();
    request.addEventListener('load', async function(){
        const { products } = JSON.parse(this.response);
        const count = products.length;
        const totalSum = products.reduce((totalSum, currentPrice) => {
            return totalSum += currentPrice.price;
        }, 0);
        const averageSum = Math.round(totalSum / count).toFixed(2);
        console.log(averageSum);
        
        
    });
}

calcAveragePrice();
