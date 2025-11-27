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

    test('Fluxo completo de subtração', () => {
        calculator.appendToDisplay('1');
        calculator.appendToDisplay('0');
        calculator.appendToDisplay('-');
        calculator.appendToDisplay('4');
        calculator.calculate();

        expect(display.value).toContain('6');
    });

    test('Fluxo completo de multiplicação', () => {
        calculator.appendToDisplay('4');
        calculator.appendToDisplay('*');
        calculator.appendToDisplay('6');
        calculator.calculate();

        expect(display.value).toContain('24');
    });

    test('Fluxo completo de divisão', () => {
        calculator.appendToDisplay('1');
        calculator.appendToDisplay('5');
        calculator.appendToDisplay('/');
        calculator.appendToDisplay('3');
        calculator.calculate();

        expect(display.value).toContain('5');
    });

    test('Fluxo completo com potência', () => {
        calculator.appendToDisplay('2');
        calculator.appendToDisplay('^');
        calculator.appendToDisplay('4');
        calculator.calculate();

        expect(display.value).toContain('16');
    });

    test('Fluxo com raiz quadrada', () => {
        calculator.appendToDisplay('2');
        calculator.appendToDisplay('5');
        calculator.handleSquareRoot();

        expect(display.value).toContain('5');
    });

    test('Fluxo com número decimal', () => {
        calculator.appendToDisplay('3');
        calculator.appendToDisplay('.');
        calculator.appendToDisplay('1');
        calculator.appendToDisplay('4');
        
        expect(display.value).toBe('3.14');
    });

    test('Não permite múltiplos pontos decimais', () => {
        calculator.appendToDisplay('3');
        calculator.appendToDisplay('.');
        calculator.appendToDisplay('1');
        calculator.appendToDisplay('.');
        calculator.appendToDisplay('4');
        
        expect(display.value).toBe('3.14');
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

    test('Divisão por zero mostra erro', () => {
        calculator.appendToDisplay('5');
        calculator.appendToDisplay('/');
        calculator.appendToDisplay('0');
        calculator.calculate();

        expect(display.value).toContain('Erro: Divisão por zero');
    });

    test('Raiz quadrada de número negativo mostra erro', () => {
        // Primeiro digita o número negativo
        calculator.appendToDisplay('-');
        calculator.appendToDisplay('4');
        
        // Agora calcula a raiz quadrada
        calculator.handleSquareRoot();

        expect(display.value).toContain('Erro: Raiz quadrada de número negativo');
    });

    test('Operação com número negativo', () => {
        calculator.appendToDisplay('-');
        calculator.appendToDisplay('5');
        calculator.appendToDisplay('+');
        calculator.appendToDisplay('8');
        calculator.calculate();

        expect(display.value).toContain('3');
    });

    test('Múltiplas operações em sequência', () => {
        calculator.appendToDisplay('1');
        calculator.appendToDisplay('0');
        calculator.appendToDisplay('+');
        calculator.appendToDisplay('5');
        calculator.calculate(); // 15
        
        calculator.appendToDisplay('-');
        calculator.appendToDisplay('3');
        calculator.calculate(); // 12

        expect(display.value).toContain('12');
    });

    test('Raiz quadrada de zero', () => {
        calculator.appendToDisplay('0');
        calculator.handleSquareRoot();

        expect(display.value).toContain('0');
    });

    test('Número negativo simples', () => {
        calculator.appendToDisplay('-');
        calculator.appendToDisplay('5');
        
        expect(display.value).toBe('-5');
    });

    test('Não permite sinal negativo no meio do número', () => {
        calculator.appendToDisplay('5');
        calculator.appendToDisplay('-'); // Isso deve ser tratado como operador
        calculator.appendToDisplay('3');
        
        expect(display.value).toBe('5 - 3');
    });
});