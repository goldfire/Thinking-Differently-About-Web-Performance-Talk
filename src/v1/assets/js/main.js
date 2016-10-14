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
  if (window.DEBUG) {
    debugger;
  }

  var scrollY = document.body.scrollTop + window.innerHeight;
  if (movies.length > 0 && scrollY === document.body.scrollHeight) {
    movies.slice(listPos * 50, ++listPos * 50).forEach(renderMovie);
  }
}, false);

/**
 * Render each movie poster and add it to th DOM.
 * @param  {Object} data Data about the movie.
 */
function renderMovie(data) {
  if (window.DEBUG) {
    debugger;
  }

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

  // Setup event listener on the window to check if this movie is out of view and remove it.
  // var top = movie.offsetTop;
  window.addEventListener('scroll', function fadeOutPoster() {
    if (window.DEBUG) {
      debugger;
    }

    for (var elm of list) {
      var topDiff = elm.offsetTop - document.body.scrollTop;
      var opacity = Math.abs(topDiff) / document.body.offsetHeight;
      elm.style.opacity = 1 - opacity;
      elm.style.filter = 'grayscale(' + (opacity * 100) + '%)';
    }
  }, false);

  // Add the DOM movie element to the list to track.
  list.push(movie);
}