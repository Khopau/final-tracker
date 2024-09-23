const stops = [
    "Old Comm",
    "Hagdan na Bato",
    "Ateneo Grade School",
    "2.5",
    "Leong Hall",
    "Xavier Hall"
];

// Updated travel times in minutes
const travelTimes = [6, 4, 5, 3, 7]; // Adjusted times with an added minute
const currentStopIndexes = [3, 4]; // Two e-jeeps starting at 2.5 and Leong Hall

function isWithinSchedule() {
    return true; // Placeholder for actual schedule logic
}

function updateClock() {
    const now = new Date();
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    document.getElementById('clock').textContent = now.toLocaleTimeString([], options);
}

function updateTimeUntilNext(ejeepIndex) {
    const currentStopIndex = currentStopIndexes[ejeepIndex];
    const timeToNext = travelTimes[currentStopIndex]; // Get time in minutes
    document.getElementById('timeUntilNext').textContent = `Next E-Jeep Arrival: ${timeToNext} minutes`;
}

function moveEJeepDots(ejeepIndex) {
    if (currentStopIndexes[ejeepIndex] < stops.length - 1 && isWithinSched

