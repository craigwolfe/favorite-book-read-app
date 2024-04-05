import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
//import passes three parameters getDatabase, ref, and onValue, remove
import {
  getDatabase,
  ref,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL: "https://bestread-b1ce8-default-rtdb.firebaseio.com/",
};

//connect app to firebase
const app = initializeApp(appSettings);
const database = getDatabase(app);
//setup reference database and shoppingList
const booksInDB = ref(database, "books");
//gets id books element
const booksEl = document.getElementById("books");

onValue(booksInDB, function (snapshot) {
  //array that return object values from database
  let booksArray = Object.entries(snapshot.val());
  //for loop of the booksArray
  booksEl.innerHTML = " ";
  for (let i = 0; i < booksArray.length; i++) {
    let currentBooks = booksArray[i];
    let currentBooksID = currentBooks[0];
    let currentBooksValue = currentBooks[1];
    appendBookToBooksListEl(currentBooks);
  }
});

//adds bookValue to list element
function appendBookToBooksListEl(book) {
  // 0 is key
  let bookID = book[0];
  //1 is value
  let bookTitle = book[1];
  //creates a new list item element
  let newEl = document.createElement("li");
  //add news classList of books
  newEl.classList.add("books");

  newEl.textContent = bookTitle;

  // Add dblclick event listener to each book element
  newEl.addEventListener("dblclick", function () {
    let exactLocationOfBookInDB = ref(database, `books/${bookID}`);
    remove(exactLocationOfBookInDB);
  });

  booksEl.append(newEl);
}
