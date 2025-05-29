
import React, { useState } from 'react';
import Display from './Display';
import CalculatorButton from './CalculatorButton';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(display);
    } else if (operation) {
      const currentValue = previousValue || '0';
      const newValue = calculate(parseFloat(currentValue), inputValue, operation);
      
      setDisplay(String(newValue));
      setPreviousValue(String(newValue));
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return secondValue !== 0 ? firstValue / secondValue : 0;
      default:
        return secondValue;
    }
  };

  const performScientificOperation = (func: string) => {
    const value = parseFloat(display);
    let result: number;

    switch (func) {
      case 'sin':
        result = Math.sin(value);
        break;
      case 'cos':
        result = Math.cos(value);
        break;
      case 'tan':
        result = Math.tan(value);
        break;
      case 'log':
        result = Math.log10(value);
        break;
      case 'ln':
        result = Math.log(value);
        break;
      case '√':
        result = Math.sqrt(value);
        break;
      case 'x²':
        result = value * value;
        break;
      case 'x^y':
        // For power operations, we'll need two values
        performOperation('^');
        return;
      case 'π':
        result = Math.PI;
        break;
      case 'e':
        result = Math.E;
        break;
      case 'Inv':
        result = 1 / value;
        break;
      case 'EXP':
        result = Math.exp(value);
        break;
      default:
        return;
    }

    setDisplay(String(result));
    setWaitingForNewValue(true);
  };

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const newValue = calculate(parseFloat(previousValue), parseFloat(display), operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-md mx-auto">
      <Display value={display} />
      
      <div className="grid grid-cols-7 gap-3 mt-6">
        {/* Row 1 */}
        <CalculatorButton onClick={() => performScientificOperation('Rad')} className="col-span-1 bg-blue-100 text-blue-700">
          Rad
        </CalculatorButton>
        <CalculatorButton onClick={() => performScientificOperation('Deg')} className="col-span-1 bg-blue-100 text-blue-700">
          Deg
        </CalculatorButton>
        <CalculatorButton onClick={() => performScientificOperation('x^y')} className="col-span-1 bg-blue-100 text-blue-700">
          x!
        </CalculatorButton>
        <CalculatorButton onClick={() => inputNumber('(')} className="col-span-1 bg-gray-100">
          (
        </CalculatorButton>
        <CalculatorButton onClick={() => inputNumber(')')} className="col-span-1 bg-gray-100">
          )
        </CalculatorButton>
        <CalculatorButton onClick={() => performOperation('%')} className="col-span-1 bg-gray-100">
          %
        </CalculatorButton>
        <CalculatorButton onClick={clear} className="col-span-1 bg-gray-100">
          AC
        </CalculatorButton>

        {/* Row 2 */}
        <CalculatorButton onClick={() => performScientificOperation('Inv')} className="col-span-1 bg-blue-100 text-blue-700">
          Inv
        </CalculatorButton>
        <CalculatorButton onClick={() => performScientificOperation('sin')} className="col-span-1 bg-blue-100 text-blue-700">
          sin
        </CalculatorButton>
        <CalculatorButton onClick={() => performScientificOperation('ln')} className="col-span-1 bg-blue-100 text-blue-700">
          ln
        </CalculatorButton>
        <CalculatorButton onClick={() => inputNumber('7')} className="col-span-1">
          7
        </CalculatorButton>
        <CalculatorButton onClick={() => inputNumber('8')} className="col-span-1">
          8
        </CalculatorButton>
        <CalculatorButton onClick={() => inputNumber('9')} className="col-span-1">
          9
        </CalculatorButton>
        <CalculatorButton onClick={() => performOperation('÷')} className="col-span-1 bg-gray-100">
          ÷
        </CalculatorButton>

        {/* Row 3 */}
        <CalculatorButton onClick={() => performScientificOperation('π')} className="col-span-1 bg-blue-100 text-blue-700">
          π
        </CalculatorButton>
        <CalculatorButton onClick={() => performScientificOperation('cos')} className="col-span-1 bg-blue-100 text-blue-700">
          cos
        </CalculatorButton>
        <CalculatorButton onClick={() => performScientificOperation('log')} className="col-span-1 bg-blue-100 text-blue-700">
          log
        </CalculatorButton>
        <CalculatorButton onClick={() => inputNumber('4')} className="col-span-1">
          4
        </CalculatorButton>
        <CalculatorButton onClick={() => inputNumber('5')} className="col-span-1">
          5
        </CalculatorButton>
        <CalculatorButton onClick={() => inputNumber('6')} className="col-span-1">
          6
        </CalculatorButton>
        <CalculatorButton onClick={() => performOperation('×')} className="col-span-1 bg-gray-100">
          ×
        </CalculatorButton>

        {/* Row 4 */}
        <CalculatorButton onClick={() => performScientificOperation('e')} className="col-span-1 bg-blue-100 text-blue-700">
          e
        </CalculatorButton>
        <CalculatorButton onClick={() => performScientificOperation('tan')} className="col-span-1 bg-blue-100 text-blue-700">
          tan
        </CalculatorButton>
        <CalculatorButton onClick={() => performScientificOperation('√')} className="col-span-1 bg-blue-100 text-blue-700">
          √
        </CalculatorButton>
        <CalculatorButton onClick={() => inputNumber('1')} className="col-span-1">
          1
        </CalculatorButton>
        <CalculatorButton onClick={() => inputNumber('2')} className="col-span-1">
          2
        </CalculatorButton>
        <CalculatorButton onClick={() => inputNumber('3')} className="col-span-1">
          3
        </CalculatorButton>
        <CalculatorButton onClick={() => performOperation('-')} className="col-span-1 bg-gray-100">
          −
        </CalculatorButton>

        {/* Row 5 */}
        <CalculatorButton onClick={() => performScientificOperation('Ans')} className="col-span-1 bg-blue-100 text-blue-700">
          Ans
        </CalculatorButton>
        <CalculatorButton onClick={() => performScientificOperation('EXP')} className="col-span-1 bg-blue-100 text-blue-700">
          EXP
        </CalculatorButton>
        <CalculatorButton onClick={() => performScientificOperation('x²')} className="col-span-1 bg-blue-100 text-blue-700">
          x²
        </CalculatorButton>
        <CalculatorButton onClick={() => inputNumber('0')} className="col-span-1">
          0
        </CalculatorButton>
        <CalculatorButton onClick={inputDecimal} className="col-span-1">
          .
        </CalculatorButton>
        <CalculatorButton onClick={handleEquals} className="col-span-2 bg-blue-600 text-white">
          =
        </CalculatorButton>
        <CalculatorButton onClick={() => performOperation('+')} className="col-span-1 bg-gray-100">
          +
        </CalculatorButton>
      </div>
    </div>
  );
};

export default Calculator;
