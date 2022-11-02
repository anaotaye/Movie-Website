const apiKey = 'd51bb729f6c3da0d86ab9f78f4ade067';
const imageUrl = 'https://image.tmdb.org/t/p/w500';
const searchApi = `"https://api.themoviedb.org/3/search/movie?api_key=${apiKey}"`;
const movieUrl = `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}&append_to_response=images`;

const form = document.querySelector(".search-form");
form.addEventListener("submit", handleSubmit);


const searchArray = [];
let searchCheck = false;
// form.addEventListener('submit', (event) => {
//   event.preventDefault();

//   const input = document.querySelector(".search-input").value;
//   const searchQuery = input.trim();
//   console.log(searchQuery);
//   // selectedGenre=[];
//   // setGenre();
//   if(searchQuery) {
//       getMovieApi(searchApi+'&query='+searchQuery);
//   }else{
//       getMovieApi(movieUrl);
//   }
// })

function checkApi () {
  if (searchCheck) {
    displayMovies(searchArray);
    console.log(searchCheck);
    console.log("Hey");
  } else {
    getMovieApi(movieUrl);
  }
}



// Handling Submit
async function handleSubmit(event) {
    event.preventDefault();
    const input = document.querySelector(".search-input").value;
    let searchQuery = input.trim();
    
    console.log(searchQuery);

    // const searchResults = document.querySelector(".movie-list");
    // searchResults.innerHTML = "";
   
    try {
      if (searchQuery !== null){
        searchCheck = true
        const results = await searchMovies(searchQuery);
        searchArray.push(results.results);
        console.log(searchArray);
      }
      else{
        searchCheck = false;
      }
      // console.log(results);
      console.log("nice");
        // if (searchQuery) {
        //   displayMovies(results.results);
        // }
        // else {
        //   getMovieApi(movieUrl);
        // }

      // console.log(results.results);
      // displayMovies(results.results);
      checkApi();
    } catch (error) {
        console.log(error);

        if (Error instanceof SyntaxError) {
          console.log("Syntax error");
        } 
        else {
          console.log("Failed to search Movies DB");
        }
    } 
    // finally {
    //     loader.classList.add("hidden");
    // }
}

// Search Function
async function searchMovies(searchQuery) {
  const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}`;
  const response = await fetch(searchUrl);
  console.log(response);

  if (!response.ok) {
    throw Error(response.statusText);
    checkApi();
  }

  const data = await response.json();
  console.log(data);
  return data;
}

// getMovieApi(movieUrl);

//Getting trending movies
async function getMovieApi(url) {
  const response = await fetch(url);
  let data = await response.json();

  if (!response.ok) {
    throw Error(response.statusText);
  }

  displayMovies(data.results);
  console.log(data.results);

  return data;
}



const movieList = document.querySelector(".movies");
const list = document.createDocumentFragment();

// Displaying movie genres
function displayMovies(data) {
  data.map(
    ({
      poster_path,
      title,
      release_date,
      overview,
      media_type,
      name,
      first_air_date,
      id,
    }) => {
      let li = document.createElement("li");
      const picElem = document.createElement("img");
      picElem.src = `${imageUrl}${poster_path}`;
      picElem.alt = "movie poster";
      let titleElem = document.createElement("h2");
      let dateElem = document.createElement("h3");
      let overviewElem = document.createElement("p");
      titleElem.innerHTML = media_type === "movie" ? `${title}` : `${name}`;
      dateElem.innerHTML =
        media_type === "movie" ? `Date released: ${release_date}` : `First air date: ${first_air_date}`;
      titleElem.classList.add("name");
      dateElem.classList.add("date");
      overviewElem.innerHTML = `${overview}`;
      overviewElem.classList.add("overview");
      li.appendChild(picElem);
      li.appendChild(titleElem);
      li.appendChild(dateElem);
      li.appendChild(overviewElem);
      li.classList.add("movie");
      list.appendChild(li);
    }
  );
  movieList.appendChild(list);
}

//Getting movies genres
// async function getMovieGenres(url) {
//   const response = await fetch(url);
//   let data = await response.json();
//   console.log(response);
//   console.log(data.genres);

//   if (!response.ok) {
//     throw Error(response.statusText);
//   }

//   displayGenres(data.genres);
//   return data;
// }

// const genreUrl =
//   `"https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US"`;
// getMovieGenres(genreUrl);

// const postGenre = document.querySelector("genres");
// const genreList = document.createDocumentFragment();
// let selectedGenre = [];

// function displayGenres(data) {
//   let genres = data;
//   // console.log(typeof(genres));
//   genres.map(({name, id}) => {
//     console.log(name);
//   })
//   postGenre.innerHTML = '';
  // genres.map(({id, name}) => {
  //   let genreName = `${name}`;
  //   let genreElem = document.createElement("div");
  //   genreElem.classList.add("genre");
  //   genreElem.innerText = genreName;
  //   genreElem.id = `${id}`;
  //   console.log(typeof(genreElem));
  //   // genreList.appendChild(genreElem)
  //   // console.log(genreList);

  //   genreElem.addEventListener('click', () => {
  //       if (selectedGenre.length === 0) {
  //           selectedGenre.push(genreElem.id);
  //       } 
  //       else if (selectedGenre.includes(genreElem.id)) {
  //           selectedGenre.forEach((id, idx) => {
  //               if (id === genreElem.id) {
  //                   selectedGenre.splice(idx, 1);
  //               }
  //               });
  //       } else {
  //           selectedGenre.push(genreElem.id);
  //       }
  //       console.log(selectedGenre);
  //   });
  // });
  // postGenre.insertAdjacentElement("beforeend",genreElem);
// }


// async function getReviews(url) {
//   const response = await fetch(url);
//   let data = await response.json();

//   if (!response.ok) {
//     throw Error(response.statusText);
//   }

//   return data;
// }

// let reviewUrl = 
// getReviews(reviewUrl);

// async function getComingSoon () {
//   const response = await fetch(url);
//   let data = await response.json();

//   if (!response.ok) {
//     throw Error(response.statusText);
//   }

//   return data;
// }

// let comingSoonUrl = 
// getComingSoon(comingSoonUrl);