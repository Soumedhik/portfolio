import React, { useState, useRef } from "react";
import Draggable from "react-draggable";
import { motion } from "framer-motion";

const ContactMe = ({ isContactMeOpen, toggleContactMe, bounds, minimizeWindow, isMinimized }) => {
  const contactRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  const contactInfo = {
    name: "Soumedhik Bharati",
    email: "soumedhikbharati@gmail.com",
    phone: "+91 8240947878",
    github: "github.com/soumedhik",
    linkedin: "https://www.linkedin.com/in/soumedhik-bharati-50b2bb203/"
  };

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    });
  };

  const openLink = (url) => {
    if (url.startsWith('http')) {
      window.open(url, '_blank');
    } else {
      window.open(`https://${url}`, '_blank');
    }
  };

  const sendEmail = () => {
    window.open(`mailto:${contactInfo.email}?subject=Hello Soumedhik&body=Hi, I found your portfolio and would like to connect!`);
  };

  const callPhone = () => {
    window.open(`tel:${contactInfo.phone}`);
  };

  return (
    <div
      className={`${
        isContactMeOpen && !isMinimized ? "" : "hidden"
      } z-30 w-full h-screen pointer-events-none absolute`}
    >
      <Draggable handle=".title-bar" nodeRef={contactRef} bounds={bounds} disabled={isFullscreen}>
        <motion.div
          ref={contactRef}
          className="window bg-neutral-900 bg-opacity-95 overflow-hidden border-neutral-700 border-[1.5px] pointer-events-auto resize rounded-xl"
          layout
          animate={{
            width: isFullscreen ? '100vw' : '32rem',
            height: isFullscreen ? '100vh' : '38rem',
            x: isFullscreen ? 0 : undefined,
            y: isFullscreen ? 0 : undefined,
            borderRadius: isFullscreen ? 0 : 12
          }}
          transition={{
            duration: 0.5,
            ease: [0.76, 0, 0.24, 1],
            layout: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
          }}
        >
          <div className="title-bar">
            <div className="text-white h-9 flex justify-between select-none">
              <div className="m-1 ml-4 font-normal flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-400">contact_mail</span>
                <span>Contact Me</span>
              </div>
              <div className="flex">
                <div
                  className="material-symbols-outlined hover:bg-neutral-800 mb-2 w-11 flex justify-center items-center text-xl cursor-pointer transition-colors duration-200"
                  onClick={() => minimizeWindow('contactme')}
                  title="Minimize"
                >
                  minimize
                </div>
                <motion.div 
                  className="material-symbols-outlined hover:bg-neutral-800 mb-2 w-11 flex justify-center items-center text-sm cursor-pointer transition-all duration-200"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  title={isFullscreen ? 'Restore Down' : 'Maximize'}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.15, ease: [0.76, 0, 0.24, 1] }}
                >
                  {isFullscreen ? 'fullscreen_exit' : 'fullscreen'}
                </motion.div>
                <div
                  className="material-symbols-outlined hover:bg-red-700 mb-2 w-12 flex justify-center items-center text-xl cursor-pointer transition-colors duration-200"
                  onClick={toggleContactMe}
                  title="Close"
                >
                  close
                </div>
              </div>
            </div>
          </div>

          <div className="h-full pb-9 overflow-hidden bg-gradient-to-br from-neutral-800 to-neutral-900">
            <div className="h-full p-6 overflow-y-auto">
              {/* Header Section */}
              <div className="text-center mb-8">
                <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden border-4 border-blue-500/50 shadow-xl">
                  <img 
                    src="/profile.jpg" 
                    alt="Soumedhik Bharati"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center" style={{display: 'none'}}>
                    <span className="material-symbols-outlined text-2xl text-white">person</span>
                  </div>
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">{contactInfo.name}</h1>
                <p className="text-neutral-300 text-sm">AI Researcher & Problem Solver</p>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-3 rounded-full"></div>
                
                {/* Portfolio Visit Counter */}
                <div className="mt-4 flex justify-center">
                  <img 
                    src="https://hitscounter.dev/api/hit?url=https%3A%2F%2Fportfolio-soumedhik.vercel.app%2F&label=Portfolio%20Visits&icon=eye&color=%232563eb&message=&style=flat&tz=Asia%2FKolkata" 
                    alt="Portfolio Visit Counter" 
                    className="opacity-70 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                {/* Email Card */}
                <div className="bg-neutral-800/50 backdrop-blur-sm border border-neutral-700 rounded-xl p-4 hover:bg-neutral-700/50 transition-all duration-300 group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                        <span className="material-symbols-outlined text-red-400">mail</span>
                      </div>
                      <div>
                        <p className="text-white font-medium">Email</p>
                        <p className="text-neutral-300 text-sm">{contactInfo.email}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => copyToClipboard(contactInfo.email, 'email')}
                        className="p-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg transition-colors"
                        title="Copy email"
                      >
                        <span className="material-symbols-outlined text-sm text-white">
                          {copiedField === 'email' ? 'check' : 'content_copy'}
                        </span>
                      </button>
                      <button
                        onClick={sendEmail}
                        className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                        title="Send email"
                      >
                        <span className="material-symbols-outlined text-sm text-white">send</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Phone Card */}
                <div className="bg-neutral-800/50 backdrop-blur-sm border border-neutral-700 rounded-xl p-4 hover:bg-neutral-700/50 transition-all duration-300 group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <span className="material-symbols-outlined text-green-400">call</span>
                      </div>
                      <div>
                        <p className="text-white font-medium">Phone</p>
                        <p className="text-neutral-300 text-sm">{contactInfo.phone}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => copyToClipboard(contactInfo.phone, 'phone')}
                        className="p-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg transition-colors"
                        title="Copy phone"
                      >
                        <span className="material-symbols-outlined text-sm text-white">
                          {copiedField === 'phone' ? 'check' : 'content_copy'}
                        </span>
                      </button>
                      <button
                        onClick={callPhone}
                        className="p-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                        title="Call phone"
                      >
                        <span className="material-symbols-outlined text-sm text-white">call</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* LinkedIn Card */}
                <div className="bg-neutral-800/50 backdrop-blur-sm border border-neutral-700 rounded-xl p-4 hover:bg-neutral-700/50 transition-all duration-300 group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <span className="material-symbols-outlined text-blue-400">work</span>
                      </div>
                      <div>
                        <p className="text-white font-medium">LinkedIn</p>
                        <p className="text-neutral-300 text-sm">Professional Profile</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => copyToClipboard(contactInfo.linkedin, 'linkedin')}
                        className="p-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg transition-colors"
                        title="Copy LinkedIn URL"
                      >
                        <span className="material-symbols-outlined text-sm text-white">
                          {copiedField === 'linkedin' ? 'check' : 'content_copy'}
                        </span>
                      </button>
                      <button
                        onClick={() => openLink(contactInfo.linkedin)}
                        className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                        title="Open LinkedIn"
                      >
                        <span className="material-symbols-outlined text-sm text-white">open_in_new</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* GitHub Card */}
                <div className="bg-neutral-800/50 backdrop-blur-sm border border-neutral-700 rounded-xl p-4 hover:bg-neutral-700/50 transition-all duration-300 group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <span className="material-symbols-outlined text-purple-400">code</span>
                      </div>
                      <div>
                        <p className="text-white font-medium">GitHub</p>
                        <p className="text-neutral-300 text-sm">{contactInfo.github}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => copyToClipboard(contactInfo.github, 'github')}
                        className="p-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg transition-colors"
                        title="Copy GitHub URL"
                      >
                        <span className="material-symbols-outlined text-sm text-white">
                          {copiedField === 'github' ? 'check' : 'content_copy'}
                        </span>
                      </button>
                      <button
                        onClick={() => openLink(contactInfo.github)}
                        className="p-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                        title="Open GitHub"
                      >
                        <span className="material-symbols-outlined text-sm text-white">open_in_new</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Message */}
              <div className="mt-8 text-center">
                <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-4">
                  <p className="text-neutral-300 text-sm leading-relaxed">
                    💡 <strong>Let's Connect!</strong> I'm always excited to discuss AI research, 
                    innovative projects, or potential collaborations. Feel free to reach out!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Draggable>
    </div>
  );
};

export default ContactMe;