/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { FaMoon, FaSun, FaStar } from 'react-icons/fa';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { scrollY } = useScroll();
  const scrollTimeout = useRef(null);
  const stars = Array(8).fill(0);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      clearTimeout(scrollTimeout.current);
      setIsScrolling(true);

      // Calculate scroll progress
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress((currentScroll / scrollHeight) * 100);

      const sections = ['home', 'about', 'education', 'projects', 'footer'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }

      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'education', label: 'Education' },
    { id: 'projects', label: 'Projects' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 15 }}
      className={`fixed w-full z-50 ${isScrolling ? 'shadow-2xl bg-gray-900/80' : 'shadow-lg bg-gray-900/70'} backdrop-blur-xl transition-all duration-300 border-b border-gray-700/20`}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {/* Animated stars */}
      <AnimatePresence>
        {darkMode && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {stars.map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  opacity: 0,
                  x: Math.random() * 100,
                  y: Math.random() * 20,
                  scale: Math.random() * 0.5 + 0.5
                }}
                animate={{ 
                  opacity: [0.2, 0.8, 0.2],
                  transition: { 
                    duration: Math.random() * 3 + 2,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }
                }}
                className="absolute text-yellow-300/80"
                style={{
                  fontSize: `${Math.random() * 6 + 4}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
              >
                <FaStar />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <motion.div
            whileHover={{ scale: 1.05, rotateY: 10 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0 flex items-center"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <button 
              onClick={() => scrollToSection('home')}
              className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent flex items-center gap-2"
            >
              <motion.span 
                className="w-8 h-8 rounded-full border-2 border-cyan-400/50 flex items-center justify-center glass-effect"
                whileHover={{ rotateY: 180, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.span 
                  className="text-cyan-400 font-bold"
                  animate={{ 
                    textShadow: darkMode ? '0 0 10px rgba(34, 211, 238, 0.8)' : 'none',
                  }}
                >
                  RD
                </motion.span>
              </motion.span>
              <motion.span 
                className="hidden sm:inline"
                animate={{
                  textShadow: darkMode ? '0 0 8px rgba(34, 211, 238, 0.6)' : 'none'
                }}
              >
                HELLO
              </motion.span>
            </button>
          </motion.div>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <motion.div
                  key={item.id}
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <motion.button
                    onClick={() => scrollToSection(item.id)}
                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 z-10 ${
                      activeSection === item.id
                        ? 'text-cyan-400 glass-effect-active'
                        : 'text-gray-300 hover:text-cyan-400 glass-effect'
                    }`}
                    whileHover={{ 
                      y: -2,
                      textShadow: "0 0 8px rgba(34, 211, 238, 0.6)"
                    }}
                    animate={{
                      textShadow: activeSection === item.id ? "0 0 8px rgba(34, 211, 238, 0.6)" : "none"
                    }}
                  >
                    {item.label}
                    {/* Glassy highlight effect */}
                    {activeSection === item.id && (
                      <motion.span 
                        className="absolute inset-0 bg-cyan-400/10 rounded-lg backdrop-blur-sm"
                        layoutId="glassyActive"
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      />
                    )}
                  </motion.button>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ 
                scale: 1.1,
                rotateY: 20,
                boxShadow: darkMode ? '0 0 15px rgba(234, 179, 8, 0.6)' : '0 0 15px rgba(34, 211, 238, 0.4)'
              }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-300 hover:text-cyan-400 glass-effect"
              aria-label="Toggle dark mode"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {darkMode ? (
                <>
                  <FaSun className="text-yellow-400 relative z-10" />
                  <motion.span 
                    className="absolute inset-0 bg-yellow-400/10 rounded-full backdrop-blur-sm"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  />
                </>
              ) : (
                <FaMoon className="relative z-10" />
              )}
            </motion.button>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-300 hover:text-cyan-400 glass-effect"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon />}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-cyan-400 glass-effect focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Scrolling progress indicator */}
      <motion.div 
        className="h-[2px] bg-gradient-to-r from-cyan-400/80 to-blue-500/80 backdrop-blur-sm"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollProgress / 100 }}
        style={{ originX: 0 }}
      />

      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isMenuOpen ? 1 : 0,
          height: isMenuOpen ? 'auto' : 0,
        }}
        transition={{ duration: 0.3 }}
        className={`md:hidden overflow-hidden ${isMenuOpen ? 'block' : 'hidden'}`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900/80 backdrop-blur-xl border-t border-gray-700/20">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ 
                x: 5,
                backgroundColor: 'rgba(34, 211, 238, 0.1)'
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection(item.id)}
              className={`block w-full text-left px-3 py-3 rounded-lg text-base font-medium relative overflow-hidden ${
                activeSection === item.id
                  ? 'text-cyan-400 glass-effect-active'
                  : 'text-gray-300 hover:text-cyan-400 glass-effect'
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.span 
                  className="absolute inset-0 bg-cyan-400/10 rounded-lg backdrop-blur-sm"
                  layoutId="mobileNavActive"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Add these styles to your global CSS */}
      <style>{`
        .glass-effect {
          backdrop-filter: blur(12px);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
        }
        .glass-effect-active {
          backdrop-filter: blur(12px);
          background: rgba(34, 211, 238, 0.1);
          border: 1px solid rgba(34, 211, 238, 0.2);
          box-shadow: 0 4px 6px rgba(34, 211, 238, 0.1);
        }
        .dark .glass-effect {
          background: rgba(15, 15, 20, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .dark .glass-effect-active {
          background: rgba(34, 211, 238, 0.15);
          border: 1px solid rgba(34, 211, 238, 0.3);
        }
      `}</style>
    </motion.nav>
  );
};

export default Navbar;