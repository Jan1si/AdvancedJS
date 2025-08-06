'use strict';

import { Teacher } from "./entities/Persons/Teacher.js";
import { Student } from "./entities/Persons/Student.js";
import { Guest } from "./entities/Persons/Guest.js";
import { Event } from "./core/Event.js";
import { EventLogger } from "./core/EventLogger.js";
import { EventSimulator } from "./core/EventSimulator.js";
import { Meeting } from "./entities/Events/Meeting.js";
import { Exam } from "./entities/Events/Exam.js";
import { MagicItemsStorage } from "./entities/Storages/MagicItemsStorage.js";
import { Hungry } from "./entities/StatusEffect/Hungry.js";
import {AcademyStatistics} from './static/AcademyStatistics.js';
import { SpellParser } from "./core/SpellParser.js";

const student1 = new Student("Иван", 20);
const student2 = new Student("Степан", 17);
const student3 = new Student("Мария", 22);
const student4 = new Student("Светлана", 15);


const gues1 = new Guest("Игнат", 14);
const gues2 = new Guest("София", 12);

const teacher1 = new Teacher("Евгений", 34);
const teacher2 = new Teacher("Ксения", 40);

console.log(teacher1.speak());
console.log(teacher1.describe());
console.log(teacher2.speak());
console.log(teacher2.describe());

console.log(teacher1.addStudent(gues1));
console.log(teacher1.addStudent(gues2));
console.log(teacher1.addStudent(student1));
console.log(teacher1.addStudent(student2));
console.log(teacher1.students);

console.log('---------------------------');
// const eventSimulator = new EventSimulator(new EventLogger());
// teacher1.createEvent(new Exam('exam1', .2));
// teacher1.createEvent(new Exam('exam2', .4));
// teacher1.createEvent(new Exam('exam3', .3));
// teacher1.createEvent(new Meeting('meeting1', .6));
// teacher1.createEvent(new Meeting('meeting2', .5));
// teacher1.createEvent(new Meeting('meeting3', .4));
// teacher1.getEvent('exam1').addParticipant(student1);
// teacher1.getEvent('exam1').addParticipant(student2);
// teacher1.getEvent('exam1').addParticipant(student3);
// eventSimulator.start(teacher1.getEvent('exam1'));
// eventSimulator.simulate(teacher1.getEvent('exam1'));

const stor = new MagicItemsStorage();

stor.giveItem(student1, 'pencil');
stor.giveItem(student1, 'pencil2');
stor.giveItem(student1, 'pencil3');
stor.giveItem(student2, 'pencil');

console.log(stor.getItems(student1));
console.log(stor.getItems(student2));


const status = new Hungry();

status.apply(student1);
status.apply(student2);
status.apply(gues1);

console.log(status.has(student1));
console.log(status.has(student3));
console.log(status.has(student2));
console.log(status.has(gues1));
console.log(status.has(gues2));

console.log(AcademyStatistics.report());


const string = "fireball(3) fireball(3) fireball(3)";
// while((math = pattern.exec(string)) !== null){
//     res.push({name: math[1], level: math[2]});
// }


const spellParser = new SpellParser();
console.log(spellParser.parse(string));
console.log(spellParser.format([{name: 'fireball', level: '3'}, {name: 'fireball', level: '3'}, {name: 'fireball', level: '3'}]));

// meeting1.addParticipant(student1);
// meeting1.addParticipant(student2);
// meeting1.addParticipant(gues1);
// meeting1.addParticipant(gues2);

// exam1.addParticipant(student1);
// exam1.addParticipant(student2);
// exam1.addParticipant(student3);
// exam1.addParticipant(student4);

// eventSimulator.start(exam1);
// eventSimulator.simulate(exam1);

// eventSimulator.start(meeting1);
// eventSimulator.simulate(meeting1);
// setTimeout(() => {
//     eventSimulator.end(meeting1);
// }, 2000);



// const event1 = new Event('event 1', .1);
// const event2 = new Event('event 2', .2);

// event1.addParticipant(student1);
// event1.addParticipant(student2);
// event1.addParticipant(student3);
// event1.addParticipant(student4);
// event1.removeParticipant(student2);
// event1.removeParticipant(student3);

// event2.addParticipant(student1);
// event2.addParticipant(student3);
// event2.addParticipant(gues1);
// event2.addParticipant(gues2);
// event2.removeParticipant(gues1);
// event2.removeParticipant(student3);

// const eventSimulator = new EventSimulator(new EventLogger());
// eventSimulator.start(event1);
// eventSimulator.simulate(event1);
