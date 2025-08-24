'use strict';


function getData(url, errorHandler){
    return fetch(url)
        .then(response => {
            errorHandler('Is error: ', response);
            return response.json();
        })
}

function errorHandler(erorrText, response){
    if (!response.ok) {
        throw new Error(erorrText + response.status);
    }
}

getData('https://dummyjson.com/products', errorHandler)
    .then(({ products }) => {
        return getData('https://dummyjson.com/products/' + products[0].id, errorHandler);
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => console.log(error));