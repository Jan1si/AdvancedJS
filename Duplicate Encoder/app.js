'use strict';

/*
The goal of this exercise is to convert a string to a new string where each 
character in the new string is "(" if that character appears only once in 
the original string, or ")" if that character appears more than once in the original string. 
Ignore capitalization when determining if a character is a duplicate.

Examples
"din"      =>  "((("
"recede"   =>  "()()()"
"Success"  =>  ")())())"
"(( @"     =>  "))((" 
*/

function duplicateEncode(word){
    const chars = word.toLowerCase().split("");
    const countChars = chars.reduce((acc, char) => {
        console.log(acc[char] || 0);
        
        acc[char] = (acc[char] || 0) + 1;
        return acc;
    }, {});
    return chars.map(char => countChars[char] > 1 ? ")" : "(" ).join("");
    
}

console.log(duplicateEncode("din"));
console.log(duplicateEncode("recede"));
console.log(duplicateEncode("Success")); 
console.log(duplicateEncode("(( @")); 