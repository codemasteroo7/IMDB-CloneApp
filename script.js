const apikey = "66bd362c";
const apiBaseUrl = "https://www.omdbapi.com";
const query = "all";
const placeHolderIMage="https://cdn.dribbble.com/users/17914/screenshots/4902225/media/0d6d47739dae97adc81ca7076ee56cc9.png"
// Placeholder to show if image is not available

const moviesGrid = document.getElementById('movies-grid');

const searchInput=document.getElementById('search-input');

const searchForm=document.getElementById('search-form');


//To fetch movies from th api
async function fetchMoviesNowPlaying() {
    const response = await fetch(`${apiBaseUrl}?apikey=${apikey}&s=${query}`);
    const movies = await response.json();
    // const movies = jsonResponse.search;
    displayMovies(movies.Search);
    console.log(movies.Search);
}

//Added seach movies query to search movies
async function searchMovies(query) {
    const response = await fetch(`${apiBaseUrl}?apikey=${apikey}&s=${query}`);
    const movies = await response.json();
    // const movies = jsonResponse.search;
    displayMovies(movies.Search);
    console.log(movies.Search);
}


//Display the data of the specific movie, when searched and clicked on Movie image
function displayMovies(movies) {
    let moviesHTML = '';
  
    if (movies && movies.length) {
      movies.forEach(item => {
        let img = `
        <div class="card" style="width: 18rem;">
            <img src="${item.Poster == "N/A" ? placeHolderIMage : item.Poster}" class="card-img-top movie-image">
            <div class="card-body">
                <h5 class="card-title">${item.Title}</h5>
                <a href="movie.html?id=${item.imdbID}" class="btn btn-primary">View details</a>
                <button value="${item.imdbID}" class="favourite-btn btn btn-primary" data-movie_image="${item.Poster}" data-movie_title="${item.Title}">Favourite</button>
            </div>
        </div>`;
        moviesHTML = moviesHTML + img;
      });
    } else {
      moviesHTML = `<p>No movies found.</p>`;
    }
  
    moviesGrid.innerHTML = moviesHTML;
    
    //After clicking on button will get the specific movie in favourates 
    const Favrate = document.querySelectorAll('.favourite-btn');
    Favrate.forEach((btn) => {
      btn.addEventListener('click', (e) => {
  
        let m_id = e.target.value;
        let m_image = e.target.getAttribute('data-movie_image');
        let m_title = e.target.getAttribute('data-movie_title');
  
        const movieObj = {
          title: m_title,
          id: m_id,
          image: m_image
        }
  
        saveToLocalStorage(movieObj);
        // alert('Added to favrouties');
  
      })
    });
  }
  



//Function to save movie data to Localstorage
function saveToLocalStorage(movieObj) {
    console.log(movieObj);

    let movies;
    if (localStorage.getItem('fav-movies') === null) {
        movies = [];
        movies.push(movieObj);
        localStorage.setItem('fav-movies', JSON.stringify(movies));
        alert('Added to favourites');
        return;
    } else {
        movies = JSON.parse(localStorage.getItem('fav-movies'));

        // check if movie already exists
        let exists = false;
        for (let i = 0; i < movies.length; i++) {
            if (movies[i].id === movieObj.id) {
                console.log('exists');
                exists = true;
                break;
            }
        }

        if (!exists) {
            console.log('not exists');
            movies.push(movieObj);
            localStorage.setItem('fav-movies', JSON.stringify(movies));
            alert('Added to favourites');
        } else {
            alert('Movie already exists');
        }
    }
}



function handleSearchFormSubmit( event){
    event.preventDefault();
    const searchQuery= searchInput.value;
    if(searchQuery.length >= 3) {
        searchMovies(searchQuery);
    }    
}

searchForm.addEventListener("input",handleSearchFormSubmit);

fetchMoviesNowPlaying();