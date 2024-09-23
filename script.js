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

function isWithinSchedule() {
    return true; // Placeholder for actual scheduling logic
}

function updateClock() {
    const now = new Date();
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    document.getElementById('clock').textContent = now.toLocaleTimeString([], options);
}

function updateTimeUntilNext(ejeepIndex) {
    const currentStopIndex = currentStopIndexes[ejeepIndex];
    const timeToNext = travelTimes[currentStopIndex]; // Get time in minutes
    document.getElementById('timeUntilNext').textContent = `Time to Next E-Jeep: ${timeToNext} minutes`;
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
            const nextStopClass = stops[nextStopIndex].replace(/\s+/g, '');
            dot.classList.add(nextStopClass);
            dot.style.transform = `translateY(${(nextStopIndex - currentStopIndex) * 60}px)`; // Adjust position based on index

            // Update displayed time until the next e-jeep
            document.getElementById('timeUntilNext').innerText = `Time to next e-jeep: ${timeToNext / 60000} minutes`;

            setTimeout(() => {
                dot.remove();
                currentStopIndexes[ejeepIndex]++; // Move to the next stop
                moveEJeepDots(ejeepIndex); // Move to the next stop for this e-jeep
            }, 1000); // Delay for transition effect
        }, timeToNext);
    }
}

function calculateTimeToNextEJeep(ejeepIndex) {
    return travelTimes[currentStopIndexes[ejeepIndex]] * 60000; // Time in milliseconds
}

window.onload = () => {
    setInterval(updateClock, 1000); // Update the clock every second
    updateClock(); // Initial call to display immediately
    for (let i = 0; i < currentStopIndexes.length; i++) {
        moveEJeepDots(i); // Start moving each e-jeep
        updateTimeUntilNext(i); // Initial time until next for each e-jeep
    }
};


