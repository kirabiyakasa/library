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
  let answer = confirm('Delete this book from the library?');
  let button = event.target;
  let bookToDelete;
  if (button.tagName == 'BUTTON' && answer == true) {
    bookToDelete = document.querySelector(`[data-book-id="${button.value}"]`);
    myLibrary.splice(button.value, 1)
    document.getElementById("library-container").innerHTML = getLibraryIndex()
    deleteButtonEvent()
    readButtonEvent()
    saveLibrary()
  }
}

function toggleReadUnread(event) {
  let button = event.target;
  let bookContainer = document.querySelector(`[data-book-id="${button.value}"]`);
  let bookRead = bookContainer.querySelector("#book-read");

  if (myLibrary[button.value].read == true) {
    myLibrary[button.value].read = false
    bookRead.innerHTML = "false";
    button.innerHTML = "Read";
  } else {
    myLibrary[button.value].read = true
    bookRead.innerHTML = "true";
    button.innerHTML = "Unread";
  }
  saveLibrary()
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

// turn on display for button fields
const showBookFields = function(event) {
  let bookFields = document.getElementById("add-book-container");
  let newBookButton = event.target;
  bookFields.style.display = "block";
  newBookButton.style.display = "none";
}

// turn off display for button fields
const hideBookFields = function(event) {
  let bookFields = document.getElementById("add-book-container");
  let newBookButton = document.getElementById("new-book");
  bookFields.style.display = "none";
  newBookButton.style.display = "block";
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
  let title = document.getElementById("book-title-field");
  let author = document.getElementById("book-author-field");
  let pages = document.getElementById("book-pages-field");
  let read = document.getElementById("book-read-field");

  let newBook = new Book(title.value, author.value, pages.value, read.checked)
  myLibrary.push(newBook)

  emptyFields([title, author, pages, read])
  libraryContainer = document.getElementById("library-container")
  libraryContainer.innerHTML = getLibraryIndex()
  deleteButtonEvent()
  readButtonEvent()
  saveLibrary()
}

document.getElementById("new-book").addEventListener('click', showBookFields)
document.getElementById("add-book").addEventListener('click', addBook)
document.getElementById("cancel-add").addEventListener('click', hideBookFields)
function readButtonEvent() {
  document.querySelectorAll(".read-button").forEach(element => {
    element.addEventListener('click', toggleReadUnread)
  });
}
function deleteButtonEvent() {
  document.querySelectorAll(".delete-button").forEach(element => {
    element.addEventListener('click', deleteBook)
  });
}

function storageAvailable(type) {
  var storage;
  try {
      storage = window[type];
      var x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
  }
  catch(e) {
      return e instanceof DOMException && (
          // everything except Firefox
          e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === 'QuotaExceededError' ||
          // Firefox
          e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
          // acknowledge QuotaExceededError only if there's something already stored
          (storage && storage.length !== 0);
  }
}

function saveLibrary() {
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
}

function populateLibrary() {
  myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
  let libraryIndex = getLibraryIndex()
  deleteButtonEvent()
  readButtonEvent()
  document.getElementById("library-container").innerHTML = libraryIndex;
}

if (storageAvailable('localStorage')) {
  if(!localStorage.getItem('myLibrary')) {
    let book1 = new Book('a', 'a', 1, true);
    let book2 = new Book('b', 'b', 2, false);
    myLibrary.push(book1)
    myLibrary.push(book2)
    let libraryIndex = getLibraryIndex();
    document.getElementById("library-container").innerHTML = libraryIndex;

    saveLibrary();
  } else {
    populateLibrary();
  }
}
else {
  // Too bad, no localStorage for us
}

deleteButtonEvent()
readButtonEvent()
