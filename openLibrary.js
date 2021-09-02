const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);

    // clear data
    searchField.value = '';

    
    if (searchText == '') {
        // console.log('please write something');
        const write = document.getElementById('getErrorMessage');
        write.innerText = '';
        const p = document.createElement('p');
       
        p.innerText = "Please write something";
        // const write = document.getElementById('getErrorMessage');
        // p.innerText = '';
        write.appendChild(p);   
       
    }
    
    else {
           // load data
    const url = `https://openlibrary.org/search.json?q=${searchText}`;

    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.docs));  
    }

}

const displaySearchResult = docs => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    if (docs.length == 0) {
        // console.log("No result found");
        // console.log(doc);
        const p = document.createElement('p');
        p.innerText = "No result found";
        const p1 = document.getElementById('getErrorMessage');
        searchResult.appendChild(p);    
    }

    docs.forEach(doc => {
        console.log(doc);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
            <img src="https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg" class="card-img-top img-thumbnail" style="height: 500px" alt="No image">
            <div class="card-body">
              <h5 class="card-title">Title: ${doc.title}</h5>
              <p class="card-text">Author: ${doc.author_name?.[0]}</p>
              <p class="card-text">Publisher: ${doc.publisher?.[0]}</p>
              <p class="card-text">First Published: ${doc.first_publish_year}</p>
            </div>
        </div>
        `;
        searchResult.appendChild(div);
    })
    const result = document.getElementById('totalResult');
    result.innerText = '';
    const h3 = document.createElement('h3');
    h3.innerText = `Result Found: ${docs.length}`;
    result.appendChild(h3);
    
}

