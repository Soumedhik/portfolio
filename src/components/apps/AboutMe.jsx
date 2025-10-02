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
    <div className="bg-neutral-900/80 rounded-md px-4 pt-3 hover:translate-x-1 hover:-translate-y-1 duration-300 text-selection">
      <div className="flex items-center justify-between">
        <a
          href={repo.githubLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View GitHub repository"
        >
          <FaGithub size={30} />
        </a>
        <a
          href={repo.liveURL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit live site"
        >
          <FaExternalLinkAlt size={15} />
        </a>
      </div>
      <h3 className="font-bold mt-6">{repo.name}</h3>
      <p className="text-neutral-700 mt-4 text-sm">{repo.description}</p>
      <div className="flex items-center mt-4 gap-2 flex-wrap">
        {renderSkills()}
      </div>
    </div>
  );
};

const Skill = ({ icon, name, size }) => (
  <div
    className={`w-[${
      size === 48 ? "6em" : "5em"
    }] h-24 flex flex-col justify-center items-center rounded-md hover:bg-white hover:bg-opacity-20 p-2`}
  >
    {icon ? React.cloneElement(icon, { size }) : (
      <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg text-white text-sm font-semibold">
        {name.charAt(0)}
      </div>
    )}
    <div className="text-balance text-center text-sm select-none pt-2">
      {name}
    </div>
  </div>
);

