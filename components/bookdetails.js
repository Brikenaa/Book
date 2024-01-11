document.addEventListener("DOMContentLoaded", function () {
    const contentElement = document.getElementById('content');
    const bookListElement = document.getElementById('bookList');
    const searchInput = document.getElementById('searchInput');
  
    let data = [];
    let orgData = [];
  
    function renderBooks(books) {
      bookListElement.innerHTML = '';
      books.forEach((book) => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.onclick = () => openModal(book);
        bookCard.innerHTML = `
          <img src="${book.image_url}" alt=''>
          <p>Title: ${book.title}</p>
          Author: ${book.authors}
          Rating: ${book.rating}
        `;
        bookListElement.appendChild(bookCard);
      });
    }
  
    function filterBooksByTitle(title) {
      const filteredBooks = orgData.filter((book) =>
        book.title.toLowerCase().includes(title.toLowerCase())
      );
      renderBooks(filteredBooks);
    }
  
    function openModal(book) {
      console.log("Modal for book:", book);
    }
  
    fetch('https://example-data.draftbit.com/books?_limit=12')
      .then(response => response.json())
      .then(responseData => {
        data = responseData;
        orgData = responseData;
        renderBooks(data);
      })
      .catch(error => console.error('Gabim gjatë marrjes së të dhënave:', error));
  
    contentElement.style.opacity = 1;
    contentElement.style.transform = 'translateY(0)';
  
    searchInput.addEventListener('input', function () {
      filterBooksByTitle(this.value);
    });
  });