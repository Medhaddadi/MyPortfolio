"use client"

import { useState, useRef, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { Award, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"

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
  const containerRef = useRef<HTMLDivElement>(null)

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
    setCurrentIndex((prevIndex) =>
      prevIndex + visibleItems >= certifications.length ? 0 : prevIndex + 1
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex <= 0 ? Math.max(0, certifications.length - visibleItems) : prevIndex - 1
    )
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <section id="certifications" className="py-20 bg-white dark:bg-[#0B1120]">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl font-bold text-center mb-16 text-gray-800 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {t("certifications.title")}
        </motion.h2>

        {/* Carousel */}
        <div className="relative max-w-6xl mx-auto mb-20">
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10 bg-white dark:bg-dark-secondary rounded-full p-2 shadow-lg text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-dark-secondary/80"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10 bg-white dark:bg-dark-secondary rounded-full p-2 shadow-lg text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-dark-secondary/80"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="overflow-hidden" ref={containerRef}>
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleItems)}%)`,
              }}
            >
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0 p-4"
                  style={{ width: `${100 / visibleItems}%` }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <motion.div
                    className="bg-white dark:bg-dark-secondary rounded-xl shadow-md overflow-hidden h-full hover:shadow-xl transition-shadow"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative w-full aspect-video overflow-hidden">
                    <img
    src={cert.imageUrl || "/placeholder.svg"}
    alt={cert.title}
    className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.05]"
  />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                        <div className="p-4 text-white">
                          <h3 className="text-lg font-bold">{cert.organization}</h3>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{cert.title}</h3>
                      <div className="flex items-center mb-2 text-gray-600 dark:text-gray-300">
                        <Award size={16} className="mr-2" />
                        <span>{cert.date}</span>
                      </div>
                      {cert.certId && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">ID: {cert.certId}</p>
                      )}
                      {cert.link && cert.link !== "#" && (
                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-primary dark:text-dark-highlight hover:underline"
                        >
                          {t("certifications.viewCertificate")}
                          <ExternalLink size={16} className="ml-1" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({
              length: Math.ceil(certifications.length - visibleItems + 1),
            }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? "bg-primary dark:bg-dark-highlight w-6"
                    : "bg-gray-300 dark:bg-gray-700"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* 🎖 HackerRank Badges */}
        <div className="bg-white dark:bg-dark-secondary rounded-xl shadow-md p-6">
          <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center">
            🏅 HackerRank Badges
          </h3>

          <div className="flex flex-wrap justify-center items-center gap-6">
            {[
              { name: "Problem Solving", stars: 2, icon: "/certificates/badges/problem-solving.png" },
              { name: "Java", stars: 3, icon: "/certificates/badges/java.png" },
              { name: "Python", stars: 2, icon: "/certificates/badges/python.png" },
              { name: "C language", stars: 2, icon: "/certificates/badges/c.png" },
            ].map((badge, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="w-20 h-20 relative">
                  <img
                    src={badge.icon}
                    alt={badge.name}
                    className="object-contain w-full h-full"
                  />
                </div>
                <p className="mt-2 text-center text-sm font-semibold text-gray-800 dark:text-white">
                  {badge.name}
                </p>
                <div className="flex items-center mt-1">
                  {Array.from({ length: badge.stars }).map((_, j) => (
                    <Award key={j} size={14} className="text-yellow-400 mx-[1px]" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-6">
            <a
              href="https://www.hackerrank.com/profile/mohamedhadadi001"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-5 py-2 mt-2 bg-primary text-white rounded-md hover:bg-primary/80 transition"
            >
              Voir mon profil HackerRank →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
