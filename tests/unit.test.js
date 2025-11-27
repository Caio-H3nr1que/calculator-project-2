const { Calculator, CalculatorUI } = require('../script.js');

describe('Testes Unitários - Funções de Cálculo', () => {
    test('Soma de dois números positivos', () => {
        expect(Calculator.add(2, 3)).toBe(5);
    });

    test('Soma de número positivo e negativo', () => {
        expect(Calculator.add(5, -3)).toBe(2);
    });

    test('Subtração de números positivos', () => {
        expect(Calculator.subtract(10, 4)).toBe(6);
    });

    test('Subtração com resultado negativo', () => {
        expect(Calculator.subtract(3, 7)).toBe(-4);
    });

    test('Multiplicação de números positivos', () => {
        expect(Calculator.multiply(4, 5)).toBe(20);
    });

    test('Multiplicação por zero', () => {
        expect(Calculator.multiply(7, 0)).toBe(0);
    });

    test('Divisão de números positivos', () => {
        expect(Calculator.divide(15, 3)).toBe(5);
    });

    test('Divisão por zero deve lançar erro', () => {
        expect(() => Calculator.divide(10, 0)).toThrow('Divisão por zero');
    });

    test('Potência de números positivos', () => {
        expect(Calculator.power(2, 3)).toBe(8);
    });

    test('Potência com expoente zero', () => {
        expect(Calculator.power(5, 0)).toBe(1);
    });

    test('Potência com expoente negativo', () => {
        expect(Calculator.power(2, -2)).toBe(0.25);
    });

    test('Raiz quadrada de número positivo', () => {
        expect(Calculator.squareRoot(16)).toBe(4);
    });

    test('Raiz quadrada de número negativo deve lançar erro', () => {
        expect(() => Calculator.squareRoot(-4)).toThrow('Raiz quadrada de número negativo');
    });

    test('Raiz quadrada de zero', () => {
        expect(Calculator.squareRoot(0)).toBe(0);
    });
});

describe('Testes Unitários - Funções da Interface', () => {
    let calculator;

    beforeEach(() => {
        calculator = Object.create(CalculatorUI);
        document.body.innerHTML = '<input type="text" id="display" readonly>';
    });

    test('getOperatorSymbol retorna símbolos corretos', () => {
        expect(calculator.getOperatorSymbol('+')).toBe('+');
        expect(calculator.getOperatorSymbol('-')).toBe('-');
        expect(calculator.getOperatorSymbol('*')).toBe('×');
        expect(calculator.getOperatorSymbol('/')).toBe('÷');
        expect(calculator.getOperatorSymbol('^')).toBe('^');
        expect(calculator.getOperatorSymbol('√')).toBe('√');
        expect(calculator.getOperatorSymbol('unknown')).toBe('unknown');
    });

    test('showError exibe mensagem de erro', () => {
        calculator.showError('Teste de erro');
        const display = document.getElementById('display');
        expect(display.value).toBe('Erro: Teste de erro');
        expect(calculator.currentInput).toBe('');
        expect(calculator.operator).toBe('');
        expect(calculator.previousInput).toBe('');
    });

    test('clearDisplay limpa tudo', () => {
        calculator.currentInput = '123';
        calculator.operator = '+';
        calculator.previousInput = '456';
        calculator.clearDisplay();
        
        expect(calculator.currentInput).toBe('');
        expect(calculator.operator).toBe('');
        expect(calculator.previousInput).toBe('');
        
        const display = document.getElementById('display');
        expect(display.value).toBe('');
    });

    test('clearEntry limpa apenas entrada atual', () => {
        calculator.currentInput = '123';
        calculator.operator = '+';
        calculator.previousInput = '456';
        calculator.clearEntry();
        
        expect(calculator.currentInput).toBe('');
        expect(calculator.operator).toBe('+');
        expect(calculator.previousInput).toBe('456');
    });

    test('handleSquareRoot com número negativo mostra erro', () => {
        calculator.currentInput = '-4';
        calculator.handleSquareRoot();
        
        const display = document.getElementById('display');
        expect(display.value).toContain('Erro: Raiz quadrada de número negativo');
    });

    test('handleSquareRoot sem input não faz nada', () => {
        calculator.currentInput = '';
        calculator.previousInput = '';
        calculator.handleSquareRoot();
        
        const display = document.getElementById('display');
        expect(display.value).toBe('');
    });

    test('handleSquareRoot com apenas sinal negativo não faz nada', () => {
        calculator.currentInput = '-';
        calculator.handleSquareRoot();
        
        const display = document.getElementById('display');
        expect(display.value).toBe('');
    });

    test('calculate sem operador não faz nada', () => {
        calculator.currentInput = '5';
        calculator.operator = '';
        calculator.previousInput = '3';
        calculator.calculate();
        
        const display = document.getElementById('display');
        expect(display.value).toBe('');
    });

    test('calculate sem currentInput não faz nada', () => {
        calculator.currentInput = '';
        calculator.operator = '+';
        calculator.previousInput = '3';
        calculator.calculate();
        
        const display = document.getElementById('display');
        expect(display.value).toBe('');
    });

    test('calculate com apenas sinal negativo não faz nada', () => {
        calculator.currentInput = '-';
        calculator.operator = '+';
        calculator.previousInput = '3';
        calculator.calculate();
        
        const display = document.getElementById('display');
        expect(display.value).toBe('');
    });

    test('appendToDisplay permite sinal negativo no início', () => {
        calculator.appendToDisplay('-');
        calculator.appendToDisplay('5');
        
        const display = document.getElementById('display');
        expect(display.value).toBe('-5');
    });

    test('appendToDisplay não permite sinal negativo no meio do número', () => {
        calculator.appendToDisplay('5');
        calculator.appendToDisplay('-'); // Deve ser tratado como operador
        
        const display = document.getElementById('display');
        expect(display.value).toBe('5 - ');
    });
});