// Helper for random colors
function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

const container = document.querySelector('#container');
const newGridBtn = document.querySelector('#reset-btn');

// Create the Clear Button via JS
const clearBtn = document.createElement('button');
clearBtn.textContent = 'Clear Board';
clearBtn.id = 'clear-btn';
newGridBtn.after(clearBtn); // Places it right after the "New Grid" button

function createGrid(size) {
    container.innerHTML = '';
    const squareSize = 960 / size;

    for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;
        square.style.opacity = "0"; // Start at 0 for progressive darkening

        square.addEventListener('mouseover', () => {
            let currentOpacity = parseFloat(square.style.opacity);
            
            // Random color on first touch
            if (currentOpacity === 0) {
                square.style.backgroundColor = getRandomColor();
            }
            
            // Darken by 10% each pass
            if (currentOpacity < 1) {
                square.style.opacity = (currentOpacity + 0.1).toString();
            }
        });

        container.appendChild(square);
    }
}

// Clear Logic: Simply reset styles of existing squares
clearBtn.addEventListener('click', () => {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        square.style.backgroundColor = 'transparent';
        square.style.opacity = '0';
    });
});

newGridBtn.addEventListener('click', () => {
    let newSize = prompt("Enter squares per side (max 100):");
    newSize = parseInt(newSize);
    if (newSize > 0 && newSize <= 100) {
        createGrid(newSize);
    } else {
        alert("Please enter a number between 1 and 100.");
    }
});

createGrid(16);
