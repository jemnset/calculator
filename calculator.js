const Operators = Object.freeze({
    ADD:"+",
    SUBTRACT:"-",
    DIVIDE:"/",
    MULTIPLY:"×",
    PLUS_MINUS: "+/-",
    PERCENTAGE: "%",
    EQUALS: "=",
    UNSELECTED: "UNSELECTED"
});

const divideByZeroMsg = "OOPS";

let num1 = 0;
let num2 = 0;
let operator = Operators.UNSELECTED;

let displayNumber = 0;

const display = document.querySelector(".display");
clear();

const digits = document.querySelectorAll(".digit");

for(let btn of digits){   
    btn.addEventListener("click", () => {

        if(operator === Operators.UNSELECTED || operator === Operators.EQUALS){

            num1 = parseFloat(num1 + btn.textContent);
            display.textContent = num1;
        }else{
            num2 = parseFloat(num2 + btn.textContent);
            display.textContent = num2;
        }

    });
}

const operators = document.querySelectorAll(".operator");

for(let btn of operators){
    btn.addEventListener("click", () => {
        if(operator != Operators.UNSELECTED){
            displayNumber = operate(num1, num2, operator);
            display.textContent = displayNumber;
            displayNumber === divideByZeroMsg ? num1 = 0 : num1 = displayNumber;
            num2 = 0;
        }
        
        if(btn.textContent === Operators.EQUALS){
            operator = Operators.UNSELECTED;
        }
        else
            operator = btn.textContent;
    });
}

const reset = document.querySelector(".btnClear");
reset.addEventListener("click", () => {
    clear();
});

function operate(a, b, operator){

    switch(operator) {
        case Operators.ADD:
            return add(a,b);
        case Operators.SUBTRACT:
            return subtract(a,b);
        case Operators.MULTIPLY:
            return multiply(a,b);
        case Operators.DIVIDE:
            return divide(a,b);
    };
}

function add(a, b){
    //console.log("addition!");
    return a + b;
}

function subtract(a, b){
    //console.log("subtraction!");
    return a - b;
}

function multiply(a, b){
    //console.log("multiply!");
    return a * b;
}

function divide(a, b){
    //console.log("divide!");
    if(b === 0) return divideByZeroMsg;
    return a / b;
}

function clear(){
    num1 = 0;
    num2 = 0;
    operator = Operators.UNSELECTED;
    displayNumber = 0;
    display.textContent = displayNumber;
    //clear the display
}