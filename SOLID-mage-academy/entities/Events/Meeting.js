import { Event } from "../../core/Event.js";

export class Meeting extends Event {
    constructor(title, durationMin){
        super(title, durationMin);
    }

    addParticipant(participant){
        if (this.participants.has(participant)){
            throw new Error(`В событие ${this.title} уже есть ${participant.role} ${participant.name}`);
        }
        this.participants.add(participant)
        console.log(`В событие ${this.title} был добавлен ${participant.role} ${participant.name}`);
    }

    removeParticipant(participant){
        if (!this.participants.has(participant)){
            throw new Error(`В событие ${this.title} нет такого участника "${participant.role} ${participant.name}"`);
        }
        this.participants.delete(participant);
        console.log(`Из события ${this.title} был удалён ${participant.role} ${participant.name}`);
    }
}

