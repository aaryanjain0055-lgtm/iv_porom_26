import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Destinations from './components/Destinations';
import Itinerary from './components/Itinerary';
import Memories from './components/Memories';
import Footer from './components/Footer';
import TripGuideAI from './components/TripGuideAI';
import MissionMap from './components/MissionMap';
import { motion, useScroll, useSpring } from 'framer-motion';

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="bg-dark-bg min-h-screen text-white selection:bg-neon-pink selection:text-white">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink transform origin-left z-50"
        style={{ scaleX }}
      />
      
      {/* Noise overlay for texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[9999]" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      <Hero />
      <About />
      <Destinations />
      <MissionMap />
      <Itinerary />
      <Memories />
      <Footer />
      <TripGuideAI />
    </div>
  );
};

export default App;