'use strict';

const selectForm = document.querySelector('#select-category');

const createSelect = (data) => {
    data.map(item => {
        const option = document.createElement('option');
        option.value = item.slug;
        option.innerText = item.name;
        selectForm.appendChild(option);
    })
} 

const getCategories = () => {
    fetch('https://dummyjson.com/products/categories')
        .then(response => response.json())
        .then(data => createSelect(data))
        .catch(error => console.log(error))
        .finally(() => console.log('Запрос выполнен!'));
}



getCategories()


