"use client"

import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import Link from "next/link"
import CVDownloadButton from "./cv-download-button"
import { ArrowDown, Calendar } from "lucide-react"

export default function HeroSection() {
  const { t } = useTranslation()

  // Animation variants for the text reveal effect
  const titleVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: 0.5 + i * 0.1,
        duration: 0.8,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    }),
  }

  // Split text animation helper
  const AnimatedText = ({ text, className }: { text: string; className: string }) => {
    return (
      <span className="inline-block overflow-hidden">
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            custom={index}
            variants={titleVariants}
            initial="hidden"
            animate="visible"
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </span>
    )
  }

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-blue-600/90 dark:from-[#0B1120]/95 dark:to-dark-highlight/40 z-0"></div>

      <div className="container mx-auto px-4 z-10 py-20">
        <div className="max-w-3xl mx-auto text-center text-white">
          <motion.p
            className="text-xl mb-2 text-white/90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t("hero.greeting")}
          </motion.p>

          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Mohamed El Haddadi
          </motion.h1>

          <div className="relative h-16 mb-6 overflow-hidden">
            <motion.div
              className="absolute w-full"
              initial={{ y: 0 }}
              animate={{ y: [0, -60, -60, 0] }}
              transition={{
                duration: 6,
                times: [0, 0.3, 0.7, 1],
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 1,
              }}
            >
              <h2 className="text-3xl md:text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200 dark:from-white dark:to-dark-highlight">
                {t("hero.title")}
              </h2>
            </motion.div>
            <motion.div
              className="absolute w-full"
              initial={{ y: 60 }}
              animate={{ y: [60, 0, 0, 60] }}
              transition={{
                duration: 6,
                times: [0, 0.3, 0.7, 1],
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 1,
              }}
            >
              <h2 className="text-3xl md:text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200 dark:from-white dark:to-dark-highlight">
                {t("hero.secondTitle")}
              </h2>
            </motion.div>
          </div>

          <motion.p
            className="text-xl mb-8 max-w-2xl mx-auto text-white/80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {t("hero.description")}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <CVDownloadButton />

            <Link
              href="#contact"
              className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-md transition-colors flex items-center"
            >
              {t("hero.contactMe")}
            </Link>

            <Link
              href="/booking"
              className="px-6 py-3 bg-white hover:bg-white/90 text-primary dark:text-dark-highlight rounded-md transition-colors flex items-center"
            >
              <Calendar size={18} className="mr-2" />
              {t("nav.booking")}
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute w-96 h-96 rounded-full bg-white/5 -top-20 -left-20 animate-blob"></div>
        <div className="absolute w-96 h-96 rounded-full bg-white/5 top-1/3 -right-20 animate-blob animation-delay-2000"></div>
        <div className="absolute w-96 h-96 rounded-full bg-white/5 bottom-0 left-1/3 animate-blob animation-delay-4000"></div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
      >
        <span className="text-white/70 text-sm mb-2">{t("hero.scrollDown")}</span>
        <ArrowDown className="w-5 h-5 text-white/70" />
      </motion.div>
    </section>
  )
}
