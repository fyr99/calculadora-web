document.addEventListener('DOMContentLoaded', () => {
  const display = document.getElementById('display');
  const buttons = document.querySelectorAll('.button');
  const clearButton = document.getElementById('clear');
  const equalButton = document.getElementById('equal');
  const operatorButtons = document.querySelectorAll('.button--operator');

  let currentInput = '';
  let operator = '';
  let firstValue = '';
  let isOperatorSelected = false;
  let isEqualPressed = false;


  buttons.forEach(button => {
    button.addEventListener('click', (event) => {
      const value = event.target.getAttribute('data-value');

      if (event.target.classList.contains('button--number')) {
        handleNumberInput(value);
      } else if (event.target.classList.contains('button--operator')) {
        handleOperatorInput(event, value);
      }
    });
  });


  equalButton.addEventListener('click', () => {
    if (firstValue && operator && currentInput !== '') {
      const result = calculateResult();
      display.value = result;
      resetCalculator(result);
      removeOperatorActive();
    }
  });


  clearButton.addEventListener('click', () => {
    resetCalculator();
    display.value = '';
    removeOperatorActive();
  });

  function handleNumberInput(value) {
    if (isEqualPressed) {
      resetCalculator();
    }

    if (isOperatorSelected) {
      currentInput = '';
      isOperatorSelected = false;
    }
    currentInput += value;
    display.value = currentInput;
  }

  function handleOperatorInput(event, value) {

    if (isEqualPressed) {
      isEqualPressed = false;
      currentInput = display.value;
    }

    if (currentInput === '') currentInput = display.value;

    if (firstValue === '') {
      firstValue = currentInput;
    } else if (!isOperatorSelected) {
      firstValue = calculateResult();
      display.value = firstValue;
    }

    operator = value;
    isOperatorSelected = true;
    removeOperatorActive();
    event.target.classList.add('active');
  }

  function calculateResult() {
    const firstNumber = parseFloat(firstValue);
    const secondNumber = parseFloat(currentInput);
    switch (operator) {
      case '+':
        return firstNumber + secondNumber;
      case '-':
        return firstNumber - secondNumber;
      case '*':
        return firstNumber * secondNumber;
      case '/':
        return firstNumber / secondNumber;
      default:
        return secondNumber;
    }
  }

  function resetCalculator(result = '') {
    firstValue = result;
    currentInput = result;
    operator = '';
    isOperatorSelected = false;
    isEqualPressed = true;
  }

  function removeOperatorActive() {
    operatorButtons.forEach(button => {
      button.classList.remove('active');
    });
  }
});
