const container = document.querySelector('#container');
const btn = document.querySelector('#reset-btn');

function createGrid(size) {
    // Clear existing grid
    container.innerHTML = '';
    
    // Calculate square size
    const squareSize = 960 / size;

    for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;

        // Add hover effect
        square.addEventListener('mouseover', () => {
            square.classList.add('hovered');
        });

        container.appendChild(square);
    }
}

// Function to generate a random RGB color
function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// Update the listener inside your createGrid loop:
square.addEventListener('mouseover', () => {
    // 1. Get current opacity (default is 0 if not set)
    let currentOpacity = parseFloat(square.style.opacity) || 0;

    // 2. Extra Credit: Randomize Color only on the first touch
    if (currentOpacity === 0) {
        square.style.backgroundColor = getRandomColor();
    }

    // 3. Extra Credit: Progressive Darkening (+10% each time)
    if (currentOpacity < 1) {
        square.style.opacity = currentOpacity + 0.1;
    }
});


// Initial 16x16 grid
createGrid(16);
