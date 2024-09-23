const stops = [
    "Old Comm",
    "Hagdan na Bato",
    "Ateneo Grade School",
    "2.5",
    "Leong Hall",
    "Xavier Hall"
];

const travelTimes = [5, 3, 4, 2, 6]; // Example travel times in minutes
const currentStopIndexes = [0, 0]; // Two e-jeeps starting at the first stop

const map = L.map('map').setView([14.5985, 121.0902], 15); // Set initial view near Ateneo

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Create markers for each stop
const busMarkers = [
    L.marker([14.5995, 121.0903]).bindPopup("Old Comm").addTo(map),
    L.marker([14.5994, 121.0901]).bindPopup("Hagdan na Bato").addTo(map),
    L.marker([14.5987, 121.0902]).bindPopup("Ateneo Grade School").addTo(map),
    L.marker([14.5989, 121.0898]).bindPopup("2.5").addTo(map),
    L.marker([14.5983, 121.0906]).bindPopup("Leong Hall").addTo(map),
    L.marker([14.5981, 121.0900]).bindPopup("Xavier Hall").addTo(map)
];

// Clock function
function updateClock() {
    const now = new Date();
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    document.getElementById('liveClock').textContent = now.toLocaleTimeString([], options);
}

// Update time until next e-jeep
function updateTimeUntilNext(ejeepIndex) {
    const currentStopIndex = currentStopIndexes[ejeepIndex];
    const timeToNext = travelTimes[currentStopIndex]; // Get time in minutes
    document.getElementById('timeUntilNext').textContent = `Time to Next E-Jeep: ${timeToNext} minutes`;
}

// Move e-jeep dots on the map
function moveEJeepDots(ejeepIndex) {
    if (currentStopIndexes[ejeepIndex] < stops.length - 1) {
        const currentStopIndex = currentStopIndexes[ejeepIndex];
        const nextStopIndex = currentStopIndex + 1;

        const dot = document.createElement('div');
        dot.className = 'e-jeep-dot';
        dot.innerHTML = '🚍'; // E-jeep icon
        document.getElementById('map').appendChild(dot); // Append to map container

        // Position based on current stop
        const position = busMarkers[currentStopIndex].getLatLng();
        dot.style.position = 'absolute';
        dot.style.transform = `translate(${map.latLngToContainerPoint(position).x}px, ${map.latLngToContainerPoint(position).y}px)`;

        let timeToNext = calculateTimeToNextEJeep(ejeepIndex);
        setTimeout(() => {
            dot.remove(); // Remove dot after time

            // Move to next stop
            currentStopIndexes[ejeepIndex]++;
            moveEJeepDots(ejeepIndex); // Move e-jeep again
        }, timeToNext);
    }
}

// Calculate time to next e-jeep
function calculateTimeToNextEJeep(ejeepIndex) {
    return travelTimes[currentStopIndexes[ejeepIndex]] * 60000; // Time in milliseconds
}

// Start everything on window load
window.onload = () => {
    setInterval(updateClock, 1000); // Update clock every second
    updateClock(); // Initial call

    // Start moving e-jeeps
    for (let i = 0; i < currentStopIndexes.length; i++) {
        moveEJeepDots(i); // Start moving each e-jeep
        updateTimeUntilNext(i); // Initial time until next for each e-jeep
    }
};


