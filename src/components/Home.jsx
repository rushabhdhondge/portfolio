/* eslint-disable no-unused-vars */
import { SiThreedotjs, SiJavascript, SiTypescript, SiGithub, SiLinkedin, SiInstagram } from 'react-icons/si';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FiMail, FiPhone, FiDownload } from 'react-icons/fi';
import { FaReact, FaNodeJs } from 'react-icons/fa';
import { SiTailwindcss } from 'react-icons/si';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

// Replace Lottie Player with a simple image component
const ImagePlayer = ({ src, alt = "Profile", ...props }) => {
  return (
    <img 
      src={src} 
      alt={alt} 
      {...props}
      style={{ 
        height: '100%', 
        width: '100%', 
        objectFit: 'cover',
        ...props.style 
      }}
    />
  );
};

const HomeSection = ({ editable, onUpdate }) => {
  const [homeData, setHomeData] = useState({
    name: "Rushabh Dhondge",
    greeting: "Hello, I'm",
    roles: ['BSC Computer Science Student'],
    description: "Passionate about building innovative solutions and learning new technologies. Currently pursuing my BSC Computer Science Degree while developing my skills .",
    phone: "9322424075",
    resumeUrl: "/MY RESUME.docx",
    socialProfiles: [
      { 
        icon: <SiGithub className="text-gray-300 group-hover:text-white" />,
        url: 'https://github.com/rushabhdhondge026-glitch',
        name: 'GitHub',
        color: 'from-gray-700 to-gray-900',
        username: 'Github_rushabh'
      },
      { 
        icon: <SiLinkedin className="text-blue-400 group-hover:text-white" />,
        url: 'https://www.linkedin.com/in/rushabh-dhondge-647544262?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
        name: 'LinkedIn',
        color: 'from-blue-600 to-blue-800',
        username: 'Linkedin_Rushabh'
      },
      { 
        icon: <SiInstagram className="text-pink-500 group-hover:text-white" />,
        url: 'https://www.instagram.com/hrishi_22b?igsh=NDd3aHplMmoxbDY3',
        name: 'Instagram',
        color: 'from-pink-600 to-purple-600',
        username: 'hrishi_22b'
      },
    ],
    techStack: [
      { icon: <FaReact className="text-cyan-400" />, name: 'React' },
      { icon: <SiTailwindcss className="text-blue-400" />, name: 'Tailwind' },
      { icon: <FaNodeJs className="text-green-500" />, name: 'Node.js' },
      { icon: <SiThreedotjs className="text-purple-400" />, name: 'Python' },
      { icon: <SiJavascript className="text-yellow-400" />, name: 'Java' },
      { icon: <SiTypescript className="text-blue-500" />, name: 'TypeScript' },
    ]
  });

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  const handleChange = (field, value) => {
    const updatedData = {...homeData, [field]: value};
    setHomeData(updatedData);
    if (onUpdate) onUpdate('home', updatedData);
  };

  const handleSocialChange = (index, field, value) => {
    const updatedProfiles = [...homeData.socialProfiles];
    updatedProfiles[index][field] = value;
    handleChange('socialProfiles', updatedProfiles);
  };

  const handleTechStackChange = (index, field, value) => {
    const updatedTechStack = [...homeData.techStack];
    updatedTechStack[index][field] = value;
    handleChange('techStack', updatedTechStack);
  };

  const handleContactClick = () => {
    window.location.href = `tel:${homeData.phone}`;
  };

  const handleResumeDownload = () => {
    const link = document.createElement('a');
    link.href = homeData.resumeUrl;
    link.download = 'Rushabh_Dhondge_Resume.docx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section 
      id="home" 
      className="relative pt-14 min-h-screen w-full overflow-hidden"
      ref={ref}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 z-0" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100,
              y: Math.random() * 100,
              opacity: 0
            }}
            animate={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: [0, 0.5, 0],
              transition: {
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: 'reverse'
              }
            }}
            className="absolute w-1 h-1 rounded-full bg-cyan-400"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center pt-10 pb-16">
        <motion.div 
          className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Right Column - Profile Animation */}
          <motion.div 
            className="order-first lg:order-last flex flex-col items-center gap-8 mb-12 lg:mb-0"
            variants={itemVariants}
          >
            {/* Animated Profile Box */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="relative w-64 h-64 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-2xl border-2 border-cyan-400/30 overflow-hidden shadow-lg shadow-cyan-500/20 flex items-center justify-center"
            >
              <ImagePlayer
                src="home.png"
                alt="Profile"
              />
            </motion.div>

            {/* Social Profiles Stack */}
            <motion.div 
              className="w-full space-y-4"
              variants={itemVariants}
            >
              {homeData.socialProfiles.map((profile, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -3 }}
                  className={`group block w-full p-4 rounded-xl bg-gradient-to-r ${profile.color} shadow-md transition-all duration-300`}
                >
                  {editable ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-4">
                        <div className="text-3xl">
                          {profile.icon}
                        </div>
                        <input
                          type="text"
                          value={profile.name}
                          onChange={(e) => handleSocialChange(index, 'name', e.target.value)}
                          className="bg-transparent border-b border-white/50 text-white font-medium w-full"
                        />
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={profile.url}
                          onChange={(e) => handleSocialChange(index, 'url', e.target.value)}
                          className="bg-transparent border-b border-white/30 text-xs text-white/70 w-full"
                        />
                        <input
                          type="text"
                          value={profile.username}
                          onChange={(e) => handleSocialChange(index, 'username', e.target.value)}
                          className="bg-transparent border-b border-white/30 text-xs text-white/70 w-full"
                        />
                      </div>
                    </div>
                  ) : (
                    <a href={profile.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4">
                      <div className="text-3xl">
                        {profile.icon}
                      </div>
                      <div>
                        <p className="text-white font-medium">{profile.name}</p>
                        <p className="text-xs text-white/70">@{profile.username}</p>
                      </div>
                    </a>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Left Column - Text content */}
          <motion.div
            variants={containerVariants}
            className="text-center lg:text-left"
          >
            <motion.div variants={itemVariants} className="mb-4">
              {editable ? (
                <input
                  type="text"
                  value={homeData.greeting}
                  onChange={(e) => handleChange('greeting', e.target.value)}
                  className="text-lg md:text-xl text-cyan-400 bg-transparent border-b border-cyan-400/50"
                />
              ) : (
                <p className="text-lg md:text-xl text-cyan-400">
                  {homeData.greeting}
                </p>
              )}
            </motion.div>
            
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl relative font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
              variants={itemVariants}
            >
              {editable ? (
                <input
                  type="text"
                  value={homeData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="bg-transparent border-b border-white/50 w-full"
                />
              ) : (
                homeData.name
              )}
            </motion.h1>
            
            <motion.div
              className="text-xl sm:text-2xl md:text-3xl font-semibold mb-8 h-12"
              variants={itemVariants}
            >
              {editable ? (
                <div className="space-y-2">
                  {homeData.roles.map((role, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={role}
                        onChange={(e) => {
                          const newRoles = [...homeData.roles];
                          newRoles[index] = e.target.value;
                          handleChange('roles', newRoles);
                        }}
                        className="bg-transparent border-b border-white/30 text-white w-full"
                      />
                      <button 
                        onClick={() => {
                          const newRoles = [...homeData.roles];
                          newRoles.splice(index, 1);
                          handleChange('roles', newRoles);
                        }}
                        className="text-red-400 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => handleChange('roles', [...homeData.roles, ''])}
                    className="text-cyan-400 text-sm"
                  >
                    + Add Role
                  </button>
                </div>
              ) : (
                <TypeAnimation
                  sequence={homeData.roles.flatMap(role => [role, 1000])}
                  wrapper="span"
                  cursor={true}
                  repeat={Infinity}
                  className="text-white"
                />
              )}
            </motion.div>
            
            <motion.div variants={itemVariants} className="mb-10 max-w-lg mx-auto lg:mx-0">
              {editable ? (
                <textarea
                  value={homeData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  className="text-gray-300 text-base md:text-lg bg-transparent border border-white/30 rounded p-2 w-full"
                  rows="3"
                />
              ) : (
                <p className="text-gray-300 text-base md:text-lg">
                  {homeData.description}
                </p>
              )}
            </motion.div>
            
            {/* Buttons */}
            <motion.div
              className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8"
              variants={itemVariants}
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(34, 211, 238, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                onClick={handleContactClick}
                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-medium text-white flex items-center gap-2"
              >
                <FiPhone />
                {editable ? (
                  <input
                    type="text"
                    value={homeData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="bg-transparent border-b border-white/50 w-32"
                  />
                ) : (
                  "Contact Me"
                )}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleResumeDownload}
                className="px-8 py-3 border border-cyan-400 text-cyan-400 rounded-lg font-medium flex items-center gap-2"
              >
                <FiDownload />
                {editable ? (
                  <input
                    type="text"
                    value={homeData.resumeUrl}
                    onChange={(e) => handleChange('resumeUrl', e.target.value)}
                    className="bg-transparent border-b border-cyan-400/50 w-32"
                  />
                ) : (
                  "My Resume"
                )}
              </motion.button>
            </motion.div>

            {/* Tech stack - Mobile only */}
            <motion.div
              className="lg:hidden mt-8"
              variants={itemVariants}
            >
              <h3 className="text-xl font-semibold text-white mb-4 text-center">My Tech Stack</h3>
              <div className="grid grid-cols-3 gap-3">
                {homeData.techStack.map((tech, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center justify-center p-3 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-cyan-400/30"
                  >
                    {editable ? (
                      <div className="w-full space-y-1">
                        <div className="text-2xl mb-1 flex justify-center">
                          {tech.icon}
                        </div>
                        <input
                          type="text"
                          value={tech.name}
                          onChange={(e) => handleTechStackChange(index, 'name', e.target.value)}
                          className="text-xs text-gray-300 bg-transparent border-b border-white/30 w-full text-center"
                        />
                      </div>
                    ) : (
                      <>
                        <span className="text-2xl mb-1">{tech.icon}</span>
                        <span className="text-xs text-gray-300">{tech.name}</span>
                      </>
                    )}
                  </motion.div>
                ))}
                {editable && (
                  <button
                    onClick={() => handleChange('techStack', [...homeData.techStack, { icon: <div className="text-2xl">+</div>, name: '' }])}
                    className="flex flex-col items-center justify-center p-3 bg-gray-800/20 rounded-lg border border-dashed border-gray-600 hover:border-cyan-400/30"
                  >
                    <span className="text-2xl mb-1 text-gray-400">+</span>
                    <span className="text-xs text-gray-400">Add Tech</span>
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ 
          y: [0, 10, 0],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-2 bg-cyan-400 rounded-full mt-2"
            animate={{ 
              y: [0, 4, 0],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HomeSection;