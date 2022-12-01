import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetchCountries';
import { createListCountries } from './js/createListCountries';
import { createMarkupCardCountry } from './js/createMarkupCardCountry';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange(e) {
  const value = e.target.value;

  fetchCountries(value.trim())
    .then(renderCardCountry)
    .catch(error => console.log(error));
}

function renderCardCountry(country) {
  // console.log(country);

  if (country.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }

  if (country.length >= 2 && country.length <= 10) {
    const markup = country.map(createListCountries);
    countryList.insertAdjacentHTML('beforeend', markup.join(''));
  }

  if (country.length === 1) {
    const markup = createMarkupCardCountry(country[0]);
    countryInfo.innerHTML = markup;
    // console.log(markup);
  }
}
