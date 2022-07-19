document.addEventListener("DOMContentLoaded", function () {

    const submitForm = document.getElementById("inputBook");
    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addBookShelf();
    });
    if (isStorageExist()) {
        loadDataFromStorage();
    }
    const searchButton = document.getElementById("searchSubmit");
    searchButton.addEventListener("click", (event) => {
        event.preventDefault();
        const searchTitle = document.getElementById("searchBookTitle").value;
        const elementArticle = document.querySelectorAll('.book_item');
        for (title of elementArticle) {
            if (title.childNodes[0].innerText.toLowerCase().includes(searchTitle.toLowerCase())) {
                title.style.display = "block";
            } else {
                title.style.display = "none";
            }
        }
    });

});
document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil disimpan.");
});
document.addEventListener("ondataloaded", () => {
    refreshDataFromBookShelf();
});


