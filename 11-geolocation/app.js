'use strict';

const getGeo = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((position) => {
        resolve(position.coords)
    }, (error) => {
        reject(new Error(`Нет прав на использование геолокации!\n${error.code} ${error.message}`))
    })
})

getGeo
    .then(position => {
        console.log(`Ширина: ${position.latitude}\nДолгота: ${position.longitude}`)
    })
    .catch(error => console.log(error))
    .finally(() => console.log('Координаты получены!'))