export function navigateToDetails(countryName) {
    // We encode the name to handle spaces and special characters in the URL.
    const path = `details/${(countryName)}`;
    // Set the hash, which will trigger the router via the 'hashchange' listener.
    window.location.hash = path;
}
function createBorderBadges(borders, allCountryData) {
    if (!borders || borders.length === 0) {
        return '<span class="text-sm font-normal">None</span>';
    }
    // 1. Map over the 3-letter codes
    return borders.map(code => {
        // 2. Look up the full country name using the code (alpha3Code)
        const borderCountry = allCountryData.find(c => c.alpha3Code === code);
        // 3. Use the full name or the code as a fallback
        const countryName = borderCountry ? borderCountry.name : code;
        // Using custom class 'border-badge'
        return `
             <span class="btn btn-sm btn-outline-secondary shadow-sm px-3 py-1 me-2 mb-2">
                ${countryName}
            </span>
        `;
    }).join('');
}
export function renderDetailsPage(countryName, allCountryData) {
    const detailContainer = document.getElementById('countryDetailsContainer');
    // Find the country in the passed data array
    const countryData = allCountryData.find(c => c.name === countryName);
    if (!detailContainer)
        return;
    const borderBadgesHtml = createBorderBadges(countryData.borders, allCountryData);
    // Prepare content structure
    detailContainer.innerHTML = `
        <div class="row py-5 align-items-start">
            <!-- Flag Image Column (Mobile stacks, Desktop takes 5/12 width) -->
             <div class="col-12 col-md-5 d-flex justify-content-center justify-content-md-start align-items-start pt-md-4">
                <img src="${countryData.flagPicture}" alt="Flag of ${countryData.name}" 
                     class="shadow-xl rounded-lg max-w-full" style="max-height: 300px; object-fit: contain;">
            </div>

               <!-- Details Column -->
            <div class="col-12 col-md-7">
                <h2 class="text-4xl font-extrabold mb-6">${countryData.name}</h2>
                <div class="row">
                    <!-- Column 1 -->
                    <div class="col-12 col-lg-6 mb-4">
                        <p class="font-semibold mb-1">Official Name: <span class="font-normal">${countryData.name}</span></p>
                        <p class="font-semibold mb-1">Population: <span class="font-normal">${countryData.population.toLocaleString()}</span></p>
                        <p class="font-semibold mb-1">Region: <span class="font-normal">${countryData.region}</span></p>
                        <p class="font-semibold mb-1">Capital: <span class="font-normal">${countryData.capital || 'N/A'}</span></p>
                        </div>
                 
                   <!-- Column 2: Secondary Data -->
                        <div class="col-12 col-lg-6 mb-4">
                        <p class="font-semibold mb-1">Native Name: <span class="font-normal">${countryData.nativeName || 'N/A'}</span></p>
                        <p class="font-semibold mb-1">Sub Region: <span class="font-normal">${countryData.subregion || 'N/A'}</span></p>
                        <p class="font-semibold mb-1">Currencies: <span class="font-normal">${countryData.currency || 'N/A'}</span></p>
                        <p class="font-semibold mb-1">Languages: <span class="font-normal">${countryData.language || 'N/A'}</span></p>
                    </div>
                </div>
                <!-- Border Countries -->
                <div class="mt-8  flex-wrap align-items-center">
                    <h3 class="text-xl font-semibold mb-3">Border Countries:</h3> 
                 <div class="d-flex flex-wrap justify-content-start">
                        ${borderBadgesHtml}
                    </div>
            </div>
        </div>
    `;
    console.log(`Successfully rendered details for: ${countryName}`);
}
export function router(allCountryData, applyFiltersAndSearch) {
    const hash = window.location.hash.slice(1); // Remove '#'
    const [route, value] = hash.split('/');
    const listView = document.getElementById('listView');
    const detailView = document.getElementById('detailView');
    if (!listView || !detailView) {
        console.error("Router failed: View containers not found.");
        return;
    }
    if (route === 'details' && value) {
        // Show Detail View
        listView.classList.add('hidden');
        detailView.classList.remove('hidden');
        const countryName = decodeURIComponent(value);
        renderDetailsPage(countryName, allCountryData);
    }
    else {
        // Show List View (Home)
        listView.classList.remove('hidden');
        detailView.classList.add('hidden');
        // Ensure list is rendered if we return home
        if (allCountryData.length > 0) {
            applyFiltersAndSearch();
        }
    }
}
//# sourceMappingURL=detailspageRender.js.map