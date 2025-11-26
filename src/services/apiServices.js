import * as customErrors from "../utils/errorHandler.js";
export async function fetchCountries() {
    try {
        const url = 'https://restcountries.com/v3.1/all?fields=name,capital,region,subregion,currencies,borders,languages,population,flags,cca3';
        const response = await fetch(url);
        if (!response.ok) {
            throw new customErrors.NetworkError((` 🛑 Network Error: ${response.status}`));
        }
        const countryArray = await response.json();
        if (countryArray.length === 0) {
            throw new customErrors.DataError("API returned a valid response, but the country list is empty.");
        }
        console.log(`  ✅ ✅Successfully fetched ${countryArray.length} countries. ✅ ✅`);
        // 🎯 FIX 4: Return the array itself.
        return countryArray;
    }
    catch (e) {
        console.error(new customErrors.DataError(`Could not get countries: ${e}`));
        throw Error;
    }
}
//# sourceMappingURL=apiServices.js.map