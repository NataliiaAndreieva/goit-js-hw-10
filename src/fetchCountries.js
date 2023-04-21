
const BASE_URL = 'https://restcountries.com/v3.1/name/';

 const fetchCountries = (name) => {
    const URL = `${BASE_URL}${name}?fields=name,capital,population,flags,languages`;
    return fetch(URL).then((resp) => {
        if (!resp.ok) {
            throw new Error(resp.status);
        }
        return resp.json();
    });

};

export { fetchCountries };

