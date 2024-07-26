const Operators = Object.freeze({
    ADD:"+",
    SUBTRACT:"-",
    DIVIDE:"/",
    MULTIPLY:"×",
    PLUS_MINUS: "+/-",
    PERCENTAGE: "%",
    EQUALS: "=",
    UNSELECTED: null
});

const divideByZeroMsg = "OOPS";

let num1 = null;
let num2 = null;
let operator = Operators.UNSELECTED;

let displayNumber = null;

const display = document.querySelector(".display");
clear();

const digits = document.querySelectorAll(".digit");

for(let btn of digits){   
    btn.addEventListener("click", () => {

        //console.log("num1: " + num1);
        //console.log("num2: " + num2);
        displayNumber === null ? displayNumber = btn.textContent : displayNumber += btn.textContent;
        updateDisplay(displayNumber);

    });
}

const operators = document.querySelectorAll(".operator");


//9.3 + 3 = * 2
for(let btn of operators){
    btn.addEventListener("click", () => {

        if(display.textContent.indexOf(".") != display.textContent.length - 1){
            console.log(`Before operation: ${num1} ${operator} ${num2}`);
            if(operator != Operators.UNSELECTED){
                num2 = Number(displayNumber);
                displayNumber = operate(num1, num2, operator);
                displayNumber === divideByZeroMsg ? num1 = 0 : num1 = Number(displayNumber);
                updateDisplay(displayNumber);
                num2 = 0;
            }
            
            if(btn.textContent === Operators.EQUALS){
                operator = Operators.UNSELECTED;
            }
            else{
                operator = btn.textContent;
            }
            num1 = Number(display.textContent);
            displayNumber = null;

        }
        console.log(`After operation: ${num1} ${operator} ${num2}`);
    });
}

const reset = document.querySelector(".btnClear");
reset.addEventListener("click", () => {
    clear();
});

const percentage = document.querySelector(".btnPercentage");
percentage.addEventListener("click", () => {
    displayNumber = roundNumber(Number(display.textContent)/100, 15);
    updateDisplay(displayNumber);
})

const plusminus = document.querySelector(".btnPlusMinus");
plusminus.addEventListener("click", () => {
    displayNumber = roundNumber(Number(display.textContent) * -1, 15);
    updateDisplay(displayNumber);
})

//need to be able to select decimal when displayNumber is zero
//cannot have multiple decimal spots
const decimal = document.querySelector(".btnDecimal");
decimal.addEventListener("click", () => {
    if(displayNumber === null || !displayNumber.toString().includes(".")){
        displayNumber = display.textContent + ".";
        updateDisplay(displayNumber);
    }
})

function operate(a, b, operator){

    switch(operator) {
        case Operators.ADD:
            return roundNumber(add(a,b), 15);
        case Operators.SUBTRACT:
            return roundNumber(subtract(a,b), 15);
        case Operators.MULTIPLY:
            return roundNumber(multiply(a,b), 15);
        case Operators.DIVIDE:
            return roundNumber(divide(a,b), 15);
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
    num1 = null;
    num2 = null;
    operator = Operators.UNSELECTED;
    displayNumber = null;
    updateDisplay(displayNumber);
    //clear the display
}

function updateDisplay(numString){
    let str = numString === null ? 0 : numString.toString();
    if(str.length >= 12)
        str = str.toString().substring(0, 12);

    display.textContent = str;
}

//9.3 * 3
function roundNumber(num, place){
    return Number(Math.round(num + "e" + place) + "e-" + place);
}