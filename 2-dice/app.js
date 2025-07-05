const randomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log(randomNum(1, 5));

const dropDice = (dice) => {
    const diceNum = Number.parseInt(dice.split('d').join(''));
    return randomNum(1, diceNum)
}

console.log(dropDice("d4"));
console.log(dropDice("d6"));
console.log(dropDice("d8"));
console.log(dropDice("d10"));
console.log(dropDice("d12"));
console.log(dropDice("d16"));
console.log(dropDice("d20"));