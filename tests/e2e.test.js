const { CalculatorUI } = require('../script.js');

describe('Testes End-to-End - Interface do Usuário', () => {
    let display, buttons;
    let calculator;

    beforeEach(() => {
        // Configurar DOM completo
        document.body.innerHTML = `
            <div class="calculator">
                <div class="display">
                    <input type="text" id="display" readonly>
                </div>
                <div class="buttons">
                    <button class="btn clear" id="clear">C</button>
                    <button class="btn clear" id="clearEntry">CE</button>
                    <button class="btn operator" id="sqrt">√</button>
                    <button class="btn operator" id="power">^</button>
                    
                    <button class="btn number" id="btn7">7</button>
                    <button class="btn number" id="btn8">8</button>
                    <button class="btn number" id="btn9">9</button>
                    <button class="btn operator" id="divide">/</button>
                    
                    <button class="btn number" id="btn4">4</button>
                    <button class="btn number" id="btn5">5</button>
                    <button class="btn number" id="btn6">6</button>
                    <button class="btn operator" id="multiply">×</button>
                    
                    <button class="btn number" id="btn1">1</button>
                    <button class="btn number" id="btn2">2</button>
                    <button class="btn number" id="btn3">3</button>
                    <button class="btn operator" id="subtract">-</button>
                    
                    <button class="btn number" id="btn0">0</button>
                    <button class="btn number" id="btnDot">.</button>
                    <button class="btn equals" id="equals">=</button>
                    <button class="btn operator" id="add">+</button>
                </div>
            </div>
        `;
        
        display = document.getElementById('display');
        buttons = document.querySelectorAll('.btn');
        
        // Configurar event listeners
        document.getElementById('clear').onclick = () => calculator.clearDisplay();
        document.getElementById('clearEntry').onclick = () => calculator.clearEntry();
        document.getElementById('sqrt').onclick = () => calculator.handleSquareRoot();
        document.getElementById('power').onclick = () => calculator.appendToDisplay('^');
        document.getElementById('btn7').onclick = () => calculator.appendToDisplay('7');
        document.getElementById('btn8').onclick = () => calculator.appendToDisplay('8');
        document.getElementById('btn9').onclick = () => calculator.appendToDisplay('9');
        document.getElementById('divide').onclick = () => calculator.appendToDisplay('/');
        document.getElementById('btn4').onclick = () => calculator.appendToDisplay('4');
        document.getElementById('btn5').onclick = () => calculator.appendToDisplay('5');
        document.getElementById('btn6').onclick = () => calculator.appendToDisplay('6');
        document.getElementById('multiply').onclick = () => calculator.appendToDisplay('*');
        document.getElementById('btn1').onclick = () => calculator.appendToDisplay('1');
        document.getElementById('btn2').onclick = () => calculator.appendToDisplay('2');
        document.getElementById('btn3').onclick = () => calculator.appendToDisplay('3');
        document.getElementById('subtract').onclick = () => calculator.appendToDisplay('-');
        document.getElementById('btn0').onclick = () => calculator.appendToDisplay('0');
        document.getElementById('btnDot').onclick = () => calculator.appendToDisplay('.');
        document.getElementById('equals').onclick = () => calculator.calculate();
        document.getElementById('add').onclick = () => calculator.appendToDisplay('+');
        
        // Criar nova instância da calculadora
        calculator = Object.create(CalculatorUI);
        calculator.currentInput = '';
        calculator.operator = '';
        calculator.previousInput = '';
    });

    test('Cálculo completo via clique nos botões', () => {
        // Simular clique nos botões: 8 × 5 =
        document.getElementById('btn8').click();
        document.getElementById('multiply').click();
        document.getElementById('btn5').click();
        document.getElementById('equals').click();

        expect(display.value).toContain('40');
    });

    test('Cálculo de potência via interface', () => {
        document.getElementById('btn2').click();
        document.getElementById('power').click();
        document.getElementById('btn3').click();
        document.getElementById('equals').click();

        expect(display.value).toContain('8');
    });

    test('Cálculo de raiz quadrada via interface', () => {
        document.getElementById('btn9').click();
        document.getElementById('sqrt').click();

        expect(display.value).toContain('3');
    });

    test('Limpar display via botão C', () => {
        document.getElementById('btn5').click();
        document.getElementById('clear').click();

        expect(display.value).toBe('');
    });

    test('Suporte a teclado - números e operadores', () => {
        calculator.setupKeyboardSupport();
        
        const event5 = new KeyboardEvent('keydown', { key: '5' });
        document.dispatchEvent(event5);
        
        const eventPlus = new KeyboardEvent('keydown', { key: '+' });
        document.dispatchEvent(eventPlus);
        
        const event3 = new KeyboardEvent('keydown', { key: '3' });
        document.dispatchEvent(event3);
        
        const eventEnter = new KeyboardEvent('keydown', { key: 'Enter' });
        document.dispatchEvent(eventEnter);

        expect(display.value).toContain('8');
    });

    test('Múltiplas operações sequenciais', () => {
        // 10 + 5 - 3 × 2
        calculator.appendToDisplay('10');
        calculator.appendToDisplay('+');
        calculator.appendToDisplay('5');
        calculator.calculate(); // 15
        
        calculator.appendToDisplay('-');
        calculator.appendToDisplay('3');
        calculator.calculate(); // 12
        
        calculator.appendToDisplay('*');
        calculator.appendToDisplay('2');
        calculator.calculate(); // 24

        expect(display.value).toContain('24');
    });
});