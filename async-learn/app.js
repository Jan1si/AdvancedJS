'use strinct';

// fetch('https://jsonplaceholder.typicode.com/todos/1')
//     .then(res => res.json())
//     .then(data => console.log(data))


// async function getData() {
//     try {
//         const res = await fetch('https://jsonplaceholder.typicode.com/todos/2');

//         if (!res.ok){
//             throw new Error(res.status);
//         }

//         const data = await res.json()
//         console.log(data);
    
//         const res2 = await fetch('https://jsonplaceholder.typicode.com/todos/3');

//         if (!res2.ok){
//             throw new Error(res.status);
//         }

//         const data2 = await res2.json();
//         console.log(data2);
//     } catch(e) {
//         throw new Error(e);
//     } finally {
//         console.log('finally')
//     }
    
    
// }

// getData()

import { config } from "./config.js";

function getMyPosition() {
    return new Promise(( resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            ( { coords } ) => {
                resolve({
                    latitude: coords.latitude,
                    longitude: coords.longitude
                });
            },
            (error) => {
                reject(error);
            }
        )
    })
}


async function getMyCityByPosition(){
    try{
        const { latitude, longitude } = await getMyPosition();
        const response = await fetch(`https://catalog.api.2gis.com/3.0/items/geocode?lat=${latitude}&lon=${longitude}&fields=items.point&key=${config.API_KEY}`);

        if (!response.ok) {
            throw new Error(response.status)
        }
        const data = await response.json();
        
        console.log(data.result.items[0].full_name);
    } catch (error) {
        console.error(`${error} Не удалось получить данные!`)
    }
}

getMyCityByPosition()