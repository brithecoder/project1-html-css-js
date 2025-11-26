
import * as country from '../models/country.js'

import * as mainjs from '../main.js';

type RenderListFunction = (countries: country.Country[], container: HTMLElement | null) => void;
    
function updateRegionFilterButton(region: string) {
    const button = document.getElementById('regionFilterButton');
    if (button) {
        button.textContent = region === 'All' ? 'Filter by Region' : region;
    }
    }

  
// --- Filtering and Search Logic ---
let currentRegionFilter: string = 'All';


export function setupSearchListener(allCountryData: country.Country[], renderCountryList: RenderListFunction) {
    const searchInput = document.getElementById('searchInput');
    if (searchInput instanceof HTMLInputElement) {
        searchInput.addEventListener('input', function(e) {
             const targetInput = e.target as HTMLInputElement; 
              const searchTerm = targetInput.value;  
               console.log("Search Term:", searchTerm);  
            // Re-run filtering on every input change, passing the dependencies
            applyFiltersAndSearch(allCountryData, renderCountryList);     
        });
    }
}


export function applyFiltersAndSearch(allCountryData: country.Country[], renderCountryList: RenderListFunction) {
    const countryListBody = document.getElementById('countryList');
    const searchInput = document.getElementById('searchInput') as HTMLInputElement;
    const searchTerm = searchInput?.value.toLowerCase() || '';
    let filteredData = allCountryData;
    
    // 1. Apply Region Filter (uses currentRegionFilter state)
    if (currentRegionFilter !== 'All') {
        filteredData = filteredData.filter(country => country.region === currentRegionFilter);
    }

    // 2. Apply Search Filter
    if (searchTerm) {
        filteredData = filteredData.filter(country => 
            country.name.toLowerCase().includes(searchTerm) || 
            country.officialName.toLowerCase().includes(searchTerm) ||
            country.capital?.toLowerCase().includes(searchTerm) 
        );
    }

    renderCountryList(filteredData, countryListBody);
}






export function setupFilterListener(allCountryData: country.Country[], renderCountryList: RenderListFunction) {
    const dropdownMenu = document.getElementById('dropdown-menu');
    if (dropdownMenu) {
        dropdownMenu.addEventListener('click', function(event) {
            const target = event.target as HTMLElement; // Use HTMLElement as it might be an 'a' tag         
            // Check if the clicked element is a valid dropdown item
            if (target && target.classList.contains("dropdown-item")) {
                const selectedRegion= target.textContent;       
                if (selectedRegion) {
                    // const newRegion = selectedRegion.trim(); 
                      console.log(selectedRegion);
                    currentRegionFilter = selectedRegion;         
                    // 2. Update the button text
                    updateRegionFilterButton(selectedRegion);                
                    // 3. Re-run filtering with updated state
                    applyFiltersAndSearch(allCountryData, renderCountryList);
                }
            }
        });
        // Ensure the button starts with the correct text
        updateRegionFilterButton(currentRegionFilter);
    }
}


