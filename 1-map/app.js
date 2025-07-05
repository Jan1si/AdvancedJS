'use strict';

const peoples = [
    {id: 1, name: "Вася"},
    {id: 2, name: "Петя"},
    {id: 1, name: "Вася"}
];

const setId = new Set(peoples.map((item) => item.id))
const result = [...setId].map((id) => {
    return peoples.find((item) => item.id === id);
});

console.log(result);

