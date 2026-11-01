import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Send } from 'lucide-react';

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const Contact = () => {
  return (
    <footer id="contact" className="py-24 px-6 md:px-12 bg-[#0D0D11] border-t border-[#1A1A24]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 justify-between">
        
        {/* Left side: Info & Socials */}
        <div className="md:w-1/2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's Connect</h2>
            <p className="text-gray-400 text-lg mb-10 max-w-md leading-relaxed">
              Have questions about the Baccalaureate materials, or want to collaborate on a project? Send me a message!
            </p>

            <div className="flex flex-col gap-4 mb-10">
              <a href="mailto:hello@bac.ai" className="flex items-center gap-4 text-gray-400 hover:text-white transition-colors group">
                <div className="w-12 h-12 rounded-full bg-[#1A1A24] flex items-center justify-center group-hover:bg-[#8B5CF6]/20 group-hover:text-[#8B5CF6] transition-colors">
                  <Mail size={20} />
                </div>
                <span className="text-lg">hello@bac.ai</span>
              </a>
            </div>

            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 rounded-full bg-[#1A1A24] flex items-center justify-center text-gray-400 hover:bg-[#8B5CF6] hover:text-white hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-all duration-300 transform hover:-translate-y-1">
                <GithubIcon />
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-[#1A1A24] flex items-center justify-center text-gray-400 hover:bg-[#8B5CF6] hover:text-white hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-all duration-300 transform hover:-translate-y-1">
                <LinkedinIcon />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right side: Form */}
        <div className="md:w-1/2">
          <motion.form 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#111116] p-8 rounded-3xl border border-[#1A1A24] shadow-2xl"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex flex-col gap-6">
              <div className="group relative">
                <input 
                  type="text" 
                  id="name"
                  placeholder="Your Name"
                  className="w-full bg-[#1A1A24] border border-[#2D2D35] rounded-xl px-4 py-4 text-white placeholder-transparent focus:outline-none focus:border-[#8B5CF6] transition-colors peer"
                  required
                />
                <label 
                  htmlFor="name" 
                  className="absolute left-4 top-4 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#8B5CF6] peer-focus:bg-[#111116] peer-focus:px-1"
                >
                  Your Name
                </label>
              </div>

              <div className="group relative">
                <input 
                  type="email" 
                  id="email"
                  placeholder="Your Email"
                  className="w-full bg-[#1A1A24] border border-[#2D2D35] rounded-xl px-4 py-4 text-white placeholder-transparent focus:outline-none focus:border-[#8B5CF6] transition-colors peer"
                  required
                />
                <label 
                  htmlFor="email" 
                  className="absolute left-4 top-4 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#8B5CF6] peer-focus:bg-[#111116] peer-focus:px-1"
                >
                  Your Email
                </label>
              </div>

              <div className="group relative">
                <textarea 
                  id="message"
                  placeholder="Message"
                  rows="4"
                  className="w-full bg-[#1A1A24] border border-[#2D2D35] rounded-xl px-4 py-4 text-white placeholder-transparent focus:outline-none focus:border-[#8B5CF6] transition-colors peer resize-none"
                  required
                ></textarea>
                <label 
                  htmlFor="message" 
                  className="absolute left-4 top-4 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#8B5CF6] peer-focus:bg-[#111116] peer-focus:px-1"
                >
                  Your Message
                </label>
              </div>

              <button 
                type="submit"
                className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-xl py-4 font-semibold text-lg flex items-center justify-center gap-2 transition-colors shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)]"
              >
                <span>Send Message</span>
                <Send size={18} />
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
