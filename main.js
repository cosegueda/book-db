/* Declarations */
const initialBook = [{
    id: 1,
    title: 'Frankenstein',
    author: 'Mary Shelley',
    description: 'A young scientist creates a grotesque but sapient creature in an unorthodox scientific experiment'
}];

const options = ['View All Books', 'Add a Book', 'Edit a Book', 'Search for a Book', 'Save and Exit'];

const consoleStyles = {
    title: 'font-size:16px;font-weight:bold;',
    subtitle: 'font-size:14px;font-weight:bold;'
};

const books = JSON.parse(localStorage.getItem('books')) || [];

let state;
let initialLoad = true;


/* View */
startApp();

/* Functions */
function startApp() {
    state = 'default';
    console.log('%cBook Manager', consoleStyles.title);
    if (initialLoad) {
        if (!localStorage.books) {
            console.log(`No books found. Adding initial book '${initialBook[0].title}' to library.`);
            books.push(...initialBook);
        } else {
            console.log(`Loaded ${books.length} book${(books.length > 1) ? 's' : ''} into the library`)
        }
    }
    displayOptions();

    window.addEventListener('keyup', filterInput);
}

function displayOptions() {
    options.forEach((option, index) => {
        const id = index + 1;
        console.log(`${id}) ${option}`);
    });
}

function filterInput(e) {
    if (e.key === 'Meta') {
        return;
    }
    else if (Number.isInteger(parseInt(e.key)) || e.key === 'Enter') {
        handleUserInput(e.key)
    }
    else {
        console.log('That is not a valid option, please try again.');
    }
}

function handleUserInput(key) {
    switch (state) {
        case 'default':
            if (key > 0 && key < 6) {
                console.log(key);
            }
            switch (key) {
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
                    searchBook();
                    break;
                case '5':
                    exitApp();
                    break;
                default:
                    console.log('That is not a valid option, please try again.');
            }
            break;
        case 'viewAllBooks':
            if (key === 'Enter') {
                initialLoad = false;
                startApp();
            }
            else {
                let book = books.find(book => (book.id === parseInt(key)));
                if (!book) {
                    console.log('That is not a valid selection. Please try again.');
                    break;
                }
                console.log(`ID: ${book.id}`);
                console.log(`Title: ${book.title}`);
                console.log(`Author: ${book.author}`);
                console.log(`Description: ${book.description}`);
                console.log('To view details enter the book ID, to return press <Enter>');
            }
            break;
        case 'editBook':
            if (key === 'Enter') {
                initialLoad = false;
                startApp();
            }
            else {
                let book = books.find(book => (book.id === parseInt(key)));
                if (!book) {
                    console.log('That is not a valid selection. Please try again.');
                    break;
                }
                console.log('Input the following information. To leave a field unchanged, hit <Enter>');
                book.title = prompt(`Title:`, book.title);
                book.author = prompt(`Author:`, book.author);
                book.description = prompt(`Description:`, book.description);
                if (book.title === '' || book.author === '' || book.description === '' ) {
                    console.log('Error: Book has not been changed. Fields cannot be left blank.')
                }
                else {
                    books.push(book);
                    console.log(`Book saved.`);
                    editBook();
                }
            }
            break;
    }
}

function viewAllBooks() {
    state = 'viewAllBooks';
    console.log('%cView All Books', consoleStyles.subtitle);
    displayBookList();
    console.log('To view details enter the book ID, to return press <Enter>');
}

function addBook() {
    let book = {};
    console.log('%cAdd a Book', consoleStyles.subtitle);
    console.log('Please enter the following information:');
    book.title = prompt('Title:');
    book.author = prompt('Author:');
    book.description = prompt('Description:');
    if (book.title === '' || book.author === '' || book.description === '' ) {
        console.log('Error: No book added. Fields cannot be left blank.')
    }
    else {
        book.id = books.length + 1;
        books.push(book);
        console.log(`Book [${books.length}] added`);
    }
    initialLoad = false;
    startApp();
}

function editBook() {
    state = 'editBook';
    console.log('%cEdit a Book', consoleStyles.subtitle);
    displayBookList();
    console.log('Enter the book ID of the book you want to edit, to return press <Enter>');

}

function searchBook() {
    console.log('Book searched');
}

function exitApp() {
    localStorage.setItem('books', JSON.stringify(books));
    console.log('Library saved to local storage. Exiting...');
    window.removeEventListener('keyup', (e) => {}, false);
}

function displayBookList() {
    books.forEach((book) => {
        console.log(`[${book.id}] ${book.title}`);
    });
}

