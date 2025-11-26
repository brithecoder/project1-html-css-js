

const themeKey = 'countryAppTheme';
const btnId = 'themeToggleBtn';
const iconId = 'themeIcon';


function updateThemeToggle(currentTheme: string) {
    const btn = document.getElementById(btnId);
    const icon = document.getElementById(iconId);

    if (icon) {
        if (currentTheme === 'dark') {
            // Display Light icon for dark mode (click to switch to light)
            icon.innerHTML = '💡 Light';
            if (btn) btn.classList.replace('btn-outline-secondary', 'btn-outline-warning');
        } else {
            // Display Dark icon for light mode (click to switch to dark)
            icon.innerHTML = '☀️ Dark';
            if (btn) btn.classList.replace('btn-outline-warning', 'btn-outline-secondary');
        }
    }
}

export function loadTheme() {
    const savedTheme = localStorage.getItem(themeKey) || 'light';
    document.body.setAttribute('data-bs-theme', savedTheme);
    updateThemeToggle(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    // 1. Update the DOM
    document.body.setAttribute('data-bs-theme', newTheme);
    // 2. Update local storage
    localStorage.setItem(themeKey, newTheme);
    // 3. Update the button appearance
    updateThemeToggle(newTheme);
}

export function setupThemeToggle() {
    const btn = document.getElementById(btnId);
    if (btn) {
        btn.addEventListener('click', toggleTheme);
    } else {
        console.error(`Theme toggle button with ID #${btnId} not found.`);
    }
}