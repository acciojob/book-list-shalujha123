//your JS code here. If required.
document.addEventListener('DOMContentLoaded', displayBooks);

// Add Book
document.getElementById('submit').addEventListener('click', addBook);
document.getElementById('book-list').addEventListener('click', deleteBook);

// Function to display stored books
function displayBooks() {
    let books = getBooks();
    books.forEach(book => addBookToTable(book));
}

// Function to add a book
function addBook() {
    let title = document.getElementById('title').value.trim();
    let author = document.getElementById('author').value.trim();
    let isbn = document.getElementById('isbn').value.trim();

    if (title === '' || author === '' || isbn === '') {
        alert('Please fill in all fields');
        return;
    }

    let book = { title, author, isbn };
    addBookToTable(book);
    saveBook(book);

    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

// Function to add book to table
function addBookToTable(book) {
    let list = document.getElementById('book-list');
    let row = document.createElement('tr');

    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><button class="delete">Clear</button></td>
    `;

    list.appendChild(row);
}

// Function to delete a book
function deleteBook(e) {
    if (e.target.classList.contains('delete')) {
        e.target.parentElement.parentElement.remove();
        let isbn = e.target.parentElement.previousElementSibling.textContent;
        removeBook(isbn);
    }
}

// Get books from local storage
function getBooks() {
    return localStorage.getItem('books') ? JSON.parse(localStorage.getItem('books')) : [];
}

// Save book to local storage
function saveBook(book) {
    let books = getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
}

// Remove book from local storage
function removeBook(isbn) {
    let books = getBooks();
    let updatedBooks = books.filter(book => book.isbn !== isbn);
    localStorage.setItem('books', JSON.stringify(updatedBooks));
}