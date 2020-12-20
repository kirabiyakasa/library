let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
  this.info = function() {
    return `Title: ${title}\nAuthor: ${author}\nPages: ${pages}\nRead: ${read}`
  }
}

function addBookToLibrary(book) {
  myLibrary.push(book)
}

function deleteBook(event) {
  let button = event.target;
  let bookToDelete;
  if(button.tagName == 'BUTTON') {
    bookToDelete = document.querySelector(`[data-book-id="${button.value}"]`);
    myLibrary.splice(button.value, 1)
    document.getElementById("library-container").innerHTML = getLibraryIndex()
    deleteButtonEvent()
  }
}

// delete book button
const createDeleteButton = function(i) {
  return `<button class=\"delete-button\" value=\"${i}\">Delete</button>`
}

function getLibraryIndex() {
  let deleteButtons = "<div id=\"delete-button-container\">";
  let html = "<table id=\"book-table\">" +
  "<tbody id=\"book-table-body\">" +
  "<tr class=\"book-headers\">" +
  "<th class=\"book-header\">Title</th>" +
  "<th class=\"book-header\">Author</th>" +
  "<th class=\"book-header\">Pages</th>" +
  "<th class=\"book-header\">Read</th>" +
  "</tr>";
  for (let i = 0; i < myLibrary.length; i++) {
    html += `<tr class=\"book-container\" data-book-id=\"${i}\">`;
    html += "<td class=\"book-data\">" + myLibrary[i].title + "</td>" ;
    html += "<td class=\"book-data\">" + myLibrary[i].author + "</td>";
    html += "<td class=\"book-data\">" + myLibrary[i].pages + "</td>";
    html += "<td class=\"book-data\">" + myLibrary[i].read + "</td>";

    html += "</tr>";
    deleteButtons += createDeleteButton(i);
  }
  html += "</tbody>";
  html += "</table>";
  html = deleteButtons + "</div>" + html;
  return html
}

let book1 = new Book('a', 'a', 1, true);
let book2 = new Book('b', 'b', 2, false);
myLibrary.push(book1)
myLibrary.push(book2)

const libraryIndex = getLibraryIndex();
document.getElementById("library-container").innerHTML = libraryIndex;

// get all book elements
const getAllBooks = function() {
  let books = document.querySelectorAll(".book-container")
  books.map(book => {
    book += "<button></button>"
  });
}

const showBookFields = function() { // change display for button fields
}

// add book to myLibrary
function addBook() {
  let title = document.getElementById("book-title").value
  let author = document.getElementById("book-author").value
  let pages = document.getElementById("book-pages").value
  let read = document.getElementById("book-read").checked

  let newBook = new Book(title, author, pages, read)
  myLibrary.push(newBook)
  libraryContainer = document.getElementById("library-container")
  libraryContainer.innerHTML = getLibraryIndex()
}

document.getElementById("new-book").addEventListener('click', showBookFields)
document.getElementById("add-book").addEventListener('click', addBook)
function deleteButtonEvent() {
  document.querySelectorAll(".delete-button").forEach(element => {
    element.addEventListener('click', deleteBook)
  });
}
deleteButtonEvent()
