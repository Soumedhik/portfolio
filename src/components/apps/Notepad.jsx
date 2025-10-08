import React, { useState, useRef, memo, useEffect, useCallback, useMemo } from "react";
import Draggable from "react-draggable";
import { motion } from "framer-motion";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useWindowSizing } from "../../hooks/useWindowSizing";

const TYPING_DELAY_MS = 50;
const WELCOME_MESSAGE = "Hi! I am Soumedhik. Ask me anything about my research, projects, skills, or experience!";

const Notepad = memo(({ isAppOpen, toggleNotepad, bounds, minimizeWindow, isMinimized }) => {
  const notepadRef = useRef(null);
  const textareaRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentInput, setCurrentInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [contextInfo, setContextInfo] = useState("");
  const typingTimeoutRef = useRef(null);
  const { width: windowWidth, height: windowHeight, isMobile } = useWindowSizing(1280, 720, {
    minWidth: 360,
    minHeight: 420,
    desktopMargin: 160,
    tabletMargin: 120,
    mobileMargin: 40
  });
  const isFullViewport = isFullscreen || isMobile;

  const genAI = useMemo(() => {
    const apiKey = process.env.REACT_APP_GEMINI_API_KEY;

    if (!apiKey) {
      console.warn('Gemini API key is missing. Please set REACT_APP_GEMINI_API_KEY.');
      return null;
    }

    try {
      return new GoogleGenerativeAI(apiKey);
    } catch (error) {
      console.error('Failed to initialize Gemini client:', error);
      return null;
    }
  }, []);

  const model = useMemo(() => {
    if (!genAI) return null;

    const modelName = process.env.REACT_APP_GEMINI_MODEL;
    if (!modelName) {
      console.warn('Gemini model name is missing. Please set REACT_APP_GEMINI_MODEL.');
      return null;
    }

    try {
      return genAI.getGenerativeModel({ model: modelName });
    } catch (error) {
      console.error('Failed to load Gemini model:', error);
      return null;
    }
  }, [genAI]);

  // Load context info on mount
  useEffect(() => {
    const loadContext = async () => {
      try {
        const response = await fetch('/soumedhik_info.txt');
        const text = await response.text();
        setContextInfo(text);
      } catch (error) {
        console.error('Error loading context:', error);
      }
    };
    loadContext();
  }, []);

  // Show welcome message when app opens
  useEffect(() => {
    if (isAppOpen && !isMinimized && messages.length === 0) {
  setMessages([{ role: 'assistant', content: WELCOME_MESSAGE }]);
    }
  }, [isAppOpen, isMinimized, messages.length]);

  // Typing animation function
  const typeMessage = useCallback((text, callback) => {
    let index = 0;
    let currentText = "";

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    const pickMistypedChar = (char) => {
      const lowercase = "abcdefghijklmnopqrstuvwxyz";
      const digits = "0123456789";

      if (/[a-z]/.test(char)) {
        const options = lowercase.replace(char, "");
        return options[Math.floor(Math.random() * options.length)] || char;
      }

      if (/[A-Z]/.test(char)) {
        const upper = lowercase.toUpperCase().replace(char, "");
        return upper[Math.floor(Math.random() * upper.length)] || char;
      }

      if (/[0-9]/.test(char)) {
        const options = digits.replace(char, "");
        return options[Math.floor(Math.random() * options.length)] || char;
      }

      return char;
    };

    const type = () => {
      if (index >= text.length) {
        typingTimeoutRef.current = null;
        setIsTyping(false);
        return;
      }

      const nextChar = text[index];
      const shouldMistype = Math.random() < 0.1 && /[a-zA-Z0-9]/.test(nextChar);

      if (shouldMistype) {
        const wrongChar = pickMistypedChar(nextChar);
        const withWrongChar = currentText + wrongChar;
        callback(withWrongChar);

        typingTimeoutRef.current = setTimeout(() => {
          callback(currentText);

          typingTimeoutRef.current = setTimeout(() => {
            currentText += nextChar;
            callback(currentText);
            index++;
            typingTimeoutRef.current = setTimeout(type, TYPING_DELAY_MS);
          }, TYPING_DELAY_MS);
        }, TYPING_DELAY_MS);

        return;
      }

      currentText += nextChar;
      callback(currentText);
      index++;
      typingTimeoutRef.current = setTimeout(type, TYPING_DELAY_MS);
    };

    type();
  }, []);

  // Handle AI response
  const getAIResponse = useCallback(async (userMessage) => {
    try {
      if (!model) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: 'Sorry, the AI assistant is unavailable right now. Please check back soon.'
        }]);
        return;
      }

      setIsTyping(true);
      
      const prompt = `You are Soumedhik Bharati. Answer questions about yourself based on the following information:

${contextInfo}

RULES:
- Always speak in first person as "I am Soumedhik" or "I"
- Start responses naturally (e.g., "I am Soumedhik, a...", "I have worked on...", "My research focuses on...")
- Be concise and professional
- Use plain text only, no formatting
- Keep responses under 200 words
- If asked about something not in the context, politely say you don't have that information

User question: ${userMessage}

Your response:`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const aiText = response.text();
      
      // Add empty assistant message first
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);
      
      // Type out the response
      typeMessage(aiText, (partialText) => {
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { role: 'assistant', content: partialText };
          return newMessages;
        });
      });
      
    } catch (error) {
      console.error('AI Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }]);
      setIsTyping(false);
    }
  }, [contextInfo, model, typeMessage]);

  // Handle Enter key press
  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey && !isTyping && currentInput.trim()) {
      e.preventDefault();
      
      // Add user message
      const userMessage = currentInput.trim();
      setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
      setCurrentInput("");
      
      // Get AI response
      getAIResponse(userMessage);
    }
  }, [currentInput, isTyping, getAIResponse]);

  // Cleanup typing timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  // Format text for display
  const formatText = () => {
    let displayText = '';
    messages.forEach(msg => {
      const prefix = msg.role === 'assistant' ? 'Soumedhik >> ' : 'You >> ';
      displayText += prefix + msg.content + '\n\n';
    });
    
    if (currentInput) {
      displayText += 'You >> ' + currentInput;
    } else if (!isTyping && messages.length > 0) {
      displayText += 'You >> ';
    }
    
    return displayText;
  };

  return (
    <div
      className={`${
        isAppOpen && !isMinimized ? "" : "hidden"
      } z-30 w-full h-screen pointer-events-none absolute`}
    >
      <Draggable
        handle=".title-bar"
        nodeRef={notepadRef}
        bounds={isFullViewport ? false : bounds}
        disabled={isFullViewport}
      >
        <motion.div
          ref={notepadRef}
          className={`window bg-win11-surface bg-opacity-95 text-win11-text overflow-hidden border border-win11-border pointer-events-auto resize shadow-2xl ${
            isFullViewport ? 'rounded-none fixed inset-0 z-50 max-h-[100dvh]' : 'rounded-xl'
          }`}
          layout
          animate={{
            width: isFullViewport ? '100vw' : `${windowWidth}px`,
            height: isFullViewport ? '100vh' : `${windowHeight}px`,
            maxWidth: isFullViewport ? '100vw' : '95vw',
            maxHeight: isFullViewport ? '100vh' : '90vh',
            x: isFullViewport ? 0 : undefined,
            y: isFullViewport ? 0 : undefined,
            borderRadius: isFullViewport ? 0 : 12
          }}
          style={isFullViewport ? { width: '100vw', height: '100dvh', maxHeight: '100dvh' } : undefined}
          transition={{
            duration: 0.5,
            ease: [0.76, 0, 0.24, 1],
            layout: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
          }}
        >
          <div className="title-bar glass-titlebar">
            <div className="h-9 flex items-center justify-between px-4 text-sm select-none">
              <div className="font-normal flex items-center gap-2 text-win11-text-secondary titlebar-section">
                <img src="/assets/branding/ai.png" alt="AI Chatbot" className="w-4 h-4" />
                <span className="text-win11-text">AI Assistant - Notepad</span>
              </div>
              <div className="flex items-center titlebar-section">
                <button
                  type="button"
                  className="titlebar-button"
                  onClick={() => minimizeWindow('notepad')}
                  title="Minimize"
                  aria-label="Minimize AI assistant"
                >
                  <span className="material-symbols-outlined">minimize</span>
                </button>
                <motion.button
                  type="button"
                  className="titlebar-button"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  title={isFullscreen ? 'Restore Down' : 'Maximize'}
                  aria-label={isFullscreen ? 'Restore AI assistant window' : 'Maximize AI assistant window'}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.18, ease: [0.76, 0, 0.24, 1] }}
                >
                  <span className="material-symbols-outlined">{isFullscreen ? 'fullscreen_exit' : 'fullscreen'}</span>
                </motion.button>
                <button
                  type="button"
                  className="titlebar-button titlebar-button--close"
                  onClick={toggleNotepad}
                  title="Close"
                  aria-label="Close AI assistant"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
            </div>
          </div>
          <div className="h-full pb-9 overflow-hidden bg-win11-surface bg-opacity-95">
            {/* Chatbot Text Area (looks like notepad) */}
            <div className="h-full p-4">
              <textarea
                ref={textareaRef}
                value={formatText()}
                onChange={(e) => {
                  // Only allow editing the last line (current input)
                  const lines = e.target.value.split('\n');
                  const lastLine = lines[lines.length - 1] || '';
                  if (lastLine.startsWith('You >> ')) {
                    setCurrentInput(lastLine.replace('You >> ', ''));
                  }
                }}
                onKeyPress={handleKeyPress}
                className="w-full h-full bg-transparent text-win11-text font-mono text-base p-4 resize-none outline-none border-none placeholder:text-win11-text-secondary"
                placeholder="Start typing..."
                spellCheck="false"
                disabled={isTyping}
              />
            </div>
          </div>
        </motion.div>
      </Draggable>
    </div>
  );
});

Notepad.displayName = 'Notepad';

export default Notepad;
