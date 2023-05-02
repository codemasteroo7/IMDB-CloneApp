const favBlock = document.getElementById('favourite-details');
const movies = JSON.parse(localStorage.getItem('fav-movies'));
const placeHolderIMage="https://cdn.dribbble.com/users/17914/screenshots/4902225/media/0d6d47739dae97adc81ca7076ee56cc9.png";

displayMovies(movies); 


function displayMovies(movies) {
    let favouriteHTML = '';

    movies.forEach(item => {
        let img = `  
        <div class="card mx-4" style="width: 18rem;">
            <img src="${item.image == "N/A" ? placeHolderIMage : item.image}" class="card-img-top movie-image">
            <div class="card-body">
                <h5 class="card-title">${item.title}</h5>
                <button value="${item.id}" class="btn btn-danger remove-btn">remove</button>
            </div>
        </div>`;
        favouriteHTML = favouriteHTML + img ;
    });
    
    favBlock.innerHTML=favouriteHTML;
    const buttons=document.querySelectorAll('.remove-btn');
    buttons.forEach((btn)=>{
        btn.addEventListener('click',(e)=>{
                console.log(e.target.value);
                removeMovie(e.target.value);
        })
    })
}
function removeMovie(id){
    // find the index of the movie with the given id
    const index = movies.findIndex(movie => movie.id === id);
  
    // if the movie was found, remove it from the array
    if (index !== -1) {
      movies.splice(index, 1);
  
      // update the display with the new movie list
      displayMovies(movies);
  
      // update the local storage to reflect the new movie list
      localStorage.setItem('fav-movies', JSON.stringify(movies));
    }
  }
  