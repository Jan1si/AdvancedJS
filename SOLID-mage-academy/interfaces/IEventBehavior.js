
export class IEventBehavior{
    constructor(){
        if (new.target === IEventBehavior){
            throw new Error("Вы пытаетесь создать абстрактынй класс IEventBehavior!");
        }
    }
    
    addParticipant(){
        throw new Error('Метод "addParticipant" должен быть реализован!');
    }

    removeParticipant(){
        throw new Error('Метод "removeParticipant" должен быть реализован!');
    }

}