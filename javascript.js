function add(a,b) {return a+b};
function subtract(a,b) {return a-b};
function multiply(a,b) {return a*b};
function divide(a,b) {return a/b};

let firstNumber ='';
let secondNumber ='';
let operator;
let operatorChosen;

function operate(a,operator,b){
    a = parseInt(a);
    b = parseInt(b);
    switch (operator){
        case 'add':
            result = add(a,b);
            break;
        case 'subtract':
            result = subtract(a,b);
            break;
        case 'multiply':
            result = multiply(a,b);
            break;
        case 'divide':
            result = divide(a,b);
            break;
        default:
            result =null; 
    }
    return result;
}

function writeScreen(number){
    const screen = document.querySelector('.screen');
    const text = document.createElement('p');
    text.textContent = number.toString();
    text.style.fontSize = '70px';
    text.style.fontWeight = 'bold';
    screen.appendChild(text);
}

function clearScreen(){
    const screen = document.querySelector('.screen');
    while (screen.hasChildNodes()) {
        screen.removeChild(screen.firstChild);
    }
}

function writeScreenEvent(event){
    const number = this.textContent; 
    if (operatorChosen) {
        secondNumber += number;
    }else{
        firstNumber += number;
        writeScreen(number);
    }
}

const buttonNumber = document.querySelectorAll('.number');
buttonNumber.forEach(button => {
    button.addEventListener('click',writeScreenEvent);
});

const buttonOperator = document.querySelectorAll('.operator');
buttonOperator.forEach(button => {
    button.addEventListener('click', (e) => {
        if (operatorChosen && firstNumber && secondNumber){
            let result = operate(firstNumber,operator,secondNumber);
            firstNumber= '';
            secondNumber= '';
            updateScreen(result);
        }
        operator = e.target.id;
        operatorChosen = true;
        console.log(operator);
    });
});

function updateScreen(result){
    clearScreen();
    if (result) result = Math.round(result * 100) / 100;
    writeScreen(result);
    firstNumber = result.toString();
}

const buttonEqual = document.querySelector('.equal')
buttonEqual.addEventListener('click',(e) => {
    let result = operate(firstNumber,operator,secondNumber);
    updateScreen(result);
    secondNumber ='';
    operatorChosen = false;
});

const buttonClear = document.querySelector('.clear')
buttonClear.addEventListener('click',(e) =>{
    clearScreen();
    firstNumber = '';
    secondNumber = '';
    operator = null;
    operatorChosen = false;
});

const buttonDelete = document.querySelector('.delete')
buttonDelete.addEventListener('click',(e)=>{
    if (!operatorChosen){
        firstNumber = firstNumber.substring(0,firstNumber.length-1);
        updateScreen(firstNumber);
    }else{
        secondNumber = secondNumber.substring(0,secondNumber.length-1);
    }
});
