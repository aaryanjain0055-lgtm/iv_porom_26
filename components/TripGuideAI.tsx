import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { MessageCircle, X, Send, Sparkles, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const TripGuideAI: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hey there! I'm your Inteleza AI Guide. Ask me anything about our trip to Kerala, the itinerary, or what to pack! 🌴✨" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatSessionRef = useRef<Chat | null>(null);

  // Initialize Chat Session
  useEffect(() => {
    if (!chatSessionRef.current) {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        chatSessionRef.current = ai.chats.create({
          model: 'gemini-3-flash-preview',
          config: {
            systemInstruction: `You are the official AI Trip Guide for 'Inteleza 26', an Industrial Visit organized by the Department of AI&DS and IT.
            
            THE TRIP DETAILS:
            - Destination: Kerala (God's Own Country).
            - Key Spots: Munnar, Kochi, Wonderla.
            
            ITINERARY:
            - Day 01: Departure.
            - Day 02 (Munnar): Forest Garden, Photo Point, Honey Bee Tree, Elephant Ride, Botanical Garden, Tea Factory, Mattupetty Dam, Shooting Point, Echo Point, Tribal Village, Kundala Lake, Top Station.
            - Day 03 (Kochi): Industrial Visit, Hill Palace, Chottanikkara Temple, Vypin Beach, Ferry Boat, Marine Drive Boating (Harbor, Mattancherry, Sea Entrance, Bolgatty Island), Lulu Mall.
            - Day 04: Wonderla Amusement Park (Full Day).
            - Day 05: Arrival back at college.

            TONE & STYLE:
            - Your persona is youthful, energetic, tech-savvy, and helpful.
            - Use emojis (🌴, 🚌, ✨, 🔥, 🎢, 🐘, 🍵) to keep it fun.
            - Be concise. Don't write long paragraphs.
            
            IMPORTANT - ADD VALUE:
            - Occassionally inject a "Did You Know?" fun fact about Kerala or the specific destination being discussed.
            - Provide proactive travel tips.
            - If asked about the department, mention it's the coolest dept: Department of AI&DS and IT.
            
            PACKING TIPS:
            - Munnar: Warm clothes (hoodies/sweaters) - it gets chilly!
            - Kochi: Cotton/Light casuals - it's humid.
            - Wonderla: Synthetic/Nylon clothes are mandatory for water rides.
            - General: Power banks, sunglasses, and good vibes.
            
            Keep the interaction engaging, educational, and hyped up for the trip!`,
          },
        });
      } catch (error) {
        console.error("Failed to initialize AI", error);
      }
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || !chatSessionRef.current) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const result: GenerateContentResponse = await chatSessionRef.current.sendMessage({ message: userMessage });
      const responseText = result.text || "Sorry, I missed that. The signals are a bit fuzzy in the hills! 🏔️ Try again?";
      
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Oops! Technical glitch. Even AI needs a coffee break sometimes. ☕ Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-neon-blue text-black shadow-[0_0_20px_rgba(0,243,255,0.6)] hover:shadow-[0_0_30px_rgba(0,243,255,0.8)] transition-all"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-[90vw] md:w-[380px] h-[500px] max-h-[80vh] z-50 glass-card rounded-2xl flex flex-col border border-neon-blue/30 shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-black/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-neon-blue to-neon-purple flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-orbitron font-bold text-white text-sm tracking-wide">Inteleza AI</h3>
                  <p className="text-neon-green text-xs font-inter flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse"></span>
                    Online
                  </p>
                </div>
              </div>
              <Sparkles className="w-4 h-4 text-neon-purple opacity-70" />
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide bg-black/20">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm font-inter leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-neon-blue text-black rounded-tr-sm font-medium'
                        : 'bg-white/10 text-gray-100 rounded-tl-sm border border-white/5'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-3 rounded-2xl rounded-tl-sm flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-neon-blue rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-neon-purple rounded-full animate-bounce delay-100"></span>
                    <span className="w-1.5 h-1.5 bg-neon-pink rounded-full animate-bounce delay-200"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-black/40 border-t border-white/10">
              <div className="flex items-center gap-2 bg-white/5 rounded-full border border-white/10 px-4 py-2 focus-within:border-neon-blue/50 transition-colors">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask about Munnar, packing..."
                  className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder-gray-500 font-inter"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="p-2 rounded-full bg-neon-purple/20 text-neon-purple hover:bg-neon-purple hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TripGuideAI;