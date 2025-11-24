export class Country {
    name; // Will store the official name
    capital; // Will store the first capital name
    region;
    language; // Will store the first language name
    population;
    flagEmoji;
    flagPicture;
    constructor(APIName, APICapital, region, APILanguages, population, flagEmoji, flagPicture) {
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
    displayDetails = () => {
        return `The country of ${this.name} is located in ${this.region}, has a population of ${this.population} and speaks ${this.language} ${this.flagEmoji}`;
    };
    getFlagHtml() {
        // We use the stored URL (this.flag) in an <img> tag.
        // The 'alt' text is important for accessibility but you need to include 
        // it in your constructor if you want to store it. For simplicity here, we use the country name.
        return `<img src="${this.flagPicture}" alt="Flag of ${this.name}" style="width: 50px; height: auto; border: 1px solid #ccc;">`;
    }
}
//# sourceMappingURL=country.js.map