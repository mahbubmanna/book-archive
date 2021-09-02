/* common variables and objects */
const searchField = document.getElementById('search-field');
const resultInfo = document.getElementById('result-info');
const searchResult = document.getElementById('search-result');

/*  function for searching */
const searchBooks = async () => {
    const searchText = searchField.value;

    // checking the search-field is blank or not. if blank, the function will ask for search again. else the function will progress. 
    if (searchText === '') {
        // to remove previous result (if any)
        searchResult.textContent = '';
        resultInfo.textContent = '';

        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `<h3 class="text-center text-secondary">Please, write something to search.</h3>`;
        searchResult.appendChild(div);
    }
    else {
        // clear search field
        searchField.value = '';

        // loading data
        const url = `https://openlibrary.org/search.json?q=${searchText}`;

        const res = await fetch(url);
        const data = await res.json();
        displayBooks(data);
    }
}


/* function for displaying search result */
const displayBooks = data => {
    // removing previous result (if any)
    searchResult.textContent = '';
    resultInfo.innerText = '';


    const totalFound = data.numFound; //Total founded
    const allbooks = data.docs;

    /* the function will first check the search result is blank or not. If not, the function will progress. else, it will show an error message */

    if (allbooks.length) {

        const books = allbooks.slice(0, 30); // we will show maximum 30

        // displaying the number of books found and the number of books shown. 
        resultInfo.innerText = `Total found: ${totalFound}; Showing: ${books.length}`;

        //Displaying Books
        books.forEach(book => {
            // creating a div for displaying each book 
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card h-100">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" width="100%" alt="">
                <div class="card-body">
                    <h4 class="card-title">${book.title}</h4>
                    <h5>Author: ${book.author_name}</h5>
                    <p class="card-text">
                    Publisher: ${book.publisher ? book.publisher : 'Not Available'} <br>
                    First Published: ${book.first_publish_year ? book.first_publish_year : 'Not Available'}
                    </p>
                </div>
            </div >
            `
            searchResult.appendChild(div);
        });
    }

    else {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `<h3 class="text-center text-secondary">No result found</h3>`;
        searchResult.appendChild(div);
    }
}