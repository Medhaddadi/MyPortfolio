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

        <div className="relative max-w-6xl mx-auto">
          {/* Carousel navigation buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10 bg-white dark:bg-dark-secondary rounded-full p-2 shadow-lg text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-dark-secondary/80 focus:outline-none"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10 bg-white dark:bg-dark-secondary rounded-full p-2 shadow-lg text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-dark-secondary/80 focus:outline-none"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Carousel container */}
          <div className="overflow-hidden" ref={containerRef}>
            <motion.div
              className="flex transition-all duration-500 ease-in-out"
              initial={{ x: 0 }}
              animate={{ x: `-${currentIndex * (100 / visibleItems)}%` }}
              transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
            >
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 p-4 transition-opacity duration-300 ${
                    index >= currentIndex && index < currentIndex + visibleItems
                      ? "opacity-100"
                      : "opacity-40 pointer-events-none"
                  }`}
                  style={{ width: `${100 / visibleItems}%` }}
                >
                  <motion.div
                    className="bg-white dark:bg-dark-secondary rounded-xl shadow-md overflow-hidden h-full hover:shadow-lg transition-shadow"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={cert.imageUrl || "/placeholder.svg"}
                        alt={cert.title}
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
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
                </div>
              ))}
            </motion.div>
          </div>

          {/* Carousel indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: Math.ceil(certifications.length - visibleItems + 1) }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index ? "bg-primary dark:bg-dark-highlight w-6" : "bg-gray-300 dark:bg-gray-700"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
