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
    const handleScroll = () => setScrolled(window.scrollY > 10)
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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Body scroll lock when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto"
  }, [isMenuOpen])

  const navLinks = [
    { href: "/#home", label: t("nav.home"), icon: <Home size={18} /> },
    { href: "/#about", label: t("nav.about"), icon: <User size={18} /> },
    { href: "/#experience", label: t("nav.experience"), icon: <Briefcase size={18} /> },
    { href: "/#skills", label: t("nav.skills"), icon: <Code size={18} /> },
    { href: "/#projects", label: t("nav.projects"), icon: <Layout size={18} /> },
    { href: "/#certifications", label: t("nav.certifications"), icon: <Award size={18} /> },
    { href: "/services", label: t("nav.services"), icon: <Layers size={18} /> },
    { href: "/blog", label: t("nav.blog"), icon: <BookOpen size={18} /> },
    { href: "/booking", label: t("nav.booking"), icon: <Calendar size={18} /> },
    { href: "/#contact", label: t("nav.contact"), icon: <Mail size={18} /> },
  ]

  const menuVariants = {
    closed: { opacity: 0, height: 0, transition: { duration: 0.3 } },
    open: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
  }

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 },
  }

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled || isMenuOpen ? "bg-white/95 dark:bg-[#0B1120]/95 shadow-md backdrop-blur-sm" : "bg-transparent"}`}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center z-20">
          <Logo size={40} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={`text-sm font-medium transition-colors ${scrolled ? "text-gray-700 dark:text-gray-200" : "text-white dark:text-white"} hover:text-primary dark:hover:text-dark-highlight`}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Lang + Theme + Menu Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Language Toggle */}
          <div className="relative" ref={langMenuRef}>
            <button onClick={() => setIsLangMenuOpen(!isLangMenuOpen)} className={`flex items-center px-3 py-2 rounded-md ${scrolled ? "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-secondary" : "text-white dark:text-white hover:bg-white/10"}`}>
              {i18n.language === "en" ? "🇬🇧 English" : "🇫🇷 Français"} <ChevronDown size={16} className="ml-1" />
            </button>
            <AnimatePresence>
              {isLangMenuOpen && (
                <motion.div className="absolute right-0 mt-2 w-40 bg-white dark:bg-dark-secondary rounded-md shadow-lg z-50" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <div className="py-1">
                    <button onClick={() => changeLanguage("en")} className={`w-full text-left px-4 py-2 text-sm ${i18n.language === "en" ? "bg-gray-100 dark:bg-dark-primary text-primary dark:text-dark-highlight" : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-primary"}`}>🇬🇧 English</button>
                    <button onClick={() => changeLanguage("fr")} className={`w-full text-left px-4 py-2 text-sm ${i18n.language === "fr" ? "bg-gray-100 dark:bg-dark-primary text-primary dark:text-dark-highlight" : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-primary"}`}>🇫🇷 Français</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Theme Toggle */}
          <button onClick={toggleTheme} className={`p-2 rounded-full ${scrolled ? "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-secondary" : "text-white dark:text-white hover:bg-white/10"}`}>
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>

        {/* Mobile Buttons */}
        <div className="flex md:hidden items-center space-x-4 z-20">
          <button onClick={() => setIsLangMenuOpen(!isLangMenuOpen)} className={`${scrolled ? "text-gray-700 dark:text-gray-200" : "text-white dark:text-white"}`}>{i18n.language === "en" ? "🇬🇧" : "🇫🇷"}</button>
          <button onClick={toggleTheme} className={`${scrolled ? "text-gray-700 dark:text-gray-200" : "text-white dark:text-white"}`}>{theme === "light" ? <Moon size={20} /> : <Sun size={20} />}</button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`${scrolled ? "text-gray-700 dark:text-gray-200" : "text-white dark:text-white"}`}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div ref={menuRef} className="md:hidden fixed top-0 left-0 w-full h-screen bg-white dark:bg-[#0B1120] z-[9999] overflow-y-auto px-4 py-8" initial="closed" animate="open" exit="closed" variants={menuVariants}>
            <motion.div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <motion.div key={link.href} variants={itemVariants}>
                  <Link href={link.href} onClick={() => setIsMenuOpen(false)} className="flex items-center py-3 px-4 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-secondary/50 rounded-lg">
                    <span className="mr-3 text-primary dark:text-dark-highlight">{link.icon}</span>
                    <span className="font-medium">{link.label}</span>
                    <ChevronRight size={16} className="ml-auto text-gray-400" />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
