//returns the number of book objects of the books array
function getTotalBooksCount(books) {
  return books.length;
}

//returns the number of accounts in the account array
function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.reduce((acc, { borrows } = book) => {
    if (!borrows[0].returned) acc++;
    return acc;
  }, 0);
}

// returns an array containing 5 or fewer objects where each index
// contains an object with the `name` and `count`
function getMostCommonGenres(books) {
  const resultArr = [];
  books.forEach(({ genre } = book) => {
    if (resultArr.find((resultObj) => resultObj.name === genre)) {
      resultArr.forEach((result) => {
        if (result.name === genre) result.count++;
      });
    } else {
      resultArr.push({ name: genre, count: 1 });
    }
  });
  return sortSlice(5, resultArr);
}

// returns an array of the 5 most popular books
// books are weighted by the number of times a book has been borrowed
function getMostPopularBooks(books) {
  const resultArr = books.map(({ title, borrows } = book) => {
    return { name: title, count: borrows.length };
  });
  return sortSlice(5, resultArr);
}

// popularity is represented by finding all books writted by author and then adding
// the number of times those books have been borrowed
// return an array containing {name: authName, count: borrowedCount}
function getMostPopularAuthors(books, authors) {
  const resultArr = authors.map(({ name: { first, last }, id } = author) => {
    let auth = { name: `${first} ${last}`, count: 0 };
    auth.count = books.reduce((acc, { borrows, authorId } = book) => {
      if (authorId === id) acc += borrows.length;
      return acc;
    }, 0);
    return auth;
  });
  return sortSlice(5, resultArr);
}

// helper function to sort items in an array from largest to smallest and then return only `totalItems` number of items
function sortSlice(totalItems, arr) {
  arr.sort((item1, item2) => item2.count - item1.count);
  return arr.slice(0, totalItems);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
