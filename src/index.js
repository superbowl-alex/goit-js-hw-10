import './css/styles.css';
import { fetchCountries } from './fetchCountries';
// import { markupCountry } from './markupCountry';
import Notiflix from 'notiflix';

let debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  output: document.querySelector('.country-info'),
};
refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  e.preventDefault();
  clearCountryList();
  const nameOfSearchCountry = refs.input.value.trim();
  if (nameOfSearchCountry) {
    fetchCountries(nameOfSearchCountry)
      .then(data => {
        formatOutput(data);
        data.map(renderCountryList);
      })
      .catch(onFetchError);
  }
}

function onFetchError(error) {
  Notiflix.Notify.failure('Oops, there is no country with that name', {
    position: 'center-top',
  });
}

function renderCountryList(data) {
  refs.list.insertAdjacentHTML('beforeend', markupCountry(data));
  console.log(data);
}

function clearCountryList() {
  refs.list.innerHTML = '';
}

function formatOutput(data) {
  const numberOfCountries = Object.keys(data).length;
  refs.list.classList.remove('hide');
  // refs.details.classList.remove('hide');
  if (numberOfCountries > 10) {
    refs.list.classList.add('hide');
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.',
      {
        position: 'center-top',
      }
    );
  } else if (numberOfCountries > 1 && numberOfCountries < 10) {
    // refs.details.classList.add('hide');
  } else if (numberOfCountries === 1) {
  }
}

function markupCountry({
  name: { official },
  capital,
  population,
  flags: { svg },
  languages,
}) {
  const langList = Object.values(languages);
  const markup = `<div class="country-info__name-thumb">
  <img
    src="${svg}"
    alt="flag"
    width="30"
    height="30"
    class="country-info__img"
  /><span class="country-info__name">${official}</span>
</div>
<ul class="country-info__list">
  <li class="country-info__item">
    <p class="country-info__text">
      Capital: <span class="country-info__text-description">${capital}</span>
    </p>
  </li>
  <li class="country-info__item">
    <p class="country-info__text">
      Population:
      <span class="country-info__text-description">${population}</span>
    </p>
  </li>
  <li class="country-info__item">
    <p class="country-info__text">
      Languages: <span class="country-info__text-description">${langList.join(
        ', '
      )}</span>
    </p>
  </li>
</ul>
`;
  return markup;
}
