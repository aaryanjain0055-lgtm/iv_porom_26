import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mountain, Building2, RollerCoaster } from 'lucide-react';

const locations = [
  {
    id: 1,
    name: "Munnar",
    x: 70, // Percentage from left
    y: 20, // Percentage from top
    icon: Mountain,
    desc: "Hill Station | 1,600m Elevation",
    color: "text-neon-green",
    borderColor: "border-neon-green"
  },
  {
    id: 2,
    name: "Kochi",
    x: 30, 
    y: 60, 
    icon: Building2,
    desc: "Queen of Arabian Sea",
    color: "text-neon-blue",
    borderColor: "border-neon-blue"
  },
  {
    id: 3,
    name: "Wonderla",
    x: 60, 
    y: 80, 
    icon: RollerCoaster,
    desc: "Amusement Park",
    color: "text-neon-pink",
    borderColor: "border-neon-pink"
  }
];

const MissionMap: React.FC = () => {
  const [activeLocation, setActiveLocation] = useState<number | null>(null);

  return (
    <section className="py-20 px-2 md:px-4 relative bg-black overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-orbitron font-bold text-white">
            Mission <span className="text-neon-purple">Route</span>
          </h2>
        </div>

        {/* Map Container */}
        <div className="relative w-full aspect-[4/3] md:aspect-[16/9] bg-gray-900/50 rounded-2xl border border-white/10 overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          {/* Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,243,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          
          {/* SVG Route Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none filter drop-shadow-[0_0_8px_rgba(0,243,255,0.5)]">
            <motion.path
              d="M 70% 20% L 30% 60% L 60% 80%" // Munnar -> Kochi -> Wonderla
              fill="none"
              stroke="#00f3ff"
              strokeWidth="2"
              strokeDasharray="10 5"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            {/* Animated Dot moving along path */}
            <motion.circle r="4" fill="#fff">
               <motion.animateMotion 
                 dur="4s" 
                 repeatCount="indefinite"
                 path="M 70% 20% L 30% 60% L 60% 80%"
               />
            </motion.circle>
          </svg>

          {/* Location Nodes */}
          {locations.map((loc) => (
            <motion.div
              key={loc.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
              style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.5 + loc.id * 0.2 }}
              onClick={() => setActiveLocation(loc.id === activeLocation ? null : loc.id)}
            >
              {/* Pulse Ring */}
              <div className={`absolute inset-0 rounded-full animate-ping opacity-75 ${loc.color.replace('text-', 'bg-')}`}></div>
              
              {/* Icon Circle */}
              <div className={`relative w-10 h-10 md:w-16 md:h-16 bg-black border-2 ${loc.borderColor} rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-[0_0_15px_currentColor] ${loc.color}`}>
                <loc.icon className="w-5 h-5 md:w-8 md:h-8" />
              </div>

              {/* Label */}
              <div className={`absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/80 px-3 py-1 rounded border border-white/10 ${activeLocation === loc.id ? 'opacity-100' : 'opacity-100'}`}>
                 <p className={`text-xs md:text-sm font-bold font-orbitron ${loc.color}`}>{loc.name}</p>
              </div>

              {/* Popup Detail (Visible on Click) */}
              {activeLocation === loc.id && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 w-48 bg-black/90 border border-white/20 p-3 rounded-xl z-20 pointer-events-none"
                >
                  <p className="text-white text-xs font-inter">{loc.desc}</p>
                  <div className={`h-1 w-full mt-2 rounded-full bg-current ${loc.color} opacity-50`}></div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionMap;