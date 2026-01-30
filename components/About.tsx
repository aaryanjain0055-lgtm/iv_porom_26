import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Globe, Zap } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 relative px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl p-8 md:p-12 border-l-4 border-neon-blue"
        >
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-6 text-white">
                About The <span className="text-neon-purple">Industrial Visit</span>
              </h2>
              <p className="text-gray-300 font-inter text-lg leading-relaxed mb-6">
                This isn't just a trip; it's a bridge between our curriculum and the real world. 
                Join us as we step out of the labs and into the lush landscapes of Kerala. 
                We combine technical exposure with the bonding experience of a lifetime.
              </p>
              <p className="text-gray-400 font-inter text-md">
                Get ready to witness industry standards in action, explore the misty hills of Munnar, 
                experience the cultural vibe of Kochi, and scream your lungs out at Wonderla.
              </p>
            </div>
            
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {[
                { icon: Cpu, title: "Tech Exposure", desc: "Real-world industry insights" },
                { icon: Globe, title: "Cultural Dive", desc: "Explore God's Own Country" },
                { icon: Zap, title: "Adventure", desc: "Thrill rides & campfires" }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(0, 243, 255, 0.1)' }}
                  className={`${idx === 2 ? 'sm:col-span-2' : ''} p-6 rounded-xl bg-white/5 border border-white/10 hover:border-neon-blue transition-all cursor-default group`}
                >
                  <item.icon className="w-8 h-8 text-neon-blue mb-3 group-hover:text-neon-pink transition-colors" />
                  <h3 className="text-xl font-rajdhani font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;