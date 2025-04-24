"use client"

import { useState, useRef, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { ExternalLink, ChevronLeft, ChevronRight, Star } from "lucide-react"

interface Certification {
  title: string
  organization: string
  date: string
  certId: string
  imageUrl: string
  link: string
}

interface CertificationsProps {
  certifications: Certification[]
}

export default function Certifications({ certifications }: CertificationsProps) {
  const { t } = useTranslation()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleItems, setVisibleItems] = useState(3)
  const [activeTab, setActiveTab] = useState("certificates") // "certificates" or "badges"
  const containerRef = useRef<HTMLDivElement>(null)

  // Determine how many items to show based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1)
      } else if (window.innerWidth < 1024) {
        setVisibleItems(2)
      } else {
        setVisibleItems(3)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + visibleItems >= certifications.length ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex <= 0 ? Math.max(0, certifications.length - visibleItems) : prevIndex - 1))
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  // HackerRank badges data
  const hackerRankBadges = [
    { name: "Problem Solving", stars: 2, icon: "/certificates/badges/problem-solving.png" },
    { name: "Java", stars: 3, icon: "/certificates/badges/java.png" },
    { name: "Python", stars: 2, icon: "/certificates/badges/python.png" },
    { name: "C language", stars: 2, icon: "/certificates/badges/c.png" },
  ]

  return (
    <section id="certifications" className="py-20 bg-white dark:bg-[#0B1120]">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {t("certifications.title")}
        </motion.h2>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-gray-100 dark:bg-dark-secondary/50 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab("certificates")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "certificates"
                  ? "bg-white dark:bg-dark-secondary text-primary dark:text-dark-highlight shadow-sm"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
              }`}
            >
              {t("certifications.certificates") || "Certificates"}
            </button>
            <button
              onClick={() => setActiveTab("badges")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "badges"
                  ? "bg-white dark:bg-dark-secondary text-primary dark:text-dark-highlight shadow-sm"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
              }`}
            >
              {t("certifications.badges") || "Badges"}
            </button>
          </div>
        </div>

        {/* Certificates Carousel */}
        {activeTab === "certificates" && (
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              {/* Navigation buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 bg-white/80 dark:bg-dark-secondary/80 backdrop-blur-sm rounded-full p-3 shadow-lg text-gray-800 dark:text-white hover:bg-white dark:hover:bg-dark-secondary focus:outline-none transition-all duration-300"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 bg-white/80 dark:bg-dark-secondary/80 backdrop-blur-sm rounded-full p-3 shadow-lg text-gray-800 dark:text-white hover:bg-white dark:hover:bg-dark-secondary focus:outline-none transition-all duration-300"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Carousel container */}
              <div className="overflow-hidden px-4" ref={containerRef}>
                <motion.div
                  className="flex transition-all duration-500 ease-in-out"
                  initial={{ x: 0 }}
                  animate={{ x: `-${currentIndex * (100 / visibleItems)}%` }}
                  transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
                >
                  {certifications.map((cert, index) => (
                    <div
                      key={index}
                      className={`flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 p-4 transition-all duration-500 ${
                        index >= currentIndex && index < currentIndex + visibleItems
                          ? "opacity-100 scale-100"
                          : "opacity-40 scale-95 blur-[1px]"
                      }`}
                      style={{ width: `${100 / visibleItems}%` }}
                    >
                      <motion.div
                        className="bg-gradient-to-br from-white to-gray-50 dark:from-dark-secondary dark:to-dark-primary/80 rounded-xl overflow-hidden h-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                        whileHover={{ y: -8, scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="relative h-52 overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-500/5 dark:from-dark-highlight/5 dark:to-blue-700/5 z-0"></div>
                          <img
                            src={cert.imageUrl || "/placeholder.svg"}
                            alt={cert.title}
                            className="w-full h-full object-contain pt-4 relative  z-10 transition-transform duration-500 hover:scale-105"
                          />
                          <div
                            className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r"
                            style={{
                              backgroundImage: `linear-gradient(to right, ${
                                index % 3 === 0
                                  ? "#f97316, #f59e0b"
                                  : index % 3 === 1
                                    ? "#3b82f6, #0ea5e9"
                                    : "#22c55e, #10b981"
                              })`,
                            }}
                          ></div>
                        </div>
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <img
                                src="/logos/ibm.png"
                                alt="IBM"
                                className="h-6 w-auto mr-2"
                                onError={(e) => {
                                  e.currentTarget.src = "/placeholder.svg?height=24&width=24"
                                }}
                              />
                              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                {cert.organization}
                              </span>
                            </div>
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-dark-primary/50 px-2 py-1 rounded-full">
                              {cert.date}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white leading-tight">
                            {cert.title}
                          </h3>

                          {cert.certId && (
                            <div className="inline-flex items-center px-2.5 py-1 mb-4 bg-gray-100 dark:bg-dark-primary/50 rounded-full text-xs font-medium text-gray-600 dark:text-gray-300">
                              <span className="mr-1">ID:</span>
                              <span className="font-mono">{cert.certId}</span>
                            </div>
                          )}

                          {cert.link && cert.link !== "#" && (
                            <a
                              href={cert.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-4 inline-flex items-center px-4 py-2 bg-primary/10 hover:bg-primary/20 dark:bg-dark-highlight/10 dark:hover:bg-dark-highlight/20 text-primary dark:text-dark-highlight rounded-lg transition-colors text-sm font-medium"
                            >
                              {t("certifications.viewCertificate")}
                              <ExternalLink size={14} className="ml-1.5" />
                            </a>
                          )}
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Carousel indicators */}
              <div className="flex justify-center mt-10 space-x-2">
                {Array.from({ length: Math.ceil(certifications.length - visibleItems + 1) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`transition-all duration-300 ${
                      currentIndex === index
                        ? "w-8 h-2 bg-primary dark:bg-dark-highlight rounded-full"
                        : "w-2 h-2 bg-gray-300 dark:bg-gray-700 rounded-full hover:bg-gray-400 dark:hover:bg-gray-600"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* HackerRank Badges */}
        {activeTab === "badges" && (
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white dark:bg-dark-secondary rounded-xl shadow-md p-8">
              <h3 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white text-center">
                🏅 HackerRank Badges
              </h3>

              <div className="flex flex-wrap justify-center items-center gap-8">
                {hackerRankBadges.map((badge, i) => (
                  <motion.div
                    key={i}
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    <div className="w-24 h-24 relative bg-gray-50 dark:bg-dark-primary/30 rounded-full p-2 flex items-center justify-center shadow-md">
                      <img
                        src={badge.icon || "/placeholder.svg"}
                        alt={badge.name}
                        className="object-contain w-16 h-16"
                      />
                    </div>
                    <p className="mt-3 text-center font-semibold text-gray-800 dark:text-white">{badge.name}</p>
                    <div className="flex items-center mt-2">
                      {Array.from({ length: badge.stars }).map((_, j) => (
                        <Star key={j} size={16} className="text-yellow-400 mx-[1px] fill-yellow-400" />
                      ))}
                      {Array.from({ length: 5 - badge.stars }).map((_, j) => (
                        <Star key={j} size={16} className="text-gray-300 dark:text-gray-600 mx-[1px]" />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-10">
                <a
                  href="https://www.hackerrank.com/profile/mohamedhadadi001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary/90 dark:bg-dark-highlight dark:hover:bg-dark-highlight/90 text-white rounded-md transition-colors"
                >
                  {t("certifications.viewHackerRankProfile") || "View my HackerRank Profile"}
                  <ExternalLink size={16} className="ml-2" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
