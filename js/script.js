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

            // Select operator
            if (buttonValue === "operator") {
                if (number2.length > 0) { // Continue calculation with the result value
                    result = operate(operator, number1, number2);
                    number2 = "";
                    number1 = result;
                    
                    populateDisplay(result);
                    
                    result = "";
                    operator = button.getAttribute("id"); // Get name of operator
                } else {
                    operator = button.getAttribute("id"); // Get name of operator

                    populateDisplay(button.innerHTML);
                }
            }

            // Show result of calculation
            if (buttonValue === "equals") {
                if (result.length === 0) result = operate(operator, number1, number2); // Show result with first and second number
                else result = operate(operator, result, number2); // Show result with result value and second number
                
                number1 = "";
                operator = "";
                number2 = "";

                populateDisplay(result);
            }

            // Remove last value selected
            if (buttonValue === "backspace") {
                if (operator.length === 0) { // Remove from first number
                    number1 = number1.slice(0, -1);

                    populateDisplay(number1);

                    if (number1.length === 0) clear(); // Clear all if first number was totally removed
                } 
                
                if (operator.length > 0 && number2.length === 0) { // Remove operator
                    operator = "";

                    if (operator.length === 0) populateDisplay(number1); // Operator was removed and calculation has returned to first number
                } 
                
                if (operator.length > 0 && number2.length > 0) { // Remove from second number
                    number2 = number2.slice(0, -1);

                    populateDisplay(number2);

                    if (number2.length === 0) populateDisplay(operator); // Second number was removed and calculation has returned to operator
                }
            }
        });
    });
});
