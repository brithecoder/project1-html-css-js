function updateRegionFilterButton(region) {
    const button = document.getElementById('regionFilterButton');
    if (button) {
        button.textContent = region === 'All' ? 'Filter by Region' : region;
    }
}
// --- Filtering and Search Logic ---
let currentRegionFilter = 'All';
export function setupSearchListener(allCountryData, renderCountryList) {
    const searchInput = document.getElementById('searchInput');
    if (searchInput instanceof HTMLInputElement) {
        searchInput.addEventListener('input', function (e) {
            const targetInput = e.target;
            const searchTerm = targetInput.value;
            console.log("Search Term:", searchTerm);
            // Re-run filtering on every input change, passing the dependencies
            applyFiltersAndSearch(allCountryData, renderCountryList);
        });
    }
}
export function applyFiltersAndSearch(allCountryData, renderCountryList) {
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
        filteredData = filteredData.filter(country => 
        // Also search by officialName for better results
        country.name.toLowerCase().includes(searchTerm) ||
            // country.officialName.toLowerCase().includes(searchTerm) ||
            country.capital?.toLowerCase().includes(searchTerm));
    }
    renderCountryList(filteredData, countryListBody);
}
export function setupFilterListener(allCountryData, renderCountryList) {
    const dropdownMenu = document.getElementById('dropdown-menu');
    if (dropdownMenu) {
        dropdownMenu.addEventListener('click', function (event) {
            const target = event.target; // Use HTMLElement as it might be an 'a' tag         
            // Check if the clicked element is a valid dropdown item
            if (target && target.classList.contains("dropdown-item")) {
                const selectedRegion = target.textContent;
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
//# sourceMappingURL=filterFuctions.js.map