"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp, Calendar, MapPin, Briefcase } from "lucide-react"
import ReactMarkdown from "react-markdown"

interface Experience {
  title: string
  company: string
  location: string
  date: string
  description: string
  details: string[]
  technologies?: string[]
  logo: string
  employmentType: "freelance" | "company"
}

interface ExperienceTimelineProps {
  experiences: Experience[]
}

export default function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  const { t } = useTranslation()
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [filter, setFilter] = useState<string>("all")
  const [filteredExperiences, setFilteredExperiences] = useState<Experience[]>(experiences || [])

  useEffect(() => {
    if (filter === "all") {
      setFilteredExperiences(experiences || [])
    } else {
      setFilteredExperiences(
        (experiences || []).filter((exp) => exp.employmentType === filter)
      )
    }
    setExpandedId(null)
  }, [filter, experiences])

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <section id="experience" className="py-20 bg-white dark:bg-[#0B1120]">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {t("experience.title")}
        </motion.h2>

        <div className="mb-12 flex justify-center">
          <div className="flex flex-wrap justify-center gap-3">
            {["all", "company", "freelance"].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === type
                    ? "bg-primary text-white dark:bg-dark-highlight"
                    : "bg-gray-100 text-gray-700 dark:bg-dark-secondary dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-secondary/80"
                }`}
              >
                {t(`experience.${type}`)}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gray-200 dark:bg-gray-700"></div>

          <AnimatePresence>
            {Array.isArray(filteredExperiences) &&
              filteredExperiences.map((exp, index) => (
                <motion.div
                  key={index}
                  className={`mb-16 relative ${
                    index % 2 === 0
                      ? "md:pr-12 md:text-right md:ml-auto md:mr-auto md:pl-0"
                      : "md:pl-12 md:ml-auto md:mr-auto md:pr-0"
                  } md:w-1/2 pl-12`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, x: index % 2 === 0 ? 50 : -50, y: 20 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="absolute left-0 md:left-auto md:right-0 w-10 h-10 rounded-full bg-white dark:bg-dark-secondary border-4 border-primary dark:border-dark-highlight transform -translate-y-1/2 top-8 md:translate-x-1/2 md:-translate-x-1/2 flex items-center justify-center z-10">
                    <Briefcase className="w-4 h-4 text-primary dark:text-dark-highlight" />
                  </div>

                  <motion.div
                    className="bg-white dark:bg-dark-secondary rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 mr-4 overflow-hidden rounded-full bg-gray-100 dark:bg-[#0B1120] flex items-center justify-center">
                        {exp.logo.startsWith("/") ? (
                          <img
                            src={exp.logo || "/placeholder.svg"}
                            alt={exp.company}
                            className="w-10 h-10 object-contain"
                          />
                        ) : (
                          <span className="text-xl">{exp.logo}</span>
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white">{exp.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{exp.company}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center mb-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center mr-4 mb-2">
                        <Calendar size={16} className="mr-1" />
                        <span>{exp.date}</span>
                      </div>
                      <div className="flex items-center mb-2">
                        <MapPin size={16} className="mr-1" />
                        <span>{exp.location}</span>
                      </div>
                      <div className="ml-auto">
                        <span
                          className={`px-3 py-1 rounded-full text-xs ${
                            exp.employmentType === "freelance"
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                              : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                          }`}
                        >
                          {exp.employmentType === "freelance"
                            ? t("experience.freelance")
                            : t("experience.company")}
                        </span>
                      </div>
                    </div>

                    <p className="mb-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                      <ReactMarkdown>{exp.description}</ReactMarkdown>
                    </p>

                    <button
                      onClick={() => toggleExpand(index)}
                      className="flex items-center text-primary dark:text-dark-highlight hover:underline focus:outline-none"
                    >
                      {expandedId === index ? (
                        <>
                          {t("experience.readLess")}
                          <ChevronUp size={16} className="ml-1" />
                        </>
                      ) : (
                        <>
                          {t("experience.readMore")}
                          <ChevronDown size={16} className="ml-1" />
                        </>
                      )}
                    </button>

                    <AnimatePresence>
                      {expandedId === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                        >
                          <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                            {exp.details.map((detail, i) => (
                              <motion.li
                                key={i}
                                className="flex items-start"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.2, delay: i * 0.1 }}
                              >
                                <span className="inline-block w-2 h-2 rounded-full bg-primary dark:bg-dark-highlight mt-2 mr-2"></span>
                                <ReactMarkdown>{detail}</ReactMarkdown>
                              </motion.li>
                            ))}
                          </ul>
                          {exp.technologies && (
                            <div className="mt-6 flex flex-wrap gap-2">
                              {exp.technologies.map((tech, i) => (
                                <span
                                  key={i}
                                  className="px-3 py-1 rounded-full text-xs font-medium bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
