const montsEl = document.getElementById("monts");
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");


console.log([montsEl, daysEl, hoursEl, minutesEl, secondsEl]);

const nextYearTime = new Date(2026).getTime();

const setViewTime = (timeFinish) => {
    montsEl.textContent = `${Intl.DateTimeFormat('ru-RU', {
            month: 'numeric'
        }).format(timeFinish - new Date().getTime())} месяцев,`;
    daysEl.textContent = `${Intl.DateTimeFormat('ru-RU', {
            day: 'numeric'
        }).format(timeFinish - new Date().getTime())} дней,`;
    hoursEl.textContent = `${Intl.DateTimeFormat('ru-RU', {
            hour: 'numeric'
        }).format(timeFinish - new Date().getTime())} часов,`;
    minutesEl.textContent = `${Intl.DateTimeFormat('ru-RU', {
            minute: 'numeric'
        }).format(timeFinish - new Date().getTime())} минут,`;
    secondsEl.textContent = `${Intl.DateTimeFormat('ru-RU', {
            second: 'numeric'
        }).format(timeFinish - new Date().getTime())} секунд,`;
}

setViewTime(nextYearTime);
const interval = setInterval(() => {
    setViewTime(nextYearTime);
}, 1000);

