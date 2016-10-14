// DOM Reference.
var container = document.querySelector('.container');

// Load all of the JSON data and render to screen.
var movies = [];
var list = [];
var listPos = 1;
fetch('/helpers/movies.json').then(function(res) {
  return res.json();
}).then(function(data) {
  movies = data;

  // Render the first 50 movies.
  movies.slice(0, 75).forEach(renderMovie);
});

// Setup event listener on the window to check if we should display more movies.
window.addEventListener('scroll', function addNewMovies() {
  var scrollY = document.body.scrollTop + window.innerHeight;
  if (movies.length > 0 && scrollY === document.body.scrollHeight) {
    var removals = list.slice((listPos - 1) * 50, listPos * 50);
    window.scrollTo(0, document.body.scrollTop - removals[removals.length - 1].offsetTop);
    removals.forEach(function(elm) {
      container.removeChild(elm);
    });

    movies.slice(listPos * 50, ++listPos * 50).forEach(renderMovie);
  }

  // Loop through elements and fade them out when they go off the screen.
  for (var i=0; i<list.length; i++) {
    var topDiff = list[i].offsetTop - document.body.scrollTop;
    var opacity = Math.abs(topDiff) / document.body.offsetHeight;
    if (opacity >= 0 && opacity <= 1) {
      list[i].style.opacity = 1 - opacity;
      list[i].style.filter = 'grayscale(' + (opacity * 100) + '%)';
    }
  }
}, false);

/**
 * Render each movie poster and add it to th DOM.
 * @param  {Object} data Data about the movie.
 */
function renderMovie(data) {
  // Setup the DOM elements.
  var movie = document.createElement('div');
  var poster = document.createElement('div');
  var image = document.createElement('img');
  var overview = document.createElement('a');
  var title = document.createElement('div');
  var rating = document.createElement('div');
  movie.className = 'movie';
  poster.className = 'poster';
  image.className = 'image';
  overview.className = 'overview';
  title.className = 'title';
  rating.className = 'rating';

  // Fill in the data to these elements.
  image.src = '/helpers/posters' + data.poster;
  overview.href = 'https://www.themoviedb.org/movie/' + data.id;
  overview.innerText = data.overview;
  title.innerText = data.title;
  rating.innerText = data.rating;

  // Add the movie to the list.
  poster.appendChild(image);
  poster.appendChild(overview);
  movie.appendChild(poster);
  movie.appendChild(title);
  movie.appendChild(rating);
  container.appendChild(movie);

  // Add the DOM movie element to the list to track.
  list.push(movie);
}