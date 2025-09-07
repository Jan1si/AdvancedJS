'use strinct';

const btnGetActivity = document.getElementById('get-activity');
const inputCount = document.getElementById('input-count');

const listCards = document.querySelector('.list-activity');
let countCards = Number(inputCount.value);

inputCount.addEventListener('change', (event) => {
    if (Number(event.target.value) <= 0) {
        event.target.value = 0;
    }
    countCards = Number(event.target.value);
})

btnGetActivity.addEventListener('click', async () => {
    listCards.innerHTML = ''
    const activities = await Promise.all(new Array(countCards).fill(0).map((e) => fetchActivity()))
    activities.forEach(({activity, type}) => {
        listCards.appendChild(createCard(activity, type));
    })
});

const createCard = (activity, type) => {

    const cardActivity = document.createElement('li');
    cardActivity.className = 'card-activity';

    const typeActivity = document.createElement('h3');
    typeActivity.className = 'type-activity'
    typeActivity.innerText = type;

    const textActivity = document.createElement('p');
    textActivity.className = 'text-activity';
    textActivity.innerText = activity;

    cardActivity.append(typeActivity);
    cardActivity.append(textActivity);

    return cardActivity;
}

const fetchActivity = async () => {
    try {
        const response = await fetch('https://bored.api.lewagon.com/api/activity');
        const data = await response.json()
        return data;
    } catch (error) {
        throw new Error(error);
    }
}


