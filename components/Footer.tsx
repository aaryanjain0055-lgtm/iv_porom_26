import React from 'react';
import { Instagram, Heart, Terminal } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 px-4 border-t border-white/10 bg-black relative overflow-hidden">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-neon-purple to-transparent opacity-50"></div>
      
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Terminal className="text-neon-blue w-6 h-6" />
          <span className="font-orbitron font-bold text-xl text-white tracking-widest">INTELEZA '26</span>
        </div>

        <p className="text-2xl md:text-3xl font-rajdhani font-bold text-white mb-8">
          "Some trips are planned. <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-neon-purple">Some become legends.</span>"
        </p>

        <a 
          href="https://instagram.com/aec_inteleza_25" 
          target="_blank" 
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-neon-pink hover:text-neon-pink transition-all duration-300 mb-8 group"
        >
          <Instagram className="w-5 h-5" />
          <span className="font-bold tracking-wide">@aec_inteleza_25</span>
        </a>

        <div className="text-gray-500 text-sm font-inter">
          <p className="flex items-center justify-center gap-1">
            Made with <Heart className="w-3 h-3 text-red-500 fill-current" /> by the Department of AI&DS and IT
          </p>
          <p className="mt-2 text-xs opacity-50">&copy; 2026 All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;