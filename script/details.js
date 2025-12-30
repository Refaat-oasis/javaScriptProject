// 1. Get ID from query string
const params = new URLSearchParams(window.location.search);
const workspaceId = parseInt(params.get("id"));

if (!workspaceId) {
    alert("No workspace ID found");
}

// 2. Select HTML elements
const img = document.getElementById("workspaceImage");
const nameEl = document.getElementById("workspaceName");
const locationEl = document.getElementById("workspaceLocation");
const priceEl = document.getElementById("workspacePrice");
const roomsEl = document.getElementById("workspaceRooms");
const rateEl = document.getElementById("workspaceRate");
const featuresEl = document.getElementById("workspaceFeatures");

// 3. Fetch JSON
fetch("./../json/workSpaces.json")
    .then(res => res.json())
    .then(data => {
        const workspace = data.find(w => w.id === workspaceId);

        if (!workspace) {
            alert("Workspace not found");
            return;
        }

        // 4. Fill data
        img.src = `./../assets/Workspace/${workspace.image}`;
        nameEl.textContent = workspace.name;
        locationEl.textContent = `📍 ${workspace.location}`;
        priceEl.textContent = `💲 ${workspace.hours_price} / hour`;
        roomsEl.textContent = `🏢 Rooms: ${workspace.number_of_rooms}`;
        rateEl.textContent = `⭐ Rate: ${workspace.rate}`;

        // 5. Features
        featuresEl.innerHTML = "";
        workspace.features.forEach(feature => {
            const li = document.createElement("li");
            li.textContent = feature;
            featuresEl.appendChild(li);
        });
    
    
    
     const roomsContainer = document.getElementById("workspaceRoomsContainer");
        roomsContainer.innerHTML = "";

        if (!workspace.rooms || workspace.rooms.length === 0) {
            roomsContainer.innerHTML = "<p>No rooms available</p>";
            return;
        }

        workspace.rooms.forEach(room => {
            const roomDiv = document.createElement("div");
            roomDiv.classList.add("room-card");

            roomDiv.innerHTML = `
                <img src="./../images/Rooms/${room.image}" alt="${room.name}">
                <p>${room.name}</p>
            `;

            roomsContainer.appendChild(roomDiv);
        });
    })
   .catch(err => {
        console.error(err);
        alert("Failed to load data");
    });
