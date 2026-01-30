import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Music, Flame, Bus, Upload, X } from 'lucide-react';

const quotes = [
  {
    text: "We didn't realize we were making memories, we just knew we were having fun.",
    author: "Unknown"
  },
  {
    text: "College friends are the family we choose for ourselves.",
    author: "IV 2025"
  },
  {
    text: "Travel brings power and love back to your life.",
    author: "Rumi"
  }
];

const Memories: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Web Audio Refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<number | null>(null);

  const [userImage, setUserImage] = useState<string | null>(null);
  const [showDrums, setShowDrums] = useState(false);
  const [fireParticles, setFireParticles] = useState<{id: number, x: number, scale: number}[]>([]);

  useEffect(() => {
    if (showDrums) {
        // Initialize Audio Context on user interaction (when showDrums becomes true via click)
        if (!audioCtxRef.current) {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            audioCtxRef.current = new AudioContext();
        }
        if (audioCtxRef.current.state === 'suspended') {
            audioCtxRef.current.resume();
        }

        let step = 0;
        const playBeat = () => {
            if (!audioCtxRef.current) return;
            const ctx = audioCtxRef.current;
            const t = ctx.currentTime;
            
            // Alternating Kick (Left) and Snare (Right)
            if (step % 2 === 0) {
                // Kick Drum (Left Stick)
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                
                osc.frequency.setValueAtTime(150, t);
                osc.frequency.exponentialRampToValueAtTime(0.01, t + 0.5);
                
                gain.gain.setValueAtTime(0.8, t);
                gain.gain.exponentialRampToValueAtTime(0.01, t + 0.5);
                
                osc.start(t);
                osc.stop(t + 0.5);
            } else {
                // Snare Drum (Right Stick)
                const bufferSize = ctx.sampleRate * 0.1; // Short burst
                const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
                const data = buffer.getChannelData(0);
                for (let i = 0; i < bufferSize; i++) {
                    data[i] = (Math.random() * 2 - 1) * 0.5; // White noise
                }
                
                const noise = ctx.createBufferSource();
                noise.buffer = buffer;
                
                const filter = ctx.createBiquadFilter();
                filter.type = 'highpass';
                filter.frequency.value = 800;
                
                const gain = ctx.createGain();
                
                noise.connect(filter);
                filter.connect(gain);
                gain.connect(ctx.destination);
                
                gain.gain.setValueAtTime(0.6, t);
                gain.gain.exponentialRampToValueAtTime(0.01, t + 0.1);
                
                noise.start(t);
                noise.stop(t + 0.1);
            }
            step++;
        };

        // Start rhythm immediately
        playBeat();
        // Loop every 250ms (Matches 0.5s animation cycle with alternating hits)
        intervalRef.current = window.setInterval(playBeat, 250);

    } else {
        // Cleanup
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
            audioCtxRef.current.suspend();
        }
    }

    return () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    };
  }, [showDrums]);

  const triggerFireEffect = () => {
    const newParticles = Array.from({ length: 15 }).map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100, // Random Horizontal position %
      scale: 0.5 + Math.random() * 1.5
    }));
    
    setFireParticles(prev => [...prev, ...newParticles]);

    setTimeout(() => {
        setFireParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 2000);
  };

  const handleCardClick = (title: string) => {
    if (title === "Captured" && fileInputRef.current) {
      fileInputRef.current.click();
    } else if (title === "DJ Night") {
      setShowDrums(true);
    } else if (title === "Campfire") {
      triggerFireEffect();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserImage(imageUrl);
    }
  };

  const vibes = [
    {
      title: "The Journey",
      subtitle: "Bus Rides & Beats",
      icon: Bus,
      gradient: "from-blue-600 to-purple-600",
      border: "border-neon-blue",
      id: "journey"
    },
    {
      title: "Campfire",
      subtitle: "Warmth & Stories",
      icon: Flame,
      gradient: "from-orange-600 to-red-600",
      border: "border-neon-pink",
      id: "campfire"
    },
    {
      title: "DJ Night",
      subtitle: "Music & Dance",
      icon: Music,
      gradient: "from-pink-600 to-purple-900",
      border: "border-neon-purple",
      id: "dj"
    },
    {
      title: "Captured",
      subtitle: userImage ? "Your Moment" : "Upload Photo",
      icon: userImage ? null : Camera, 
      gradient: "from-green-600 to-emerald-900",
      border: "border-neon-green",
      id: "captured",
      isInteractive: true
    }
  ];

  return (
    <section className="py-20 px-2 md:px-4 bg-gradient-to-b from-black via-slate-900 to-black relative overflow-hidden">
       {/* Background noise */}
       <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

       {/* FIRE PARTICLES CONTAINER */}
       <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          <AnimatePresence>
            {fireParticles.map(particle => (
              <motion.div
                key={particle.id}
                initial={{ opacity: 1, y: '100vh', x: `${particle.x}vw`, scale: 0 }}
                animate={{ opacity: 0, y: '-20vh', scale: particle.scale }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 + Math.random(), ease: "easeOut" }}
                className="absolute text-4xl"
              >
                🔥
              </motion.div>
            ))}
          </AnimatePresence>
       </div>

       {/* DRUM OVERLAY */}
       <AnimatePresence>
        {showDrums && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center overflow-hidden"
          >
            <button 
              onClick={() => setShowDrums(false)}
              className="absolute top-8 right-8 text-white hover:text-neon-pink transition-colors p-2 z-50"
            >
              <X size={40} />
            </button>

            <h2 className="text-4xl md:text-6xl font-orbitron font-bold text-white mb-16 animate-pulse text-center relative z-10">
              DJ <span className="text-neon-pink">NIGHT</span>
            </h2>

            {/* Drum Kit Animation */}
            <div className="relative w-80 h-80 flex items-center justify-center">
               
               {/* Glowing Background Pulse */}
               <motion.div 
                 animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                 transition={{ repeat: Infinity, duration: 0.5 }}
                 className="absolute inset-0 bg-neon-purple rounded-full blur-[80px]"
               />

               {/* Main Drum */}
               <motion.div 
                 animate={{ scale: [1, 1.05, 1] }}
                 transition={{ repeat: Infinity, duration: 0.5 }}
                 className="w-64 h-64 rounded-full bg-gradient-to-b from-gray-800 to-black border-4 border-neon-blue shadow-[0_0_30px_rgba(0,243,255,0.5)] flex items-center justify-center relative z-10"
               >
                  <div className="w-56 h-56 rounded-full border border-white/10 flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]">
                     <Music className="w-24 h-24 text-neon-blue opacity-80" />
                  </div>
               </motion.div>

               {/* Left Stick (Kick) */}
               <motion.div 
                 className="absolute top-[-40px] left-[-40px] w-3 h-64 bg-gradient-to-t from-white to-gray-400 rounded-full shadow-[0_0_20px_white] z-20 origin-bottom-left"
                 initial={{ rotate: 45 }}
                 animate={{ rotate: [45, 15, 45] }}
                 transition={{ repeat: Infinity, duration: 0.5, ease: "easeIn" }}
                 style={{ transformOrigin: '20% 90%' }} 
               />

               {/* Right Stick (Snare) - Delayed by 0.25s (half of duration) */}
               <motion.div 
                 className="absolute top-[-40px] right-[-40px] w-3 h-64 bg-gradient-to-t from-white to-gray-400 rounded-full shadow-[0_0_20px_white] z-20 origin-bottom-right"
                 initial={{ rotate: -45 }}
                 animate={{ rotate: [-45, -15, -45] }}
                 transition={{ repeat: Infinity, duration: 0.5, ease: "easeIn", delay: 0.25 }}
                 style={{ transformOrigin: '80% 90%' }}
               />
            </div>

            <p className="mt-16 text-neon-blue font-rajdhani text-xl tracking-[0.3em] uppercase animate-bounce">
              Feel the Rhythm
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1 rounded-full border border-neon-purple/30 bg-neon-purple/10">
            <Camera className="w-4 h-4 text-neon-purple" />
            <span className="text-xs font-orbitron text-neon-purple tracking-widest">MEMORIES</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-orbitron font-bold text-white mb-8">
            <span className="text-neon-green">Vibes</span> & Moments
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-10 md:mb-16 hidden md:grid">
             {quotes.map((q, i) => (
               <motion.div 
                key={i}
                whileHover={{ scale: 1.05 }}
                className="glass-card p-6 rounded-xl border-t border-neon-purple/50 relative overflow-hidden group"
               >
                 <div className="absolute top-[-10px] right-[-10px] text-8xl text-white/5 font-serif group-hover:text-neon-purple/10 transition-colors">"</div>
                 <p className="text-gray-300 font-inter italic text-lg relative z-10">"{q.text}"</p>
                 <p className="text-neon-blue text-sm font-bold mt-4 text-right">- {q.author}</p>
               </motion.div>
             ))}
          </div>
        </div>

        {/* Hidden File Input */}
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*" 
          className="hidden" 
        />

        {/* Vibe Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
          {vibes.map((vibe, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => handleCardClick(vibe.title)}
              className={`relative h-40 md:h-64 rounded-xl md:rounded-2xl overflow-hidden group border ${vibe.border} bg-gray-900 shadow-lg cursor-pointer active:scale-95 transition-transform`}
            >
              {/* Image Preview for Captured Card */}
              {vibe.title === "Captured" && userImage ? (
                <img src={userImage} alt="User Upload" className="absolute inset-0 w-full h-full object-cover z-20" />
              ) : (
                <>
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${vibe.gradient} opacity-40 group-hover:opacity-60 transition-opacity duration-500`}></div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-2 md:p-6 text-center z-10">
                    <div className={`w-10 h-10 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mb-2 md:mb-4 border border-white/20 group-hover:scale-110 transition-transform duration-300`}>
                      {vibe.icon && <vibe.icon className="w-5 h-5 md:w-8 md:h-8 text-white" />}
                      {vibe.title === "Captured" && !userImage && <Upload className="w-5 h-5 md:w-8 md:h-8 text-white animate-pulse" />}
                    </div>
                    <h4 className="text-sm md:text-2xl font-rajdhani font-bold text-white uppercase tracking-wider mb-1">{vibe.title}</h4>
                    <p className="text-[10px] md:text-sm text-gray-300 font-inter leading-tight">{vibe.subtitle}</p>
                    {vibe.title === "DJ Night" && <p className="text-[8px] text-neon-pink mt-1 animate-pulse">Click for Beats</p>}
                    {vibe.title === "Campfire" && <p className="text-[8px] text-orange-400 mt-1">Tap for Heat</p>}
                  </div>
                </>
              )}

              {/* Decorative Glow */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors"></div>
            </motion.div>
          ))}
        </div>
        
        {/* Mobile Quote Carousel */}
         <div className="mt-8 md:hidden">
            <p className="text-gray-400 text-xs text-center italic">"Tap the cards for sound, fire, and uploads!"</p>
         </div>
      </div>
    </section>
  );
};

export default Memories;