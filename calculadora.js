class Calculator {
    constructor(operand1Element, operand2Element) {
        this.operand1Element = operand1Element;
        this.operand2Element = operand2Element;
        this.clear();
    }

    clear() {
        this.operand1 = '';
        this.operand2 = '';
        this.operator = null;
        this.updateUI();
    }

    updateUI() {
        this.operand1Element.textContent = this.operand1 + (this.operator || '');
        this.operand2Element.textContent = this.operand2;
    }

    appendNumber(number) {
        if (number === '.' && this.operand2.includes('.')) return;
        this.operand2 = this.operand2.toString() + number;
        this.updateUI();
    }

    delete() {
        this.operand2 = this.operand2.toString().slice(0, -1) || '';
        this.updateUI();
    }

    chooseOperation(operation) {
        if (this.operand2 === '') return;
        if (this.operand1 !== '') {
            this.compute();
        }
        this.operator = operation;
        this.operand1 = this.operand2;
        this.operand2 = '';
        this.updateUI();
    }

    compute() {
        const prev = parseFloat(this.operand1);
        const current = parseFloat(this.operand2);
        if (isNaN(prev) || isNaN(current)) return;

        let result;
        switch (this.operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return;
        }

        this.operand1 = result.toString();
        this.operator = null;
        this.operand2 = '';
        this.updateUI();
    }
}

// Selección de elementos del DOM
const operand1Element = document.querySelector("[data-operand-1]");
const operand2Element = document.querySelector("[data-operand-2]");
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const clearButton = document.querySelector("[data-clear]");
const deleteButton = document.querySelector("[data-delete]");

// Instanciar la calculadora
const calculator = new Calculator(operand1Element, operand2Element);

// Conexión de eventos
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.textContent);
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.textContent);
    });
});

equalsButton.addEventListener('click', () => {
    calculator.compute();
});

clearButton.addEventListener('click', () => {
    calculator.clear();
});

deleteButton.addEventListener('click', () => {
    calculator.delete();
});

