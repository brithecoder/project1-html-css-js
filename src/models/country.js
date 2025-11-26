export class Country {
    name; // Will store the official name
    officialName;
    nativeNameOfficial; // The official native name
    nativeNameCommon; // The common native name
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
        this.officialName = APIName.official;
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
    displayDetails = () => {
        return `The country of ${this.name} is located in ${this.region}, has a population of ${this.population} and speaks ${this.language}`;
    };
}
//# sourceMappingURL=country.js.map