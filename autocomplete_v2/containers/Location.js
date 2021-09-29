import Autocomplete from '../components/autocomplete.js';

import Keys from '../_development.keys.js';

const fetchPositionData = async (searchStr = '') => {
  try {
    const { data } = await axios(Keys.POSITION_BASE_URL, {
      params: {
        access_key: Keys.POSITION_API_KEY,
        query: searchStr,
      },
    });
    if (data && data.data.length == 0)
      throw new Error('Could not find location');
    return data.data;
  } catch (err) {
    if (err.response) {
      const {
        code,
        context: {
          query: { message },
        },
      } = err.response.data.error;
      if (code === 'validation_error') {
        throw new Error(message);
      }
    }
    throw new Error(err.message);
  }
};

const addressConfig = {
  onSearch(inputValue) {
    return fetchPositionData(inputValue);
  },
  renderOption(location) {
    const { label, country } = location;
    return `
        <span>${label}</span> -
        <span>${country}</span>
      `;
  },
  setInputAfterSelect(location) {
    return location.label;
  },
};

export default new Autocomplete({
  ...addressConfig,
  root: document.querySelector('#address'),
  name: 'address',
  title: 'Address',
  OnOptionSelect(location) {
    console.log(location);
  },
  errorRoot: document.body,
});
