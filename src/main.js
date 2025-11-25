import * as apiCalls from './services/apiSevices.js';
import * as country from './models/country.js';
import * as customErrors from './utils/errorHandler.js';
import { router as detailRouter, navigateToDetails } from './utils/detailspageRender.js';
// --- Theme Management Logic ---
const themeKey = 'countryAppTheme';
document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    const countryListBody = document.getElementById('countryList');
    window.addEventListener('hashchange', runRouter);
    document.getElementById('backButton')?.addEventListener('click', () => {
        window.location.hash = ''; // Navigates back to the home view
        runRouter(); // Run router immediately
    });
    document.getElementById('themeToggleBtn')?.addEventListener('click', toggleTheme);
    main(countryListBody);
});
function runRouter() {
    // We pass allCountryData and the filtering callback to the external router
    detailRouter(allCountryData, applyFiltersAndSearch);
}
function loadTheme() {
    const savedTheme = localStorage.getItem(themeKey) || 'light';
    document.body.setAttribute('data-bs-theme', savedTheme);
    updateThemeToggle(savedTheme);
}
function updateThemeToggle(currentTheme) {
    const btn = document.getElementById('themeToggleBtn');
    const icon = document.getElementById('themeIcon');
    if (icon) {
        if (currentTheme === 'dark') {
            icon.innerHTML = '💡 Light';
            if (btn)
                btn.classList.replace('btn-outline-secondary', 'btn-outline-warning');
        }
        else {
            icon.innerHTML = '🌙 Dark';
            if (btn)
                btn.classList.replace('btn-outline-warning', 'btn-outline-secondary');
        }
    }
}
function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem(themeKey, newTheme);
    updateThemeToggle(newTheme);
}
let allCountryData = [];
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
            const instance = new country.Country(countryData.name, countryData.capital, countryData.region, countryData.subregion, countryData.currencies, countryData.borders, countryData.languages, countryData.population, countryData.flag, countryData.flags, countryData.cca3);
            allCountryData.push(instance);
            console.log(instance);
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
            card.classList.add("card", "text-center", "card-spacing", "shadow", "hover:shadow-lg", "cursor-pointer", "transition-shadow");
            // Card Click Listener**
            card.addEventListener('click', () => {
                console.log(`CARD CLICKED: Displaying details for ${country.name}`);
                navigateToDetails(country.name);
            });
            const cardBody = document.createElement("div");
            cardBody.classList.add("card-body");
            const cardImage = document.createElement("img");
            cardImage.classList.add("card-img-top", "d-block", "mx-auto");
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
            cardPopulation.textContent = `POPULATION:${country.population.toLocaleString()}`;
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
function updateRegionFilterButton(region) {
    const button = document.getElementById('regionFilterButton');
    if (button) {
        button.textContent = region === 'All' ? 'Filter by Region' : region;
    }
}
function filterCountriesByRegion(selectedRegion) {
    const countryListBody = document.getElementById('countryList');
    let filteredData;
    selectedRegion === 'All' ? filteredData = allCountryData : filteredData = allCountryData.filter(country => country.region === selectedRegion);
    // Update the button text to show the currently selected region
    updateRegionFilterButton(selectedRegion);
    // Re-render the list with the filtered data
    renderCountryList(filteredData, countryListBody);
}
// Region Dropdown Listener 
const regionDropDown = document.getElementById("dropdown-menu");
if (regionDropDown) {
    regionDropDown.addEventListener("click", function (event) {
        const target = event.target;
        if (target && target.classList.contains("dropdown-item")) {
            event.preventDefault();
            const selectedRegion = target.textContent;
            console.log(selectedRegion);
            // CALL THE  FILTERING FUNCTION
            if (selectedRegion) {
                filterCountriesByRegion(selectedRegion);
            }
        }
    });
}
// --- Filtering and Search Logic ---
let currentRegionFilter = 'All';
const searchInput = document.getElementById("searchInput");
if (searchInput instanceof HTMLInputElement) { // Use instanceof for better type checking
    searchInput.addEventListener('input', function (event) {
        // 1. Get the target element (which is the input)
        const targetInput = event.target;
        const searchTerm = targetInput.value;
        console.log("Search Term:", searchTerm);
        // 4. Critically, call the function that handles filtering and rendering
        applyFiltersAndSearch();
        // Note: No need for event.preventDefault() here.
    });
}
function applyFiltersAndSearch() {
    const countryListBody = document.getElementById('countryList');
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput?.value.toLowerCase() || '';
    let filteredData = allCountryData;
    // 1. Apply Region Filter (uses currentRegionFilter state)
    if (currentRegionFilter !== 'All') {
        filteredData = filteredData.filter(country => country.region === currentRegionFilter);
    }
    // 2. Apply Search Filter
    if (searchTerm) {
        filteredData = filteredData.filter(country => country.name.toLowerCase().includes(searchTerm) ||
            country.capital?.toLowerCase().includes(searchTerm));
    }
    // Render the list using the module-scoped variable (countryListBody)
    renderCountryList(filteredData, countryListBody);
    console.error("Error: Cannot render list. The countryListBody element is null.");
}
//# sourceMappingURL=main.js.map