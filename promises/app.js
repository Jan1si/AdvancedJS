'use strict';

const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        if (Math.random() > 0.5) {
            resolve('Успех!');
        } else {
            reject('Ошибка!');
        }
    }, 2000);
})

myPromise
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    })
    .finally(() => {
        console.log('Промис отработал');
        
    });

const myPromise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        const randNum = Math.random();
        if (randNum > 0.5){
            resolve(randNum);
        } else {
            reject('Произошла ошибка! Число меньше 0.5');
        }
    }, 2000)
})

myPromise2
        .then((result) => {
            console.log(result);
            return Math.floor(result * 10);
        })
        .then((newResult) => {
            console.log(newResult);
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            console.log('Promise 2 отработал!'); 
        });

fetch('https://dummyjson.com/products/1')
    .then((response) => response.json())
    .then((data) => {
        console.log('Запрос продукта с id 1');
        console.log(data);
    });

fetch('https://dummyjson.com/products')
    .then((response) => response.json())
    .then((data) => {
        console.log('Запрос продукта с id 2');
        return data.products.find((item) => item.id === 2);
    })
    .then((product) => {
        console.log(product);
    });


fetch('https://dummyjson.com/products')
    .then(response => response.json())
    .then(({products}) => {
        return fetch('https://dummyjson.com/products/' + products[0].id);
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
