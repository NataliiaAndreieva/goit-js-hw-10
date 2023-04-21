import './css/styles.css';
import { fetchCountries } from "./fetchCountries";
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const countryInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

countryInput.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(evt) {
    const nameCountry = evt.target.value.trim();
    if (nameCountry === '') {
        return;
    }
    fetchCountries(nameCountry).then(countries => {
        if (countries.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        }
        if (countries.length >= 2 && countries.length <= 10) {
          searchListCountry(countries);
        }
        if (countries.length === 1) {
          searchOneCountry(countries);
        }
    })
        .catch(error => {
            Notiflix.Notify.failure('Oops, there is no country with that name');
        });
    clearSearchCountry();
}
function searchListCountry(countries) {
    const markup = countries.map(el => {
        return `<li class="item_country">
        <img class="img" src="${el.flags.svg}" width = 30 alt="flag">
        <h3 class="title">${el.name.official}</h3>
        </li>`;
    })
        .join("");
    countryList.innerHTML = markup;
}

function searchOneCountry(countries) {
    const markup = countries
        .map(el => {
            return `<div class="item_country"><img class="img" src="${el.flags.svg
                }" width=50 alt="flag">
    <h1 class ="title">${el.name.official}</h1></div>
    <p class="text"><b>Capital:</b> ${el.capital}</p>
    <p class="text"><b>Population:</b> ${el.population}</p>
    <p class="text"><b>Languages:</b> ${Object.values(el.languages)}</p>`;
        })
        .join("");
    countryInfo.innerHTML = markup;
}

function clearSearchCountry() {
    countryList.innerHTML = "";
    countryInfo.innerHTML = "";
}