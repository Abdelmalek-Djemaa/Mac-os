import React, { useRef, useState } from 'react';
import { FaXmark } from 'react-icons/fa6';
import Draggable from 'react-draggable';

const Terminal = ({ setShowTerminal }) => {
  const terminalRef = useRef(null);

  // State for command input and terminal history
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { command: '', result: 'Last login: Tue Apr 2 12:34:56 on console' },
  ]);

  // Command handler
  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      let result;

      // Simple command logic
      switch (input.trim()) {
        case 'help':
          result = 'Available commands: help, clear, echo [text], date, about, whoami, ls, pwd';
          break;
        case 'clear':
          setHistory([]);
          setInput('');
          return;
        case 'date':
          result = new Date().toString();
          break;
        case 'about':
          result = 'React Terminal v1.0 - A simple terminal emulator built with React.';
          break;
        case 'whoami':
          result = 'You are a curious user exploring this React Terminal';
          break;
        case 'ls':
          result = 'Desktop  Documents  Downloads  Pictures';
          break;
        case 'pwd':
          result = '/Abdelmalek/MacOS';
          break;
        case '':
          result = '';
          break;
        default:
          if (input.startsWith('echo ')) {
            result = input.slice(5);
          } else {
            result = `Command not found: ${input}`;
          }
          break;
      }

      // Update history
      setHistory([...history, { command: input, result }]);
      setInput('');
    }
  };

  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center p-4">
      <Draggable nodeRef={terminalRef} cancel=".interactive">
        <div
          className="flex max-w-lg w-full max-h-[300px] h-full justify-center items-start bg-white bg-opacity-80 backdrop-blur-md rounded-xl"
          ref={terminalRef}
        >
          <div className="absolute top-2 w-full flex justify-center items-center">
            <span className="font-medium text-sm text-black z-[1000]">Terminal</span>
          </div>

          <div className="absolute top-0 left-0 p-2.5 flex w-full bg-white rounded-t-xl z-[999]">
            <div
              className="interactive group sm:h-3 sm:w-3 h-2.5 w-2.5 bg-red-500 rounded-full flex justify-center items-center cursor-pointer z-[1000]"
              onClick={setShowTerminal}
            >
              <span className="hidden group-hover:block sm:text-[10px] text-[8px] text-gray-900 font-bold">
                <FaXmark />
              </span>
            </div>
            <div className="ml-2 sm:h-3 sm:w-3 h-2.5 w-2.5 bg-orange-300 rounded-full"></div>
            <div className="ml-2 sm:h-3 sm:w-3 h-2.5 w-2.5 bg-green-500 rounded-full"></div>
          </div>

          <div className="flex flex-col mt-8 p-2 font-mono text-[12px] w-full interactive overflow-y-auto max-h-[300px] ">
            <div className="h-full">
              {history.map((entry, index) => (
                <div key={index}>
                  {entry.command && <p className="text-green-400">user@macbook ~ % {entry.command}</p>}
                  {entry.result && <p>{entry.result}</p>}
                </div>
              ))}
            </div>
            <div className="flex w-full">
              <div className="text-green-400 min-w-fit">user@macbook ~ %</div>
              <input
                type="text"
                className="bg-transparent border-none outline-none w-full pl-2"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleCommand}
                autoFocus
              />
            </div>
          </div>
        </div>
      </Draggable>
    </div>
  );
};

export default Terminal;
