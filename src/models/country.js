export class Country {
    name; // Will store the official name
    capital; // Will store the first capital name
    region;
    subregion;
    currency;
    borders;
    language; // Will store the first language name
    population;
    flagPicture;
    alpha3Code;
    constructor(APIName, APICapital, region, subregion, currency, borders, APILanguages, population, flagPicture, alpha3Code) {
        this.name = APIName.common;
        this.capital = APICapital && APICapital.length > 0 ? APICapital[0] : 'N/A';
        this.region = region;
        this.subregion = subregion;
        this.currency = currency ? Object.values(currency).map(c => c.name).join(', ') : 'N/A';
        // 3. EXTRACT LANGUAGE: Safely check the object, get its values (names), and take the first one.
        // The || {} guards against 'apiLanguages' being null/undefined.
        const safeLanguages = APILanguages || {};
        const languageNames = Object.values(safeLanguages);
        this.language = languageNames.length > 0 ? languageNames[0] : 'N/A';
        this.population = population;
        this.flagPicture = flagPicture?.png || flagPicture?.svg || 'N/A';
        this.borders = borders || [];
        this.alpha3Code = alpha3Code;
    }
    displayDetails = () => {
        return `The country of ${this.name} is located in ${this.region}, has a population of ${this.population} and speaks ${this.language}`;
    };
}
//# sourceMappingURL=country.js.map