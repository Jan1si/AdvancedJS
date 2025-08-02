'use strict'

export class IEventSimulator {
    start(event){
        throw new Error('Метод "start" должен быть реализован!');
    }
    end(event){
        throw new Error('Метод "end" должен быть реализован!');
    }
    simulate(event){
        throw new Error('Метод "simulate" должен быть реализован!');
    }
}