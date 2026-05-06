
import "./styles.css";
import { Book, Library } from "./library.js";

const addBookButton = document.querySelector(".add-book-btn");
const submitButton = document.querySelector(".submit-btn");
const cancelButton = document.querySelector(".cancel-btn");

const bookCardContainer = document.querySelector(".book-card-container");

function OpenAddBookDialog(){
    const dialog = document.querySelector(".new-book-dialog");
    const bookTitleInput = document.querySelector(".input-title");

    dialog.showModal();
    bookTitleInput.focus();
}

function CloseAddBookDialog(){
    document.querySelector(".new-book-dialog").close();
}


addBookButton.addEventListener('click', OpenAddBookDialog);
cancelButton.addEventListener('click', CloseAddBookDialog);

submitButton.addEventListener('submit', saveBook);



let myLibrary = new Library;
myLibrary.libraryArray = loadBooksFromLocalStorage();
UpdateLibraryDisplay();

function loadBooksFromLocalStorage(){
    let savedBooks = localStorage.getItem('savedBooks');
    savedBooks =  savedBooks ? JSON.parse(savedBooks) : [];
    
    let booksToLoad = [];

    savedBooks.forEach(book => {
        const newBook = new Book(book.title, book.author, book.numberOfPages, book.read);
        booksToLoad.unshift(newBook);
        }
    );

    return booksToLoad;
}

function saveBooksToLocalStorage(){
    localStorage.setItem('savedBooks', JSON.stringify(myLibrary.libraryArray));
}


function saveBook(event){
    event.preventDefault();

    const formTitleInput = document.querySelector("#input-title");
    const title = formTitleInput.value.trim();
    const formAuthorInput = document.querySelector("#input-author");
    const author = formAuthorInput.value.trim();
    const formPageNumberInput = document.querySelector("#input-numOfPages");
    const number = formPageNumberInput.value;
    const formRead = document.querySelector("#input-finished-reading"); 
    const read = formRead.checked;

    myLibrary.addBook(new Book(title, author, number, read));
    saveBooksToLocalStorage();

    console.log(myLibrary.libraryArray);

    formTitleInput.value = '';
    formAuthorInput.value = ''
    formPageNumberInput.value = '';
    formRead.checked = false;



    CloseAddBookDialog();
    UpdateLibraryDisplay();

}

function UpdateLibraryDisplay(){
    bookCardContainer.innerHTML = ""; //clear the main content

    myLibrary.libraryArray.forEach(book => {
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
        
        cardDiv.id = book.id;

        const titleAuthorDiv = document.createElement("div");
        titleAuthorDiv.classList.add("title-author-container");

        const numberReadDiv = document.createElement("div");
        numberReadDiv.classList.add("number-read-container");

        const removeBookButton = document.createElement("button");
        removeBookButton.classList.add("remove-book-button");
        removeBookButton.setAttribute('data-id', book.id);
        removeBookButton.innerHTML = "X";
        
        const removeTooltip = document.createElement("span");
        removeTooltip.classList.add("tooltip-text");
        removeTooltip.textContent = "Remove from Library";

        removeBookButton.appendChild(removeTooltip);

        cardDiv.appendChild(titleAuthorDiv);
        cardDiv.appendChild(numberReadDiv);


        const bookTitle = document.createElement("h1");
        const bookAuthor = document.createElement("h3");
        const numberPages = document.createElement("p");
        
        const finishedReading = document.createElement("input");
        finishedReading.setAttribute('type', "checkbox");
        finishedReading.addEventListener('change', ()=> {
            
            console.log(book);
            book.toggleRead();
        });


        

        bookTitle.textContent = book.title;
        bookTitle.classList.add("book-title");
        titleAuthorDiv.appendChild(bookTitle);

        bookAuthor.textContent = book.author;
        bookAuthor.classList.add("book-author");
        titleAuthorDiv.appendChild(bookAuthor);

        numberPages.textContent = book.numberOfPages + ' pages';
        numberPages.classList.add("number-pages");
        numberReadDiv.appendChild(numberPages);


        
        if(book.read == true){
            finishedReading.checked = true;
        }
        else{
            finishedReading.checked = false;
        }

        finishedReading.classList.add("finished-reading");
        numberReadDiv.appendChild(finishedReading);

        numberReadDiv.appendChild(removeBookButton);
        removeBookButton.addEventListener("click", ()=> {
            myLibrary.removeBookEntry(book.id);
            saveBooksToLocalStorage();
            UpdateLibraryDisplay();
        });
        bookCardContainer.appendChild(cardDiv);
    });

    console.log(myLibrary.libraryArray);
}


//close note dialog when clicking outside the dialog element
document.addEventListener('DOMContentLoaded', function(){

    document.querySelector(".book-form").addEventListener('submit', saveBook);

    document.querySelector(".new-book-dialog").addEventListener('click', function(event){
        if(event.target === this){
            CloseAddBookDialog(); 
        }
    })
})



