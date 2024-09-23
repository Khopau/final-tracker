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

// Function to display stop names
function displayStops() {
    const stopContainer = document.getElementById('stopNames');
    stopContainer.innerHTML = stops.map(stop => `<div>${stop}</div>`).join('');
}

function isWithinSchedule() {
    return true; // Example condition
}

function updateClock() {
    const now = new Date();
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    document.getElementById('clock').textContent = now.toLocaleTimeString([], options);
}

function updateTimeUntilNext(ejeepIndex) {
    const currentStopIndex = currentStopIndexes[ejeepIndex];
    const timeToNext = travelTimes[currentStopIndex]; // Get time in minutes
    document.getElementById('timeUntilNext').textContent = `Approx. Time to Next Stop: ${timeToNext} minutes`;
}

function moveEJeepDots(ejeepIndex) {
    if (currentStopIndexes[ejeepIndex] < stops.length - 1 && isWithinSchedule()) {
        const currentStopIndex = currentStopIndexes[ejeepIndex];
        const nextStopIndex = currentStopIndex + 1;

        const dot = document.createElement('div');
        dot.className = 'e-jeep-dot';
        dot.innerHTML = '🚍'; // E-jeep icon
        document.querySelector('.map').appendChild(dot);

        // Set initial position based on current stop
        const currentStopClass = stops[currentStopIndex].replace(/\s+/g, ''); // Remove spaces for class
        dot.classList.add(currentStopClass);

        // Calculate time to next e-jeep
        let timeToNext = calculateTimeToNextEJeep(ejeepIndex);
        setTimeout(() => {
            dot.classList.remove(currentStopClass);
            const nextStopClass = stops[nextStopIndex].replace(/\s+/g, ''); // Get next stop class
            dot.classList.add(nextStopClass);
            dot.style.transform = `translateY(${(nextStopIndex - currentStopIndex) * 60}px)`; // Adjust position

            // Update the displayed time until the next e-jeep
            document.getElementById('timeUntilNext').innerText = `Approx. time to next e-jeep: ${timeToNext / 60000} minutes`;

            setTimeout(() => {
                dot.remove();
                currentStopIndexes[ejeepIndex]++;
                moveEJeepDots(ejeepIndex);
            }, 1000); // Delay for transition effect
        }, timeToNext);
    }
}

function calculateTimeToNextEJeep(ejeepIndex) {
    return travelTimes[currentStopIndexes[ejeepIndex]] * 60000; // Example
}

// Call the displayStops function to show the stops
window.onload = () => {
    displayStops(); // Show stops
    setInterval(updateClock, 1000); // Update the clock every second
    updateClock(); // Initial call to display immediately
    for (let i = 0; i < currentStopIndexes.length; i++) {
        moveEJeepDots(i); // Start moving each e-jeep
        updateTimeUntilNext(i); // Initial time until next for each e-jeep
    }

    // Move e-jeeps every 90 seconds (1.5 minutes)
    setInterval(() => {
        for (let i = 0; i < currentStopIndexes.length; i++) {
            moveEJeepDots(i);
        }
    }, 90000);
};

