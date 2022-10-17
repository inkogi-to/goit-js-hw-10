import {Notify} from 'notiflix/build/notiflix-notify-aio';
import renderMarkup from '../index';

export default function fetchCountries(name) {

  const BASE_URL = 'https://restcountries.com/v3.1/name'
  const FILTER = 'fields = name, capital, population, flags, languages'

  const resp = fetch(`${BASE_URL}/${name}?${FILTER}`)

  return resp.then(response => {
    if (!response.ok) {
      throw new Error()
    }
    return response.json()
  }).then(data => {

    if (data.length >= 10) {
      Notify.info("Too many matches found. Please enter a more specific name.")
      return
    }
    renderMarkup(data)

  }).catch(err => {
    Notify.failure("Oops, there is no country with that name")

  })


}