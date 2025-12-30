


async function loadWorkspaces() {
    try {
        
        const response = await fetch('./../json/workSpaces.json');
        const workspaces = await response.json();
        
    
        const sliderContainer = document.getElementById('workspaceSlider');
    
        sliderContainer.innerHTML = '';
        
        workspaces.forEach(workspace => {
            const card = createWorkspaceCard(workspace);
            sliderContainer.appendChild(card);
        });
        
        setupSliderButtons();
        
    } catch (error) {
        console.error('Error loading workspaces:', error);
    }
}


function createWorkspaceCard(workspace) {
    const card = document.createElement('div');
    card.className = 'workspace-card';
    
  
    const featuresTags = workspace.features
        .map(feature => `<span class="feature-tag">${feature}</span>`)
        .join('');
//
        card.onclick = () => {
                window.location.href = `details.html?id=${workspace.id}`;
            };
            //
    
    card.innerHTML = `
        <img src="./../assets/Workspace/${workspace.image}" alt="${workspace.name}" class="workspace-card-image">
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


function setupSliderButtons() {
    const slider = document.getElementById('workspaceSlider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
 
    const scrollAmount = 320; 
    
    prevBtn.addEventListener('click', () => {
        slider.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });
    
    nextBtn.addEventListener('click', () => {
        slider.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
    
    updateButtonStates(slider, prevBtn, nextBtn);
    
    slider.addEventListener('scroll', () => {
        updateButtonStates(slider, prevBtn, nextBtn);
    });
}

function updateButtonStates(slider, prevBtn, nextBtn) {
 
    prevBtn.style.opacity = slider.scrollLeft <= 0 ? '0.5' : '1';
    nextBtn.style.opacity = 
        slider.scrollLeft >= (slider.scrollWidth - slider.clientWidth - 10) ? '0.5' : '1';
}


document.addEventListener('DOMContentLoaded', () => {
    loadWorkspaces();
    setupSearchFunctionality();
});


function setupSearchFunctionality() {
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.getElementById('searchInput');
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}


function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (!searchTerm) {
        alert('Please enter a search term');
        return;
    }
    
    
    localStorage.setItem('searchTerm', searchTerm);
    
   
    filterWorkspaces(searchTerm);
}


async function filterWorkspaces(searchTerm) {
    try {
        const response = await fetch('./../json/workSpaces.json');
        const workspaces = await response.json();
        
        const filtered = workspaces.filter(workspace => 
            workspace.name.toLowerCase().includes(searchTerm) ||
            workspace.location.toLowerCase().includes(searchTerm)
        );
        
        if (filtered.length === 0) {
            alert('No workspaces found matching your search');
            return;
        }
        
       
        displayFilteredWorkspaces(filtered);
        
    } catch (error) {
        console.error('Error filtering workspaces:', error);
    }
}


function displayFilteredWorkspaces(workspaces) {
    const sliderContainer = document.getElementById('workspaceSlider');
    sliderContainer.innerHTML = '';
    
    workspaces.forEach(workspace => {
        const card = createWorkspaceCard(workspace);
        sliderContainer.appendChild(card);
    });
}
