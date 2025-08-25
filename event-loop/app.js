'use strict';

// console.log('start');

// setTimeout(() => {
//     console.log('time out');
// }, 0)

// Promise.resolve('promise').then((res) => {
//     for (let i = 0; i < 1000000000; i ++){

//     }
//     console.log(res);
    
// })

// for (let i = 0; i < 10000000000; i ++){

// }
// console.log('end');


// const myPromise = new Promise((resolve) => {
//     console.log('Constructor');
//     setTimeout(() => {
//         resolve('Timer')
//     }, 1000)
// });
// myPromise.then(data => console.log(data));
// Promise.resolve('Success').then(data => console.log(data));


// Promise.resolve(1)
//     .then(res => {
//         console.log(res);
//         return Promise.resolve(res+1);
//     })
//     .then(res => {
//         console.log(res);
//         return Promise.resolve(res + 1);
//     })
//     .then(res => {
//         console.log(res);
//         return Promise.resolve(res + 1);
//     })
//     .then(res => {
//         console.log(res);
//     })


// function wait(sec){
//     const {resolve, reject, promise} = Promise.withResolvers();
//     setTimeout(() => {
//         resolve();
//     }, sec * 1000);
//     return promise;
// }

// async function run(){
//     console.log('start');
//     await(wait(3));
//     console.log('end');
// }

// run();


// class Queue {
//     #messages = [];
//     #resolve;
//     #reject;
//     #promise;
//     constructor() {
//         const {resolve, reject, promise} = Promise.withResolvers();
//         this.#resolve = resolve;
//         this.#reject = reject;
//         this.#promise = promise;
//     }

//     add(message){
//         this.#messages.push(message);
//         return this;
//     }

//     close() {
//         return this.#resolve(this.#messages);
//     }

//     subscribe(){
//         return this.#promise;
//     }

//     error(reason){
//         return this.#reject(reason);
//     }
// }

// const queue = new Queue();

// const sub1 = queue.subscribe();
// const sub2 = queue.subscribe();

// sub1.then(data => console.log(data)).catch(error => console.error(error));
// sub2.then(data => console.log(data)).catch(error => console.error(error));

// queue.add('msg1').add('msg2').add('msg3').error('error ');

// function myFetch(url, options = {}) {
//     const {
//         method = 'GET',
//         body = null,
//         headers = {},
//         async = true
//     } = options;

//     return new Promise((resolve) => {
//         const request = new XMLHttpRequest();

//         request.open(method, url, async);

//         for (const [key, value] of Object.entries(headers)) {
//             request.setRequestHeader(key, value);    
//         } 
        
//         request.addEventListener('load', function() {
//             if (request.status >= 200 && request.status < 300 || request.status === 304) {
//                 resolve(request.responseText);
//             } else {
//                 reject(new Error(`Request error status code: ${request.status}`));
//             }
//         });

//         request.addEventListener('error', function(){
//             reject(new Error(`Network error`))
//         });

//         request.addEventListener('timeout', function() {
//             reject(new Error('Timeout'))
//         })

//         if (body && ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())) {
//             request.send(body);
//         } else {
//             request.send();
//         }
        
//     });
// }

// myFetch('https://jsonplaceholder.typicode.com/todosы')
//     .then(data => {
//         console.log(data);
//         return myFetch('https://jsonplaceholder.typicode.com/todos/1');
//     })
//     .then(data => console.log(data))
//     .catch(error => console.log(error));

    

function timer(sec){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('timeout')
        }, sec * 1000);
    })
}

timer(1).then(data => console.log(data));