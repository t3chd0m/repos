// --- STEP 2: VARIABLES & MATH ENGINE ---

let firstNum = "";
let secondNum = "";
let currentOperator = null;
let shouldResetDisplay = false;

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => (b === 0 ? "NICE TRY, BUD" : a / b);

function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case "+": return add(a, b);
    case "-": return subtract(a, b);
    case "*": return multiply(a, b);
    case "/": return divide(a, b);
    default: return null;
  }
}

// --- STEP 4: UI INTERACTION ---

const display = document.getElementById('display');

function updateDisplay(value) {
  // Round long decimals to avoid display overflow
  if (typeof value === "number") {
    value = Math.round(value * 100000) / 100000;
  }
  display.textContent = value;
}

// Number Buttons
document.querySelectorAll('.number').forEach(button => {
  button.addEventListener('click', () => {
    if (display.textContent === "0" || shouldResetDisplay) {
      updateDisplay(button.textContent);
      shouldResetDisplay = false;
    } else {
      updateDisplay(display.textContent + button.textContent);
    }
  });
});

// Operator Buttons
document.querySelectorAll('.operator').forEach(button => {
  button.addEventListener('click', () => {
    // If user hits "+" then "-" without an "=", calculate the first part first
    if (currentOperator !== null && !shouldResetDisplay) {
      evaluate();
    }
    firstNum = display.textContent;
    currentOperator = button.textContent;
    shouldResetDisplay = true;
  });
});

function evaluate() {
  if (currentOperator === null || shouldResetDisplay) return;
  secondNum = display.textContent;
  let result = operate(currentOperator, firstNum, secondNum);
  updateDisplay(result);
  firstNum = result;
  currentOperator = null;
  shouldResetDisplay = true; // Prep for next set of numbers
}

document.getElementById('equals').addEventListener('click', evaluate);

document.getElementById('clear').addEventListener('click', () => {
  firstNum = "";
  secondNum = "";
  currentOperator = null;
  updateDisplay("0");
});

document.getElementById('decimal').addEventListener('click', () => {
    if (shouldResetDisplay) {
        updateDisplay("0.");
        shouldResetDisplay = false;
        return;
    }
    // Only add a decimal if there isn't one already
    if (!display.textContent.includes('.')) {
        updateDisplay(display.textContent + ".");
    }
});

document.getElementById('backspace').addEventListener('click', () => {
    if (display.textContent.length === 1 || display.textContent === "SNARKY ERROR") {
        updateDisplay("0");
    } else {
        updateDisplay(display.textContent.slice(0, -1));
    }
});

window.addEventListener('keydown', (e) => {
    if (e.key >= 0 && e.key <= 9) handleNumber(e.key); // Call your number logic
    if (e.key === '.') document.getElementById('decimal').click();
    if (e.key === '=' || e.key === 'Enter') evaluate();
    if (e.key === 'Backspace') document.getElementById('backspace').click();
    if (e.key === 'Escape') document.getElementById('clear').click();
    if (['+', '-', '*', '/'].includes(e.key)) handleOperator(e.key); // Call your operator logic
});

// --- KEYBOARD LISTENER ---
// We add it to 'window' so it works no matter where you click on the page
window.addEventListener('keydown', (e) => {
    // 1. Handle Numbers (0-9)
    if (e.key >= 0 && e.key <= 9) {
        handleNumber(e.key); 
    }
    
    // 2. Handle Operators (+, -, *, /)
    if (['+', '-', '*', '/'].includes(e.key)) {
        handleOperator(e.key);
    }

    // 3. Handle Special Keys
    if (e.key === '.' || e.key === ',') document.getElementById('decimal').click();
    if (e.key === '=' || e.key === 'Enter') evaluate();
    if (e.key === 'Backspace') document.getElementById('backspace').click();
    if (e.key === 'Escape') document.getElementById('clear').click();

    // 4. Trigger the "Pop" animation
    animateButton(e.key);
});
