
import * as apiCalls from './services/apiServices.js';
import * as country from './models/country.js';
import * as customErrors from './utils/errorHandler.js';
import * as countyFilterandSearch from './utils/filterFuctions.js';
import * as themetoggle from './utils/toggletheme.js';
import { router as detailRouter, navigateToDetails } from './utils/detailspageRender.js';


 export let allCountryData: country.Country[] = [];

const getCountryListBody = (): HTMLElement | null => document.getElementById('countryList');

function runRouter(applyFiltersAndSearch: () => void) {
    // We pass allCountryData and the filtering callback to the external router
    detailRouter(allCountryData, applyFiltersAndSearch);
}
document.getElementById('backButton')?.addEventListener('click', () => {
        window.location.hash = ''; 
});

async function main(){

    console.log("--- Starting Country Data Processing ---");
    console.log("Fetching country data from County API...");

    try{
        const rawCountryDataArray: any[] = await apiCalls.fetchCountries();
        //  Use .map() to transform raw data into functional Country instances
        if(!Array.isArray(rawCountryDataArray) || rawCountryDataArray.length === 0 ){
            console.error("ERROR: Failed to retrieve country data or the data is not an array.");
            throw new customErrors.DataError("API returned no valid country data.");
        }
    const countryInstances = rawCountryDataArray.map((countryData) => {
                return  new country.Country(
                countryData.name,
                countryData.capital,
                countryData.region,
                countryData.subregion,
                countryData.currencies,
                countryData.borders,
                countryData.languages,
                countryData.population,
                countryData.flags,
                countryData.cca3          

            );
         });
             allCountryData = countryInstances
            console.log(`Successfully mapped ${allCountryData.length} country instances.`);  
            // 1. Load the theme preference and set up the toggle listener
             themetoggle.loadTheme();
            themetoggle.setupThemeToggle(); 
           const filterAndRender = () => countyFilterandSearch.applyFiltersAndSearch(allCountryData, renderCountryListandCards);
           countyFilterandSearch.setupSearchListener(allCountryData, renderCountryListandCards);
           countyFilterandSearch. setupFilterListener(allCountryData, renderCountryListandCards);
            // 4. Initial render of the list
             filterAndRender(); 
            window.addEventListener('hashchange', () => runRouter(filterAndRender));
        // Run router on initial load to handle direct deep links
          runRouter(filterAndRender)
    }catch(error){
         customErrors.handleError(error);
         const countryListBody = document.getElementById('countryList');
         if (countryListBody) {
             countryListBody.innerHTML = '<p class="text-danger p-5 fs-5">Failed to load data. Please check the console for details.</p>';
        }
     }finally{
      console.log("❤️ This is the end of the program ❤️")
    } 
}

export function renderCountryListandCards(countryDataArray: country.Country[],countryListBody: HTMLElement | null){
    if(countryListBody){
     countryListBody.classList.add("row", "g-4"); 
     countryListBody.innerHTML ='';

     countryDataArray.forEach((country) =>{
        const countryGridItem = document.createElement("div")
        countryGridItem.classList.add(
                 "col-12", // Full width on extra small devices
                "col-sm-6", // 2 cards per row on small devices (tablets)
                 "col-md-4", // 3 cards per row on medium devices
                "col-lg-3"  // 4 cards per row on large devices (fullsize)
        );
          const card = document.createElement("div");
          card.classList.add("card", "text-center", "card-spacing","shadow", "hover:shadow-lg", "cursor-pointer", "transition-shadow");

           // Card Click Listener**
        card.addEventListener('click', () => {
            //  console.log(`CARD CLICKED: Displaying details for ${country.name}`);
                navigateToDetails(country.name);
        });
          

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");


        const cardImage = document.createElement("img");
        cardImage.classList.add("card-img-top","d-block", "mx-auto");
        cardImage.src = country.flagPicture;
        cardImage.alt = country.name;
        cardImage.setAttribute('aria-label',`Flag of ${country.name}`)


        cardImage.style.maxHeight = "100px";
        cardImage.style.width = "auto";
        cardImage.style.objectFit = "cover";
     

        const cardTitle = document.createElement("h5");
        cardTitle.classList.add("card-title","fw-bold", "mb-3", "fs-4");
        cardTitle.textContent = country.name;

        const cardContent = document.createElement("div");
        cardContent.classList.add("card-text");

        const cardPopulation = document.createElement("p");
        cardPopulation.textContent = `POPULATION:${country.population.toLocaleString()}`

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
    }else{
      console.error( new customErrors.DataError(`Could not find list container.`));         
    }
}

main();