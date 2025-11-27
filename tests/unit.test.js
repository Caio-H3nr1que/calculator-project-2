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

    test('Raiz quadrada de número positivo', () => {
        expect(Calculator.squareRoot(16)).toBe(4);
    });

    test('Raiz quadrada de número negativo deve lançar erro', () => {
        expect(() => Calculator.squareRoot(-4)).toThrow('Raiz quadrada de número negativo');
    });
});

describe('Testes Unitários - Formatação de Resultados', () => {
    let calculator;

    beforeEach(() => {
        calculator = Object.create(CalculatorUI);
    });

    test('Formatação de número inteiro', () => {
        expect(calculator.formatResult(42)).toBe(42);
    });

    test('Formatação de número com uma casa decimal', () => {
        expect(calculator.formatResult(3.1)).toBe(3.1);
    });

    test('Formatação de número com muitas casas decimais', () => {
        expect(calculator.formatResult(3.14159265359)).toBe(3.141593);
    });

    test('Formatação de número com zeros à direita', () => {
        expect(calculator.formatResult(2.500000)).toBe(2.5);
    });

    test('Formatação de zero', () => {
        expect(calculator.formatResult(0)).toBe(0);
    });

    test('Formatação de número negativo', () => {
        expect(calculator.formatResult(-3.14159)).toBe(-3.14159);
    });

    test('Formatação de infinito deve lançar erro', () => {
        expect(() => calculator.formatResult(Infinity)).toThrow('Resultado não é um número finito');
    });

    test('Formatação de NaN deve lançar erro', () => {
        expect(() => calculator.formatResult(NaN)).toThrow('Resultado não é um número finito');
    });
});