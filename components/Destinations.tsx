import React from 'react';
import { motion } from 'framer-motion';

const destinations = [
  {
    name: "Munnar",
    tagline: "Hills & Mist",
    desc: "Campfire Nights",
    // Green Theme
    gradient: "from-green-600 to-emerald-900",
    border: "border-neon-green",
    shadow: "shadow-neon-green/50"
  },
  {
    name: "Kochi",
    tagline: "City Vibes",
    desc: "Marine Drive",
    // Blue Theme
    gradient: "from-blue-600 to-cyan-900",
    border: "border-neon-blue",
    shadow: "shadow-neon-blue/50"
  },
  {
    name: "Wonderla",
    tagline: "Thrills",
    desc: "Adventure Park",
    // Pink Theme
    gradient: "from-pink-600 to-purple-900",
    border: "border-neon-pink",
    shadow: "shadow-neon-pink/50"
  }
];

const Destinations: React.FC = () => {
  return (
    <section className="py-20 px-2 md:px-4 bg-black/40 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-orbitron font-bold text-white mb-2 md:mb-6">
            Trip <span className="text-neon-pink">Highlights</span>
          </h2>
          <p className="text-gray-400 text-xs md:text-lg max-w-2xl mx-auto">
            Three spots. One epic journey.
          </p>
        </div>

        {/* 
          FORCED 3-COLUMN GRID ON MOBILE 
          grid-cols-3 is used for ALL screens (including mobile)
        */}
        <div className="grid grid-cols-3 gap-2 md:gap-8 h-[250px] md:h-[450px]">
          {destinations.map((dest, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`relative rounded-xl md:rounded-3xl overflow-hidden group border ${dest.border} bg-gray-900 flex flex-col`}
            >
              {/* Colored Gradient Box (Replaces Image) */}
              <div className={`absolute inset-0 bg-gradient-to-b ${dest.gradient} opacity-60 group-hover:opacity-80 transition-opacity duration-500`}></div>
              
              {/* Noise Texture */}
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

              {/* Content Centered */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center z-10">
                <h3 className="text-lg md:text-5xl font-rajdhani font-bold text-white uppercase tracking-tighter md:tracking-wider mb-1 md:mb-4 drop-shadow-md">
                  {dest.name}
                </h3>
                
                <div className={`h-0.5 md:h-1 w-8 md:w-16 bg-white mb-2 md:mb-4 rounded-full opacity-50`}></div>

                <p className="text-[10px] md:text-xl font-orbitron font-bold text-white uppercase tracking-widest mb-1">
                  {dest.tagline}
                </p>
                
                <p className="text-[8px] md:text-sm text-gray-200 font-inter opacity-80 hidden md:block">
                  {dest.desc}
                </p>
              </div>

              {/* Bottom Glow */}
              <div className={`absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent opacity-90`}></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Destinations;