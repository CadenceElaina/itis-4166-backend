const movies = [
  {
    id: 1,
    title: "The Godfather",
    director: "Francis Ford Coppola",
    year: 1972,
    genres: ["Crime", "Drama"],
    rating: 10,
  },
  {
    id: 2,
    title: "The Dark Knight",
    director: "Christopher Nolan",
    year: 2008,
    genres: ["Action", "Crime"],
    rating: 9,
  },
  {
    id: 3,
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    year: 1994,
    genres: ["Crime", "Drama"],
    rating: 9,
  },
  {
    id: 4,
    title: "Inception",
    director: "Christopher Nolan",
    year: 2010,
    genres: ["Action", "Sci-Fi"],
    rating: 8,
  },
  {
    id: 5,
    title: "The Matrix",
    director: "Lana Wachowski",
    year: 1999,
    genres: ["Sci-Fi", "Action"],
    rating: 8,
  },
  {
    id: 6,
    title: "Interstellar",
    director: "Christopher Nolan",
    year: 2014,
    genres: ["Drama", "Sci-Fi"],
    rating: 7,
  },
];

// Task 1: Add Movie
function addMovie(movieData) {
  const nextId =
    movies.length > 0 ? Math.max(...movies.map((m) => m.id)) + 1 : 1;
  const newMovie = { ...movieData, id: nextId };
  movies.push(newMovie);
  return newMovie;
  /* if (movies.length === 0) {
    let m = movieData;
    m.id = 1;
    movies.push(m);
  }
  const maxId = movies[movies.length - 1].id + 1;
  movieData.id = maxId;
  movies.push(movieData);
  return movieData;
  */
}

// Task 2: Update Rating
function updateRating(id, newRating) {
  const movieToUpdate = movies.find((elem) => elem.id === id);
  // RETURN CANNOT EXIST INSIDE AN EXPRESSION  movieToUpdate ? movieToUpdate?.rating = newRating : return false
  if (!movieToUpdate) {
    return null;
  }
  movieToUpdate.rating = newRating;
  return movieToUpdate;
}

// Task 3: Delete Movie
function deleteMovie(id) {
  const i = movies.findIndex((m) => m.id === id);
  if (i === -1) {
    return false;
  }
  movies.splice(i, 1);
  return true;
  /* containsMovie = false;
  newMovies = movies.filter((id) => {
    if (id !== id) containsMovie = true;
  });
  return containsMovie; */
}

// Task 4: Find By Director
function findByDirector(director) {
  return movies.filter((m) => m.director === director).map((m) => m.title);
  /*
    const titles = [];
    for(const m of movies){
      if(m.director === director){
        titles.push(m.title);
      }
    }
      return titles;
  *
  /*
  //filter() expects a callback to return a BOOLEAN (true/false) determining whether to keep the current item

  const titles = movies.filter((m) => {
    if (m.director === director) {
      return m.title; // returns entire matching object instead of m.title
    }
      // when a movie doesnt match the function finishes without hitting a return
      // returning undefined (falsy) so .filter() discard that element
  });
  return titles;
  */
}

// Task 5: Filter By Genre
function filterByGenre(genre) {
  return movies.filter((m) => m.genres.includes(genre)).map((m) => m.title);
  /*
  const matchingMovies = movies.filter((m) => {
    if (m.genres.includes(genre)) {
      return m.title;
      // same issue as above in task 4. returns an array of movie objects
      // .filter() can only select or reject elements - cannot transform the elements
      // to transform you need to use map()
    }
  });
  return matchingMovies;
  */
}

// Task 6: Average Rating
function averageRating() {
  if (movies.length === 0) return 0;
  const avgRating =
    movies.reduce((total, m) => {
      return total + m.rating;
    }, 0) / movies.length;

  return avgRating;
}

// Task 7: Movies Before Year
function moviesBefore(year) {
  return movies.filter((m) => m.year < year).map((m) => m.title);
  /*
  const moviesToReturn = movies.filter((m) => m.year <= year);
  if (moviesToReturn.length === 0) return [];
  return moviesToReturn;
  */
}

// Task 8: Get Top Rated Movies
function getTopRated(limit) {
  if (movies.length === 0) return [];

  return (
    [...movies] // uses the JS spread operator(...) to unpack all
      // elements of movies into a NEW ARRAY creating a shallow copy
      // .sort() rearranges IN PLACE meaning it mutates the array
      .sort((a, b) => b.rating - a.rating) // descending order
      .slice(0, limit)
  );
  //Array.from(movies).sort((a, b) => b.rating - a.rating).slice(0, limit);
  // Array.from(movies) creates a new array instance from an array-like or iterable object
  // movies.toSorted() (Modern JS / ES2023): Returns a new sorted array automatically without mutating the original.
  //movies.slice().sort((a, b) => b.rating - a.rating).slice(0, limit);
  //Calling .slice() with no arguments returns a shallow copy of the entire array.
  /*
  this would sort the actual array modifying the order - mutating it
  also this is ascending order instead of descending (highest to lowest)

  const sorted = movies.sort((a, b) => a.rating - b.rating);
  splice(limit) removes items starting from index limit to the end and returns the removed (bottom) items while mutating the array
  return sorted.splice(limit);
  */
}

// Uncomment the lines below to test your functions locally:
// console.log("\n--- Task 1: Adding a new movie ---");
// const newMovie = addMovie({ title: "Test Movie", director: "Test Dir", year: 2021, genres: ["Test"], rating: 7 });
// console.log(newMovie);
// console.log("Movies after adding:", movies);

// console.log("\n--- Task 2: Updating rating ---");
// console.log(updateRating(newMovie ? newMovie.id : 7, 9));
// console.log("Updating non-existent ID 999:", updateRating(999, 10));

// console.log("\n--- Task 3: Deleting a movie ---");
// console.log("Delete created movie:", deleteMovie(newMovie ? newMovie.id : 7));
// console.log("Delete non-existent ID 999:", deleteMovie(999));

// console.log("\n--- Task 4: Find by director ---");
// console.log(findByDirector("Christopher Nolan"));

// console.log("\n--- Task 5: Filter by genre ---");
// console.log(filterByGenre("Sci-Fi"));

// console.log("\n--- Task 6: Average rating ---");
// console.log(averageRating());

// console.log("\n--- Task 7: Movies before 2000 ---");
// console.log(moviesBefore(2000));

// console.log("\n--- Task 8: Top 3 rated movies ---");
// console.log(getTopRated(3));

// Export all functions and movies array
module.exports = {
  movies,
  addMovie,
  findByDirector,
  filterByGenre,
  averageRating,
  moviesBefore,
  updateRating,
  deleteMovie,
  getTopRated,
};
