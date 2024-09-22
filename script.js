function moveEJeepDots(ejeepIndex) {
    if (currentStopIndexes[ejeepIndex] < stops.length - 1 && isWithinSchedule()) {
        const currentStopIndex = currentStopIndexes[ejeepIndex];
        const nextStopIndex = currentStopIndex + 1;

        const dot = document.createElement('div');
        dot.className = 'e-jeep-dot';
        dot.innerHTML = '🚍'; // E-jeep icon
        document.querySelector('.map').appendChild(dot);

        // Set initial position based on current stop
        const currentStopClass = stops[currentStopIndex].replace(/\s+/g, ''); // Class name from stop
        dot.classList.add(currentStopClass);

        // Calculate travel time
        let timeToNext = travelTimes[currentStopIndex] * 60000; // Convert minutes to milliseconds

        setTimeout(() => {
            dot.classList.remove(currentStopClass); // Remove current stop class
            const nextStopClass = stops[nextStopIndex].replace(/\s+/g, ''); // Next stop class
            dot.classList.add(nextStopClass); // Add next stop class

            // Animate the glide effect
            dot.style.transform = `translateY(${(nextStopIndex - currentStopIndex) * 60}px)`; // Adjust position

            setTimeout(() => {
                dot.remove();
                currentStopIndexes[ejeepIndex]++; // Move to the next stop
                moveEJeepDots(ejeepIndex); // Continue moving
            }, 1000); // Delay for transition effect
        }, timeToNext);
    }
}
