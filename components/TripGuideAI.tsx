import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Bot } from 'lucide-react';

const TripGuideAI: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: 'Hello! I am your AI Guide for Inteleza \'26. Ask me anything about the trip!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const model = 'gemini-2.5-flash-latest';

      const systemPrompt = `
        You are the friendly and knowledgeable AI assistant for "Inteleza '26", the Industrial Visit for the Department of AI&DS and IT.
        
        Here is the official Itinerary:
        Day 1: 07:30 PM: Bus departs from college.
        Day 2 (Munnar): 
          07:00 AM: Room Check-in.
          08:00 AM: Breakfast.
          09:00 AM: Sightseeing (Forest Garden, Photo Point, Honey Bee Tree, Elephant Ride, Botanical Garden, Tea Factory Visit, Mattupetty Dam, Shooting Point, Echo Point, Tribal Village, Kundala Lake, Top Station).
          05:00 PM: Munnar Local Shopping.
          07:00 PM: Campfire & Stay at Hotel.
          IMPORTANT DISCLAIMER: Extra charges may apply for entry tickets and rides at specific locations (e.g., Elephant Ride, Gardens, etc.). These must be paid by students.
        Day 3 (Industry & Kochi):
          04:00 AM: Early Morning Start.
          09:00 AM: Breakfast.
          10:00 AM: Industrial Visit.
          12:00 PM: Kochi Sightseeing (Hill Palace, Chottanikkara Temple, Vypin Beach, Ferry Boat on Bus, Marine Drive Boating covering Harbor/Mattancherry/Sea Entrance/Bolgatty Island, Lulu Mall).
          Night Stay at Cochin.
        Day 4 (Wonderla):
          07:00 AM: Hotel Checkout.
          08:00 AM: Breakfast.
          10:00 AM: Wonderla Entry (Amusement Park).
          07:00 PM: Wonderla Checkout.
          09:00 PM: Depart to College.
        Day 5: Morning Arrival at College.

        Style: Keep answers concise, helpful, and energetic (neon-themed vibe). 
        If asked about costs for rides/entry, strictly mention the disclaimer that extra charges apply.
        Do not answer questions unrelated to the trip, Kerala, or general travel advice.
      `;

      const response = await ai.models.generateContent({
        model: model,
        contents: [
          { role: 'user', parts: [{ text: systemPrompt + "\n\nUser Question: " + userMessage }] }
        ]
      });

      const responseText = response.text || "Sorry, I couldn't process that.";
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);

    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Systems offline. Please try again later." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full bg-neon-blue text-black shadow-[0_0_20px_#00f3ff] hover:scale-110 transition-transform ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 w-[90vw] md:w-[400px] h-[500px] bg-black/95 backdrop-blur-xl border border-neon-blue/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-neon-blue/10 border-b border-neon-blue/20 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bot className="text-neon-blue w-5 h-5" />
                <h3 className="font-orbitron font-bold text-white">IV Assistant</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-neon-blue/20 text-white border border-neon-blue/30 rounded-tr-none' 
                      : 'bg-white/10 text-gray-200 border border-white/5 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-3 rounded-xl rounded-tl-none flex gap-1">
                    <span className="w-2 h-2 bg-neon-blue rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-neon-blue rounded-full animate-bounce delay-100"></span>
                    <span className="w-2 h-2 bg-neon-blue rounded-full animate-bounce delay-200"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-black/50">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about timing, places..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-neon-blue text-sm"
                />
                <button 
                  onClick={handleSend}
                  disabled={loading}
                  className="p-2 bg-neon-blue/20 text-neon-blue rounded-lg border border-neon-blue/30 hover:bg-neon-blue hover:text-black transition-colors disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
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