'use strict';

function checkOld(birthdayUser){
    const birthday = new Date(birthdayUser);
    const now = new Date();
    const old = (now.getTime() - birthday.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
    if (old < 14) {
        return false;
    }
    return true;
}

console.log(checkOld("2022-01-01"));
