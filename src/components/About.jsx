/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FaCode, FaGamepad, FaMusic, FaCamera, FaBook, FaLaptopCode, FaServer, FaPalette, FaMobile } from "react-icons/fa";
import { SiThreedotjs } from "react-icons/si";
import { useState } from "react";
import { useInView } from "react-intersection-observer";


const About = ({ editable, onUpdate }) => {
 const [aboutData, setAboutData] = useState({
  name: "Rushabh Dhondge",
  title: "Full Stack Developer (Student)",
  description: "I am a B.Sc. Computer Science student and aspiring Full Stack Developer with a passion for building functional and user-friendly applications. I also make use of AI tools like ChatGPT and GitHub Copilot to speed up coding, debugging, and learning new technologies.",
  quote: "Passionate about learning and building meaningful digital experiences.",
  hobbies: [
    { icon: <FaCode size={24} />, name: "Coding" },
    { icon: <FaGamepad size={24} />, name: "Gaming" },
    { icon: <FaMusic size={24} />, name: "Music" },
    { icon: <FaCamera size={24} />, name: "Photography" },
    { icon: <FaBook size={24} />, name: "Reading" },
  ],
  skills: [
    { icon: <FaLaptopCode className="text-blue-400" />, name: "Frontend", tech: "HTML, CSS, JavaScript, React, Tailwind" },
    { icon: <FaServer className="text-green-400" />, name: "Backend", tech: "Node.js, Python (basics), Java (academic)" },
    { icon: <FaPalette className="text-purple-400" />, name: "Design", tech: "Figma, Canva, Basic UI/UX" },
    { icon: <FaCode className="text-pink-400" />, name: "AI Tools", tech: "ChatGPT, GitHub Copilot" },
  ],
  technologies: [
    "JavaScript", "React.js", "Node.js", "Tailwind CSS", "MySQL", "UI/UX Design"
  ]
});


  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  const handleChange = (field, value) => {
    const updatedData = {...aboutData, [field]: value};
    setAboutData(updatedData);
    if (onUpdate) onUpdate('about', updatedData);
  };

  const handleHobbyChange = (index, field, value) => {
    const updatedHobbies = [...aboutData.hobbies];
    updatedHobbies[index][field] = value;
    handleChange('hobbies', updatedHobbies);
  };

  const handleSkillChange = (index, field, value) => {
    const updatedSkills = [...aboutData.skills];
    updatedSkills[index][field] = value;
    handleChange('skills', updatedSkills);
  };

  const handleTechChange = (index, value) => {
    const updatedTech = [...aboutData.technologies];
    updatedTech[index] = value;
    handleChange('technologies', updatedTech);
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

  const bubbleVariants = {
    float: {
      x: [0, Math.random() * 100 - 50],
      y: [0, Math.random() * 100 - 50],
      transition: {
        duration: Math.random() * 10 + 10,
        repeat: Infinity,
        repeatType: "reverse",
      }
    }
  };

  return (
    <section 
      id="about" 
      className="relative py-20 min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800"
      ref={ref}
    >
      {/* Floating tech bubbles */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            variants={bubbleVariants}
            animate="float"
            className="absolute rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
        <motion.div 
          className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Profile Picture */}
          <motion.div 
            className="order-first lg:order-last flex flex-col items-center gap-8 mb-12 lg:mb-0"
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden border-2 border-cyan-400/30 shadow-lg shadow-cyan-500/20"
            >
              <img
                src="prf.jpg"
                alt={aboutData.name}
                className="w-full h-full object-cover"
              />
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6"
              >
                {editable ? (
                  <input
                    type="text"
                    value={aboutData.quote}
                    onChange={(e) => handleChange('quote', e.target.value)}
                    className="text-white font-medium bg-transparent border-b border-white/50 w-full"
                  />
                ) : (
                  <motion.p className="text-white font-medium">
                    "{aboutData.quote}"
                  </motion.p>
                )}
              </motion.div>
            </motion.div>

            {/* Hobbies Section */}
            <motion.div 
              className="w-full space-y-4"
              variants={itemVariants}
            >
              <h4 className="text-xl font-semibold text-white mb-4 text-center">
                My Hobbies & Interests
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {aboutData.hobbies.map((hobby, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center justify-center p-3 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-cyan-400/30 hover:shadow-md transition-all"
                  >
                    {editable ? (
                      <div className="w-full space-y-1">
                        <div className="text-2xl mb-1 flex justify-center text-cyan-400">
                          {hobby.icon}
                        </div>
                        <input
                          type="text"
                          value={hobby.name}
                          onChange={(e) => handleHobbyChange(index, 'name', e.target.value)}
                          className="text-xs text-gray-300 bg-transparent border-b border-gray-600/30 w-full text-center"
                        />
                      </div>
                    ) : (
                      <>
                        <span className="text-2xl mb-1 text-cyan-400">{hobby.icon}</span>
                        <span className="text-xs text-gray-300">{hobby.name}</span>
                      </>
                    )}
                  </motion.div>
                ))}
                {editable && (
                  <button
                    onClick={() => handleChange('hobbies', [...aboutData.hobbies, { icon: <div className="text-2xl">+</div>, name: '' }])}
                    className="flex flex-col items-center justify-center p-3 bg-gray-800/20 rounded-lg border border-dashed border-gray-600 hover:border-cyan-400/30 hover:shadow-md transition-all"
                  >
                    <span className="text-2xl mb-1 text-gray-400">+</span>
                    <span className="text-xs text-gray-400">Add Hobby</span>
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* About Content */}
          <motion.div
            variants={containerVariants}
            className="text-center lg:text-left"
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl sm:text-5xl font-bold mb-12 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
            >
              About Me
            </motion.h2>

            <motion.div variants={itemVariants} className="mb-8">
              {editable ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={aboutData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="text-cyan-400 font-semibold text-lg bg-transparent border-b border-cyan-400/50 w-full"
                  />
                  <textarea
                    value={aboutData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    className="text-gray-300 text-lg bg-transparent border border-white/30 rounded p-2 w-full"
                    rows="3"
                  />
                </div>
              ) : (
                <p className="text-gray-300 text-lg">
                  Hi, I'm <span className="text-cyan-400 font-semibold">{aboutData.name}</span>, {aboutData.description}
                </p>
              )}
            </motion.div>

            <motion.div variants={itemVariants} className="pt-4">
              <h4 className="text-xl font-semibold text-white mb-4">
                My Skills & Expertise
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {aboutData.skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-cyan-400/30 transition-all"
                  >
                    {editable ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">{skill.icon}</span>
                          <input
                            type="text"
                            value={skill.name}
                            onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                            className="text-white font-medium bg-transparent border-b border-white/50"
                          />
                        </div>
                        <input
                          type="text"
                          value={skill.tech}
                          onChange={(e) => handleSkillChange(index, 'tech', e.target.value)}
                          className="text-gray-400 text-sm bg-transparent border-b border-white/30 w-full"
                        />
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">{skill.icon}</span>
                          <span className="text-white font-medium">{skill.name}</span>
                        </div>
                        <p className="text-gray-400 text-sm">{skill.tech}</p>
                      </>
                    )}
                  </motion.div>
                ))}
                {editable && (
                  <button
                    onClick={() => handleChange('skills', [...aboutData.skills, { icon: <div className="text-2xl">+</div>, name: '', tech: '' }])}
                    className="p-4 bg-gray-800/20 rounded-lg border border-dashed border-gray-600 hover:border-cyan-400/30 transition-all flex flex-col items-center justify-center"
                  >
                    <span className="text-gray-400">Add Skill</span>
                  </button>
                )}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-4">
              <h4 className="text-xl font-semibold text-white mb-4">
                What I'm Working With
              </h4>
              <motion.div variants={itemVariants}>
                {editable ? (
                  <div className="space-y-2">
                    {aboutData.technologies.map((tech, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={tech}
                          onChange={(e) => handleTechChange(index, e.target.value)}
                          className="text-cyan-400 font-semibold text-xl bg-transparent border-b border-cyan-400/50 w-full"
                        />
                        <button 
                          onClick={() => {
                            const newTech = [...aboutData.technologies];
                            newTech.splice(index, 1);
                            handleChange('technologies', newTech);
                          }}
                          className="text-red-400 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => handleChange('technologies', [...aboutData.technologies, ''])}
                      className="text-cyan-400 text-sm"
                    >
                      + Add Technology
                    </button>
                  </div>
                ) : (
                  <TypeAnimation
                    sequence={aboutData.technologies.flatMap(tech => [tech, 1000])}
                    wrapper="span"
                    cursor={true}
                    repeat={Infinity}
                    className="text-cyan-400 font-semibold text-xl"
                  />
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;