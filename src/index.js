
import "./styles.css";
import { greeting } from "./library.js";

console.log(greeting);

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
//submitButton.addEventListener('click', SubmitFunction);


