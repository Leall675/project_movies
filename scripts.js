const url = 'https://api.themoviedb.org/3/discover/movie?api_key=cf9defa106a344348baf72362659da25&language=pt-BR';

const createStars = (vote_average) => {
  const starsContainer = document.createElement('p');
  starsContainer.classList.add('stars-container');

  const numStar = Math.round(vote_average / 2);

  for (let i = 0; i < 5; i++) {
    const star = document.createElement('i');
    star.classList.add(i < numStar ? 'fas' : 'far', 'fa-star', i < numStar ? 'full-star' : 'empty-star');
    starsContainer.appendChild(star);
  }

  return starsContainer;
}

const truncateOverview = (text, maxLength) => 
  text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;

const renderMovies = (movies) => {
  const ul = document.querySelector('[data-js="filmes-list"]');
  const fragment = document.createDocumentFragment();

  movies.forEach(({ title, overview, poster_path, vote_average }) => {
    const li = document.createElement('li');
    li.className = `card ${overview ? 'has-description' : ''}`;

    const img = document.createElement('img');
    img.src = `https://image.tmdb.org/t/p/original${poster_path}`;
    img.alt = title;
    img.className = 'card-image';

    const titleMovie = document.createElement('h2');
    titleMovie.className = 'card-title';
    titleMovie.textContent = title;

    const descriptionMovie = document.createElement('p');
    descriptionMovie.className = 'card-description';
    descriptionMovie.textContent = truncateOverview(overview, 100);

    const stars = createStars(vote_average);

    li.append(img, titleMovie, stars, descriptionMovie);
    fragment.appendChild(li);
  });

  ul.appendChild(fragment);
}

const getMovies = async () => {
  try {
    const response = await fetch(url);
    const { results: moviesApi } = await response.json();
    renderMovies(moviesApi);
  } catch (error) {
    console.error('Erro ao obter dados:', error);
  }
};

getMovies();
