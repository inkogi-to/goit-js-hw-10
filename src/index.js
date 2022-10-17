import './css/styles.css';
import _ from 'lodash.debounce'
import markupList from './js/template/markupList.hbs';
import markupInfo from './js/template/markupInfo.hbs';
import fetchCountries from "./js/fetchCountries";

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  info: document.querySelector('.country-info'),
}
const DEBOUNCE_DELAY = 300;
refs.input.addEventListener('input', _(searchCountry, DEBOUNCE_DELAY))
let search_country = ''

function searchCountry(e) {
  e.preventDefault()
  search_country = e.target.value.trim()
  if (!search_country) {
    refs.list.innerHTML = ''
    refs.info.innerHTML = ''
    return 
  }
  fetchCountries(search_country)

}

export default function renderMarkup(data) {
  if (data.length === 1) {
    refs.list.innerHTML = ''
    refs.info.innerHTML = markupInfo(data)
  } else {
    refs.info.innerHTML = ''
    refs.list.innerHTML = markupList(data)
  }
}

