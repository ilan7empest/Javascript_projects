import Autocomlete from './components/Autocomlete.js';
import MovieDetails from './components/movie-details.js';

const API_KEY = 'cfff9dc8';
const base_url = 'http://www.omdbapi.com/';

let moviesToCompare = {
  left: null,
  right: null,
};

const autocompleteConfig = {
  onSearch: (searchTerm) => {
    return fetchData(searchTerm);
  },
  renderOptions: ({ Poster, Title, Year }) => {
    const imgSrc = Poster === 'N/A' ? '' : Poster;
    return `
        <img src=${imgSrc} />
        <h1>${Title} <small>(${Year})</small></h1>
      `;
  },
  afterSelectionInputValue: (result) => {
    return result.Title;
  },
};

new Autocomlete({
  ...autocompleteConfig,
  name: 'automplete1',
  title: 'Movie',
  root: document.querySelector('#left-autocomplete'),
  onOptionSelect: ({ imdbID }) => {
    document.querySelector('.tutorial').classList.add('is-hidden');

    const results = document.querySelector('#left-summary');
    renderMovieDetails(imdbID, results, 'left');
  },
});

new Autocomlete({
  ...autocompleteConfig,
  name: 'automplete2',
  title: 'Movie',
  root: document.querySelector('#right-autocomplete'),
  onOptionSelect: ({ imdbID }) => {
    document.querySelector('.tutorial').classList.add('.is-hidden');

    const results = document.querySelector('#right-summary');
    renderMovieDetails(imdbID, results, 'right');
  },
});

const renderMovieDetails = async (movie, summaryEl, side) => {
  const data = await fetchData(movie);
  summaryEl.innerHTML = '';
  summaryEl.insertAdjacentHTML('afterbegin', MovieDetails(data));

  moviesToCompare[side] = true;

  if (moviesToCompare['left'] && moviesToCompare['right']) {
    runComparison();
  }
};

const runComparison = () => {
  const left = document.querySelectorAll('#left-summary .notification');
  const right = document.querySelectorAll('#right-summary .notification');

  left.forEach((el, i) => {
    if (parseFloat(el.dataset.value) > parseFloat(right[i].dataset.value)) {
      el.classList.add('is-warning');
      right[i].classList.remove('is-warning');
    } else {
      right[i].classList.add('is-warning');
      el.classList.remove('is-warning');
    }
  });
};

const fetchData = async (searchTerm) => {
  const isimdbID = searchTerm.slice(0, 2) === 'tt';
  const searchParams = !isimdbID ? { s: searchTerm } : { i: searchTerm };
  try {
    const res = await axios.get(base_url, {
      params: {
        apikey: API_KEY,
        ...searchParams,
      },
    });
    if (!res) throw new Error('NO DATA');
    if (res.data.Error) return [];

    let { data } = res;
    if (data.hasOwnProperty('Search')) {
      return data.Search;
    } else {
      return data;
    }
  } catch (err) {
    return err;
  }
};
