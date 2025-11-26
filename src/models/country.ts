
export interface APIName {
    official: string;
    common: string;
    nativeName?: APINativeNames;
}
export interface APINativeNames {
    [languageCode: string]: APIName;
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
    officialName: string;
    nativeNameOfficial: string; // The official native name
    nativeNameCommon: string; // The common native name
    capital: string | undefined | null; // Will store the first capital name
    region: string;
    subregion: string;
    currency: string;
    borders: string[];
    language: string | undefined; // Will store the first language name
    population: number;
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
    flagPicture: APIFlags,
    alpha3Code: string,
    ){
 
    this.name = APIName.common;
    this.officialName = APIName.official;
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
    this.flagPicture = flagPicture?.png || flagPicture?.svg || 'N/A';
     this.borders = borders || [];
     this.alpha3Code = alpha3Code
      // --- 2. Native Name Extraction ---
    let nativeOfficial = 'N/A';
    let nativeCommon = 'N/A';
    // The nativeName object is now pulled directly from the first parameter (APIName)
    const APINativeNames = APIName.nativeName;
    if (APINativeNames && typeof APINativeNames === 'object') {
        const languageKeys = Object.keys(APINativeNames);  
        // Use the first available language code
        const firstLanguageKey = languageKeys[0];   
        if (firstLanguageKey) {
            const nativeDetails = APINativeNames[firstLanguageKey];      
            // retrieve official and common name from the nested nativeDetails object
            nativeOfficial = nativeDetails?.official || nativeOfficial; 
            nativeCommon = nativeDetails?.common || nativeCommon;   
            if (nativeOfficial === 'N/A' && nativeCommon === 'N/A') {
                console.warn(`[Country Model] Warning: Native name extraction failed for key ${firstLanguageKey}. Raw data:`, nativeDetails);
            }
        }
      }
    this.nativeNameOfficial = nativeOfficial; // <-- This should now reliably extract Native Official Name
    this.nativeNameCommon = nativeCommon; 
    }
    displayDetails = (): string => {
        return `The country of ${this.name} is located in ${this.region}, has a population of ${this.population} and speaks ${this.language}`
    }

}