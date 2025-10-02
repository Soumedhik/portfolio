import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { UserProfile } from "../user/UserProfile";
import soundManager from '../../utils/soundManager';

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

function Login({ toggleLogin, isMobile = false }) {
  const [loading, setLoading] = useState(false);
  const [currentFact, setCurrentFact] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Set initial random fun fact
    setCurrentFact(funFacts[Math.floor(Math.random() * funFacts.length)]);
    
    // Change fun fact every 3 seconds
    const factInterval = setInterval(() => {
      setCurrentFact(funFacts[Math.floor(Math.random() * funFacts.length)]);
    }, 3000);

    return () => clearInterval(factInterval);
  }, []);

  const handleLogin = () => {
    setLoading(true);
    
    // Play startup sound
    soundManager.play('startup');
    
    // Enhanced transition sequence
    setTimeout(() => {
      soundManager.play('windowOpen');
    }, 1000);
    
    setTimeout(() => {
      navigate("/portfolio");
      setLoading(false);
    }, 2500);
  }

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-gradient-to-br from-blue-900/90 via-purple-900/90 to-black/90 backdrop-blur-lg"
          >
            <div className="flex flex-col items-center gap-6 text-white">
              {/* Windows 11 style loading animation */}
              <div className="relative">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 border-4 border-transparent border-t-blue-400 border-r-purple-400 rounded-full"
                />
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-2 w-12 h-12 border-4 border-transparent border-b-cyan-400 border-l-pink-400 rounded-full"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span 
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="material-symbols-outlined text-2xl text-blue-400"
                  >
                    login
                  </motion.span>
                </div>
              </div>
              
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-center"
              >
                <motion.p 
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-xl font-light mb-2"
                >
                  Entering Portfolio...
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-sm text-white/70"
                >
                  Initializing Windows 11 Experience
                </motion.p>
              </motion.div>
              
              {/* Progress dots */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex gap-2"
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.3
                    }}
                    className="w-2 h-2 bg-blue-400 rounded-full"
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative left-0 top-72 h-screen w-full flex flex-col items-center z-10"
      >
        {/* Profile Avatar */}
        <div className="aspect-square w-32 h-36 mb-8">
          <div className="w-32 h-32 rounded-full overflow-hidden shadow-2xl border-4 border-white/20">
            <img 
              src="/profile.jpg" 
              alt="Soumedhik Bharati"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold" style={{display: 'none'}}>
              SB
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-white mb-2">Welcome</h1>
          <p className="text-xl text-white/80">Soumedhik Bharati</p>
          <p className="text-sm text-white/60 mt-2">AI Researcher & Problem Solver</p>
        </div>

        {/* Login Button */}
        <AnimatePresence>
          {!loading && (
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                soundManager.play('buttonClick');
                handleLogin();
              }}
              onMouseEnter={() => soundManager.play('hover')}
              className="group relative bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-2xl overflow-hidden shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 ease-out"
            >
              {/* Animated background gradient */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-cyan-500/30 opacity-0 group-hover:opacity-100"
                animate={{
                  background: [
                    "linear-gradient(45deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3), rgba(6, 182, 212, 0.3))",
                    "linear-gradient(90deg, rgba(147, 51, 234, 0.3), rgba(6, 182, 212, 0.3), rgba(59, 130, 246, 0.3))",
                    "linear-gradient(135deg, rgba(6, 182, 212, 0.3), rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3))"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <motion.div 
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                />
              </div>
              
              <div className="relative flex items-center gap-4">
                <motion.span 
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="material-symbols-outlined text-3xl"
                >
                  login
                </motion.span>
                <div className="text-left">
                  <motion.span 
                    className="text-xl font-medium block"
                    whileHover={{ x: 2 }}
                  >
                    Enter Portfolio
                  </motion.span>
                  <motion.span 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 0.7, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xs text-white/70 block mt-1"
                  >
                    Windows 11 Experience
                  </motion.span>
                </div>
              </div>
              
              {/* Pulse effect on hover */}
              <motion.div 
                className="absolute inset-0 border-2 border-white/40 rounded-2xl"
                initial={{ scale: 1, opacity: 0 }}
                whileHover={{ scale: 1.05, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
      <div className="absolute bottom-5 left-8 right-8 text-white select-none">
        <div className="text-center mb-4">
          <div className="bg-black bg-opacity-30 backdrop-blur-sm rounded-lg p-4 max-w-lg mx-auto">
            <p className="text-sm font-medium animate-pulse">
              💡 Fun Fact: {currentFact}
            </p>
          </div>
        </div>
      </div>
      <div className="absolute flex gap-9 text-white bottom-5 right-12 select-none">
        <span className="material-symbols-outlined text-3xl">wifi</span>
        <span className="material-symbols-outlined text-3xl">
          accessibility
        </span>
        <span className="material-symbols-outlined text-3xl">
          power_settings_new
        </span>
      </div>
    </>
  );
}

export default Login;
