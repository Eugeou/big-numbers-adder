"use client";

import { useState } from 'react';
import { adder } from '@/algo/BigNumberAdder';

const Calculator = () => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [result, setResult] = useState('');
  const [logs, setLogs] = useState<string[]>([]);
  const [operator, setOperator] = useState(''); // To track if the user has pressed +

  const handleDigit = (digit: string) => {
    if (!operator) {
      setInput1(input1 + digit);
    } else {
      setInput2(input2 + digit);
    }
  };

  const handleAddOperator = () => {
    if (input1 && !operator) {
      setOperator('+');
    }
  };

  const handleEqual = () => {
    if (input1 && input2 && operator) {
      const res = adder.sum(input1, input2);
      setResult(res);
      setLogs([...logs, ...adder.getLogs()]); // Lấy logs từ BigNumberAdder
    }
  };

  const handleClear = () => {
    setInput1('');
    setInput2('');
    setOperator('');
    setResult('');
    setLogs([]);
  };

  const handleDelete = () => {
    if (input2) {
      setInput2(input2.slice(0, -1));
    } else if (operator) {
      setOperator('');
    } else if (input1) {
      setInput1(input1.slice(0, -1));
    }
  };

  return (
    <div className="flex flex-col mt-20 p-4 bg-gray-800 text-white rounded-lg shadow-lg h-full w-full border-2 border-black">
      <div className="mb-4 p-4 border border-gray-800 w-full">
        <div className="text-xl font-bold p-2">
          {`${input1} ${operator} ${input2}`}
        </div>
        <div className="text-2xl mt-2 p-2">{`= ${result}`}</div>
      </div>
        <div className='grid grid-cols-3 gap-2 text-center w-full border border-gray-800'>
            {['9', '8', '7', '6', '5', '4', '3', '2', '1'].map((digit) => (
            <button
                key={digit}
                onClick={() => handleDigit(digit)}
                className="p-4 bg-gray-700 rounded border border-gray-500"
            >
                {digit}
            </button>
            ))}
            <button
            onClick={() => handleDigit('0')}
            className="p-4 bg-gray-700 rounded border border-gray-500"
            >
            0
            </button>
            <button
            onClick={handleAddOperator}
            className="p-4 bg-blue-500 rounded border border-blue-700"
            >
            +
            </button>
            <button
            onClick={handleEqual}
            className="p-4 bg-green-500 rounded border border-green-700"
            >
            =
            </button>
            <button
            onClick={handleDelete}
            className="p-4 bg-gray-500 rounded border border-gray-700 col-span-2"
            >
            Del
            </button>
            <button
            onClick={handleClear}
            className="p-4 bg-red-500 rounded border border-red-700 "
            >
            AC
            </button>
        </div>
      <div className="mt-8">
        <h2 className="text-lg text-center font-bold my-2">Các bước tính</h2>
        <ul className="text-sm rounded-xl space-y-4">
          {logs.map((log, index) => (
            <li className='text-sm text-center mt-8 p-4 border border-gray-700 rounded h-10'
             key={index}>{log}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Calculator;
