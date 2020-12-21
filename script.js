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

function deleteBook(event) {
  let answer = confirm('Delete this book from the library?')
  let button = event.target;
  let bookToDelete;
  if (button.tagName == 'BUTTON' && answer == true) {
    bookToDelete = document.querySelector(`[data-book-id="${button.value}"]`);
    myLibrary.splice(button.value, 1)
    document.getElementById("library-container").innerHTML = getLibraryIndex()
    deleteButtonEvent()
  }
}

function changeReadUnread(event) {
  let button = event.target;
  let bookContainer = document.querySelector(`[data-book-id="${button.value}"]`);
  let bookRead = bookContainer.querySelector("#book-read");

  if (myLibrary[button.value].read == true) {
    myLibrary[button.value].read = false
    bookRead.innerHTML = "false";
  } else {
    myLibrary[button.value].read = true
    bookRead.innerHTML = "true";
  }
}

// delete book button
const createDeleteButton = function(i) {
  return `<button class=\"delete-button\" value=\"${i}\">Delete</button>`
}

// button to change read status
const createReadButton = function(i) {
  let readButton = `<button class=\"read-button\" value=\"${i}\">`
  if (myLibrary[i].read == false) {
    readButton += "Read"
  } else {
    readButton += "Unread"
  }
  return readButton += "</button>"
}

function getLibraryIndex() {
  let deleteButtons = "<div id=\"delete-button-container\">";
  let readButtons = "<div id=\"read-button-container\">";

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
    html += "<td id=\"book-read\" class=\"book-data\">" + myLibrary[i].read +
    "</td>";

    html += "</tr>";
    readButtons += createReadButton(i);
    deleteButtons += createDeleteButton(i);
  }
  html += "</tbody>";
  html += "</table>";
  html = deleteButtons + "</div>" + readButtons + "</div>" + html;
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

// change display for button fields
const showBookFields = function() {
}

function emptyFields(nodes) {
  nodes.forEach( node => {
    node.value = ''
    if (node.checked) {
      node.checked = ''
    }
  });
}

// add book to myLibrary
function addBook() {
  let title = document.getElementById("book-title")
  let author = document.getElementById("book-author")
  let pages = document.getElementById("book-pages")
  let read = document.getElementById("book-read")

  let newBook = new Book(title.value, author.value, pages.value, read.checked)
  myLibrary.push(newBook)

  emptyFields([title, author, pages, read])
  libraryContainer = document.getElementById("library-container")
  libraryContainer.innerHTML = getLibraryIndex()
}

document.getElementById("new-book").addEventListener('click', showBookFields)
document.getElementById("add-book").addEventListener('click', addBook)
// read button event
document.querySelectorAll(".read-button").forEach(element => {
  element.addEventListener('click', changeReadUnread)
});
function deleteButtonEvent() {
  document.querySelectorAll(".delete-button").forEach(element => {
    element.addEventListener('click', deleteBook)
  });
}
deleteButtonEvent()
