
interface APIName {
    official: string;
    common: string;
    native:string;
}

interface APILanguages {
    [key: string]: string; // Key is code (e.g., 'eng'), value is name (e.g., 'English')
}

interface APIFlags {
  png: string;
  svg: string;
  alt: string;
}

interface CurrencyDetail {
    name: string;
    symbol: string;
}

// NOTE: capital is an array of strings in the API
type APICapital = string[];

export class Country{
    name: string; // Will store the official name
    capital: string | undefined | null; // Will store the first capital name
    region: string;
    subregion: string;
    currency: string;
    borders: string[];
    language: string | undefined; // Will store the first language name
    population: number;
    flagEmoji: string;
    flagPicture: string;
    alpha3Code: string;

    constructor(
    APIName: APIName,
    APICapital: APICapital,
    region: string,
    subregion: string,
    currency: CurrencyDetail,
    borders:string[],
    APILanguages: APILanguages,
    population: number,
    flagEmoji: string,
    flagPicture: APIFlags,
    alpha3Code: string
   
    
    ){
 
    this.name = APIName.common;
    this.capital = APICapital && APICapital.length > 0 ? APICapital[0] : 'N/A';
    this.region = region;
       this.subregion = subregion;
       this.currency  = currency ? Object.values(currency ).map(c => c.name).join(', ') : 'N/A';
    // 3. EXTRACT LANGUAGE: Safely check the object, get its values (names), and take the first one.
     // The || {} guards against 'apiLanguages' being null/undefined.
        const safeLanguages = APILanguages || {};
        const languageNames = Object.values(safeLanguages);
    this.language = languageNames.length > 0 ? languageNames[0] : 'N/A';
    this.population = population;
    this.flagEmoji = flagEmoji;
    this.flagPicture = flagPicture?.png || flagPicture?.svg || 'N/A';
     this.borders = borders || [];
     this.alpha3Code = alpha3Code
    
    }
    displayDetails = (): string => {
        return `The country of ${this.name} is located in ${this.region}, has a population of ${this.population} and speaks ${this.language} ${this.flagEmoji}`
    }

}