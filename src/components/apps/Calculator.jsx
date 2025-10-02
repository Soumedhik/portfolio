import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Draggable from "react-draggable";
import soundManager from '../../utils/soundManager';

const Calculator = ({ isAppOpen, toggleCalculator, minimizeWindow, isMinimized }) => {
  const calculatorRef = useRef(null);
  const [display, setDisplay] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [easterEggMode, setEasterEggMode] = useState(false);
  const [secretHistory, setSecretHistory] = useState([]);

  const appendToDisplay = (value) => {
    soundManager.play('buttonClick');
    setDisplay((prevDisplay) => prevDisplay + value);
  };

  const calculate = () => {
    // Easter Egg equations
    const secretEquations = {
      '42': 'The Answer to Life, Universe & Everything! 🌌',
      '1337': 'Elite Hacker Mode Activated! 💻',
      '404': 'Calculation Not Found 😅',
      '8008': 'Classic! 🤓',
      '5318008': 'Upside down magic! 🙃',
      '80085': 'Nice one! 😏',
      '123456': 'That\'s my luggage combination! 🧳',
      '0.8008135': 'Math humor detected! 📐'
    };

    try {
      const result = eval(display);
      
      // Check for Easter eggs
      if (secretEquations[display] || secretEquations[result]) {
        const message = secretEquations[display] || secretEquations[result];
        setDisplay(message);
        setEasterEggMode(true);
        setSecretHistory(prev => [...prev, message].slice(-5)); // Keep last 5
        
        setTimeout(() => {
          setDisplay(result.toString());
          setEasterEggMode(false);
        }, 2000);
        return;
      }
      
      if (result !== undefined && !isNaN(result)) {
        setDisplay(result.toString());
      } else {
        setDisplay("Error");
        setTimeout(() => {
          setDisplay("");
        }, 1000);
      }
    } catch (error) {
      setDisplay("Error");
      setTimeout(() => {
        setDisplay("");
      }, 1000);
    }
  };

  const clearDisplay = () => {
    if (display === 'SOUMEDHIK' || display === 'HELLO') {
      setDisplay('Thanks for visiting! 😊');
      setTimeout(() => setDisplay(''), 2000);
    } else {
      setDisplay("");
    }
    setEasterEggMode(false);
  };
  
  // Secret developer signature
  const handleSecretCombo = () => {
    if (display === '') {
      setDisplay('SOUMEDHIK');
      setTimeout(() => {
        setDisplay('Portfolio by Soumedhik Bharati 🚀');
        setTimeout(() => setDisplay(''), 3000);
      }, 1000);
    }
  };

  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const bounds = {
    left: -50,
    top: -50,
    right: screenWidth - 100,
    bottom: screenHeight - 100,
  };

  // Responsive detection
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth >= 768 && window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Responsive dimensions
  const getResponsiveDimensions = () => {
    if (isMobile) {
      return { 
        width: 'w-screen', 
        height: 'h-[calc(100vh-3rem)]', 
        position: 'fixed top-0 left-0',
        borderRadius: 'rounded-none'
      };
    }
    if (isTablet) {
      return { 
        width: 'w-80', 
        height: 'h-[32rem]', 
        position: '',
        borderRadius: 'rounded-lg'
      };
    }
    return { 
      width: 'w-[24em]', 
      height: 'h-[36em]', 
      position: '',
      borderRadius: 'rounded-xl'
    };
  };

  const dimensions = getResponsiveDimensions();

  return (
    <div
      className={`${
        isAppOpen && !isMinimized ? "" : "hidden"
      } z-30 w-full h-screen pointer-events-none absolute`}
    >
      <Draggable handle=".title-bar" nodeRef={calculatorRef} bounds={isMobile ? false : bounds} disabled={isMobile || isFullscreen}>
        <motion.div
          ref={calculatorRef}
          data-window="calculator"
          className={`window bg-black overflow-hidden border-neutral-700 border-[1.5px] pointer-events-auto ${
            isFullscreen 
              ? 'rounded-none fixed top-0 left-0 z-50' 
              : `${dimensions.borderRadius} ${dimensions.position}`
          }`}
          layout
          animate={{
            width: isFullscreen ? '100vw' : '400px',
            height: isFullscreen ? '100vh' : '600px',
            x: isFullscreen ? 0 : undefined,
            y: isFullscreen ? 0 : undefined,
            borderRadius: isFullscreen ? 0 : 8
          }}
          transition={{
            duration: 0.5,
            ease: [0.76, 0, 0.24, 1],
            layout: {
              duration: 0.5,
              ease: [0.76, 0, 0.24, 1]
            }
          }}
        >
          <div className="title-bar">
            <div className="text-white h-9 flex justify-between select-none">
              <div className="m-1 ml-4 font-normal flex items-center gap-2">
                <span 
                  className="cursor-pointer hover:animate-spin" 
                  onDoubleClick={handleSecretCombo}
                  title="Double-click for a surprise! 🎉"
                >
                  📱
                </span>
                Calculator
                {secretHistory.length > 0 && (
                  <span className="text-xs opacity-50">🎪 {secretHistory.length} secrets</span>
                )}
              </div>
              <div className="flex">
                <div
                  className="material-symbols-outlined hover:bg-neutral-800 mb-2 w-11 flex justify-center items-center text-xl cursor-pointer transition-colors duration-200"
                  onClick={() => {
                    soundManager.play('minimize');
                    minimizeWindow('calculator');
                  }}
                  title="Minimize"
                >
                  minimize
                </div>
                <motion.div 
                  className="material-symbols-outlined hover:bg-neutral-800 mb-2 w-11 flex justify-center items-center text-sm cursor-pointer transition-all duration-200"
                  onClick={() => {
                    soundManager.play(isFullscreen ? 'minimize' : 'maximize');
                    setIsFullscreen(!isFullscreen);
                  }}
                  title={isFullscreen ? 'Restore Down' : 'Maximize'}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.15, ease: [0.76, 0, 0.24, 1] }}
                >
                  {isFullscreen ? 'fullscreen_exit' : 'fullscreen'}
                </motion.div>
                <div
                  className="material-symbols-outlined hover:bg-red-700 mb-2 w-12 flex justify-center items-center text-xl"
                  onClick={toggleCalculator}
                >
                  close
                </div>
              </div>
            </div>
          </div>
          <div className="content text-white select-none" style={{height: 'calc(100% - 36px)'}}>
            <div className="w-full h-full flex flex-col p-4" style={{backgroundColor: 'var(--w11-surface)', color: 'var(--w11-text-primary)'}}>
              <input
                type="text"
                value={display}
                className={`w-full mb-4 px-4 py-3 text-2xl rounded-lg text-right transition-all duration-200 font-mono ${
                  easterEggMode ? 'animate-pulse text-yellow-300' : ''
                }`}
                style={{
                  backgroundColor: easterEggMode ? 'linear-gradient(45deg, #6b46c1, #1e40af)' : 'var(--w11-bg-secondary)', 
                  border: '1px solid var(--w11-border)', 
                  color: easterEggMode ? '#fef08a' : 'var(--w11-text-primary)', 
                  minHeight: '60px'
                }}
                placeholder="0"
                disabled
              />
              <div className="grid grid-cols-4 gap-3 text-lg font-semibold flex-1">
                <button
                  onClick={() => {
                    soundManager.play('buttonClick');
                    clearDisplay();
                  }}
                  className="aspect-square text-center rounded-full focus:outline-none transition-colors duration-200 font-semibold flex items-center justify-center"
                  style={{backgroundColor: 'var(--w11-bg-tertiary)', color: 'var(--w11-text-primary)'}}
                  onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--w11-surface-hover)'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--w11-bg-tertiary)'}
                >
                  AC
                </button>
                <button
                  onClick={() => appendToDisplay("*2")}
                  className="p-3 text-center bg-gray-300 rounded-full calculator-button focus:outline-none bg-opacity-65 hover:bg-opacity-80 active:bg-opacity-90"
                >
                  x2
                </button>
                <button
                  onClick={() => appendToDisplay("%")}
                  className="p-3 text-center bg-gray-300 rounded-full hover:bg-opacity-60 focus:outline-none bg-opacity-65"
                >
                  %
                </button>
                <button
                  onClick={() => appendToDisplay("/")}
                  className="p-3 text-center rounded-full focus:outline-none transition-colors duration-200"
                  style={{backgroundColor: 'var(--w11-warning)', color: 'var(--w11-text-primary)'}}
                  onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--w11-warning-hover)'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--w11-warning)'}
                >
                  /
                </button>
                <button
                  onClick={() => appendToDisplay("7")}
                  className="aspect-square text-center rounded-full focus:outline-none transition-colors duration-200 font-semibold flex items-center justify-center"
                  style={{backgroundColor: 'var(--w11-bg-tertiary)', color: 'var(--w11-text-primary)'}}
                  onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--w11-surface-hover)'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--w11-bg-tertiary)'}
                >
                  7
                </button>
                <button
                  onClick={() => appendToDisplay("8")}
                  className="p-3 text-center bg-neutral-600 rounded-full hover:bg-opacity-60 focus:outline-none"
                >
                  8
                </button>
                <button
                  onClick={() => appendToDisplay("9")}
                  className="p-3 text-center bg-neutral-600 rounded-full calculator-button focus:outline-none hover:bg-opacity-80 active:bg-opacity-90"
                >
                  9
                </button>
                <button
                  onClick={() => appendToDisplay("*")}
                  className="p-3 text-center bg-yellow-600 rounded-full calculator-button focus:outline-none hover:bg-opacity-80 active:bg-opacity-90"
                >
                  x
                </button>
                <button
                  onClick={() => appendToDisplay("4")}
                  className="p-3 text-center bg-neutral-600 rounded-full calculator-button focus:outline-none hover:bg-opacity-80 active:bg-opacity-90"
                >
                  4
                </button>
                <button
                  onClick={() => appendToDisplay("5")}
                  className="p-3 text-center bg-neutral-600 rounded-full calculator-button focus:outline-none hover:bg-opacity-80 active:bg-opacity-90"
                >
                  5
                </button>
                <button
                  onClick={() => appendToDisplay("6")}
                  className="p-3 text-center bg-neutral-600 rounded-full hover:bg-opacity-60 focus:outline-none"
                >
                  6
                </button>
                <button
                  onClick={() => appendToDisplay("-")}
                  className="p-3 text-center bg-yellow-600 rounded-full hover:bg-opacity-60 focus:outline-none"
                >
                  -
                </button>
                <button
                  onClick={() => appendToDisplay("1")}
                  className="p-3 text-center bg-neutral-600 rounded-full hover:bg-opacity-60 focus:outline-none"
                >
                  1
                </button>
                <button
                  onClick={() => appendToDisplay("2")}
                  className="p-3 text-center bg-neutral-600 rounded-full hover:bg-opacity-60 focus:outline-none"
                >
                  2
                </button>
                <button
                  onClick={() => appendToDisplay("3")}
                  className="p-3 text-center bg-neutral-600 rounded-full hover:bg-opacity-60 focus:outline-none"
                >
                  3
                </button>
                <button
                  onClick={() => appendToDisplay("+")}
                  className="p-3 text-center bg-yellow-600 rounded-full hover:bg-opacity-60 focus:outline-none"
                >
                  +
                </button>
                <button
                  onClick={() => appendToDisplay("0")}
                  className="p-3 text-center bg-neutral-600 rounded-full hover:bg-opacity-60 focus:outline-none col-span-2"
                >
                  0
                </button>
                <button
                  onClick={() => appendToDisplay(".")}
                  className="p-3 text-center bg-neutral-600 rounded-full hover:bg-opacity-60 focus:outline-none"
                >
                  .
                </button>
                <button
                  onClick={calculate}
                  className="p-3 text-center bg-yellow-600 rounded-full hover:bg-opacity-60 focus:outline-none"
                >
                  =
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </Draggable>
    </div>
  );
};

export default Calculator;
