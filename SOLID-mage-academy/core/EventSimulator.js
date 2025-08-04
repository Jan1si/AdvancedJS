
import { IEventSimulator } from "../interfaces/IEventSimulator.js";

export class EventSimulator extends IEventSimulator{
    #interval;
    #logger
    constructor(logger){
        super();
        this.#logger = logger;
    }

    start(event){
        if (this.#interval){
            throw new Error('Этот класс уже обрабатывает событие!');
        } 
        event.setStartTime();
        this.#logger.logStart(event);
        this.#logger.logParticipants(event);
    }

    end(event){
        this.#logger.logEnd(event);
        clearInterval(this.#interval);
        this.#interval = null;
    }
    
    simulate(event){
        if (!event.startAt){
            throw new Error('Вы не начали событие! Вызовите метод "start()" чтобы начать событие!');
        }
        const durationInMs = event.durationMin * 60 * 1000;
        let totalTimeEvent = (event.startAt + durationInMs) - event.startAt;
        
        this.#interval = setInterval(() => {        
            totalTimeEvent -= 1000;
            if(totalTimeEvent <= 0){
                clearInterval(this.#interval);
                this.end(event);
                return ;
            }
            console.log(`Осталось ${new Intl.DateTimeFormat('ru-RU', {minute: 'numeric', second:'numeric'}).format(totalTimeEvent)}`);
        }, 1000);
    }
}