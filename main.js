/* Declarations */
const initialBook = [{
    id: 1,
    title: 'Frankenstein',
    author: 'Mary Shelley',
    description: 'A young scientist creates a grotesque but sapient creature in an unorthodox scientific experiment'
}];

const secondBook = {
    id: 2,
    title: 'Frankenstein2',
    author: 'Mary Shelley2',
    description: '2 young scientist creates a grotesque but sapient creature in an unorthodox scientific experiment'
};

const options = ['View All Books', 'Add a Book', 'Edit a Book', 'Search for a Book', 'Save and Exit'];

const consoleStyles = {
    title: 'font-size: 16px;font-weight:bold;',
    subtitle: 'font-weight:bold;'
};

const books = JSON.parse(localStorage.getItem('books')) || [];


/* View */
startApp();

/* Functions */
function startApp() {
    console.log('%cBook Manager', consoleStyles.title);
    if (!localStorage.books) {
        console.log(`No books found. Adding initial book '${initialBook[0].title}' to library.`);
        books.push(...initialBook);
    } else {
        console.log(`Loaded ${books.length} book${(books.length > 1) ? 's' : ''} into the library`)
    }
    options.forEach((option, index) => {
        const id = index + 1;
        console.log(`${id}) ${option}`);
    });

    window.addEventListener('keyup', (e) => {
        if (e.key === 'Meta') {
            return;
        }
        console.log(e.key);
        if (e.key > 0 && e.key < 6) {
            handleUserInput(e.key)
        } else {
            console.log('That is not a valid option, please try again (Choose 1-5)');
        }
    });
}

function handleUserInput(key) {
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
    }
}

function viewAllBooks() {
    console.table(books);
}

function addBook() {
    books.push(secondBook);
    console.log('Book added');
}

function editBook() {
    console.log('Book edited');
}

function searchBook() {
    console.log('Book searched');
}

function exitApp() {
    localStorage.setItem('books', JSON.stringify(books));
    console.log('Library saved to local storage. Exiting...');
    window.removeEventListener('keyup', (e) => {}, false);
}

