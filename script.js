const stops = [
    "Old Comm",
    "Hagsan na Bato",
    "Ateneo Grade School",
    "2.5",
    "Leong Hall",
    "Xavier Hall"
];

const travelTimes = [5, 3, 4, 2, 6]; // Example travel times in minutes
const currentStopIndexes = [0, 0]; // Two e-jeeps starting at the first stop

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

        const currentStopClass = stops[currentStopIndex].replace(/\s+/g, '');
        dot.classList.add(currentStopClass);

        let timeToNext = travelTimes[currentStopIndex] * 60000; // Convert minutes to milliseconds

        setTimeout(() => {
            dot.classList.remove(currentStopClass);
            const nextStopClass = stops[nextStopIndex].replace(/\s+/g, '');
            dot.classList.add(nextStopClass);
            dot.style.transform = `translateY(${(nextStopIndex - currentStopIndex) * 60}px)`;

            setTimeout(() => {
                dot.remove();
                currentStopIndexes[ejeepIndex]++;
                updateTimeUntilNext(ejeepIndex); // Update the time until next
                moveEJeepDots(ejeepIndex);
            }, 1000); // Delay for transition effect
        }, timeToNext);
    }
}

window.onload = () => {
    setInterval(updateClock, 1000); // Update the clock every second
    updateClock(); // Initial call to display immediately
    for (let i = 0; i < currentStopIndexes.length; i++) {
        moveEJeepDots(i); // Start moving each e-jeep
        updateTimeUntilNext(i); // Initial time until next for each e-jeep
    }
};

