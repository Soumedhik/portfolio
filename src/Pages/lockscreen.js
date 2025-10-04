import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import Login from "../components/user/Login";
import Slider from "../components/utilities/Slider";

function Lockscreen({ isMobile = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Use useCallback to memoize the function and avoid unnecessary re-renders
  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  return (
    <>
      {/* Animated Background */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className={`absolute bg-black h-screen w-full ${isMobile ? '' : 'blur-sm'}`}
        style={{
          background:
            "url(/lockscreen.jpg) no-repeat center center",
          backgroundSize: "cover",
        }}
      />

      {/* Subtle overlay gradient */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 3, ease: "easeInOut" }}
        className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 z-5"
      />

      {/* Floating particles */}
      <div className="absolute inset-0 z-5 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/10 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
              y: typeof window !== 'undefined' ? window.innerHeight + 10 : 1080
            }}
            animate={{
              y: -10,
              opacity: [0, 0.3, 0]
            }}
            transition={{
              duration: Math.random() * 8 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
        className="absolute left-0 top-0 h-screen w-full flex flex-col items-center z-10"
      >
        <Login isMobile={isMobile} />
      </motion.div>

      <Slider
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        toggleMenu={toggleMenu}
      />
    </>
  );
}

export default Lockscreen;
