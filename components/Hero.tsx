import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const alternateLines = [
    "Friends today. Stories forever.",
    "This chance won’t come again — but these memories will.",
    "Code during the day. Campfire at night.",
    "Unleash the Explorer Within."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLine((prev) => (prev + 1) % alternateLines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [alternateLines.length]);

  const handleScrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden pt-20 pb-10">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[20%] w-72 h-72 bg-neon-purple rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-blob"></div>
        <div className="absolute top-[20%] right-[20%] w-72 h-72 bg-neon-blue rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[30%] w-72 h-72 bg-neon-pink rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto z-10 w-full"
      >
        <h2 className="text-neon-blue tracking-[0.2em] font-orbitron text-xs md:text-lg mb-4 uppercase font-bold glow-sm px-2">
          Department of AI&DS and IT
        </h2>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-rajdhani mb-2 leading-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-neon-blue to-neon-purple">
            Where Innovision
          </span>
          <br />
          <span className="text-white">Meets Intelligence</span>
        </h1>

        <p className="text-lg md:text-2xl text-gray-300 font-inter font-light mt-6 mb-8 italic px-4">
          "From Algorithms to Adventures — <span className="text-neon-green font-normal not-italic whitespace-nowrap">Kerala Is Calling</span>"
        </p>

        <div className="h-12 mt-4">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentLine}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-neon-pink font-orbitron text-sm md:text-xl tracking-wider"
            >
              {alternateLines[currentLine]}
            </motion.p>
          </AnimatePresence>
        </div>

        <motion.div 
          className="mt-12 flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <button 
            onClick={handleScrollToAbout}
            className="flex flex-col items-center text-gray-400 hover:text-white transition-colors focus:outline-none"
          >
            <span className="text-xs uppercase tracking-widest mb-2 font-orbitron">Explore</span>
            <ChevronDown className="w-8 h-8 text-neon-blue" />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;