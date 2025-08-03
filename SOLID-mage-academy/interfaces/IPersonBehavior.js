
export class IPersonBehavior {
    constructor(){
        if (new.target === IPersonBehavior) {
            throw new Error("Вы пытаетесь создать абстрактынй класс IPersonBehavior!");
        }
    }
    speak(){
        throw new Error('Метод "speak" должен быть реализован!');
    }
    describe(){
        throw new Error('Метод "describe" должен быть реализован!');
    }
}