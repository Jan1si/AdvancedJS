
import { IEventLogger } from '../interfaces/IEventLogger.js'

export class EventLogger extends IEventLogger{

    logParticipants(event){
        console.group('Участники события')
            console.log([...event.participants].map(p => p.name));
        console.groupEnd();
    }

    logStart(event) {
        console.group('Начало события');
            console.log(`Началось событие "${event.title}". Время на событие ${event.durationMin} мин`);
        console.groupEnd();
    }

    logEnd(event){
        console.group('Конец события');
            console.log(`Событие "${event.title}" завешилось`);
            const passTime = Date.now() - event.startAt;
            console.log(`Событие длилось ${new Intl.DateTimeFormat('ru-RU', {minute: 'numeric', second: 'numeric'}).format(passTime)}`);
        console.groupEnd()
    }
}