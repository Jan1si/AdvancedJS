const monthsEl = document.getElementById("monts");
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

const now = new Date();
const nextYear = now.getFullYear() + 1;
const nextYearDate = new Date(nextYear, 0, 1);

const diffTime = nextYearDate.getTime() - now.getTime();

const getCountMonth = (target) => {
    let currentDate = new Date();
    let targetDate = new Date(target);
    let month = 0;

    while (currentDate < targetDate){
        currentDate.setMonth(currentDate.getMonth() + 1);
        if (currentDate <= targetDate){
            month += 1;
        }
    }
     
     return month;   
}

const calcDate = (nextYearDate) => {
    const months = getCountMonth(nextYearDate);
    const now = new Date();
        
    now.setMonth(now.getMonth() + months);
    
    let diffTime = nextYearDate.getTime() - now.getTime();
    
    const days = Math.floor(diffTime / (24 * 60 * 60 * 1000));
    diffTime -= days * (24 * 60 * 60 * 1000);
    const hours = Math.floor(diffTime / (60 * 60 * 1000));
    diffTime -= hours * (60 * 60 * 1000);
    const minutes = Math.floor(diffTime / (60 * 1000));
    diffTime -= minutes * (60 * 1000);
    const seconds = Math.floor(diffTime / 1000);
    
    console.log(months, days, hours, minutes, seconds);
    
}

// # реалиовать рендер с плдпиской по колличеству временной величины (месяц - месяцев)

calcDate(nextYearDate)


