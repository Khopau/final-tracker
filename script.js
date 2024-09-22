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

        let timeToNext = travelTimes[currentStopIndex] * 60000;

        setTimeout(() => {
            dot.classList.remove(currentStopClass);
            const nextStopClass = stops[nextStopIndex].replace(/\s+/g, '');
            dot.classList.add(nextStopClass);
            dot.style.transform = `translateY(${(nextStopIndex - currentStopIndex) * 60}px)`;

            setTimeout(() => {
                dot.remove();
                currentStopIndexes[ejeepIndex]++;
                moveEJeepDots(ejeepIndex);
            }, 1000);
        }, timeToNext);
    }
}
function updateClock() {
    const now = new Date();
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    document.getElementById('clock').textContent = now.toLocaleTimeString([], options);
}

setInterval(updateClock, 1000); // Update the clock every second
updateClock(); // Initial call to display immediately

<script src="script.js"></script>
