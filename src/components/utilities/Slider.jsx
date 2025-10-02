import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const funFacts = [
  "🤖 I've trained models on 100,000+ hour EEG datasets!",
  "🏆 Winner of Intel OneAPI and SIT ICOE Hackathons!",
  "🧠 My AI can predict seizures with 95% less data!",
  "🎵 I built an AI that converts images to music!",
  "👁️ Created a real-time face tracker running at 30+ FPS!",
  "📊 Achieved 99.8% accuracy in EEG emotion classification!",
  "🔬 Published research with Carnegie Mellon University!",
  "💡 Reduced model size by 55% while maintaining SOTA performance!",
  "🌟 Led 100+ students in deep learning workshops!",
  "🚀 My RAG pipeline handles high-traffic news summarization!",
  "⚡ Optimized inference time by 66% with novel parallelism!",
  "🎯 Fine-tuned LLMs achieving 22% accuracy improvement!",
];

export default function Slider({ isMenuOpen, toggleMenu }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentFact, setCurrentFact] = useState("");

  useEffect(() => {
    // Set initial random fun fact
    setCurrentFact(funFacts[Math.floor(Math.random() * funFacts.length)]);
    
    // Change fun fact every 3 seconds (matching Login component)
    const factInterval = setInterval(() => {
      setCurrentFact(funFacts[Math.floor(Math.random() * funFacts.length)]);
    }, 3000);

    return () => clearInterval(factInterval);
  }, []);

  useEffect(() => {
    const updateTime = () => setCurrentTime(new Date());
    const intervalID = setInterval(updateTime, 1000);

    return () => clearInterval(intervalID);
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        toggleMenu();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [toggleMenu]);

  const formatDate = (date) => {
    const options = { weekday: "long", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const formatTime = (time) => {
    const options = { hour: "2-digit", minute: "2-digit", hour12: false };
    return time.toLocaleTimeString([], options);
  };

  return (
    <motion.nav
      transition={{ type: "spring", damping: 200, stiffness: 1000 }}
      initial={{ y: "-100%" }}
      animate={{ y: isMenuOpen ? "0%" : "-110%" }}
      className="fixed inset-0 bg-black h-full w-full z-50"
      onClick={(e) => {
        e.stopPropagation();
        toggleMenu();
      }}
      style={{
        background: "url(/lockscreen.jpg)",
        backgroundSize: "cover",
      }}
    >
      <div className="relative flex flex-col justify-center h-full text-primary">
        <div className="absolute flex flex-col items-center w-full top-32 text-white">
          <div className="text-9xl font-bold">{formatTime(currentTime)}</div>
          <div className="font-semibold text-4xl mt-5">
            {formatDate(currentTime)}
          </div>
          <div className="mt-40 w-full max-w-lg mx-auto px-4 flex justify-center">
            <div className="bg-black bg-opacity-30 backdrop-blur-sm rounded-lg p-4 w-full">
              <p className="text-sm font-medium animate-pulse text-center">
                💡 Fun Fact: {currentFact}
              </p>
            </div>
          </div>
        </div>
        <div className="absolute top-0 flex justify-between w-full h-full py-12 px-32 text-white">
          <a
            href="https://google.com"
            className="btn"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Google"
          >
            <div className="material-symbols-outlined">search</div>
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
