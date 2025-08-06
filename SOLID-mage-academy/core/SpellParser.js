export class SpellParser {
    #regEx = new RegExp(/(\w+)\((\d)\)/g);
    #spellObjArray = [];
    parse(string){
        let mathString = this.#regEx.exec(string);
        while(mathString !== null){
            this.#spellObjArray[mathString[1]] = mathString[2];
            mathString = this.#regEx.exec(string);
        }
        return this.#spellObjArray;
    }

    format(objectSpells){
        const spellStrArray = objectSpells.reduce((spellsArray, item) => {
            spellsArray.push(`${item.name}(${item.level})`);
            return spellsArray;
        }, []);
        return spellStrArray.join(', ');
    }
}