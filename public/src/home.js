function getTotalBooksCount(books) {
  //returns the number of book objects of the books array
  return books.length;
}

function getTotalAccountsCount(accounts) {
  //returns the number of accounts in the account array
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
  // iterating through the whole books array
  books.forEach(({ genre } = book) => {
    // for each book, if statement to find if the genre object exists already
    if (resultArr.find((resultObj) => resultObj.name === genre)) {
      resultArr.forEach((result) => {
        // for each object in the resultArr check to see if that is the correct object
        if (result.name === genre) result.count++;
      });
    } else {
      resultArr.push({ name: genre, count: 1 });
    }
  });
  return sortSlice(5, resultArr);
}

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
  // const resultArr = [];
  // grabbing each author one by one
  let resultArr = authors.map(({ name: { first, last }, id } = author) => {
    // create the object for each author and initialize the count to 0
    let auth = { name: `${first} ${last}`, count: 0 };
    // use .reduce to iterate through each book object and if the authorId of the book and the id of the author match
    // then add the borrow history to the authors count
    auth.count = books.reduce((acc, { borrows, authorId } = book) => {
      if (authorId === id) acc += borrows.length;
      return acc;
    }, 0);
    // resultArr.push(auth);
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
