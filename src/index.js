
import "./styles.css";
import { Book, Library } from "./library.js";

const addBookButton = document.querySelector(".add-book-btn");
const submitButton = document.querySelector(".submit-btn");
const cancelButton = document.querySelector(".cancel-btn");

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

submitButton.addEventListener('click', saveBook);


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

    console.log(myLibrary.libraryArray);

    formTitleInput.value = '';
    formAuthorInput.value = ''
    formPageNumberInput.value = '';
    formRead.checked = false;

    CloseAddBookDialog();
    //update display;

}

function UpdateLibraryDisplay(){

    

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


let myLibrary;
myLibrary = new Library;

