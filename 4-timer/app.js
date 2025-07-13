const monthsEl = document.getElementById("months");
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

const now = new Date();
const nextYear = now.getFullYear() + 1;
const nextYearDate = new Date(nextYear, 0, 1);

const diffTime = nextYearDate.getTime() - now.getTime();

const pluraDate =  new Intl.PluralRules('ru-RU');

const getCountMonth = (target) => {
    let currentDate = new Date();
    let targetDate = new Date(target);
    let month = 0;

    while (currentDate < targetDate){
        currentDate.setMonth(currentDate.getMonth() + 1);
        if (currentDate > targetDate){
            break
        }
        month += 1;
    }
     
     return month;   
}

const calcDate = (currentDate, nextYearDate) => {
    
    const now = currentDate;
    const months = getCountMonth(nextYearDate);
    
    const dateAfterAddingMouth = new Date(now);
    dateAfterAddingMouth.setMonth(now.getMonth() + months);
    
    let diffTime = nextYearDate.getTime() - dateAfterAddingMouth.getTime();
    
    const days = Math.floor(diffTime / (24 * 60 * 60 * 1000));
    diffTime -= days * (24 * 60 * 60 * 1000);
    const hours = Math.floor(diffTime / (60 * 60 * 1000));
    diffTime -= hours * (60 * 60 * 1000);
    const minutes = Math.floor(diffTime / (60 * 1000));
    diffTime -= minutes * (60 * 1000);
    const seconds = Math.floor(diffTime / 1000);
    
    return {months, days, hours, minutes, seconds};
    
}


const getLabelDate = (date, label) => {
    const plura = pluraDate.select(date);
    const labelsObj = {
        month: {one: "месяц", few: "месяца", many: "месяцев"},
        day: {one: "день", few: "дня", many: "дней"},
        hour: {one: "час", few: "часа", many: "часов"},
        minute: {one: "минута", few: "минуты", many: "минут"},
        second: {one: "секунда", few: "секунды", many: "секунд"}
    }
    return labelsObj[label][plura];
}

const render = () => {
    const {months, days, hours, minutes, seconds} = calcDate(new Date(), nextYearDate);
    monthsEl.textContent = `${months} ${getLabelDate(months, "month")}, ` ;
    daysEl.textContent = `${days} ${getLabelDate(days, "day")}, `;
    hoursEl.textContent = `${hours} ${getLabelDate(hours, "hour")}, `;
    minutesEl.textContent = `${minutes} ${getLabelDate(minutes, "minute")}, `;
    secondsEl.textContent = `${seconds} ${getLabelDate(seconds, 'second')}`;
}

render();
const interval = setInterval(() => {
    if (Date.now() >= nextYearDate.getTime()){
        clearInterval(interval);
        alert("С новым годом!!!🎄")
    } 
    render();
}, 1000);
