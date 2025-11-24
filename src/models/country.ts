
interface APIName {
    official: string;
    common: string;
}

interface APILanguages {
    [key: string]: string; // Key is code (e.g., 'eng'), value is name (e.g., 'English')
}

interface APIFlags {
  png: string;
  svg: string;
  alt: string;
}
// NOTE: capital is an array of strings in the API
type APICapital = string[];

export class Country{
    name: string; // Will store the official name
    capital: string | undefined | null; // Will store the first capital name
    region: string;
    language: string | undefined; // Will store the first language name
    population: number;
    flagEmoji: string;
    flagPicture: string;

    constructor(
    APIName: APIName,
    APICapital: APICapital,
    region: string,
    APILanguages: APILanguages,
    population: number,
    flagEmoji: string,
    flagPicture: APIFlags
    
    ){
     this.name = APIName.common;
    this.capital = APICapital && APICapital.length > 0 ? APICapital[0] : 'N/A';
    this.region = region;
    // 3. EXTRACT LANGUAGE: Safely check the object, get its values (names), and take the first one.
     // The || {} guards against 'apiLanguages' being null/undefined.
        const safeLanguages = APILanguages || {};
        const languageNames = Object.values(safeLanguages);
    this.language = languageNames.length > 0 ? languageNames[0] : 'N/A';
    this.population = population;
    this.flagEmoji = flagEmoji;
    this.flagPicture = flagPicture?.png || flagPicture?.svg || 'N/A';
    
    }
    displayDetails = (): string => {
        return `The country of ${this.name} is located in ${this.region}, has a population of ${this.population} and speaks ${this.language} ${this.flagEmoji}`
    }
    getFlagHtml(): string {
      // We use the stored URL (this.flag) in an <img> tag.
    // The 'alt' text is important for accessibility but you need to include 
    // it in your constructor if you want to store it. For simplicity here, we use the country name.
    return `<img src="${this.flagPicture}" alt="Flag of ${this.name}" style="width: 50px; height: auto; border: 1px solid #ccc;">`;
    }
}