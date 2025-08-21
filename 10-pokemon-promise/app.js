'use strict';

const url = 'https://pokeapi.co/api/v2/pokemon/ditto';

function getData(url, errorMessage){
    return fetch(url)
        .then(response => {
            if (!response.ok){
                throw new Error(`${errorMessage} Status code: ${response.status}`);
            }
            
            return response.json();
        });
}

getData(url, 'Error witch URL')
    .then(({ abilities }) => {
        return getData(abilities[0].ability.url, 'Error with url for ability');
    })
    .then(({ effect_entries }) => {
        console.log(effect_entries[1].effect);
    })
    .catch(error => console.log(error))
    .finally(() => console.log('Запрос выполнен!'))