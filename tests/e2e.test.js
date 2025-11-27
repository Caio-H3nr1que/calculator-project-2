const { CalculatorUI } = require('../script.js');

describe('Testes End-to-End - Interface do Usuário', () => {
    let display;
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
        
        // Criar nova instância da calculadora
        calculator = Object.create(CalculatorUI);
        calculator.currentInput = '';
        calculator.operator = '';
        calculator.previousInput = '';
        
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
    });

    test('Cálculo completo via clique nos botões - soma', () => {
        document.getElementById('btn8').click();
        document.getElementById('multiply').click();
        document.getElementById('btn5').click();
        document.getElementById('equals').click();

        expect(display.value).toContain('40');
    });

    test('Cálculo completo via clique nos botões - potência', () => {
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

    test('Limpar entrada via botão CE', () => {
        document.getElementById('btn5').click();
        document.getElementById('add').click();
        document.getElementById('btn3').click();
        document.getElementById('clearEntry').click();

        expect(display.value).toBe('5 + ');
    });

    test('Operações com números decimais', () => {
        document.getElementById('btn3').click();
        document.getElementById('btnDot').click();
        document.getElementById('btn1').click();
        document.getElementById('btn4').click();
        document.getElementById('add').click();
        document.getElementById('btn1').click();
        document.getElementById('btnDot').click();
        document.getElementById('btn5').click();
        document.getElementById('equals').click();

        expect(display.value).toContain('4.64');
    });

    test('Divisão por zero mostra erro', () => {
        document.getElementById('btn5').click();
        document.getElementById('divide').click();
        document.getElementById('btn0').click();
        document.getElementById('equals').click();

        expect(display.value).toContain('Erro: Divisão por zero');
    });
});