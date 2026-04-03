const display = document.getElementById('current');
const expression = document.getElementById('expression');

let currentValue = '0';
let previousValue = '';
let operator = null;
let shouldResetDisplay = false;

function updateDisplay(value) {
  display.textContent = value;
}

function inputNumber(num) {
  if (shouldResetDisplay) {
    currentValue = num;
    shouldResetDisplay = false;
  } else {
    currentValue = currentValue === '0' ? num : currentValue + num;
  }
  updateDisplay(currentValue);
}

function inputDot() {
  if (shouldResetDisplay) {
    currentValue = '0.';
    shouldResetDisplay = false;
    updateDisplay(currentValue);
    return;
  }
  if (!currentValue.includes('.')) {
    currentValue += '.';
    updateDisplay(currentValue);
  }
}

function inputOperator(op) {
  if (operator && !shouldResetDisplay) {
    calculate();
  }
  previousValue = currentValue;
  operator = op;
  shouldResetDisplay = true;
  expression.textContent = previousValue + ' ' + op;
}

function calculate() {
  if (!operator || !previousValue) return;

  const a = parseFloat(previousValue);
  const b = parseFloat(currentValue);
  let result;

  switch (operator) {
    case '+': result = a + b; break;
    case '−': result = a - b; break;
    case '×': result = a * b; break;
    case '÷': result = b !== 0 ? a / b : 'Error'; break;
  }

  expression.textContent = previousValue + ' ' + operator + ' ' + currentValue + ' =';
  currentValue = result.toString();
  updateDisplay(currentValue);
  operator = null;
  previousValue = '';
  shouldResetDisplay = true;
}

function clearAll() {
  currentValue = '0';
  previousValue = '';
  operator = null;
  shouldResetDisplay = false;
  expression.textContent = '';
  updateDisplay('0');
}

function toggleSign() {
  currentValue = (parseFloat(currentValue) * -1).toString();
  updateDisplay(currentValue);
}

function inputPercent() {
  currentValue = (parseFloat(currentValue) / 100).toString();
  updateDisplay(currentValue);
}

// Button bindings
document.getElementById('btn-0').addEventListener('click', () => inputNumber('0'));
document.getElementById('btn-1').addEventListener('click', () => inputNumber('1'));
document.getElementById('btn-2').addEventListener('click', () => inputNumber('2'));
document.getElementById('btn-3').addEventListener('click', () => inputNumber('3'));
document.getElementById('btn-4').addEventListener('click', () => inputNumber('4'));
document.getElementById('btn-5').addEventListener('click', () => inputNumber('5'));
document.getElementById('btn-6').addEventListener('click', () => inputNumber('6'));
document.getElementById('btn-7').addEventListener('click', () => inputNumber('7'));
document.getElementById('btn-8').addEventListener('click', () => inputNumber('8'));
document.getElementById('btn-9').addEventListener('click', () => inputNumber('9'));
document.getElementById('btn-dot').addEventListener('click', inputDot);

document.getElementById('btn-add').addEventListener('click', () => inputOperator('+'));
document.getElementById('btn-subtract').addEventListener('click', () => inputOperator('−'));
document.getElementById('btn-multiply').addEventListener('click', () => inputOperator('×'));
document.getElementById('btn-divide').addEventListener('click', () => inputOperator('÷'));

document.getElementById('btn-equals').addEventListener('click', calculate);
document.getElementById('btn-ac').addEventListener('click', clearAll);
document.getElementById('btn-sign').addEventListener('click', toggleSign);
document.getElementById('btn-percent').addEventListener('click', inputPercent);
