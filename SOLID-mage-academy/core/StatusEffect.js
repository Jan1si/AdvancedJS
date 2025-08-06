
export class StatusEffect {
    constructor(){
        if (new.target === StatusEffect) {
            throw new Error('Вы пытаетесь создать абстрактынй класс StatusEffect!')
        }
    }
    apply(person){
        throw new Error('Метод "apply" должен быть реализован!');
    }
    has(person){
        throw new Error('Метод "has" должен быть реализован!');
    }
}