// Load content before DOM
document.addEventListener("DOMContentLoaded", () => {
    // Variables
    const display = document.querySelector(".display");
    const buttons = document.querySelectorAll("button");
    let number1 = "", operator = "", number2 = "", result = "";

    // Operate
    function operate(operator, x, y) {
        x = Number(x);
        y = Number(y);

        if (operator === "add") return x + y;
        else if (operator === "subtract") return x - y;
        else if (operator === "multiply") return x * y;
        else return x / y;
    }

    // Populate display with values
    function populateDisplay(text) {
        display.innerHTML = text; // Display value
        
        if (text === result) { // Change result value only
            if (display.innerHTML.length > 15) {
                display.innerHTML = display.innerHTML.substring(0, 15) + "..."; // Limit display value to 15 character maximum
            }
        }
        
        if (display.innerHTML == "Infinity" || display.innerHTML == "NaN") clear(); // Fix "Infinity" or "NaN" final result
    }

    // Clear
    function clear() {
        number1 = "";
        operator = "";
        number2 = "";
        result = "";

        populateDisplay("0");
    }

    // Calculator
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const buttonValue = button.getAttribute("value");

            // Select number
            if (buttonValue === "number") {
                if (operator.length === 0) { // First number to be select
                    number1 += button.innerHTML;
                    result = ""; // Backspace function (remove last caracter)

                    populateDisplay(number1);
                } else {
                    number2 += button.innerHTML;

                    populateDisplay(number2);
                }
            }

            // Integer to float number
            if (buttonValue === "dot") {
                if (operator.length === 0) { // First number to be select
                    if (number1.indexOf(".") < 0) number1 += "."; // Check if number has more than one "." value
                    
                    populateDisplay(number1);
                } else {
                    if (number2.indexOf(".") < 0) number2 += "."; // Check if number has more than one "." value

                    populateDisplay(number2);
                }
            }
        });
    });
});
