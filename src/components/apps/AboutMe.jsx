import React from "react";
import { motion } from "framer-motion";
import {
  profileDescription,
  educationExperience,
  researchExperience,
  workExperience,
  positionOfResponsibility,
  skills,
  githubRepos,
  achievements,
  conferences,
} from "../../data/data";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const SkillItem = ({ skillItem, isTechStack = false, iconSize = 15 }) => {
  if (!skillItem) {
    return null;
  }

  return (
    <div className="flex items-center ring-2 ring-neutral-700 bg-neutral-900 rounded-sm p-2 pl-3">
      {skillItem.icon ? React.cloneElement(skillItem.icon, { size: iconSize }) : (
        <div className="w-4 h-4 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 rounded text-white text-xs font-semibold">
          {skillItem.name.charAt(0)}
        </div>
      )}
      <span
        className={`ml-2 text-neutral-400 text-selection hover:text-neutral-200 duration-150 ease-in-out cursor-pointer ${
          isTechStack ? "text-xs" : "text-sm"
        }`}
      >
        {skillItem.name}
      </span>
    </div>
  );
};

const ProjectCard = ({ repo }) => {
  const renderSkills = () =>
    repo.techUsed.map((tech, index) => {
      const techSkill = skills.find((skill) => skill.name === tech);
      return <SkillItem skillItem={techSkill} isTechStack={true} key={index} />;
    });

  return (
    <motion.div 
      className="relative group cursor-pointer"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      whileHover={{ 
        scale: 1.02, 
        y: -5,
        transition: { duration: 0.3, ease: [0.76, 0, 0.24, 1] }
      }}
    >
      {/* Glassmorphism background with gradient border */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-purple-500/10 to-blue-500/20 rounded-xl blur-sm group-hover:blur-none transition-all duration-500"></div>
      <div className="relative bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all duration-500 hover:bg-black/30">
        
        {/* Animated background glow on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 via-purple-600/5 to-blue-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="relative z-10">
          {/* Header with animated icons */}
          <div className="flex items-center justify-between mb-4">
            <motion.a
              href={repo.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View GitHub repository"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-110"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            >
              <FaGithub size={24} className="text-white/80 hover:text-white transition-colors duration-300" />
            </motion.a>
            <motion.a
              href={repo.liveURL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit live site"
              className="p-2 rounded-lg bg-white/5 hover:bg-violet-500/20 transition-all duration-300 hover:scale-110"
              whileHover={{ x: 3, y: -3 }}
              transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
            >
              <FaExternalLinkAlt size={16} className="text-violet-400 hover:text-violet-300 transition-colors duration-300" />
            </motion.a>
          </div>

          {/* Project title with gradient effect */}
          <motion.h3 
            className="font-bold text-lg mb-3 bg-gradient-to-r from-white via-violet-200 to-blue-200 bg-clip-text text-transparent group-hover:from-violet-300 group-hover:via-purple-300 group-hover:to-blue-300 transition-all duration-500"
            layout
          >
            {repo.name}
          </motion.h3>

          {/* Description with improved typography */}
          <motion.p 
            className="text-neutral-300 text-sm leading-relaxed mb-4 group-hover:text-neutral-200 transition-colors duration-300"
            layout
          >
            {repo.description}
          </motion.p>

          {/* Tech stack with animated pills */}
          <motion.div 
            className="flex items-center gap-2 flex-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {renderSkills()}
          </motion.div>

          {/* Subtle shine effect on hover */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out rounded-xl overflow-hidden"></div>
        </div>
      </div>
    </motion.div>
  );
};

const AboutMe = ({ page, handleDivClick, expandedDiv }) => {
  const renderPageContent = () => {
    switch (page) {
      case "About Me":
        const containerVariants = {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1],
              staggerChildren: 0.2
            }
          }
        };

        const itemVariants = {
          hidden: { opacity: 0, y: 30, scale: 0.95 },
          visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
              duration: 0.6,
              ease: [0.76, 0, 0.24, 1]
            }
          }
        };

        const imageVariants = {
          hidden: { opacity: 0, x: -50, scale: 0.9 },
          visible: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1],
              delay: 0.2
            }
          }
        };

        const textVariants = {
          hidden: { opacity: 0, x: 30 },
          visible: {
            opacity: 1,
            x: 0,
            transition: {
              duration: 0.6,
              ease: [0.76, 0, 0.24, 1],
              delay: 0.4
            }
          }
        };

        return (
          <motion.div 
            className="h-full max-h-[calc(100vh-200px)] overflow-y-auto pr-4"
            style={{height: 'calc(100% - 40px)'}}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="min-h-full flex items-center justify-center p-6">
              <div className="max-w-6xl w-full">
                <motion.div 
                  className="grid lg:grid-cols-2 gap-12 items-center"
                  variants={itemVariants}
                >
                  {/* Profile Image Section */}
                  <motion.div 
                    className="flex justify-center lg:justify-start"
                    variants={imageVariants}
                  >
                    <div className="relative group">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.img
                        src="/assets/media/highlights/timeline-feature.jpg"
                        className="relative z-10 w-80 h-80 lg:w-96 lg:h-96 rounded-2xl shadow-2xl object-cover border border-white/10 backdrop-blur-sm"
                        alt="Soumedhik Bharati - Profile"
                        whileHover={{ 
                          scale: 1.02,
                          rotate: 1,
                          transition: { duration: 0.3, ease: [0.76, 0, 0.24, 1] }
                        }}
                        whileTap={{ scale: 0.98 }}
                      />
                      <motion.div
                        className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl opacity-0 group-hover:opacity-100 -z-10"
                        initial={false}
                        animate={{
                          opacity: [0, 0.5, 0],
                          scale: [0.8, 1.1, 0.8],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </div>
                  </motion.div>

                  {/* Content Section */}
                  <motion.div 
                    className="space-y-6 text-center lg:text-left"
                    variants={textVariants}
                  >
                    <motion.div
                      className="space-y-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                    >
                      <motion.h1 
                        className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent leading-tight"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                      >
                        About Me
                      </motion.h1>
                      
                      <motion.div
                        className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto lg:mx-0 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: 96 }}
                        transition={{ delay: 1.2, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                      />
                    </motion.div>

                    <motion.div 
                      className="relative"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl" />
                      <motion.p 
                        className="relative z-10 text-lg lg:text-xl leading-relaxed text-gray-300 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
                        whileHover={{
                          scale: 1.02,
                          transition: { duration: 0.2 }
                        }}
                      >
                        {profileDescription}
                      </motion.p>
                    </motion.div>

                    {/* Animated Stats Cards */}
                    <motion.div 
                      className="grid grid-cols-2 lg:grid-cols-3 gap-4 pt-6"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.1, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                    >
                      {[
                        { label: "Research Projects", value: "5+", color: "from-blue-500 to-cyan-500" },
                        { label: "Publications", value: "3+", color: "from-purple-500 to-pink-500" },
                        { label: "Awards Won", value: "9+", color: "from-green-500 to-emerald-500" }
                      ].map((stat, index) => (
                        <motion.div
                          key={stat.label}
                          className="group relative p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
                          initial={{ opacity: 0, y: 20, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ 
                            delay: 1.2 + (index * 0.1), 
                            duration: 0.5, 
                            ease: [0.76, 0, 0.24, 1] 
                          }}
                          whileHover={{
                            scale: 1.05,
                            y: -5,
                            transition: { duration: 0.2 }
                          }}
                        >
                          <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`} />
                          <div className="relative z-10 text-center">
                            <motion.div 
                              className={`text-2xl lg:text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ 
                                delay: 1.4 + (index * 0.1), 
                                duration: 0.3, 
                                type: "spring", 
                                stiffness: 200 
                              }}
                            >
                              {stat.value}
                            </motion.div>
                            <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* Call to Action */}
                    <motion.div 
                      className="pt-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.5, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                    >
                      <motion.p 
                        className="text-lg text-gray-400 mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.6, duration: 0.4 }}
                      >
                        Explore my journey through research, innovation, and achievement
                      </motion.p>
                      <motion.div 
                        className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.8, duration: 0.4 }}
                      >
                        <motion.button
                          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300 backdrop-blur-sm border border-white/20"
                          whileHover={{ 
                            scale: 1.05,
                            boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)"
                          }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            if (handleDivClick) {
                              // Set page to Research Experience section
                              window.explorerPage = 'Research Experience';
                              const pageEvent = new CustomEvent('changeExplorerPage', { detail: 'Research Experience' });
                              window.dispatchEvent(pageEvent);
                            }
                          }}
                        >
                          View Research
                        </motion.button>
                        <motion.button
                          className="px-6 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20"
                          whileHover={{ 
                            scale: 1.05,
                            backgroundColor: "rgba(255, 255, 255, 0.15)"
                          }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            if (handleDivClick) {
                              // Set page to Projects section
                              window.explorerPage = 'Projects';
                              const pageEvent = new CustomEvent('changeExplorerPage', { detail: 'Projects' });
                              window.dispatchEvent(pageEvent);
                            }
                          }}
                        >
                          Explore Projects
                        </motion.button>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        );
      case "Education":
        return (
          <div className="h-full max-h-[calc(100vh-200px)] overflow-y-auto pr-4" style={{height: 'calc(100% - 40px)'}}>
            <div className="relative">
              {/* Central timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-purple-500/20 via-indigo-500/40 to-purple-500/20"></div>
              
              <div className="space-y-8 py-8">
                {educationExperience.map((edu, index) => (
                  <motion.div
                    key={edu.key}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? 'justify-start' : 'justify-end'
                    }`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.6 }}
                  >
                    {/* Timeline node */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-br from-purple-400 to-indigo-600 rounded-full border-4 border-black shadow-lg z-10"></div>
                    
                    {/* Content card */}
                    <motion.div
                      className={`w-5/12 group cursor-pointer ${
                        index % 2 === 0 ? 'mr-auto pr-8' : 'ml-auto pl-8'
                      }`}
                      whileHover={{ scale: 1.02, y: -5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <div className="relative backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 shadow-2xl hover:bg-white/10 transition-all duration-300 hover:border-white/20 hover:shadow-purple-500/20">
                        {/* Glassmorphism overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Content */}
                        <div className="relative z-10">
                          <div className={`flex items-center gap-3 mb-3 ${
                            index % 2 === 0 ? 'justify-start' : 'justify-end'
                          }`}>
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                            <time className="font-mono text-sm text-purple-300 bg-purple-500/10 px-3 py-1 rounded-full">
                              {edu.graduation}
                            </time>
                          </div>
                          
                          <h3 className={`text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300 ${
                            index % 2 === 0 ? 'text-left' : 'text-right'
                          }`}>
                            {edu.institution}
                          </h3>
                          
                          <div className={`text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors duration-300 ${
                            index % 2 === 0 ? 'text-left' : 'text-right'
                          }`}>
                            <span className="text-purple-400">🎓</span> {edu.degree}
                          </div>
                        </div>
                        
                        {/* Hover glow effect */}
                        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-purple-500/10 via-transparent to-indigo-500/10"></div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );
      case "Skills":
        return (
          <div className="main-container flex h-full max-h-[calc(100vh-200px)] overflow-y-auto pr-4 relative" style={{height: 'calc(100% - 40px)'}}>
            {expandedDiv === 0 && (
              <>
                <div
                  className="w-[7em] h-28 flex flex-col pt-2 items-center rounded-md hover:bg-white hover:bg-opacity-20 cursor-pointer"
                  onDoubleClick={() => handleDivClick(1)}
                >
                  <img
                    src="/assets/icons/apps/folder.png"
                    alt="Specializations"
                    className="w-12 h-12"
                  />
                  <div className="text-balance text-center text-sm select-none pt-2">
                    Specializations
                  </div>
                </div>

                <div
                  className="w-[7em] h-28 flex flex-col pt-2 items-center rounded-md hover:bg-white hover:bg-opacity-20 cursor-pointer"
                  onDoubleClick={() => handleDivClick(2)}
                >
                  <img
                    src="/assets/icons/apps/folder.png"
                    alt="Programming"
                    className="w-12 h-12"
                  />
                  <div className="text-balance text-center text-sm select-none pt-2">
                    Programming & Data
                  </div>
                </div>

                <div
                  className="w-[7em] h-28 flex flex-col pt-2 items-center rounded-md hover:bg-white hover:bg-opacity-20 cursor-pointer"
                  onDoubleClick={() => handleDivClick(3)}
                >
                  <img
                    src="/assets/icons/apps/folder.png"
                    alt="Technical"
                    className="w-12 h-12"
                  />
                  <div className="text-balance text-center text-sm select-none pt-2">
                    Technical Expertise
                  </div>
                </div>

                <div
                  className="w-[7em] h-28 flex flex-col pt-2 items-center rounded-md hover:bg-white hover:bg-opacity-20 cursor-pointer"
                  onDoubleClick={() => handleDivClick(4)}
                >
                  <img
                    src="/assets/icons/apps/folder.png"
                    alt="Research"
                    className="w-12 h-12"
                  />
                  <div className="text-balance text-center text-sm select-none pt-2">
                    Research & Dev Tools
                  </div>
                </div>

                <div
                  className="w-[7em] h-28 flex flex-col pt-2 items-center rounded-md hover:bg-white hover:bg-opacity-20 cursor-pointer"
                  onDoubleClick={() => handleDivClick(5)}
                >
                  <img
                    src="/assets/icons/apps/folder.png"
                    alt="Soft"
                    className="w-12 h-12"
                  />
                  <div className="text-balance text-center text-sm select-none pt-2">
                    Soft Skills
                  </div>
                </div>
              </>
            )}

            {/* Specializations */}
            {expandedDiv === 1 && (
              <div className="flex flex-wrap gap-3 max-w-full p-4">
                <div className="bg-neutral-800/50 rounded-lg p-3 min-w-[12em] hover:bg-neutral-700/50 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 bg-blue-500 rounded-sm flex items-center justify-center">
                      <span className="text-white text-xs">📄</span>
                    </div>
                    <span className="text-sm font-medium text-blue-300">Natural Language Processing (NLP)</span>
                  </div>
                </div>
                <div className="bg-neutral-800/50 rounded-lg p-3 min-w-[12em] hover:bg-neutral-700/50 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 bg-blue-500 rounded-sm flex items-center justify-center">
                      <span className="text-white text-xs">📄</span>
                    </div>
                    <span className="text-sm font-medium text-blue-300">Computer Vision</span>
                  </div>
                </div>
                <div className="bg-neutral-800/50 rounded-lg p-3 min-w-[12em] hover:bg-neutral-700/50 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 bg-blue-500 rounded-sm flex items-center justify-center">
                      <span className="text-white text-xs">📄</span>
                    </div>
                    <span className="text-sm font-medium text-blue-300">Time Series Forecasting</span>
                  </div>
                </div>
              </div>
            )}

            {/* Programming and Data */}
            {expandedDiv === 2 && (
              <div className="flex flex-wrap gap-3 max-w-full p-4">
                <div className="bg-neutral-800/50 rounded-lg p-3 min-w-[16em] hover:bg-neutral-700/50 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 bg-green-500 rounded-sm flex items-center justify-center">
                      <span className="text-white text-xs">💻</span>
                    </div>
                    <span className="text-sm font-medium text-green-300">Programming Languages</span>
                  </div>
                  <div className="text-xs text-neutral-300 ml-6">Python, R, C, C++, SQL</div>
                </div>
                <div className="bg-neutral-800/50 rounded-lg p-3 min-w-[18em] hover:bg-neutral-700/50 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 bg-green-500 rounded-sm flex items-center justify-center">
                      <span className="text-white text-xs">🔧</span>
                    </div>
                    <span className="text-sm font-medium text-green-300">Frameworks & Libraries</span>
                  </div>
                  <div className="text-xs text-neutral-300 ml-6">TensorFlow, Keras, PyTorch, scikit-learn, Pandas, NumPy, Matplotlib, Seaborn, OpenCV, SciPy, Hugging Face</div>
                </div>
              </div>
            )}

            {/* Technical Expertise */}
            {expandedDiv === 3 && (
              <div className="flex flex-wrap gap-3 max-w-full p-4">
                <div className="bg-neutral-800/50 rounded-lg p-3 min-w-[20em] hover:bg-neutral-700/50 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 bg-purple-500 rounded-sm flex items-center justify-center">
                      <span className="text-white text-xs">🧠</span>
                    </div>
                    <span className="text-sm font-medium text-purple-300">Machine Learning/Deep Learning</span>
                  </div>
                  <div className="text-xs text-neutral-300 ml-6">Transformer Architectures, Attention Mechanisms, RNNs (BiLSTM, GRU), CNNs, UNet, Autoencoders, Reinforcement Learning, Self-Supervised Learning, Transfer Learning, LLMs, Diffusion Models</div>
                </div>
                <div className="bg-neutral-800/50 rounded-lg p-3 min-w-[16em] hover:bg-neutral-700/50 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 bg-purple-500 rounded-sm flex items-center justify-center">
                      <span className="text-white text-xs">🔍</span>
                    </div>
                    <span className="text-sm font-medium text-purple-300">Information Retrieval</span>
                  </div>
                  <div className="text-xs text-neutral-300 ml-6">Sparse (BM25) and Dense Retrieval (Faiss), Re-ranking (ColBERT)</div>
                </div>
                <div className="bg-neutral-800/50 rounded-lg p-3 min-w-[16em] hover:bg-neutral-700/50 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 bg-purple-500 rounded-sm flex items-center justify-center">
                      <span className="text-white text-xs">⚡</span>
                    </div>
                    <span className="text-sm font-medium text-purple-300">High-Performance Computing</span>
                  </div>
                  <div className="text-xs text-neutral-300 ml-6">Distributed Training and Inference, SLURM</div>
                </div>
                <div className="bg-neutral-800/50 rounded-lg p-3 min-w-[16em] hover:bg-neutral-700/50 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 bg-purple-500 rounded-sm flex items-center justify-center">
                      <span className="text-white text-xs">⚙️</span>
                    </div>
                    <span className="text-sm font-medium text-purple-300">Model Optimization</span>
                  </div>
                  <div className="text-xs text-neutral-300 ml-6">Parameter-Efficient Fine-Tuning (PEFT), Quantization, Distillation</div>
                </div>
                <div className="bg-neutral-800/50 rounded-lg p-3 min-w-[16em] hover:bg-neutral-700/50 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 bg-purple-500 rounded-sm flex items-center justify-center">
                      <span className="text-white text-xs">⚛️</span>
                    </div>
                    <span className="text-sm font-medium text-purple-300">Quantum Computing</span>
                  </div>
                  <div className="text-xs text-neutral-300 ml-6">Deep learning for quantum system evolution</div>
                </div>
                <div className="bg-neutral-800/50 rounded-lg p-3 min-w-[18em] hover:bg-neutral-700/50 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 bg-purple-500 rounded-sm flex items-center justify-center">
                      <span className="text-white text-xs">🏗️</span>
                    </div>
                    <span className="text-sm font-medium text-purple-300">Core Concepts</span>
                  </div>
                  <div className="text-xs text-neutral-300 ml-6">Data Structures & Algorithms, Object-Oriented Programming, Operating Systems, Database Management Systems, Computer Architecture</div>
                </div>
              </div>
            )}

            {/* Research and Development Tools */}
            {expandedDiv === 4 && (
              <div className="flex flex-wrap gap-3 max-w-full p-4">
                <div className="bg-neutral-800/50 rounded-lg p-3 min-w-[16em] hover:bg-neutral-700/50 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 bg-orange-500 rounded-sm flex items-center justify-center">
                      <span className="text-white text-xs">🔬</span>
                    </div>
                    <span className="text-sm font-medium text-orange-300">Research Tools</span>
                  </div>
                  <div className="text-xs text-neutral-300 ml-6">LaTeX, MATLAB, Tableau, Power BI, Zotero</div>
                </div>
                <div className="bg-neutral-800/50 rounded-lg p-3 min-w-[16em] hover:bg-neutral-700/50 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 bg-orange-500 rounded-sm flex items-center justify-center">
                      <span className="text-white text-xs">⚙️</span>
                    </div>
                    <span className="text-sm font-medium text-orange-300">Development Tools</span>
                  </div>
                  <div className="text-xs text-neutral-300 ml-6">Git/GitHub</div>
                </div>
              </div>
            )}

            {/* Soft Skills */}
            {expandedDiv === 5 && (
              <div className="flex flex-wrap gap-3 max-w-full p-4">
                <div className="bg-neutral-800/50 rounded-lg p-3 min-w-[18em] hover:bg-neutral-700/50 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 bg-pink-500 rounded-sm flex items-center justify-center">
                      <span className="text-white text-xs">👑</span>
                    </div>
                    <span className="text-sm font-medium text-pink-300">Leadership and Mentorship</span>
                  </div>
                  <div className="text-xs text-neutral-300 ml-6">Leading research initiatives, supervising undergraduate researchers, mentoring students, conducting workshops</div>
                </div>
                <div className="bg-neutral-800/50 rounded-lg p-3 min-w-[16em] hover:bg-neutral-700/50 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 bg-pink-500 rounded-sm flex items-center justify-center">
                      <span className="text-white text-xs">🤝</span>
                    </div>
                    <span className="text-sm font-medium text-pink-300">Collaboration</span>
                  </div>
                  <div className="text-xs text-neutral-300 ml-6">Experience in collaborative research with universities and working in teams</div>
                </div>
                <div className="bg-neutral-800/50 rounded-lg p-3 min-w-[16em] hover:bg-neutral-700/50 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 bg-pink-500 rounded-sm flex items-center justify-center">
                      <span className="text-white text-xs">💬</span>
                    </div>
                    <span className="text-sm font-medium text-pink-300">Communication</span>
                  </div>
                  <div className="text-xs text-neutral-300 ml-6">Presenting research at international conferences and receiving "Best Presenter Award"</div>
                </div>
                <div className="bg-neutral-800/50 rounded-lg p-3 min-w-[16em] hover:bg-neutral-700/50 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 bg-pink-500 rounded-sm flex items-center justify-center">
                      <span className="text-white text-xs">🧩</span>
                    </div>
                    <span className="text-sm font-medium text-pink-300">Problem-Solving</span>
                  </div>
                  <div className="text-xs text-neutral-300 ml-6">Developing novel architectures and pipelines to address complex research and engineering challenges</div>
                </div>
              </div>
            )}
          </div>
        );
      case "Projects":
        return (
          <div className="h-full max-h-[calc(100vh-200px)] overflow-y-auto p-4" style={{height: 'calc(100% - 40px)'}}>
            <div className="grid sm:grid-cols-2 gap-4 pb-4">
              {githubRepos.map((repo, index) => (
                <ProjectCard key={index} repo={repo} />
              ))}
            </div>
          </div>
        );
      case "Resume":
        return (
          <div className="flex flex-col h-full p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">My Resume</h2>
              <a
                href="/Resume.pdf"
                download="Resume.pdf"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2 text-sm"
              >
                <span className="material-symbols-outlined text-sm">download</span>
                Download
              </a>
            </div>
            <div className="flex-1 bg-neutral-900/20 rounded-lg overflow-hidden">
              <object
                data="/Resume.pdf"
                type="application/pdf"
                className="w-full h-full border-0"
                style={{ minHeight: '600px' }}
                aria-label="Resume PDF Viewer"
              >
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <div className="mb-4">
                    <span className="material-symbols-outlined text-6xl text-blue-400 mb-4 block">description</span>
                  </div>
                  <p className="mb-4 text-lg">Your browser does not support embedded PDF viewing.</p>
                  <a 
                    href="/Resume.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined">open_in_new</span>
                    View Resume in New Tab
                  </a>
                </div>
              </object>
            </div>
          </div>
        );
      case "CV":
        return (
          <div className="flex flex-col h-full p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">My Curriculum Vitae</h2>
              <a
                href="/Curriculum Vitae.pdf"
                download="Curriculum_Vitae.pdf"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2 text-sm"
              >
                <span className="material-symbols-outlined text-sm">download</span>
                Download
              </a>
            </div>
            <div className="flex-1 bg-neutral-900/20 rounded-lg overflow-hidden">
              <object
                data="/Curriculum Vitae.pdf"
                type="application/pdf"
                className="w-full h-full border-0"
                style={{ minHeight: '600px' }}
                aria-label="CV PDF Viewer"
              >
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <div className="mb-4">
                    <span className="material-symbols-outlined text-6xl text-green-400 mb-4 block">description</span>
                  </div>
                  <p className="mb-4 text-lg">Your browser does not support embedded PDF viewing.</p>
                  <a 
                    href="/Curriculum Vitae.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined">open_in_new</span>
                    View CV in New Tab
                  </a>
                </div>
              </object>
            </div>
          </div>
        );
      case "Research Experience":
        return (
          <div className="h-full max-h-[calc(100vh-200px)] overflow-y-auto pr-4" style={{height: 'calc(100% - 40px)'}}>
            <div className="relative">
              {/* Central timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-500/20 via-purple-500/40 to-blue-500/20"></div>
              
              <div className="space-y-8 py-8">
                {researchExperience.map((research, index) => (
                  <motion.div
                    key={research.key}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? 'justify-start' : 'justify-end'
                    }`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.6 }}
                  >
                    {/* Timeline node */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full border-4 border-black shadow-lg z-10"></div>
                    
                    {/* Content card */}
                    <motion.div
                      className={`w-5/12 group cursor-pointer ${
                        index % 2 === 0 ? 'mr-auto pr-8' : 'ml-auto pl-8'
                      }`}
                      whileHover={{ scale: 1.02, y: -5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <div className="relative backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 shadow-2xl hover:bg-white/10 transition-all duration-300 hover:border-white/20 hover:shadow-blue-500/20">
                        {/* Glassmorphism overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Content */}
                        <div className="relative z-10">
                          <div className={`flex items-center gap-3 mb-3 ${
                            index % 2 === 0 ? 'justify-start' : 'justify-end'
                          }`}>
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                            <time className="font-mono text-sm text-blue-300 bg-blue-500/10 px-3 py-1 rounded-full">
                              {research.duration}
                            </time>
                          </div>
                          
                          <h3 className={`text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300 ${
                            index % 2 === 0 ? 'text-left' : 'text-right'
                          }`}>
                            {research.institution}
                          </h3>
                          
                          <div className={`space-y-2 ${
                            index % 2 === 0 ? 'text-left' : 'text-right'
                          }`}>
                            {research.description.map((desc, descIndex) => (
                              <p key={descIndex} className="text-sm text-neutral-300 leading-relaxed group-hover:text-neutral-200 transition-colors duration-300">
                                <span className="text-blue-400">▸</span> {desc}
                              </p>
                            ))}
                          </div>
                        </div>
                        
                        {/* Hover glow effect */}
                        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10"></div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );
      case "Work Experience":
        return (
          <div className="h-full max-h-[calc(100vh-200px)] overflow-y-auto pr-4" style={{height: 'calc(100% - 40px)'}}>
            <div className="relative">
              {/* Central timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-green-500/20 via-emerald-500/40 to-green-500/20"></div>
              
              <div className="space-y-8 py-8">
                {workExperience.map((work, index) => (
                  <motion.div
                    key={work.key}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? 'justify-start' : 'justify-end'
                    }`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.6 }}
                  >
                    {/* Timeline node */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full border-4 border-black shadow-lg z-10"></div>
                    
                    {/* Content card */}
                    <motion.div
                      className={`w-5/12 group cursor-pointer ${
                        index % 2 === 0 ? 'mr-auto pr-8' : 'ml-auto pl-8'
                      }`}
                      whileHover={{ scale: 1.02, y: -5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <div className="relative backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 shadow-2xl hover:bg-white/10 transition-all duration-300 hover:border-white/20 hover:shadow-green-500/20">
                        {/* Glassmorphism overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Content */}
                        <div className="relative z-10">
                          <div className={`flex items-center gap-3 mb-3 ${
                            index % 2 === 0 ? 'justify-start' : 'justify-end'
                          }`}>
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <time className="font-mono text-sm text-green-300 bg-green-500/10 px-3 py-1 rounded-full">
                              {work.duration}
                            </time>
                          </div>
                          
                          <h3 className={`text-lg font-bold text-white mb-2 group-hover:text-green-300 transition-colors duration-300 ${
                            index % 2 === 0 ? 'text-left' : 'text-right'
                          }`}>
                            {work.company}
                          </h3>
                          
                          <div className={`text-sm font-semibold text-green-400 mb-3 ${
                            index % 2 === 0 ? 'text-left' : 'text-right'
                          }`}>
                            {work.designation}
                          </div>
                          
                          <div className={`space-y-2 ${
                            index % 2 === 0 ? 'text-left' : 'text-right'
                          }`}>
                            {work.description.map((desc, descIndex) => (
                              <p key={descIndex} className="text-sm text-neutral-300 leading-relaxed group-hover:text-neutral-200 transition-colors duration-300">
                                <span className="text-green-400">▸</span> {desc}
                              </p>
                            ))}
                          </div>
                        </div>
                        
                        {/* Hover glow effect */}
                        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-green-500/10 via-transparent to-emerald-500/10"></div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );
      case "Position of Responsibility":
        return (
          <div className="h-full max-h-[calc(100vh-200px)] overflow-y-auto pr-4" style={{height: 'calc(100% - 40px)'}}>
            <div className="relative">
              {/* Central timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-purple-500/20 via-violet-500/40 to-purple-500/20"></div>
              
              <div className="space-y-8 py-8">
                {positionOfResponsibility.map((position, index) => (
                  <motion.div
                    key={position.key}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? 'justify-start' : 'justify-end'
                    }`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.6 }}
                  >
                    {/* Timeline node */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-br from-purple-400 to-violet-600 rounded-full border-4 border-black shadow-lg z-10"></div>
                    
                    {/* Content card */}
                    <motion.div
                      className={`w-5/12 group cursor-pointer ${
                        index % 2 === 0 ? 'mr-auto pr-8' : 'ml-auto pl-8'
                      }`}
                      whileHover={{ scale: 1.02, y: -5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <div className="relative backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 shadow-2xl hover:bg-white/10 transition-all duration-300 hover:border-white/20 hover:shadow-purple-500/20">
                        {/* Glassmorphism overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Content */}
                        <div className="relative z-10">
                          <div className={`flex items-center gap-3 mb-3 ${
                            index % 2 === 0 ? 'justify-start' : 'justify-end'
                          }`}>
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                            <time className="font-mono text-sm text-purple-300 bg-purple-500/10 px-3 py-1 rounded-full">
                              {position.duration}
                            </time>
                          </div>
                          
                          <h3 className={`text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300 ${
                            index % 2 === 0 ? 'text-left' : 'text-right'
                          }`}>
                            {position.organization}
                          </h3>
                          
                          <div className={`text-sm font-semibold text-purple-400 mb-3 ${
                            index % 2 === 0 ? 'text-left' : 'text-right'
                          }`}>
                            {position.designation}
                          </div>
                          
                          <div className={`space-y-2 ${
                            index % 2 === 0 ? 'text-left' : 'text-right'
                          }`}>
                            {position.description.map((desc, descIndex) => (
                              <p key={descIndex} className="text-sm text-neutral-300 leading-relaxed group-hover:text-neutral-200 transition-colors duration-300">
                                <span className="text-purple-400">▸</span> {desc}
                              </p>
                            ))}
                          </div>
                          
                          {position.lorLink && (
                            <div className={`mt-4 ${
                              index % 2 === 0 ? 'text-left' : 'text-right'
                            }`}>
                              <a 
                                href={position.lorLink} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-500/20 to-violet-500/20 hover:from-purple-500/30 hover:to-violet-500/30 border border-purple-400/30 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm"
                              >
                                <FaExternalLinkAlt className="w-3 h-3" />
                                Letter of Recommendation
                              </a>
                            </div>
                          )}
                        </div>
                        
                        {/* Hover glow effect */}
                        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-purple-500/10 via-transparent to-violet-500/10"></div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );
      case "Conferences":
      case "Academic Conferences & Presentations":
        const getConferenceTypeColor = (type) => {
          const colors = {
            presentation: 'from-emerald-500/20 to-teal-500/20 border-emerald-400/30',
            international: 'from-blue-500/20 to-cyan-500/20 border-blue-400/30',
            participation: 'from-purple-500/20 to-violet-500/20 border-purple-400/30'
          };
          return colors[type] || 'from-gray-500/20 to-gray-600/20 border-gray-400/30';
        };

        return (
          <div className="h-full max-h-[calc(100vh-200px)] overflow-y-auto pr-4" style={{height: 'calc(100% - 40px)'}}>
            <div className="space-y-4 my-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Academic Conferences & Presentations</h2>
                <p className="text-gray-300 text-sm">Professional presentations and conference participations in academic forums</p>
              </div>
              
              <div className="grid gap-4">
                {conferences.map((conference) => (
                  <div 
                    key={conference.key} 
                    className={`group relative bg-gradient-to-r ${getConferenceTypeColor(conference.type)} backdrop-blur-sm border rounded-lg p-5 hover:shadow-xl transition-all duration-500 ease-out hover:scale-[1.01] hover:-translate-y-1 transform-gpu`}
                    style={{
                      transition: 'all 0.5s cubic-bezier(0.76, 0, 0.24, 1)'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/10 text-white border border-white/20 backdrop-blur-sm">
                              {conference.status}
                            </span>
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {conference.location}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-white leading-tight mb-2 group-hover:text-blue-200 transition-colors duration-300">
                            {conference.title}
                          </h3>
                          {conference.paperTitle && (
                            <div className="mb-2 p-2 bg-white/5 rounded border border-white/10">
                              <p className="text-xs text-gray-400 mb-1">Paper Title:</p>
                              <p className="text-sm text-blue-200 font-medium">{conference.paperTitle}</p>
                              {conference.recordId && (
                                <p className="text-xs text-gray-500 mt-1">Record ID: {conference.recordId}</p>
                              )}
                            </div>
                          )}
                          <p className="text-gray-300 text-sm leading-relaxed mb-3">
                            {conference.description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        {conference.link && (
                          <a 
                            href={conference.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
                          >
                            <FaExternalLinkAlt className="w-3 h-3" />
                            View Details
                          </a>
                        )}
                        {conference.additionalLink && (
                          <a 
                            href={conference.additionalLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
                          >
                            <FaExternalLinkAlt className="w-3 h-3" />
                            Additional Link
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case "Awards and Achievements":
        const getCategoryColor = (category) => {
          const colors = {
            international: 'from-blue-500/20 to-purple-500/20 border-blue-400/30',
            hackathon: 'from-green-500/20 to-emerald-500/20 border-green-400/30',
            academic: 'from-orange-500/20 to-red-500/20 border-orange-400/30',
            selection: 'from-indigo-500/20 to-blue-500/20 border-indigo-400/30',
            conference: 'from-purple-500/20 to-pink-500/20 border-purple-400/30'
          };
          return colors[category] || 'from-gray-500/20 to-gray-600/20 border-gray-400/30';
        };

        return (
          <div className="h-full max-h-[calc(100vh-200px)] overflow-y-auto pr-4" style={{height: 'calc(100% - 40px)'}}>
            <div className="space-y-4 my-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Awards and Achievements</h2>
                <p className="text-gray-300 text-sm">Recognition and honors received for academic and professional excellence</p>
              </div>
              
              <div className="grid gap-4">
                {achievements.map((achievement) => (
                  <div 
                    key={achievement.key} 
                    className={`group relative bg-gradient-to-r ${getCategoryColor(achievement.category)} backdrop-blur-sm border rounded-lg p-5 hover:shadow-xl transition-all duration-500 ease-out hover:scale-[1.01] hover:-translate-y-1 transform-gpu`}
                    style={{
                      transition: 'all 0.5s cubic-bezier(0.76, 0, 0.24, 1)'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/10 text-white border border-white/20 backdrop-blur-sm">
                              {achievement.prize}
                            </span>
                            <span className="text-xs text-gray-400 capitalize">{achievement.category}</span>
                          </div>
                          <h3 className="text-lg font-semibold text-white leading-tight mb-2 group-hover:text-yellow-200 transition-colors duration-300">
                            {achievement.title}
                          </h3>
                          <p className="text-gray-300 text-sm leading-relaxed mb-3">
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    
                    <div className="flex items-center gap-3">
                      {achievement.link && (
                        <a 
                          href={achievement.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        >
                          <FaExternalLinkAlt className="w-3 h-3" />
                          View Certificate
                        </a>
                      )}
                      {achievement.additionalLink && (
                        <a 
                          href={achievement.additionalLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        >
                          <FaExternalLinkAlt className="w-3 h-3" />
                          Additional Link
                        </a>
                      )}
                    </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return "404 not found";
    }
  };

  return (
    <main className="h-full w-full ml-2.5 mt-2" style={{height: 'calc(100% - 60px)'}}>{renderPageContent()}</main>
  );
};

export default AboutMe;
