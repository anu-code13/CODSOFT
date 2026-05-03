class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        if (this.currentOperand === '0') return;
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        if (this.currentOperand === '') this.currentOperand = '0';
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number.toString();
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
    }

    chooseOperation(operation) {
        if (this.currentOperand === '0' && this.previousOperand === '') return;
        
        // Use if-else for computation check
        if (this.previousOperand !== '') {
            this.compute();
        }
        
        // Map operators to display symbols
        let symbol = '';
        if (operation === 'add') {
            symbol = '+';
        } else if (operation === 'subtract') {
            symbol = '−';
        } else if (operation === 'multiply') {
            symbol = '×';
        } else if (operation === 'divide') {
            symbol = '÷';
        }

        this.operation = operation;
        this.operationSymbol = symbol;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '0';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        
        if (isNaN(prev) || isNaN(current)) return;

        // Requirement: use if-else statements and operators
        if (this.operation === 'add') {
            computation = prev + current;
        } else if (this.operation === 'subtract') {
            computation = prev - current;
        } else if (this.operation === 'multiply') {
            computation = prev * current;
        } else if (this.operation === 'divide') {
            if (current === 0) {
                computation = 'Error';
            } else {
                computation = prev / current;
            }
        } else {
            return;
        }

        this.currentOperand = computation.toString();
        this.operation = undefined;
        this.previousOperand = '';
    }

    getDisplayNumber(number) {
        if (number === 'Error') return number;
        
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '0';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        }
        
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = 
                `${this.getDisplayNumber(this.previousOperand)} ${this.operationSymbol}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }
}

// Select DOM elements
const previousOperandTextElement = document.getElementById('previous-operand');
const currentOperandTextElement = document.getElementById('current-operand');
const keys = document.querySelectorAll('.key');

// Initialize Calculator
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

// Requirement: use loops to handle user input
for (let i = 0; i < keys.length; i++) {
    keys[i].addEventListener('click', () => {
        const key = keys[i];
        
        // Requirement: use if-else statements to handle user input
        if (key.classList.contains('number')) {
            calculator.appendNumber(key.dataset.number);
            calculator.updateDisplay();
        } else if (key.classList.contains('operator') && !key.classList.contains('equals')) {
            calculator.chooseOperation(key.dataset.action);
            calculator.updateDisplay();
        } else if (key.classList.contains('equals')) {
            calculator.compute();
            calculator.updateDisplay();
        } else if (key.classList.contains('clear')) {
            calculator.clear();
            calculator.updateDisplay();
        } else if (key.dataset.action === 'delete') {
            calculator.delete();
            calculator.updateDisplay();
        }
    });
}