const SkillsList = ({ x, y }) => (
  <div className="flex flex-wrap gap-2">
    <>
      {skills.slice(x, y).map((skill) => (
        <Skill key={skill.key} icon={skill.icon} name={skill.name} size={48} />
      ))}
    </>
  </div>
);

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
                        src="/images/4.jpg"
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
                          onClick={() => handleDivClick && handleDivClick('Research Experience')}
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
                          onClick={() => handleDivClick && handleDivClick('Projects')}
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
            <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical my-8">
            {educationExperience.map((edu, index) => (
              <li key={edu.key}>
                {index > 0 && <hr className="bg-gray-500" />}
                <div className="timeline-middle">
                  {edu.logo ? (
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-white p-3">
                      <img
                        src={edu.logo}
                        alt={`${edu.institution} logo`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                <div className={`${index % 2 === 0 ? 'timeline-start md:text-end' : 'timeline-end'} mb-10`}>
                  <time className="font-mono text-lg italic">
                    {edu.graduation}
                  </time>
                  <div className="text-xl font-bold font-3xl flex items-center gap-3">
                    {edu.institution}
                  </div>
                  <div className="text-sm text-neutral-400 mt-1">
                    {edu.degree}
                  </div>
                </div>
                {index < educationExperience.length - 1 && <hr className="bg-gray-500" />}
              </li>
            ))}
            </ul>
          </div>
        );
      case "Skills":
        return (
          <div className="main-container flex h-full max-h-[calc(100vh-200px)] overflow-y-auto pr-4 relative" style={{height: 'calc(100% - 40px)'}}>
            {expandedDiv === 0 && (
              <>
                <div
                  className="w-[5em] h-28 flex flex-col pt-2 items-center rounded-md hover:bg-white hover:bg-opacity-20"
                  onDoubleClick={() => handleDivClick(1)}
                >
                  <img
                    src="/images/apps/folder.png"
                    alt="Technical"
                    className="w-12 h-12"
                  />
                  <div className="text-balance text-center text-sm select-none pt-2">
                    Technical Skills
                  </div>
                </div>

                <div
                  className="w-[5em] h-28 flex flex-col pt-2 items-center rounded-md hover:bg-white hover:bg-opacity-20"
                  onDoubleClick={() => handleDivClick(2)}
                >
                  <img
                    src="/images/apps/folder.png"
                    alt="Soft"
                    className="w-12 h-12"
                  />
                  <div className="text-balance text-center text-sm select-none pt-2">
                    Soft Skills
                  </div>
                </div>

                <div
                  className="w-[5em] h-28 flex flex-col pt-2 items-center rounded-md hover:bg-white hover:bg-opacity-20"
                  onDoubleClick={() => handleDivClick(3)}
                >
                  <img
                    src="/images/apps/folder.png"
                    alt="Design"
                    className="w-12 h-12"
                  />
                  <div className="text-balance text-center text-sm select-none pt-2">
                    Design Skills
                  </div>
                </div>
              </>
            )}

            {expandedDiv === 1 && (
              <div className="flex absolute top-0 gap-2">
                <SkillsList x={0} y={17} />
              </div>
            )}

            {expandedDiv === 2 && (
              <div className="flex absolute top-0 gap-1">
                <div className="w-[6.5em] h-28 flex flex-col pt-2 items-center rounded-md hover:bg-white hover:bg-opacity-20">
                  <img
                    src="/images/folders/communication.png"
                    alt="Communication"
                    className="w-12 h-12"
                  />
                  <div className="text-pretty text-center text-sm select-none pt-2">
                    Communication
                  </div>
                </div>
                <div className="w-[6em] h-28 flex flex-col pt-2 items-center rounded-md hover:bg-white hover:bg-opacity-20">
                  <img
                    src="/images/folders/teamwork.png"
                    alt="Teamwork"
                    className="w-12 h-12"
                  />
                  <div className="text-pretty text-center text-sm select-none pt-2">
                    Teamwork
                  </div>
                </div>
                <div className="w-[5em] h-28 flex flex-col pt-2 items-center rounded-md hover:bg-white hover:bg-opacity-20">
                  <img
                    src="/images/folders/problem.png"
                    alt="Problem"
                    className="w-12 h-12"
                  />
                  <div className="text-pretty text-center text-sm select-none pt-2">
                    Problem Solving
                  </div>
                </div>
                <div className="w-[6em] h-28 flex flex-col justify-center items-center rounded-md hover:bg-white hover:bg-opacity-20">
                  <img
                    src="/images/folders/management.png"
                    alt="Project"
                    className="w-12 h-12"
                  />
                  <div className="text-pretty text-center text-sm select-none pt-2">
                    Project Management
                  </div>
                </div>
              </div>
            )}

            {expandedDiv === 3 && (
              <div className="flex absolute top-0 gap-2">
                <SkillsList x={17} y={20} />
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
              <iframe
                src="/Resume.pdf"
                className="w-full h-full border-0"
                title="Resume PDF Viewer"
                style={{ minHeight: '600px' }}
              >
                <p className="text-center p-4">
                  Your browser does not support PDF viewing. 
                  <a href="/Resume.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
                    Click here to download the PDF
                  </a>
                </p>
              </iframe>
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
              <iframe
                src="/Curriculum Vitae.pdf"
                className="w-full h-full border-0"
                title="CV PDF Viewer"
                style={{ minHeight: '600px' }}
              >
                <p className="text-center p-4">
                  Your browser does not support PDF viewing. 
                  <a href="/Curriculum Vitae.pdf" target="_blank" rel="noopener noreferrer" className="text-green-400 underline">
                    Click here to download the PDF
                  </a>
                </p>
              </iframe>
            </div>
          </div>
        );
      case "Research Experience":
        return (
          <div className="h-full max-h-[calc(100vh-200px)] overflow-y-auto pr-4" style={{height: 'calc(100% - 40px)'}}>
            <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical my-8">
            {researchExperience.map((research, index) => (
              <li key={research.key}>
                {index > 0 && <hr className="bg-gray-500" />}
                <div className="timeline-middle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className={`${index % 2 === 0 ? 'timeline-start md:text-end' : 'timeline-end'} mb-10`}>
                  <time className="font-mono text-lg italic">
                    {research.duration}
                  </time>
                  <div className="text-xl font-bold font-3xl">
                    {research.institution}
                  </div>
                  <div className="mt-3 space-y-2">
                    {research.description.map((desc, descIndex) => (
                      <p key={descIndex} className="text-sm text-neutral-300 leading-relaxed">
                        • {desc}
                      </p>
                    ))}
                  </div>
                </div>
                {index < researchExperience.length - 1 && <hr className="bg-gray-500" />}
              </li>
            ))}
            </ul>
          </div>
        );
      case "Work Experience":
        return (
          <div className="h-full max-h-[calc(100vh-200px)] overflow-y-auto pr-4" style={{height: 'calc(100% - 40px)'}}>
            <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical my-8">
            {workExperience.map((work, index) => (
              <li key={work.key}>
                {index > 0 && <hr className="bg-gray-500" />}
                <div className="timeline-middle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className={`${index % 2 === 0 ? 'timeline-start md:text-end' : 'timeline-end'} mb-10`}>
                  <time className="font-mono text-lg italic">
                    {work.duration}
                  </time>
                  <div className="text-xl font-bold font-3xl">
                    {work.company}
                  </div>
                  <div className="text-lg font-semibold text-blue-400 mt-1">
                    {work.designation}
                  </div>
                  <div className="mt-3 space-y-2">
                    {work.description.map((desc, descIndex) => (
                      <p key={descIndex} className="text-sm text-neutral-300 leading-relaxed">
                        • {desc}
                      </p>
                    ))}
                  </div>
                </div>
                {index < workExperience.length - 1 && <hr className="bg-gray-500" />}
              </li>
            ))}
            </ul>
          </div>
        );
      case "Position of Responsibility":
        return (
          <div className="h-full max-h-[calc(100vh-200px)] overflow-y-auto pr-4" style={{height: 'calc(100% - 40px)'}}>
            <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical my-8">
            {positionOfResponsibility.map((position, index) => (
              <li key={position.key}>
                {index > 0 && <hr className="bg-gray-500" />}
                <div className="timeline-middle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className={`${index % 2 === 0 ? 'timeline-start md:text-end' : 'timeline-end'} mb-10`}>
                  <time className="font-mono text-lg italic">
                    {position.duration}
                  </time>
                  <div className="text-xl font-bold font-3xl">
                    {position.organization}
                  </div>
                  <div className="text-lg font-semibold text-green-400 mt-1">
                    {position.designation}
                  </div>
                  <div className="mt-3 space-y-2">
                    {position.description.map((desc, descIndex) => (
                      <p key={descIndex} className="text-sm text-neutral-300 leading-relaxed">
                        • {desc}
                      </p>
                    ))}
                  </div>
                  {position.lorLink && (
                    <div className="mt-4">
                      <a 
                        href={position.lorLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 border border-blue-400/30 rounded-md transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm"
                      >
                        <FaExternalLinkAlt className="w-3 h-3" />
                        Letter of Recommendation
                      </a>
                    </div>
                  )}
                </div>
                {index < positionOfResponsibility.length - 1 && <hr className="bg-gray-500" />}
              </li>
            ))}
            </ul>
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

        const getPrizeIcon = (prize) => {
          const icons = {
            '1st': '🥇',
            '2nd': '🥈',
            'Top 3': '🥉',
            'Best Presenter': '🎖️',
            'Selected': '✅',
            'Felicitation': '🏅',
            'Participation': '🌟'
          };
          return '';
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
