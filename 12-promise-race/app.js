'use strict';

const p1 = new Promise((resolve) => {
    setTimeout(() => {
        resolve('ok 1');
    }, 2003)
});

const p2 = new Promise((resolve) => {
    setTimeout(() => {
        resolve('ok 2');
    }, 1002)
});

const p3 = new Promise((resolve) => {
    setTimeout(() => {
        resolve('ok 3');
    }, 1001)
});

const test1 = race([p1, p2, p3]);
const test2 = race([1, 2, p3]);
const test3 = race([]);
const test4 = race();
console.log(test1);
test1.then(res => console.log(res))

console.log(test2);
test2.then(res => console.log(res))

console.log(test3);
test3.then(res => console.log(res))

console.log(test4);
test4.then(res => console.log(res))


function race(array){
    if(!Array.isArray(array)) {
        return Promise.reject(new Error('argument not iterable'));
    }
    if (array.length === 0) {
        return new Promise(() => {});
    }
    return new Promise((resolve, reject) => {
        array.forEach(item => {
            const promise = Promise.resolve(item);
            promise
                .then(res => resolve(res))
                .catch(error => reject(error));
        });
    })
}



