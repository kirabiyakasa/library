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

function getLibraryIndex() {
  let html = "<table class=\"book-table\">" +
  "<tr class=\"book-headers\">" +
  "<th class=\"book-header\">Title</th>" +
  "<th class=\"book-header\">Author</th>" +
  "<th class=\"book-header\">Pages</th>" +
  "<th class=\"book-header\">Read</th>" +
  "</tr>";
  for (let i = 0; i < myLibrary.length; i++) {
    html += "<tr class=\"book-container\">";
    html += "<td class=\"book-data\">" + myLibrary[i].title + "</td>" ;
    html += "<td class=\"book-data\">" + myLibrary[i].author + "</td>";
    html += "<td class=\"book-data\">" + myLibrary[i].pages + "</td>";
    html += "<td class=\"book-data\">" + myLibrary[i].read + "</td>";

    html += "</tr>";
  }
  html += "</table>";
  return html
}

let book1 = new Book('a', 'a', 1, true);
let book2 = new Book('b', 'b', 2, false);
myLibrary.push(book1)
myLibrary.push(book2)

const libraryIndex = getLibraryIndex();
document.getElementById("library-container").innerHTML = libraryIndex;

const createBookFields = function() { // change display for button fields
}

// add book to myLibrary
const addBook = function() {
  let title = document.getElementById("book-title").value
  let author = document.getElementById("book-author").value
  let pages = document.getElementById("book-pages").value

  let newBook = new Book(title, author, pages, false)
  myLibrary.push(newBook)
  libraryContainer = document.getElementById("library-container")
  libraryContainer.innerHTML = getLibraryIndex()
}

document.getElementById("new-book").addEventListener('click', createBookFields)
document.getElementById("add-book").addEventListener('click', addBook)
