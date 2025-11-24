import * as customErrors from "../errorHandler.js";
import type {Country} from "../models/country.js";



export async function fetchCountries(): Promise <Country []> {
    try{
        const url = 'https://restcountries.com/v3.1/all?fields=name,capital,region,languages,population,flag,flags';
        const response = await fetch(url)
        if(!response.ok){
             throw new customErrors.NetworkError((` 🛑 Network Error: ${response.status}`));
        }
        const countryArray: Country[] = await response.json();
        if(countryArray.length === 0){
            throw new customErrors.DataError("API returned a valid response, but the country list is empty.")
        }
        console.log(`  ✅ ✅Successfully fetched ${countryArray.length} countries. ✅ ✅`);
        // 🎯 FIX 4: Return the array itself.
        return countryArray;
    }catch(e){
         console.error( new customErrors.DataError(`Could not get countries: ${e}`));
      throw Error
    }
}