const display = document.querySelector('.calculator-input');
const keys = document.querySelector('.calculator-keys');

let displayvalue = '0';
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;
updateDisplay();

function updateDisplay() {
    display.value = displayvalue;

}
keys.addEventListener('click', function(e) {
    const element=e.target;
    const value = element.value;
    if(!element.matches('button')) //matches methodu elementin buton olup olmadığını kontrol etti.
    {
        return;
    }

    switch(value){
         case '*':
         case '-':
         case '+':
         case '/':
         case '=':

        handleOperator(value);
        break;

        case '.':
            inputDecimal();
        break;
        case 'clear':
            clear();
            break;
    
        default:
            inputNumber(element.value);
    }
    
    
    //console.log('number',element.value);
    
    updateDisplay();

});

function handleOperator(nextOperator) {
    const value = parseFloat(displayvalue);
    if(operator && waitingForSecondValue){
        operator = nextOperator;
        return;
    }



    if(firstValue === null){
        firstValue = value;

    }
    else if(operator){
        const result = calculate(firstValue, value, operator);
        displayvalue = `${parseFloat(result.toFixed(7))}`;
        firstValue = result;
    }
    waitingForSecondValue = true;
    operator = nextOperator;
}
function calculate(first, second, operator){
    if(operator === '+'){
        return first+second;

    }else if(operator ==='-')
    {
        return first-second;
    }
    else if(operator  ==='*')
    {
        return first*second;

    }
    else if(operator==='/')
    {

        return first/second;
    }

    return second;
}


function inputNumber(num){
   
    if(waitingForSecondValue){
        displayvalue = num;
        waitingForSecondValue = false;
    }
   
   else{
    displayvalue = displayvalue === '0'? num: displayvalue + num;
   }   
}

function inputDecimal() {
    if(!displayvalue.includes('.')){
        displayvalue += '.';

    }
}

function clear() {
    displayvalue ='0';
}










