function findAccountById(accounts, id) {
  let acc = accounts.filter((account) => account.id === id);
  return acc[0];
}

function sortAccountsByLastName(accounts) {
  // sort() by accounts.name.last
  return accounts.sort((accA, accB) =>
    accA.name.last > accB.name.last ? 1 : -1
  );
}

function getTotalNumberOfBorrows(account, books) {
  const accId = account.id;
  // create a counter
  let counter = 0;
  // foreach on the borrow array
  books.forEach((book) =>
    book.borrows.forEach((borrow) => {
      if (borrow.id === accId) counter++;
    })
  );
  return counter;
}

function getBooksPossessedByAccount(account, books, authors) {
  // check the borrows array for the first element(checkedout element)
  // if returned is true that book is not checkout out
  // if returned is false then check accId to see if
  // books.authorId, books.borrows.id, account.id, authors.id
  let possArr = [];
  books.forEach((book) => {
    if (!book.borrows[0].returned && book.borrows[0].id === account.id)
      possArr.push(book);
    book.author = authors.find((author) => author.id === book.authorId);
  });
  return possArr;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
