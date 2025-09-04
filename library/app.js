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

    async getBookByISBN(isbn){
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
    name;
    author;
    genre;
    #isAvailable;
    constructor(name, author, genre){
        this.#isbn = Math.random().toString(36).slice(2);
        this.name = name;
        this.author = author;
        this.genre = genre;
        this.#isAvailable = true;
    }
    get isbn(){
        return this.#isbn;
    }
    get isAvailable(){
        return this.#isAvailable;
    }
    set isAvailable(boolean){
        this.#isAvailable = boolean;
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

    async getBookByISBN(isbn) {
        return this.#books.get(isbn) || null;
    }

    async getAllBooks(){
        return this.#books
    }
}

// класс бизнесс логики
class LibraryServise{
    #booksCache;
    #genres;
    #authors;
    #repoBook;
    #repoUser;
    constructor(repoBook, repoUser){
        this.#booksCache = new Map();
        this.#genres = new Set();
        this.#authors = new Set();
        this.#repoBook = repoBook;
        this.#repoUser = repoUser;
    }
    static async create(repoBook, repoUser){
        const service = new LibraryServise(repoBook, repoUser);
        await service.#initCache();
        return service;
    }

    async #initCache(){
        try {
            const books = await this.#repoBook.getAllBooks();
            books.forEach((book) => {
                this.#booksCache.set(book.isbn, book);
                this.#parseBookDetails(book);
            });
            console.log(`Cache initialized with ${this.#booksCache.size} books and ${this.#genres.size} genres`);
        } catch (error) {
            throw new Error(`Fail initialized Cache ${error}`);
        }
    }

    async #parseBookDetails(book){
        this.#authors.add(book.author);
        this.#genres.add(book.genre);
    }

    async #updataData(){
        const books = await this.#repoBook.getAllBooks();
        for(const [key, value] of books){
            if (!this.#booksCache.has(key)) {
                this.#booksCache.set(key, value);
                this.#parseBookDetails(value);
            } 
        }
    }

    async addBook(name, author, genre){
        return new Promise((resolve, reject) => {        
            setTimeout(async () => {
                try {                
                    const book = new Book(name, author, genre);
                    await this.#repoBook.addBook(book);
                    this.#booksCache.set(book.isbn, book);
                    this.#parseBookDetails(book);
                    console.log(`Book ${name} added`);
                    resolve(book);
                } catch (error) {
                    reject(error);
                }
            }, 1000)
        })
    }

    async getBookByISBN(isbn){
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    let book = this.#booksCache.get(isbn);
                    if (!book) {
                        book = await this.#repoBook.getBookByISBN(isbn);
                        if (book) {
                            this.#booksCache.set(isbn, book);
                            this.#parseBookDetails(book);
                        }
                    }
                    if (!book){
                        reject(new Error(`Book with ISBN ${isbn} not found`));
                    }
                    resolve(book);
                } catch(error) {
                    reject(error)
                }
            }, 1000);
        })
    }

    async getBooksByGenres(genre){
        return new Promise((resolve, reject) => {

            setTimeout(async () => {
                try{
                    if (!this.#genres.has(genre)){
                        this.#updataData();
                        if (!this.#genres.has(genre)){
                            resolve([]);
                        }
                    }
                    resolve(Array.from(this.#booksCache.values()).filter((book) => book.genre === genre));
                } catch(error) {
                    reject(error);
                }
            }, 1000);
        })
    }

    async getBooksByAuthor(author){
        return new Promise((resolve, reject) => {

            setTimeout(async () => {
                try{
                    if (!this.#authors.has(author)){
                        this.#updataData();
                        if (!this.#authors.has(author)){
                            resolve([]);
                        }
                    }
                    resolve(Array.from(this.#booksCache.values()).filter((book) => book.author === author));
                } catch(error) {
                    reject(error);
                }
            }, 1000);
        })
    }

    async placeOrder(book, user) {
        try {
            if (!book.isAvailable){
                throw new Error(`Book "${book.name}" is not available`)
            }
            book.isAvailable = false;
            console.log(`Order placed for user ${user.name}: ${book.name}`);
            return {user: user.name, book: book.name}
        } catch (error){
            throw new Error(error);
        }
    }
}

(async () => {
    const bookRepo = new BookRepository();
    const userRepo = new UserRepository();

    const book1 = new Book('The Hobbit', 'John Ronald Reuel Tolkien', 'Fantasy');
    const book2 = new Book('Dune', 'Frank Herbert', 'Sci-Fi');

    const user1 = new User('Bob');
    const user2 = new User('Chack');

    userRepo.registerUser(user1);

    await bookRepo.addBook(book1);
    await bookRepo.addBook(book2);

    try {
        const library = LibraryServise.create(bookRepo, userRepo);
        (await library).getBooksByGenres('Fantasy').then(response => console.log(response));
        (await library).getBooksByAuthor('Frank Herbert').then(response => console.log(response));
        (await library).addBook('New Book', 'New Author', 'Fantasy');
        (await library).placeOrder(book1, user1);
        (await library).placeOrder(book1, user2);
    } catch(error){
        throw new Error(error);
    }
})();
