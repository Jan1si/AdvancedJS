'use strinct';
// интерфейсы репозиториев User и Book 
class InterfaceUserRepository{
    constructor() {
        if (new.target === InterfaceUserRepository){
            throw new Error('Class cannon be initialized')
        }
    }
    async registerUser(user){
        throw new Error('Method not implemented')
    }
}

class InterfaceBookRepository{
    constructor(){
        if (new.target === InterfaceBookRepository){
            throw new Error('Class cannon be initialized');
        }
    }

    async getBookByISBN(ISBN){
        throw new Error('Method not implemented')
    }

    async getAllBooks(){
        throw new Error('Method not implemented')
    }

    async addBook(book){
        throw new Error('Method not implemented')
    }
}

// классы для работы приложения 
class User{
    #userId;
    #name;
    constructor(name) {
        this.#userId = Math.random().toString(36).slice(2);
        this.#name = name
    }
    get userId(){
        return this.#userId;
    }
    get name(){
        return this.#name;
    }
}

class Book{
    #isbn;
    #name;
    #author;
    #genre;
    constructor(name, author, genre){
        this.#isbn = Math.random().toString(36).slice(2);
        this.#name = name;
        this.#author = author;
        this.#genre = genre;
    }
    get isbn(){
        return this.#isbn;
    }
}

class UserRepository extends InterfaceUserRepository{
    #users = new Map();

    async registerUser(user){
        if (!(user instanceof User)) {
            throw new Error('Invalid class')
        }
               
        if (Array.from(this.#users.keys()).includes(user.userId)){
            throw new Error('User already exists');
        }

        this.#users.set(user.userId, user);
        console.log(`User ${user.name} has be register`);
    }

    get users(){
        return Array.from(this.#users);
    }
}

class BookRepository extends InterfaceBookRepository{
    #books = new Map();

    async addBook(book) {
        if (!(book instanceof Book)) {
            throw new Error('Invalid class')
        }
        if (Array.from(this.#books.keys()).includes(book.isbn)) {
            throw new Error('Book already exists')
        }

        this.#books.set(book.isbn, book);
        console.log('Book has be added');   
    }

    get books() {
        return Array.from(this.#books);
    }
}

// класс бизнесс логики
class LibraryServise{
    /*
        1. свойства которые выступают в качестве кэша
            books (map)
            categories (set)
        2. свойства для работы класса 
            repoBook - передоваемый в конструктор экземпляр класса BookRepository
            repoUser - передоваемый в конструктор экземпляр класса UserRepository
        3. методы
            если в репозитории есть данные, нужно их получить обратившись к репозиторию и загрузить в кэш, для этого
            нужно создать статический асинхронный метод create() который будет вызывать приватный асинхронный метод метод initCache()
            метод addBook() - добавляет данные в кэш и репозиторий
            метод getBook() - выводит книгу по id
            метод getBooksByCategory() - выводит книги указанной категории 
            метод placeOrder() - создаёт заказ удаляет из кэша и репозитория книгу и выводит 
    */
}

// статичный класс для сбора статистики
class Stat{}