export class Storage {
    constructor(){
        if (new.target === Storage){
            throw new Error("Вы пытаетесь создать абстрактынй класс Storage!");
        }
    }
    giveItem(person, item){
        throw new Error('Метод "addParticipant" должен быть реализован!');
    }
    getItems(){
        throw new Error('Метод "addParticipant" должен быть реализован!');
    }
}