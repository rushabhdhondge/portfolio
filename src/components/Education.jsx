import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { FaGraduationCap, FaSchool, FaUniversity, FaCertificate, FaArrowRight, FaExternalLinkAlt, FaDownload, FaAward, FaTimes } from "react-icons/fa";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";

const Education = () => {
  const [educationData] = useState([
    {
      id: 3,
      level: "Bachelor of Science (Computer Science)",
      institution: "Rajarshi Shahu Mahavidyalaya, Latur",
      year: "2022 - 2025 (Pursuing)",
      percentage: "Currently in 3rd Year",
      icon: <FaUniversity className="text-purple-400" />,
      color: "from-purple-600 via-blue-600 to-indigo-700",
      achievements: [
        "Specializing in Software Development",
        "Learning Full Stack Development",
        "Building Real-world Projects",
        "Active in Coding Communities"
      ],
      certificates: [
        {
          id: "degree-1",
          name: "Web Development Fundamentals",
          institution: "Coding Academy",
          year: "2023",
          type: "image",
          url: "/cert1.jpg", // Fixed path
          description: "Certificate for completing web development course"
        }
      ],
      status: "pursuing"
    },
    {
      id: 2,
      level: "Higher Secondary (12th Science - PCB)",
      institution: "Sanjeevanee Mahavidyalaya, Chapoli",
      year: "2020 - 2022",
      percentage: "74.17%",
      icon: <FaGraduationCap className="text-blue-400" />,
      color: "from-green-600 via-teal-600 to-cyan-700",
      achievements: [
        "Science Stream with Biology",
        "Class Monitor for 2 years",
        "Active participant in gatherings and events",
        "Participated in science exhibitions"
      ],
      certificates: [
        {
          id: "hsc-1",
          name: "Biology Olympiad",
          institution: "National Biology Association",
          year: "2021",
          type: "image",
          url: "/cert3.jpg", // Fixed path
          description: "State level biology competition winner"
        },
        {
          id: "hsc-2",
          name: "Academic Excellence",
          institution: "State Education Department",
          year: "2022",
          type: "pdf",
          url: "/cert4.pdf", // Fixed path
          description: "Award for overall academic performance"
        }
      ],
      status: "completed"
    },
    {
      id: 1,
      level: "Secondary Education (10th)",
      institution: "Bhai Kishanrao Deshmukh Vidyalaya, Chakur",
      year: "2015 - 2020",
      percentage: "88%",
      icon: <FaSchool className="text-yellow-400" />,
      color: "from-amber-600 via-orange-600 to-red-700",
      achievements: [
        "School Topper in Mathematics",
        "Active in Sports Activities",
        "Participated in Science Projects",
        "Member of Student Council"
      ],
      certificates: [
        {
          id: "ssc-1",
          name: "Science Olympiad Winner",
          institution: "National Science Foundation",
          year: "2018",
          type: "image",
          url: "/cert1.jpg", // Fixed path
          description: "Awarded for excellence in National Science Olympiad"
        },
        {
          id: "ssc-2",
          name: "Mathematics Excellence",
          institution: "State Education Board",
          year: "2019",
          type: "image",
          url: "/cert2.jpg", // Fixed path
          description: "Certificate for topping mathematics in district level"
        }
      ],
      status: "completed"
    },
  ].sort((a, b) => b.id - a.id));

  // Certificate categories
  const [certificateCategories] = useState([
    {
      id: "programming",
      name: "Programming Languages",
      icon: <FaCertificate className="text-orange-500" />,
      certificates: [
        {
          id: "prog-1",
          name: "C Programming",
          institution: "BECIL Skillzway Technology Certification",
          year: "2023",
          type: "image",
          url: "/cer1.png", // Fixed path - directly using string
          description: "Advanced C programming concepts and applications"
        },
        {
          id: "prog-2",
          name: "C++ Programming",
          institution:  "BECIL Skillzway Technology Certification",
          year: "2023",
          type: "image",
          url: "/cer4.png", // Fixed path - directly using string
          description: "Professional C++ developer certification"
        },
        {
          id: "prog-3",
          name: "React.js Specialist",
          institution: "Frontend Masters",
          year: "2023",
          type: "image",
          url: "/cer3.png", // Fixed path - directly using string
          description: "React.js framework mastery certification"
        }


      
      ]
    }
  ]);

  const [activeTab, setActiveTab] = useState("education");
  const [particles, setParticles] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    setParticles(
      Array.from({ length: 20 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 8,
      }))
    );
  }, []);

  const EducationSphere = ({ position, color }) => (
    <Sphere position={position} args={[0.15, 32, 32]}>
      <meshStandardMaterial 
        color={color} 
        emissive={color}
        emissiveIntensity={0.6}
        metalness={0.9}
        roughness={0.1}
      />
    </Sphere>
  );

  // Get all certificates from categories
  const allCategoryCertificates = certificateCategories.flatMap(cat => 
    cat.certificates.map(cert => ({
      ...cert,
      category: cat.name
    }))
  );

  // Filter certificates by category
  const filteredCertificates = activeCategory === "all" 
    ? allCategoryCertificates
    : allCategoryCertificates.filter(cert => 
        certificateCategories.find(cat => cat.id === activeCategory)?.certificates.includes(cert)
      );

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1 },
    expanded: { scale: 1.02, zIndex: 10 }
  };

  const contentVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto" }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <section id="education" className="relative min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 text-gray-900 dark:text-white p-4 sm:p-8 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating particles */}
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{
              y: [particle.y, particle.y - 40, particle.y],
              x: [particle.x, particle.x + (Math.random() * 20 - 10), particle.x],
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute rounded-full bg-gradient-to-r from-blue-400/30 to-purple-400/30 dark:from-blue-600/40 dark:to-purple-600/40"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
          />
        ))}

        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>

        {/* Floating 3D Spheres */}
        <div className="absolute inset-0 opacity-15">
          <Canvas>
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1.5} />
            <EducationSphere position={[-3, 2, 0]} color="#6366f1" />
            <EducationSphere position={[4, -1, 0]} color="#3b82f6" />
            <EducationSphere position={[2, 4, 0]} color="#8b5cf6" />
            <EducationSphere position={[-2, -3, 0]} color="#ec4899" />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
          </Canvas>
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 text-center mb-12"
        >
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Education Journey
          </motion.h2>
          
          <motion.div
            className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-full mx-auto w-48"
            initial={{ width: 0 }}
            whileInView={{ width: "12rem" }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          />

          {/* Tab Navigation */}
          <motion.div 
            className="flex justify-center mt-12 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div className="bg-white/80 dark:bg-black/50 backdrop-blur-xl rounded-2xl p-1.5 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
              <button
                onClick={() => setActiveTab("education")}
                className={`px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeTab === "education"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
              >
                Education
              </button>
              <button
                onClick={() => setActiveTab("certifications")}
                className={`px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeTab === "certifications"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
              >
                Certifications
              </button>
            </div>
          </motion.div>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === "education" ? (
            /* Education Cards Grid */
            <motion.div
              key="education"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 px-4"
            >
              {educationData.map((edu, index) => (
                <motion.div
                  key={edu.id}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover={expandedCard === edu.id ? "expanded" : { scale: 1.03 }}
                  animate={expandedCard === edu.id ? "expanded" : ""}
                  onHoverStart={() => setHoveredCard(edu.id)}
                  onHoverEnd={() => setHoveredCard(null)}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className={`relative cursor-pointer group ${
                    expandedCard === edu.id ? "fixed inset-0 z-50 flex items-center justify-center" : ""
                  }`}
                  onClick={() => setExpandedCard(expandedCard === edu.id ? null : edu.id)}
                >
                  {/* Main Card */}
                  <motion.div
                    className={`relative w-full min-h-[320px] p-6 rounded-2xl bg-gradient-to-br ${edu.color} shadow-2xl flex flex-col justify-between backdrop-blur-md border-2 border-white/20 transition-all duration-500 ${
                      expandedCard === edu.id 
                        ? "w-full max-w-2xl h-auto mx-4" 
                        : "hover:shadow-3xl hover:border-white/30"
                    }`}
                    layout
                  >
                    {/* Status Ribbon */}
                    <motion.div 
                      className="absolute -top-2 -right-2"
                      whileHover={{ rotate: 5 }}
                    >
                      <span className={`px-4 py-1.5 rounded-full text-xs font-bold shadow-lg ${
                        edu.status === "pursuing" 
                          ? "bg-yellow-500/90 text-yellow-100 border-2 border-yellow-300/50" 
                          : "bg-green-500/90 text-green-100 border-2 border-green-300/50"
                      }`}>
                        {edu.status === "pursuing" ? "🎓 Pursuing" : "✅ Completed"}
                      </span>
                    </motion.div>

                    {/* Header Section */}
                    <div className="flex items-start gap-4 mb-6">
                      <motion.div 
                        className="text-3xl bg-white/20 p-3 rounded-xl backdrop-blur-sm"
                        whileHover={{ rotate: 5, scale: 1.1 }}
                      >
                        {edu.icon}
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white leading-tight mb-2">
                          {edu.level}
                        </h3>
                        <p className="text-white/90 font-semibold text-sm">
                          {edu.institution}
                        </p>
                      </div>
                    </div>

                    {/* Basic Info */}
                    <div className="space-y-3 mb-6">
                      <motion.p 
                        className="text-sm bg-white/15 px-4 py-2 rounded-xl text-white/95 font-medium inline-block"
                        whileHover={{ scale: 1.05 }}
                      >
                        {edu.year}
                      </motion.p>
                      <motion.p 
                        className="text-white font-bold text-lg bg-black/25 px-5 py-3 rounded-xl shadow-inner"
                        whileHover={{ scale: 1.02 }}
                      >
                        {edu.percentage}
                      </motion.p>
                    </div>

                    {/* Expandable Content */}
                    <AnimatePresence>
                      {expandedCard === edu.id && (
                        <motion.div
                          variants={contentVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          transition={{ duration: 0.4 }}
                          className="overflow-hidden"
                        >
                          {/* Achievements */}
                          <div className="mb-6 pt-4 border-t border-white/30">
                            <h4 className="text-sm font-semibold mb-4 text-white/95 flex items-center gap-2">
                              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                              Key Highlights
                            </h4>
                            <ul className="space-y-2.5">
                              {edu.achievements.map((achievement, i) => (
                                <motion.li
                                  key={i}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.1 }}
                                  className="flex items-start gap-3 text-sm text-white/90"
                                >
                                  <span className="text-blue-300 mt-1.5 text-xs">▸</span>
                                  <span>{achievement}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>

                          {/* View Certificates Button */}
                          {edu.certificates.length > 0 && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveTab("certifications");
                              }}
                              className="w-full bg-white/20 hover:bg-white/30 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 mb-4"
                            >
                              <FaCertificate className="text-yellow-300" />
                              View Certificates ({edu.certificates.length})
                              <FaArrowRight className="text-sm" />
                            </motion.button>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Expand/Collapse Hint */}
                    {expandedCard !== edu.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredCard === edu.id ? 1 : 0.7 }}
                        className="text-center pt-4 border-t border-white/20"
                      >
                        <span className="text-white/80 text-xs font-medium">
                          Click to {expandedCard === edu.id ? 'collapse' : 'expand'}
                        </span>
                      </motion.div>
                    )}

                    {/* Close button for expanded view */}
                    {expandedCard === edu.id && (
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedCard(null);
                        }}
                        className="absolute top-4 left-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white/90 hover:text-white transition-colors"
                      >
                        ×
                      </motion.button>
                    )}
                  </motion.div>

                  {/* Backdrop for expanded card */}
                  {expandedCard === edu.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.8 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 bg-black/80 backdrop-blur-sm -z-10"
                      onClick={() => setExpandedCard(null)}
                    />
                  )}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* Certifications Section */
            <motion.div
              key="certifications"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white/80 dark:bg-black/60 backdrop-blur-2xl rounded-3xl p-6 md:p-8 border-2 border-white/30 dark:border-gray-700/50 shadow-2xl"
            >
              {/* Category Filter */}
              <motion.div 
                className="flex flex-wrap justify-center gap-3 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <button
                  onClick={() => setActiveCategory("all")}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    activeCategory === "all"
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 shadow-md"
                  }`}
                >
                  <FaAward className="text-sm" />
                  All Certificates
                </button>
                
                {certificateCategories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                      activeCategory === category.id
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                        : "bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 shadow-md"
                    }`}
                  >
                    {category.icon}
                    {category.name}
                  </button>
                ))}
              </motion.div>

              {filteredCertificates.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCertificates.map((cert, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="bg-white/90 dark:bg-gray-800/80 rounded-2xl p-5 border-2 border-gray-200/50 dark:border-gray-700/50 hover:border-blue-400/50 transition-all duration-300 shadow-lg hover:shadow-xl group cursor-pointer"
                      onClick={() => setSelectedCertificate(cert)}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-xl">
                          <FaCertificate className="text-white text-xl" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 dark:text-white text-sm leading-tight">
                            {cert.name}
                          </h4>
                          <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                            {cert.institution}
                          </p>
                        </div>
                      </div>
                      
                      {cert.type === 'image' ? (
                        <div className="relative overflow-hidden rounded-xl border-2 border-gray-200/30 dark:border-gray-700/30">
                          <img 
                            src={cert.url} 
                            alt={cert.name} 
                            className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      ) : (
                        <div className="w-full h-40 flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-xl border-2 border-gray-200/30 dark:border-gray-700/30 p-4">
                          <div className="text-4xl text-gray-400 dark:text-gray-500 mb-3">
                            {cert.name.endsWith('.pdf') ? '📄' : '📑'}
                          </div>
                          <p className="text-xs text-center text-gray-500 dark:text-gray-400 font-medium">
                            Document File
                          </p>
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center mt-4">
                        <span className="text-xs text-gray-600 dark:text-gray-400 font-medium bg-gray-100 dark:bg-gray-700/50 px-3 py-1.5 rounded-full">
                          {cert.category || "General"}
                        </span>
                        <button className="text-xs px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:shadow-lg transition-all duration-300 flex items-center gap-1.5">
                          View
                          <FaExternalLinkAlt className="text-[10px]" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 p-8 rounded-2xl border-2 border-dashed border-blue-300/50 dark:border-blue-700/50">
                    <FaCertificate className="text-5xl text-blue-400 dark:text-blue-500 mx-auto mb-6 opacity-80" />
                    <div>
                      <div className="card ">
                        {certificateCategories.map((category) => (
                          <div key={category.id} className="mb-4">
                            <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                              {category.name}
                            </h4>
                            <div className="grid grid-cols-2 gap-4">
                              {category.certificates.map((cert) => (
                                <motion.div
                                  key={cert.id}
                                  className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm"
                                >
                                  <div className="h-32">
                                    <img src={cert.url} alt={cert.name} className="w-full h-full object-contain" />
                                  </div>
                                  <div className="p-4">
                                    <h5 className="font-semibold text-gray-800 dark:text-white">
                                      {cert.name}
                                    </h5>
                                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                                      {cert.institution}
                                    </p>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCertificate(null)}
          >
            {/* Backdrop */}
            <motion.div 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            
            {/* Modal Content */}
            <motion.div 
              className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-5 flex justify-between items-center">
                <h3 className="font-bold text-xl text-gray-800 dark:text-white">
                  {selectedCertificate.name}
                </h3>
                <button 
                  onClick={() => setSelectedCertificate(null)}
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
                >
                  <FaTimes />
                </button>
              </div>
              
              {/* Body */}
              <div className="p-6">
                <div className="mb-6">
                  {selectedCertificate.type === 'image' ? (
                    <img 
                      src={selectedCertificate.url} 
                      alt={selectedCertificate.name}
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-700" 
                    />
                  ) : (
                    <div className="w-full h-96 flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl border-2 border-dashed border-blue-200 dark:border-blue-700/50 p-4">
                      <div className="text-8xl text-blue-400 dark:text-blue-500 mb-5">
                        📄
                      </div>
                      <p className="text-lg text-center text-gray-600 dark:text-gray-400 font-medium mb-6">
                        PDF Document Certificate
                      </p>
                      <button className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full flex items-center gap-2 hover:shadow-lg transition-all duration-300">
                        <FaDownload className="text-sm" />
                        Download Certificate
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Issued by</p>
                    <p className="font-medium text-gray-800 dark:text-white">{selectedCertificate.institution}</p>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Year</p>
                    <p className="font-medium text-gray-800 dark:text-white">{selectedCertificate.year}</p>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Type</p>
                    <p className="font-medium text-gray-800 dark:text-white">
                      {selectedCertificate.type === 'image' ? 'Image' : 'PDF Document'}
                    </p>
                  </div>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-xl border border-blue-100 dark:border-blue-700/30">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
                    <FaAward className="text-blue-500" />
                    Description
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    {selectedCertificate.description}
                  </p>
                </div>
              </div>
              
              {/* Footer */}
              <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-5 flex justify-end gap-3">
                <button 
                  onClick={() => setSelectedCertificate(null)}
                  className="px-5 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Close
                </button>
                <button className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full flex items-center gap-2 hover:shadow-lg transition-all duration-300">
                  <FaExternalLinkAlt className="text-sm" />
                  View Full Certificate
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Education;