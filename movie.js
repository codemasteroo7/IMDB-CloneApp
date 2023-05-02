const apikey = "66bd362c";
const apiBaseUrl = "http://www.omdbapi.com";
// const query = "all";

const movieBlock = document.getElementById('movie-details');


const url = new URL(window.location.href);
const queryParams = url.searchParams;
// console.log(queryParams);
const queryParamValue = queryParams.get("id");

console.log(queryParamValue);   

getMoviedetais(queryParamValue);


// Function definitions

async function getMoviedetais(id) {
    const response = await fetch(`${apiBaseUrl}?apikey=${apikey}&i=${id}`);
    const movie = await response.json();
    // const movies = jsonResponse.search;
    // displayMovies(movies.Search);
    generateHTML(movie);
    console.log(movie);
}

function generateHTML(what)
{
    let html = `
        <div class='d-flex justify-content-between'>
            <h2>${what.Title}</h2>
            <div class=''>
                <p>IMDB rating: ${what.imdbRating}/10 </p>
                <p>Votes: ${what.imdbVotes} </p>
            </div>
        </div>
        
        <div class='d-flex justify-content-evenly my-4'>
            <img src="${what.Poster}" class="img-fluid px-4" />
            <div class='d-flex flex-column align-items-start text-start'>
                <p> ${what.Plot}</p>
                <p>Year: ${what.Year} </p>
                <p>Rated: ${what.Rated} </p>
                <p>Date Released: ${what.Released} </p>
                <p>${what.Runtime}</p>
                <p>Production: ${what.Production} </p>
                <p>Director: ${what.Director} </p>
                <p>Actors: ${what.Actors} </p>
                <p>Genre: ${what.Genre} </p>
            </div>
        </div> 
        `;
    movieBlock.innerHTML=html;    
}
// movieBlock.innerHTML=movies.html;    