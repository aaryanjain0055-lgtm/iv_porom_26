import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, Tent, Factory, Truck, Zap, AlertTriangle } from 'lucide-react';

const schedule = [
  {
    day: "Day 01",
    title: "The Beginning",
    time: "07:30 PM",
    desc: "Gather at campus. Bags packed, spirits high. The bus engine roars.",
    icon: Truck,
    color: "text-neon-blue",
    borderColor: "border-neon-blue",
    bgGradient: "from-blue-900/40 to-black",
    places: []
  },
  {
    day: "Day 02",
    title: "Misty Mountains",
    time: "07:00 AM - Night",
    desc: "Exploration of Munnar's finest landscapes.",
    icon: Tent,
    color: "text-neon-green",
    borderColor: "border-neon-green",
    bgGradient: "from-green-900/40 to-black",
    places: [
      "07:00 AM: Room Check-in",
      "08:00 AM: Breakfast",
      "09:00 AM: Sightseeing Starts:",
      "Forest Garden",
      "Photo Point",
      "Honey Bee Tree",
      "Elephant Ride",
      "Botanical Garden",
      "Tea Factory Visit",
      "Mattupetty Dam",
      "Shooting Point",
      "Echo Point",
      "Tribal Village",
      "Kundala Lake",
      "Top Station",
      "05:00 PM: Munnar Local Shopping",
      "07:00 PM: Campfire & Stay at Hotel"
    ]
  },
  {
    day: "Day 03",
    title: "Industry & Culture",
    time: "04:00 AM - Night",
    desc: "Technical insights meets colonial history.",
    icon: Factory,
    color: "text-neon-purple",
    borderColor: "border-neon-purple",
    bgGradient: "from-purple-900/40 to-black",
    places: [
      "04:00 AM: Early Morning Start",
      "09:00 AM: Breakfast",
      "10:00 AM: Industrial Visit",
      "12:00 PM: Kochi Sightseeing Starts:",
      "Hill Palace",
      "Chottanikkara Temple",
      "Vypin Beach",
      "Ferry Boat on Bus",
      "Marine Drive Boating (Harbor, Mattancherry, Sea Entrance, Bolgatty Island)",
      "Lulu Mall",
      "Night Stay at Cochin"
    ]
  },
  {
    day: "Day 04",
    title: "Adrenaline Rush",
    time: "07:00 AM - 09:00 PM",
    desc: "Unlimited thrills at the amusement park.",
    icon: Zap,
    color: "text-neon-pink",
    borderColor: "border-neon-pink",
    bgGradient: "from-pink-900/40 to-black",
    places: [
      "07:00 AM: Hotel Checkout",
      "08:00 AM: Breakfast",
      "10:00 AM: Wonderla Entry",
      "07:00 PM: Wonderla Checkout",
      "09:00 PM: Take off to College"
    ]
  },
  {
    day: "Day 05",
    title: "Homecoming",
    time: "Morning",
    desc: "Back to campus with a gallery full of memories.",
    icon: MapPin,
    color: "text-white",
    borderColor: "border-white",
    bgGradient: "from-gray-800/40 to-black",
    places: []
  },
];

const Itinerary: React.FC = () => {
  return (
    <section className="py-20 px-2 md:px-4 relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-orbitron font-bold text-center mb-8">
          <span className="text-white">Mission</span> <span className="text-neon-pink">Timeline</span>
        </h2>

        {/* Disclaimer */}
        <div className="max-w-3xl mx-auto mb-16 px-4">
          <div className="flex items-start gap-3 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-yellow-200 text-xs md:text-sm font-inter">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 text-yellow-500" />
            <p>
              <strong className="text-yellow-500">Important Note:</strong> Extra charges may be applied for entry tickets and rides at specific locations. These costs are to be borne by the participants individually.
            </p>
          </div>
        </div>

        <div className="relative">
          {/* Central Vertical Line (Visible on Mobile & Desktop) */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-800 transform -translate-x-1/2 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.1)]"></div>
          
          {schedule.map((item, index) => {
             const isLeft = index % 2 === 0;
             return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-center mb-10 md:mb-16 w-full ${isLeft ? 'justify-start' : 'justify-end'}`}
              >
                {/* Center Icon */}
                <div className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 rounded-full bg-black border-2 md:border-4 ${item.borderColor} z-20 flex items-center justify-center shadow-[0_0_20px_currentColor] ${item.color}`}>
                   <item.icon className="w-5 h-5 md:w-7 md:h-7" />
                </div>

                {/* Content Card - Width adjusted to fit on left/right of line */}
                <div className={`w-[42%] md:w-[45%] ${isLeft ? 'text-right pr-2 md:pr-0' : 'text-left pl-2 md:pl-0'}`}>
                  <div className={`p-3 md:p-6 rounded-xl border border-white/10 bg-gradient-to-br ${item.bgGradient} backdrop-blur-sm hover:border-${item.color.split('-')[1]}-500 transition-all duration-300 relative group`}>
                    
                    {/* Time Tag */}
                    <div className={`inline-flex items-center gap-1 text-[10px] md:text-xs font-bold px-2 py-1 rounded bg-black/50 border border-white/5 mb-2 ${item.color} ${isLeft ? 'flex-row-reverse' : 'flex-row'}`}>
                      <Clock className="w-3 h-3" />
                      {item.time}
                    </div>

                    <h3 className="text-sm md:text-2xl font-rajdhani font-bold text-white mb-1 md:mb-2 uppercase tracking-wide">
                      {item.title}
                    </h3>
                    
                    <h4 className={`text-xs md:text-lg font-orbitron font-bold mb-2 ${item.color}`}>
                      {item.day}
                    </h4>

                    {/* Description or List */}
                    {item.places.length > 0 ? (
                      <ul className={`mt-2 space-y-1 ${isLeft ? 'items-end' : 'items-start'} flex flex-col`}>
                        {item.places.map((place, i) => {
                          // Check if the item is a time entry (contains AM or PM) for styling
                          const isTime = place.includes('AM') || place.includes('PM');
                          return (
                            <li key={i} className={`text-[10px] md:text-sm font-inter flex items-center gap-2 text-right ${isTime ? 'text-white font-bold mt-1' : 'text-gray-300'}`}>
                              {!isLeft && <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${item.color.replace('text-', 'bg-')} ${isTime ? 'opacity-100' : 'opacity-50'}`}></span>}
                              <span className={isLeft ? "text-right" : "text-left"}>{place}</span>
                              {isLeft && <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${item.color.replace('text-', 'bg-')} ${isTime ? 'opacity-100' : 'opacity-50'}`}></span>}
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <p className="text-[10px] md:text-sm text-gray-400 font-inter leading-tight md:leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                        {item.desc}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
             );
          })}
        </div>
      </div>
    </section>
  );
};

export default Itinerary;