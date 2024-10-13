let displayValue = '';
let firstNumber = null;
let secondNumber = null;
let currentOperator = null;

const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('click', function() {
        if (button.classList.contains('clear')) {
            clear();
        } else if (button.textContent === '=') {
            calculate();
        } else if (['+', '-', '*', '/'].includes(button.textContent)) {
            setOperator(button.textContent);
        } else {
            appendNumber(button.textContent);
        }
    });
});

function clear() {
    displayValue = '';
    firstNumber = null;
    secondNumber = null;
    currentOperator = null;
    updateDisplay();
}

function appendNumber(number) {
    if (displayValue === 'Error: Division by zero') {
        displayValue = '';
    }
    displayValue += number;
    updateDisplay();
}

function setOperator(operator) {
    if (currentOperator !== null) {
        calculate();
    }
    firstNumber = parseFloat(displayValue);
    if (isNaN(firstNumber)) {
        return;
    }
    displayValue = '';
    currentOperator = operator;
}

function calculate() {
    if (currentOperator === null || displayValue === '') return;
    secondNumber = parseFloat(displayValue);
    if (isNaN(secondNumber)) {
        return;
    }

    let result;
    switch (currentOperator) {
        case '+':
            result = add(firstNumber, secondNumber);
            break;
        case '-':
            result = subtract(firstNumber, secondNumber);
            break;
        case '*':
            result = multiply(firstNumber, secondNumber);
            break;
        case '/':
            if (secondNumber === 0) {
                displayValue = 'Error: Division by zero';
                updateDisplay();
                return;
            }
            result = divide(firstNumber, secondNumber);
            break;
    }

    displayValue = roundToMaxDigits(result, 10);
    updateDisplay();
    firstNumber = parseFloat(displayValue);
    currentOperator = null;
    displayValue = '';
}

function updateDisplay() {
    display.textContent = displayValue;
}

function roundToMaxDigits(number, maxDigits) {
    return parseFloat(number.toFixed(maxDigits));
}

// Basic math functions
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}
