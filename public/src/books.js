function findAuthorById(authors, id) {
  let auth = authors.filter((author) => author.id === id);
  return auth[0];
}

function findBookById(books, id) {
  let book = books.filter((book) => book.id === id);
  return book[0];
}

function partitionBooksByBorrowedStatus(books) {
  // create two arrays, first with the currently checkedout
  // books and second with the returned books.
  const bookList = [];
  bookList[0] = books.filter((book) => {
    if (!book.borrows[0].returned) return book;
  });
  bookList[1] = books.filter((book) => {
    if (book.borrows[0].returned) return book;
  });
  return bookList;
}

function getBorrowersForBook({ borrows } = book, accounts) {
  let borrowHistory = [];
  for (let i = 0; i < borrows.length && i < 10; i++) {
    borrowHistory.push(borrows[i]);
  }

  borrowHistory = borrowHistory.map((checkout) => {
    let acc = accounts.find((account) => account.id === checkout.id);
    acc.returned = checkout.returned;
    return acc;
  });
  return borrowHistory;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
