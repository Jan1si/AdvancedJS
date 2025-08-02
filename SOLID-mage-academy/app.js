'use strict';

import { Teacher } from "./entities/Person/Teacher.js";
import { Student } from "./entities/Person/Student.js";
import { Guest } from "./entities/Person/Guest.js";
import { Event } from "./core/Event.js";
import { EventLogger } from "./core/EventLogger.js";
import { EventSimulator } from "./core/EventSimulator.js";

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
