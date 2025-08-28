'use strinct';
// интерфейсы репозиториев User и Book 
class InterfaceUserRepository{}
class InterfaceBookRepository{}

// классы для работы приложения 
class User{}
class Book{}
class UserRepository extends InterfaceUserRepository{}
class BookRepository extends InterfaceBookRepository{}

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