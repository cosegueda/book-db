/* Declarations */
const consoleStyles = {
    title: 'font-size:16px;font-weight:bold;',
    subtitle: 'font-size:14px;font-weight:bold;'
};

const initialBook = [{
    id: 1,
    title: 'Frankenstein',
    author: 'Mary Shelley',
    description: 'A young scientist creates a grotesque but sapient creature in an unorthodox scientific experiment'
}];

const mainMenuItems = ['View All Books', 'Add a Book', 'Edit a Book', 'Search for a Book', 'Save and Exit'];

const books = JSON.parse(localStorage.getItem('books')) || [];

const StateMap = {
    1: 'mainMenu',
    2: 'viewAllBooks',
    3: 'editBook',
    4: 'searchBook',
    5: 'saveExit'
};

let state, activeHandler;
let initialLoad = true;

window.addEventListener('keyup', handleInput);

viewMainMenu();

/* Functions */
function viewMainMenu() {
    clearInputHandler();
    state = StateMap[1];
    console.log('%cBook Manager', consoleStyles.title);
    if (initialLoad) {
        initialLoad = false;
        if (!localStorage.books) {
            console.log(`No books found. Adding initial book '${initialBook[0].title}' to library.`);
            books.push(...initialBook);
            saveToLocalStorage(books);
            initialLoad = false;
        } else {
            console.log(`Loaded ${books.length} book${(books.length > 1) ? 's' : ''} into the library`)
        }
    }
    // List Main Menu options
    mainMenuItems.forEach((item, index) => {
        const id = index + 1;
        console.log(`${id}) ${item}`);
    });
    registerInputHandler((e) => {
        switch (filterInput(e.key)) {
            case '1':
                viewAllBooks();
                break;
            case '2':
                addBook();
                break;
            case '3':
                editBook();
                break;
            case '4':
                searchBooks();
                break;
            case '5':
                exitApp();
                break;
        }
    });
    // window.addEventListener('keyup', activeHandler);
}

function viewAllBooks() {
    clearInputHandler();
    state = StateMap[2]; // viewAllBooks
    console.log('%cView All Books', consoleStyles.subtitle);
    displayBookList(books);
    console.log('To view details enter the book ID, to return press <Enter>');
    registerInputHandler((e) => {
        let book = searchBook(books, e);
        if (!book) {
            console.log('That is not a valid selection. Please try again.');
        } else {
            console.log(`Book Selection: ${book.id}`);
            console.log(`ID: ${book.id}`);
            console.log(`Title: ${book.title}`);
            console.log(`Author: ${book.author}`);
            console.log(`Description: ${book.description}`);
            viewAllBooks();
        }
    });
    // window.addEventListener('keyup', activeHandler);
}

function addBook() {
    clearInputHandler();
    state = StateMap[3]; // addBook
    let book = {};
    console.log('%cAdd a Book', consoleStyles.subtitle);
    console.log('Please enter the following information:');
    book.title = promptUser('Title:');
    book.author = promptUser('Author:');
    book.description = promptUser('Description:');
    // Prevents book from being added when a prompt has been canceled
    if (book.title === null || book.author === null || book.description === null ) {
        console.log('Error: No book added. No fields cannot be left blank.')
    }
    else {
        book.id = books.length + 1;
        books.push(book);
        saveToLocalStorage(books);
        console.log(`Book [${books.length}] added`);
    }
    viewMainMenu();
}

function editBook() {
    clearInputHandler();
    state = StateMap[4]; // editBook
    console.log('%cEdit a Book', consoleStyles.subtitle);
    displayBookList(books);
    console.log('Enter the book ID of the book you want to edit, to return press <Enter>');
    registerInputHandler((e) => {
        let book = searchBook(books, e);
        if (!book) {
            console.log('That is not a valid selection. Please try again.');
        } else {
            console.log('Input the following information. To leave a field unchanged, hit <Enter>');
            book.title = promptUser('Title:', book.title);
            book.author = promptUser('Author:', book.author);
            book.description = promptUser('Description:', book.description);
            if (book.title === null || book.author === null || book.description === null ) {
                console.log('Error: Book has not been changed. Fields cannot be left blank.')
            }
            else {
                books.forEach((item) => {
                    if (item.id === book.id) {
                        item = {
                            title: book.title,
                            author: book.author,
                            description: book.description
                        }
                    }
                });
                saveToLocalStorage(books);
                console.log(`Book saved.`);
                viewMainMenu();
            }
        }
    });
    // window.addEventListener('keyup', activeHandler);
}

function searchBooks() {
    clearInputHandler();
    state = StateMap[5]; // searchBook
    console.log('%cSearch for Book', consoleStyles.subtitle);
    let search = prompt('Type in one or more keywords to search for');
    if (search === '') {
        console.log('Error: Nothing to search. Field cannot be left blank.')
    }
    else {
        let results = books.filter(book => {
            if (book.title.includes(search) || book.author.includes(search) || book.description.includes(search)) {
                return book
            }
        });
        if (results.length < 1) {
            console.log('No books matched your search.');
            viewMainMenu();
        }
        else {
            console.log('The following books matched your search. Enter the book ID to see more details, to return press <Enter>');
            results.forEach(book => {
                console.log(`[${book.id}] ${book.title}`);
            });
            registerInputHandler((e) => {
                let book = searchBook(books, e);
                if (!book) {
                    console.log('That is not a valid selection. Please try again.');
                } else {
                    console.log(`ID: ${book.id}`);
                    console.log(`Title: ${book.title}`);
                    console.log(`Author: ${book.author}`);
                    console.log(`Description: ${book.description}`);
                    console.log('To view details enter the book ID, to return press <Enter>');
                }
            });
            // window.addEventListener('keyup', activeHandler);
        }
    }
}

function handleInput(e) {
    if (activeHandler) {
        activeHandler(e)
    }
}

function exitApp() {
    saveToLocalStorage(books);
    console.log('Library saved to local storage. Exiting...');
    clearInputHandler();
}


/**
 * Helper Functions
 */

// Filters out all non-integer input, except 'Enter'
function filterInput(input) {
    if (Number.isInteger(parseInt(input)) || input === 'Enter') {
        // Returns user to viewMainMenu if 'Enter' key is hit while not on the mainMenu
        if (state !== StateMap[1]) {
            if (input === 'Enter') {
                initialLoad = false;
                viewMainMenu();
            }
            else {
                return input;
            }

        }
        else {
            if (input > 0 && input < 6) {
                // Echos the pressed key
                console.log(`%c${input}`, consoleStyles.subtitle);
                return input;
            }
            else {
                console.log('That is not a valid option, please try again.');
            }
        }
    }
    // Filter out initial load key value which is set to 'Meta'
    else if (input === 'Meta') {
        return;
    }
    else {
        console.log('That is not a valid option, please try again.');
    }
}

// Make sure user input is not left blank
function promptUser(data, previousData) {
    const userData = prompt(data, previousData);
    if (userData === '') {
        console.log(`Error: No ${data} added. Fields cannot be left blank.`);
        promptUser(data, previousData);
    }
    else {
        return userData;
    }
}

function searchBook(books, e) {
    return books.find(book => (book.id === parseInt(filterInput(e.key))));
}

function displayBookList(books) {
    books.forEach((book) => {
        console.log(`[${book.id}] ${book.title}`);
    });
}

function registerInputHandler(handler) {
    activeHandler = handler;
}

function clearInputHandler() {
    activeHandler = null
}

function saveToLocalStorage(books) {
    localStorage.setItem('books', JSON.stringify(books));
}
