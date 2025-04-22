"use client"

import { useState, useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
import { useTheme } from "./theme-provider"
import Link from "next/link"
import Logo from "./logo"
import { motion, AnimatePresence } from "framer-motion"
import {
  Menu,
  X,
  Moon,
  Sun,
  ChevronDown,
  ChevronRight,
  Home,
  User,
  Briefcase,
  Code,
  Layout,
  Award,
  Mail,
  BookOpen,
  Layers,
  Calendar,
} from "lucide-react"

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const langMenuRef = useRef<HTMLDivElement>(null)

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
    localStorage.setItem("language", lang)
    setIsLangMenuOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }

      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const navLinks = [
    { href: "#home", label: t("nav.home"), icon: <Home size={18} /> },
    { href: "#about", label: t("nav.about"), icon: <User size={18} /> },
    { href: "#experience", label: t("nav.experience"), icon: <Briefcase size={18} /> },
    { href: "#skills", label: t("nav.skills"), icon: <Code size={18} /> },
    { href: "#projects", label: t("nav.projects"), icon: <Layout size={18} /> },
    { href: "#certifications", label: t("nav.certifications"), icon: <Award size={18} /> },
    { href: "/services", label: t("nav.services"), icon: <Layers size={18} /> },
    { href: "/blog", label: t("nav.blog"), icon: <BookOpen size={18} /> },
    { href: "/booking", label: t("nav.booking"), icon: <Calendar size={18} /> },
    { href: "#contact", label: t("nav.contact"), icon: <Mail size={18} /> },
  ]

  // Animation variants
  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.05,
        staggerDirection: 1,
      },
    },
  }

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 },
  }

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled || isMenuOpen ? "bg-white/95 dark:bg-[#0B1120]/95 shadow-md backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center z-20">
          <Logo size={40} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-dark-highlight transition-colors text-sm font-medium ${
                scrolled ? "" : "text-white dark:text-white hover:text-white/80 dark:hover:text-white/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <div className="relative" ref={langMenuRef}>
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                scrolled
                  ? "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-secondary"
                  : "text-white dark:text-white hover:bg-white/10"
              }`}
            >
              {i18n.language === "en" ? (
                <span className="flex items-center">
                  🇬🇧 English <ChevronDown size={16} className="ml-1" />
                </span>
              ) : (
                <span className="flex items-center">
                  🇫🇷 Français <ChevronDown size={16} className="ml-1" />
                </span>
              )}
            </button>

            <AnimatePresence>
              {isLangMenuOpen && (
                <motion.div
                  className="absolute right-0 mt-2 w-40 bg-white dark:bg-dark-secondary rounded-md shadow-lg overflow-hidden z-50"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="py-1">
                    <button
                      onClick={() => changeLanguage("en")}
                      className={`flex items-center w-full px-4 py-2 text-sm ${
                        i18n.language === "en"
                          ? "bg-gray-100 dark:bg-dark-primary text-primary dark:text-dark-highlight"
                          : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-primary"
                      }`}
                    >
                      🇬🇧 English
                    </button>
                    <button
                      onClick={() => changeLanguage("fr")}
                      className={`flex items-center w-full px-4 py-2 text-sm ${
                        i18n.language === "fr"
                          ? "bg-gray-100 dark:bg-dark-primary text-primary dark:text-dark-highlight"
                          : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-primary"
                      }`}
                    >
                      🇫🇷 Français
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors ${
              scrolled
                ? "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-secondary"
                : "text-white dark:text-white hover:bg-white/10"
            }`}
            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-4 z-20">
          <div className="relative" ref={langMenuRef}>
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className={`flex items-center p-2 ${
                scrolled || isMenuOpen ? "text-gray-700 dark:text-gray-200" : "text-white dark:text-white"
              }`}
            >
              {i18n.language === "en" ? "🇬🇧" : "🇫🇷"}
            </button>

            <AnimatePresence>
              {isLangMenuOpen && (
                <motion.div
                  className="absolute right-0 mt-2 w-32 bg-white dark:bg-dark-secondary rounded-md shadow-lg overflow-hidden z-50"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="py-1">
                    <button
                      onClick={() => changeLanguage("en")}
                      className={`flex items-center w-full px-4 py-2 text-sm ${
                        i18n.language === "en"
                          ? "bg-gray-100 dark:bg-dark-primary text-primary dark:text-dark-highlight"
                          : "text-gray-700 dark:text-gray-200"
                      }`}
                    >
                      🇬🇧 English
                    </button>
                    <button
                      onClick={() => changeLanguage("fr")}
                      className={`flex items-center w-full px-4 py-2 text-sm ${
                        i18n.language === "fr"
                          ? "bg-gray-100 dark:bg-dark-primary text-primary dark:text-dark-highlight"
                          : "text-gray-700 dark:text-gray-200"
                      }`}
                    >
                      🇫🇷 Français
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={toggleTheme}
            className={`p-2 ${
              scrolled || isMenuOpen ? "text-gray-700 dark:text-gray-200" : "text-white dark:text-white"
            }`}
            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`p-2 ${
              scrolled || isMenuOpen ? "text-gray-700 dark:text-gray-200" : "text-white dark:text-white"
            }`}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <motion.div
              animate={isMenuOpen ? "open" : "closed"}
              variants={{
                open: { rotate: 180 },
                closed: { rotate: 0 },
              }}
              transition={{ duration: 0.3 }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={menuRef}
            className="md:hidden bg-white dark:bg-[#0B1120] shadow-lg fixed inset-0 top-[60px] z-10 overflow-hidden"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="container mx-auto px-4 py-8 h-full overflow-y-auto">
              <motion.div className="flex flex-col space-y-2">
                {navLinks.map((link, index) => (
                  <motion.div key={link.href} variants={itemVariants}>
                    <Link
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center py-3 px-4 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-secondary/50 rounded-lg transition-colors"
                    >
                      <span className="mr-3 text-primary dark:text-dark-highlight">{link.icon}</span>
                      <span className="font-medium">{link.label}</span>
                      <ChevronRight size={16} className="ml-auto text-gray-400" />
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800" variants={itemVariants}>
                <div className="flex flex-col space-y-4">
                  <a
                    href="https://github.com/Medhaddadi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center py-3 px-4 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-secondary/50 rounded-lg transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-3 text-primary dark:text-dark-highlight"
                    >
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                    <span className="font-medium">GitHub</span>
                    <ChevronRight size={16} className="ml-auto text-gray-400" />
                  </a>

                  <a
                    href="https://linkedin.com/in/mohamed-el-haddadi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center py-3 px-4 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-secondary/50 rounded-lg transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-3 text-primary dark:text-dark-highlight"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                    <span className="font-medium">LinkedIn</span>
                    <ChevronRight size={16} className="ml-auto text-gray-400" />
                  </a>
                </div>
              </motion.div>

              <motion.div
                className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center"
                variants={itemVariants}
              >
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  &copy; {new Date().getFullYear()} Mohamed El Haddadi
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
