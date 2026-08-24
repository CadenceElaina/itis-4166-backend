const book = {
  title: "Animal Farm",
  published: 1949,
  author: { firstName: "George", lastName: "Owell" },
  genres: ["classic", "fiction", "fantasy"],
  "age group": "13 and above",
  getAuthorName: function () {
    return `${this.author.firstName} ${this.author.lastName}`;
  },
};

console.log(book.title, book["age group"]);
//console.log(book.age group) --- have to use bracket notation to access
console.log(book.getAuthorName());
console.log("id" in book, "author" in book);

book.ratings = 4.38;
console.log(book.ratings);
console.log(book.hasOwnProperty("genres"));
console.log(book.hasOwnProperty("another_property"));

console.log(Object.keys(book));
console.log(Object.values(book));
delete book.ratings;

for (const key in book) {
  console.log(book[key]);
}
