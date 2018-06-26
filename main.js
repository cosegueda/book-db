/* Declarations */
const initialBook = [{
    id: 1,
    title: 'Frankenstein',
    author: 'Mary Shelley',
    description: 'A young scientist creates a grotesque but sapient creature in an unorthodox scientific experiment'
}];

const options = ['View All Books', 'Add a Book', 'Edit a Book', 'Search for a Book', 'Save and Exit'];

const consoleStyles = {
    title: 'font-size: 16px;font-weight:bold;',
    subtitle: 'font-weight:bold;'
};

let books;


/* View */
console.log('%cBook Manager', consoleStyles.title);
seedBooks();
console.log('%cChoose an option:', consoleStyles.subtitle);
options.forEach((option, index) => {
    const id = index + 1;
    console.log(`${id}) ${option}`);
});


/* Functions */
function seedBooks() {
    if (!books) {
        console.log(`No books found. Adding initial book '${initialBook[0].title}' to library...`);

        books = [...initialBook];
    }
}