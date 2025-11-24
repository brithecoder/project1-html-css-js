import * as apiCalls from './services/apiSevices.js';
import * as country from './models/country.js';
import * as customErrors from './errorHandler.js';
document.addEventListener('DOMContentLoaded', () => {
    const countryListBody = document.getElementById('countryList');
    main(countryListBody);
});
async function main(countryListBody) {
    console.log("--- Starting Country Data Processing ---");
    console.log("Fetching country data from County API...");
    try {
        const rawCountryDataArray = await apiCalls.fetchCountries();
        //  Use .map() to transform raw data into functional Country instances
        if (!Array.isArray(rawCountryDataArray) || rawCountryDataArray.length === 0) {
            console.error("ERROR: Failed to retrieve country data or the data is not an array.");
            throw new customErrors.DataError("API returned no valid country data.");
        }
        const countryInstances = rawCountryDataArray.map((countryData) => {
            const instance = new country.Country(countryData.name, countryData.capital, countryData.region, countryData.languages, countryData.population, countryData.flag, countryData.flags);
            return instance;
        });
        renderCountryList(countryInstances, countryListBody);
    }
    catch (error) {
        customErrors.handleError(error);
    }
    finally {
        console.log("❤️ This is the end of the program ❤️");
    }
}
function renderCountryList(countryDataArray, countryListBody) {
    if (countryListBody) {
        countryListBody.classList.add("row", "g-4");
        countryListBody.innerHTML = '';
        countryDataArray.forEach((country) => {
            const countryGridItem = document.createElement("div");
            countryGridItem.classList.add("col-12", // Full width on extra small devices
            "col-sm-6", // 2 cards per row on small devices (tablets)
            "col-md-4", // 3 cards per row on medium devices
            "col-lg-3" // 4 cards per row on large devices (fullsize)
            );
            const card = document.createElement("div");
            card.classList.add("card", "text-center", "card-spacing");
            const cardBody = document.createElement("div");
            cardBody.classList.add("card-body");
            const cardImage = document.createElement("img");
            cardImage.classList.add("card-img-top");
            cardImage.src = country.flagPicture;
            cardImage.alt = country.name;
            cardImage.style.maxHeight = "100px";
            cardImage.style.width = "auto";
            cardImage.style.objectFit = "cover";
            const cardTitle = document.createElement("h5");
            cardTitle.classList.add("card-title");
            cardTitle.textContent = country.name;
            const cardContent = document.createElement("div");
            cardContent.classList.add("card-text");
            // cardContent.textContent = country.displayDetails();
            const cardPopulation = document.createElement("p");
            cardPopulation.textContent = `POPULATION:${country.population.toString()}`;
            const cardRegion = document.createElement("p");
            cardRegion.textContent = `REGION: ${country.region}`;
            const cardCapital = document.createElement("p");
            cardCapital.textContent = `CAPITAL: ${country.capital || 'N/A'}`;
            cardContent.appendChild(cardPopulation);
            cardContent.appendChild(cardRegion);
            cardContent.appendChild(cardCapital);
            // Append content to the card
            card.appendChild(cardBody);
            cardBody.appendChild(cardImage);
            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardContent);
            // Append the card to the list item
            countryGridItem.appendChild(card);
            countryListBody.appendChild(countryGridItem);
        });
    }
    else {
        console.error(new customErrors.DataError(`Could not find list container.`));
    }
}
//# sourceMappingURL=main.js.map