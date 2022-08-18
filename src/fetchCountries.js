export function fetchCountries(name) {
  const BASE_URL = 'https://restcountries.com/v3.1';
  const SEARCH_FILTER = 'fields=name,capital,population,flags,languages';
  return fetch(`${BASE_URL}/name/${name}?${SEARCH_FILTER}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
