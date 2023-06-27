let num1 = 0;
let num2 = 0;
let operator;
let displayValue;
let justOperated = true;
let numDigits = 0;

function add(a, b) {
    return parseInt(a) + parseInt(b);
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

function operate(num1, num2, operator) {
    if (operator == "add") {
        return add(num1, num2);
    } else if (operator == "subtract") {
        return subtract(num1, num2);
    } else if (operator == "multiply") {
        return multiply(num1, num2);
    } else if (operator == "divide") {
        if (num2 == 0) {
            return "ERROR";
        }
        return divide(num1, num2);
    }
}

const display = document.querySelector("#display");
const numButtons = document.querySelectorAll("#one, #two, #three, #four, #five, #six, #seven, #eight, #nine, #zero");
numButtons.forEach((button) => {
    button.addEventListener("click", function(e) {
        if (numDigits <= 11) {
            if (justOperated || displayValue == 0) {
                displayValue = e.target.textContent;
                justOperated = false;
            } else {
                displayValue += e.target.textContent;    
            }
            display.textContent = displayValue;  
            numDigits++;  
        } 
    });
});

const decimalButton = document.querySelector("#decimal");

decimalButton.addEventListener("click", () => {
    if (numDigits <= 11 && !displayValue.includes(".")) {
        if (justOperated || displayValue == 0) {
            displayValue = ".";
            justOperated = false;
        } else {
            displayValue += ".";    
        }
        display.textContent = displayValue;  
        numDigits++;  
    } 
});


const opButtons = document.querySelectorAll("#add, #subtract, #multiply, #divide");
opButtons.forEach((button) => {
    button.addEventListener("click", function(e) {
        if (operator != null) {
            num2 = displayValue;
            displayValue = operate(num1, num2, operator);
            display.textContent = displayValue;
        } 
        num1 = displayValue;
        displayValue = 0;
        operator = e.target.id
        numDigits = 0;    
    });
});

const equalsButton = document.querySelector("#equals");
equalsButton.addEventListener("click", () => {
    if(operator != null) {
        num2 = displayValue;
        let answer = operate(num1, num2, operator);
        if (answer.toString().length >= 12) {
            if (operator == "divide") {
                answer = answer.toString().slice(0, 12);
            } else {
                let temp = answer.toExponential().toString();
                answer = temp.slice(0, 8) + temp.slice(-4);
            }
        }

        displayValue = answer;
        display.textContent = displayValue;
        num1 = displayValue;
        num2 = 0;
        operator = null;
        justOperated = true;
        numDigits = 0;    
    }
});

const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", () => {
    num1 = 0;
    num2 = 0;
    displayValue = 0;
    operator = null;
    justOperated = true;
    display.textContent = displayValue;
    numDigits = 0;
});

const deleteButton = document.querySelector("#delete");
deleteButton.addEventListener("click", () => {
    displayValue = displayValue.toString().slice(0, -1);
    display.textContent = displayValue;
    numDigits--;
})
