/* ===============================
   GLOBAL VARIABLES
================================ */
let allWorkspaces = [];
const SCROLL_AMOUNT = 320;

const slider = document.getElementById('workspaceSlider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

/* ===============================
   PAGE LOAD
================================ */
document.addEventListener('DOMContentLoaded', async () => {
    await loadWorkspaces();
    setupSlider();
    setupSearchFunctionality();
});

/* ===============================
   LOAD WORKSPACES
================================ */
async function loadWorkspaces() {
    try {
        const response = await fetch('./../json/workSpaces.json');
        allWorkspaces = await response.json();
        displayWorkspaces(allWorkspaces);
    } catch (error) {
        console.error('Error loading workspaces:', error);
    }
}

/* ===============================
   DISPLAY WORKSPACES
================================ */
function displayWorkspaces(workspaces) {
    slider.innerHTML = '';

    if (workspaces.length === 0) {
        slider.innerHTML = `<p class="no-results">No workspaces found</p>`;
        updateSliderButtons();
        return;
    }

    workspaces.forEach(workspace => {
        slider.appendChild(createWorkspaceCard(workspace));
    });

    slider.scrollLeft = 0;
    updateSliderButtons();
}

/* ===============================
   CREATE CARD
================================ */
function createWorkspaceCard(workspace) {
    const card = document.createElement('div');
    card.className = 'workspace-card';

    const featuresTags = workspace.features
        .map(f => `<span class="feature-tag">${f}</span>`)
        .join('');

    card.onclick = () => {
        window.location.href = `details.html?id=${workspace.id}`;
    };

    card.innerHTML = `
        <img src="./../assets/Workspace/${workspace.image}" 
             alt="${workspace.name}" 
             class="workspace-card-image">

        <div class="workspace-card-content">
            <div class="workspace-card-title">${workspace.name}</div>
            <div class="workspace-card-location">${workspace.location}</div>

            <div class="workspace-card-info">
                <div class="workspace-card-info-item">
                    <span class="workspace-card-info-label">Price/Hour</span>
                    <span class="workspace-card-info-value">$${workspace.hours_price}</span>
                </div>
                <div class="workspace-card-info-item">
                    <span class="workspace-card-info-label">Rooms</span>
                    <span class="workspace-card-info-value">${workspace.number_of_rooms}</span>
                </div>
                <div class="workspace-card-info-item">
                    <span class="workspace-card-info-label">Rating</span>
                    <span class="workspace-card-info-value">${workspace.rate}</span>
                </div>
            </div>

            <div class="workspace-card-features">
                ${featuresTags}
            </div>

            <div class="workspace-card-rating">
                <span class="rating-value">${workspace.rate}/5</span>
            </div>
        </div>
    `;

    return card;
}

/* ===============================
   SLIDER SETUP
================================ */
function setupSlider() {
    prevBtn.addEventListener('click', () => {
        slider.scrollBy({ left: -SCROLL_AMOUNT, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
        slider.scrollBy({ left: SCROLL_AMOUNT, behavior: 'smooth' });
    });

    slider.addEventListener('scroll', updateSliderButtons);
    window.addEventListener('resize', updateSliderButtons);

    updateSliderButtons();
}

/* ===============================
   SLIDER BUTTON STATES
================================ */
function updateSliderButtons() {
    const maxScroll = slider.scrollWidth - slider.clientWidth;

    prevBtn.disabled = slider.scrollLeft <= 0;
    nextBtn.disabled = slider.scrollLeft >= maxScroll - 5;

    prevBtn.style.opacity = prevBtn.disabled ? '0.4' : '1';
    nextBtn.style.opacity = nextBtn.disabled ? '0.4' : '1';
}

/* ===============================
   SEARCH
================================ */
function setupSearchFunctionality() {
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.getElementById('searchInput');

    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('input', performSearch);
}

function performSearch() {
    const term = document.getElementById('searchInput')
        .value
        .toLowerCase()
        .trim();

    if (term === '') {
        displayWorkspaces(allWorkspaces);
        return;
    }

    const filtered = allWorkspaces.filter(w =>
        w.name.toLowerCase().includes(term) ||
        w.location.toLowerCase().includes(term)
    );

    displayWorkspaces(filtered);
}
