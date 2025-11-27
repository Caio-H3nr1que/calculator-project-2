// Módulo de cálculos centralizado
const Calculator = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => {
        if (b === 0) throw new Error('Divisão por zero');
        return a / b;
    },
    power: (a, b) => Math.pow(a, b),
    squareRoot: (a) => {
        if (a < 0) throw new Error('Raiz quadrada de número negativo');
        return Math.sqrt(a);
    }
};

// Funções da interface
const CalculatorUI = {
    currentInput: '',
    operator: '',
    previousInput: '',

    appendToDisplay: function(value) {
        const display = document.getElementById('display');
        
        if (['+', '-', '*', '/', '^', '√'].includes(value)) {
            if (this.currentInput === '' && value !== '-') return;
            
            if (this.operator && this.currentInput) {
                this.calculate();
            }
            
            this.operator = value;
            this.previousInput = this.currentInput || '0';
            this.currentInput = '';
            
            if (value === '√') {
                this.handleSquareRoot();
                return;
            }
            
            display.value = this.previousInput + ' ' + this.getOperatorSymbol(value) + ' ';
        } else {
            if (value === '.' && this.currentInput.includes('.')) return;
            this.currentInput += value;
            display.value = (this.operator ? this.previousInput + ' ' + this.getOperatorSymbol(this.operator) + ' ' : '') + this.currentInput;
        }
    },

    getOperatorSymbol: function(op) {
        const symbols = {
            '+': '+',
            '-': '-',
            '*': '×',
            '/': '÷',
            '^': '^',
            '√': '√'
        };
        return symbols[op] || op;
    },

    handleSquareRoot: function() {
        try {
            const input = this.currentInput || this.previousInput;
            if (!input) return;
            
            const num = parseFloat(input);
            const result = Calculator.squareRoot(num);
            
            document.getElementById('display').value = `√${input} = ${this.formatResult(result)}`;
            this.currentInput = this.formatResult(result).toString();
            this.operator = '';
            this.previousInput = '';
        } catch (error) {
            this.showError(error.message);
        }
    },

    calculate: function() {
        if (!this.operator || this.currentInput === '') return;
        
        try {
            const num1 = parseFloat(this.previousInput);
            const num2 = parseFloat(this.currentInput);
            let result;
            
            switch (this.operator) {
                case '+':
                    result = Calculator.add(num1, num2);
                    break;
                case '-':
                    result = Calculator.subtract(num1, num2);
                    break;
                case '*':
                    result = Calculator.multiply(num1, num2);
                    break;
                case '/':
                    result = Calculator.divide(num1, num2);
                    break;
                case '^':
                    result = Calculator.power(num1, num2);
                    break;
                default:
                    return;
            }
            
            document.getElementById('display').value = 
                `${this.previousInput} ${this.getOperatorSymbol(this.operator)} ${this.currentInput} = ${this.formatResult(result)}`;
            
            this.currentInput = this.formatResult(result).toString();
            this.operator = '';
            this.previousInput = '';
        } catch (error) {
            this.showError(error.message);
        }
    },

    formatResult: function(result) {
        // Verifica se o resultado é um número válido
        if (!isFinite(result)) {
            throw new Error('Resultado não é um número finito');
        }

        // Para números muito pequenos ou muito grandes, usa notação científica
        if (Math.abs(result) < 1e-6 || Math.abs(result) > 1e9) {
            return parseFloat(result.toExponential(6));
        }

        // Para números normais, arredonda para 6 casas decimais
        const rounded = Math.round(result * 1e6) / 1e6;
        
        // Remove zeros desnecessários à direita
        return parseFloat(rounded.toFixed(6));
    },

    showError: function(message) {
        document.getElementById('display').value = `Erro: ${message}`;
        this.currentInput = '';
        this.operator = '';
        this.previousInput = '';
    },

    clearDisplay: function() {
        this.currentInput = '';
        this.operator = '';
        this.previousInput = '';
        document.getElementById('display').value = '';
    },

    clearEntry: function() {
        this.currentInput = '';
        document.getElementById('display').value = 
            this.operator ? this.previousInput + ' ' + this.getOperatorSymbol(this.operator) + ' ' : '';
    },

    // Adicionar suporte a teclado
    setupKeyboardSupport: function() {
        document.addEventListener('keydown', (event) => {
            const key = event.key;
            
            if (/[0-9]/.test(key)) {
                this.appendToDisplay(key);
            } else if (['+', '-', '*', '/'].includes(key)) {
                this.appendToDisplay(key);
            } else if (key === 'Enter' || key === '=') {
                this.calculate();
            } else if (key === 'Escape' || key === 'c' || key === 'C') {
                this.clearDisplay();
            } else if (key === '.') {
                this.appendToDisplay('.');
            } else if (key === 'Backspace') {
                this.clearEntry();
            }
        });
    }
};

// Inicialização quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    CalculatorUI.setupKeyboardSupport();
});

// Funções globais para o HTML (mantendo compatibilidade)
window.appendToDisplay = function(value) {
    CalculatorUI.appendToDisplay(value);
};

window.calculate = function() {
    CalculatorUI.calculate();
};

window.clearDisplay = function() {
    CalculatorUI.clearDisplay();
};

window.clearEntry = function() {
    CalculatorUI.clearEntry();
};

window.handleSquareRoot = function() {
    CalculatorUI.handleSquareRoot();
};

// Exportar para testes (se estiver em ambiente Node.js)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Calculator, CalculatorUI };
}