const { CalculatorUI } = require('../script.js');

describe('Testes de Integração - Fluxo da Calculadora', () => {
    let display;
    let calculator;

    beforeEach(() => {
        // Configurar DOM simulado
        document.body.innerHTML = `
            <input type="text" id="display" readonly>
        `;
        display = document.getElementById('display');
        
        // Criar nova instância da calculadora
        calculator = Object.create(CalculatorUI);
        calculator.currentInput = '';
        calculator.operator = '';
        calculator.previousInput = '';
    });

    test('Fluxo completo de soma', () => {
        calculator.appendToDisplay('5');
        calculator.appendToDisplay('+');
        calculator.appendToDisplay('3');
        calculator.calculate();

        expect(display.value).toContain('8');
        expect(calculator.currentInput).toBe('8');
        expect(calculator.operator).toBe('');
        expect(calculator.previousInput).toBe('');
    });

    test('Fluxo completo de multiplicação', () => {
        calculator.appendToDisplay('4');
        calculator.appendToDisplay('*');
        calculator.appendToDisplay('6');
        calculator.calculate();

        expect(display.value).toContain('24');
    });

    test('Fluxo completo com potência', () => {
        calculator.appendToDisplay('2');
        calculator.appendToDisplay('^');
        calculator.appendToDisplay('4');
        calculator.calculate();

        expect(display.value).toContain('16');
    });

    test('Fluxo com raiz quadrada', () => {
        calculator.appendToDisplay('25');
        calculator.handleSquareRoot();

        expect(display.value).toContain('5');
    });

    test('Limpar display', () => {
        calculator.appendToDisplay('5');
        calculator.appendToDisplay('+');
        calculator.appendToDisplay('3');
        calculator.clearDisplay();

        expect(display.value).toBe('');
        expect(calculator.currentInput).toBe('');
        expect(calculator.operator).toBe('');
        expect(calculator.previousInput).toBe('');
    });

    test('Limpar entrada atual', () => {
        calculator.appendToDisplay('5');
        calculator.appendToDisplay('+');
        calculator.appendToDisplay('3');
        calculator.clearEntry();

        expect(display.value).toBe('5 + ');
        expect(calculator.currentInput).toBe('');
    });

    test('Formatação de resultado com muitas casas decimais', () => {
        const result = calculator.formatResult(3.14159265359);
        expect(result.toString()).toHaveLength(9); // 3.141593
    });
});