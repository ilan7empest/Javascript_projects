import Autocomplete from '../components/autocomplete.js';
import Keys from '../_development.keys.js';

/**
 * Async Function to fetch data based on a search term
 * @param {string} searchStr movie title or an IMDB id
 * @returns {fetchMovieData} data api parsed response
 */

const fetchMovieData = async (searchStr = '') => {
  const isIMDB = searchStr.includes('tt');
  try {
    const { data } = await axios(
      `${Keys.MOVIES_BASE_URL}?apikey=${Keys.MOVIES_API_KEY}&${
        isIMDB ? 'i' : 's'
      }=${searchStr}`
    );
    if (!data || data.Error) throw new Error(data.Error);
    const res = isIMDB ? data : data.Search;
    return res;
  } catch (err) {
    throw new Error(err.message);
  }
};

const moviesConfig = {
  onSearch(inputValue) {
    return fetchMovieData(inputValue);
  },
  renderOption({ Poster, Title, Year }) {
    const imgSrc = Poster === 'N/A' ? '' : Poster;
    return `
        <img src=${imgSrc} />
        <h1>${Title} <small>(${Year})</small></h1>
      `;
  },
  setInputAfterSelect(movie) {
    return movie.Title;
  },
};

export default new Autocomplete({
  ...moviesConfig,
  root: document.querySelector('#movies'),
  name: 'autocomplete1',
  title: 'Movies',
  OnOptionSelect(movie) {
    const { imdbID } = movie;
    console.log(imdbID);
  },
  errorRoot: document.body,
});
