'use strict';

export class IEventLogger {
    static logParticipants(event){
         throw new Error('Метод "logParticipants" должен быть реализован!')
    }

    static logStart(event) {
        throw new Error('Метод "logStart" должен быть реализован!')
    }

    static logEnd(event){
         throw new Error('Метод "logEnd" должен быть реализован!')
    }
}