// Select the main counter button, reset button, and audio element
const countButton = document.getElementById('countButton');
const resetButton = document.getElementById('resetButton');
const clickSound = document.getElementById('clickSound');

// Variable to track the current count
let count = 20;

// Helper function to interpolate between colours
function interpolateColour(startColour, endColour, factor) {
    const startRGB = startColour.match(/\d+/g).map(Number);
    const endRGB = endColour.match(/\d+/g).map(Number);
    const resultRGB = startRGB.map((start, i) => Math.round(start + factor * (endRGB[i] - start)));
    return `rgb(${resultRGB.join(',')})`;
}

// Event listener for decrementing the counter
countButton.addEventListener('click', () => {
    if (count > 0) {
        clickSound.play(); // Play click sound
        count--; // Decrease count by 1
        updateButton(); // Update button appearance
    } else {
        // When count reaches 0, show "Fail" and disable the button
        countButton.textContent = 'Fail';
        countButton.classList.add('fail');
        countButton.disabled = true;
    }
});

// Event listener for resetting the counter
resetButton.addEventListener('click', () => {
    count = 20; // Reset count to 20
    updateButton();
    countButton.classList.remove('fail');
    countButton.disabled = false; // Re-enable the button
});

// Function to update button text and colour based on count
function updateButton() {
    countButton.textContent = count;

    let startColour, endColour, factor;

    if (count >= 12) {
        // Transition from dark green to dark yellow
        startColour = 'rgb(0, 100, 0)'; // Dark green
        endColour = 'rgb(207, 177, 7)'; // Dark yellow
        factor = (20 - count) / 8; // Scale for range 20-12
    } else if (count >= 5) {
        // Transition from dark yellow to dark orange
        startColour = 'rgb(207, 177, 7)'; // Dark yellow
        endColour = 'rgb(255, 140, 0)'; // Dark orange
        factor = (12 - count) / 5; // Scale for range 12-7
    } else {
        // Transition from dark orange to dark red
        startColour = 'rgb(255, 140, 0)'; // Dark orange
        endColour = 'rgb(197, 13, 13)'; // Dark red
        factor = (7 - count) / 6; // Scale for range 7-0
    }

    const newColour = interpolateColour(startColour, endColour, factor);
    countButton.style.backgroundColor = newColour;
}
