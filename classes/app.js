// class User {

//     #firstName;
    
//     #lastName;
    
    
//     set firstName(fname){
    
//     return this.#firstName = fname;
    
//     }
    
//     set lastName(lname){
    
//     return this.#lastName = lname;
    
//     }
    
//     get fullName(){
    
//     return this.#firstName + this.#lastName;
    
    
//     }
    
//     }

//     const user = new User();
//     user.firstName = "Имя";
//     user.lastName = "Фамилия"
//     console.log(user.fullName);
    
class Example{
    static #count = 0;

    static increment() {
        Example.#count++;
    }
    static getCount(){
        return Example.#count;
    }
}
Example.increment();
Example.increment();
Example.increment();

console.log(Example.getCount());
