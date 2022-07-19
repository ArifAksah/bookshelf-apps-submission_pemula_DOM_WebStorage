const INCOMPLETE_LIST_BOOKSHELF_ID = "incompleteBookshelfList";
const COMPLETE_LIST_BOOKSHELF_ID = "completeBookshelfList";
const BOOK_ITEMID = "itemId";

function makeBookShelf(Title, Author, Year, isCompleted) {
    const title = document.createElement("h3");
    title.innerText = Title;
    const author = document.createElement("p");
    author.innerText = Author
    const year = document.createElement("p");
    year.classList.add("year");
    year.innerText = Year;

    const container = document.createElement("div");
    container.classList.add("book_item");
    container.append(title, author, year);
    const divAction = document.createElement("div");
    divAction.classList.add("action");
    if (isCompleted) {
        divAction.append(
            createUndoButton(),
            createButtonHapus()
        );
    } else {
        divAction.append(
            createButtonSelesai(),
            createButtonHapus()
        );
    }

    container.append(divAction);

    return container;
}

function addBookShelf() {
    const incompleteBookShelfList = document.getElementById(INCOMPLETE_LIST_BOOKSHELF_ID);
    const completeBookshelfList = document.getElementById(COMPLETE_LIST_BOOKSHELF_ID);
    const title = document.getElementById("inputBookTitle").value;
    const author = document.getElementById("inputBookAuthor").value;
    const year = document.getElementById("inputBookYear").value;



    const cekList = document.getElementById("inputBookIsComplete");
    if (cekList.checked) {
        const book = makeBookShelf(title, author, year, true);
        const bookObject = composeBookObject(title, author, year, true);
        book[BOOK_ITEMID] = bookObject.id;
        bookshelfs.push(bookObject);
        completeBookshelfList.append(book);
    } else {
        const book = makeBookShelf(title, author, year, false);
        const bookObject = composeBookObject(title, author, year, false);
        book[BOOK_ITEMID] = bookObject.id;
        bookshelfs.push(bookObject)
        incompleteBookShelfList.append(book);
    }

    updateDataToStorage();
}
function createButtonSelesai() {
    return createButton("Selesai Dibaca", "green", function (event) {
        addTaskToCompleted(event.target.parentElement.parentElement);
    });
}
function createButtonHapus() {
    return createButton("Hapus", "red", function (event) {
        removeTaskFromCompleted(event.target.parentElement.parentElement);
    });
}
function createUndoButton() {
    return createButton("belum selesai dibaca", "green", function (event) {
        undoTaskFromCompleted(event.target.parentElement.parentElement);
    });
}
function createButton(text, buttonTypeClass, eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.innerText = text;
    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
}

function addTaskToCompleted(taskElement) {
    const listCompleted = document.getElementById(COMPLETE_LIST_BOOKSHELF_ID);
    const taskTitle = taskElement.querySelector(".book_item > h3").innerText;
    const taskAuthor = taskElement.querySelector(".book_item > p").innerText;
    const taskYear = taskElement.querySelector(".book_item > .year").innerText;

    const newBook = makeBookShelf(taskTitle, taskAuthor, taskYear, true);
    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isCompleted = true;
    newBook[BOOK_ITEMID] = book.id;
    listCompleted.append(newBook);
    taskElement.remove();
    updateDataToStorage();

}
function removeTaskFromCompleted(taskElement) {
    const bookPosition = findBookIndex(taskElement[BOOK_ITEMID]);
    bookshelfs.splice(bookPosition, 1);

    const validasi = confirm("Anda yakin ingin hapusnya ?");
    if (validasi) {
        taskElement.remove();
    }
    updateDataToStorage();


}
function undoTaskFromCompleted(taskElement) {
    const listUncompleted = document.getElementById(INCOMPLETE_LIST_BOOKSHELF_ID);
    const taskTitle = taskElement.querySelector(".book_item > h3").innerText;
    const taskAuthor = taskElement.querySelector(".book_item > p").innerText;
    const taskYear = taskElement.querySelector(".book_item > .year").innerText;

    const newBook = makeBookShelf(taskTitle, taskAuthor, taskYear, false);
    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isCompleted = false;
    newBook[BOOK_ITEMID] = book.id;

    listUncompleted.append(newBook);
    taskElement.remove();
    updateDataToStorage();

}

function refreshDataFromBookShelf() {
    const listUncompleted = document.getElementById(INCOMPLETE_LIST_BOOKSHELF_ID);
    let listCompleted = document.getElementById(COMPLETE_LIST_BOOKSHELF_ID);


    for (book of bookshelfs) {
        const newBook = makeBookShelf(book.title, book.author, book.year, book.isCompleted);
        newBook[BOOK_ITEMID] = book.id;


        if (book.isCompleted) {
            listCompleted.append(newBook);
        } else {
            listUncompleted.append(newBook);
        }
    }
}
