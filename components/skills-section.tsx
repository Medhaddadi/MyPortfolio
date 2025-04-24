"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { Check, ChevronDown } from "lucide-react"

interface SkillCategory {
  title: string
  skills: string[]
}

interface SkillsSectionProps {
  skillsData?: SkillCategory[] // ⬅️ Rendu optionnel ici
}

export default function SkillsSection({ skillsData = [] }: SkillsSectionProps) { // ⬅️ Valeur par défaut []
  const { t } = useTranslation()
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const toggleCategory = (title: string) => {
    setActiveCategory(activeCategory === title ? null : title)
  }

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-[#0B1120]">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl font-bold text-center mb-16 text-gray-800 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {t("skills.title")}
        </motion.h2>

        <div className="max-w-4xl mx-auto">
          {Array.isArray(skillsData) && skillsData.map((category, index) => (
            <motion.div
              key={index}
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <button
                onClick={() => toggleCategory(category.title)}
                className={`w-full flex items-center justify-between p-5 rounded-xl text-left transition-all duration-300 ${
                  activeCategory === category.title
                    ? "bg-primary text-white dark:bg-dark-highlight"
                    : "bg-white dark:bg-dark-secondary hover:bg-gray-100 dark:hover:bg-dark-secondary/80 text-gray-800 dark:text-white"
                } shadow-md`}
              >
                <h3 className="text-xl font-bold">{category.title}</h3>
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-300 ${
                    activeCategory === category.title ? "transform rotate-180" : ""
                  }`}
                />
              </button>

              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: activeCategory === category.title ? "auto" : 0,
                  opacity: activeCategory === category.title ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="bg-white dark:bg-dark-secondary/50 p-6 rounded-b-xl shadow-inner grid grid-cols-2 md:grid-cols-3 gap-4">
                  {category.skills.map((skill, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: i * 0.05 }}
                      className="flex items-center"
                    >
                      <div className="w-6 h-6 rounded-full bg-primary/10 dark:bg-dark-highlight/20 flex items-center justify-center mr-3 flex-shrink-0">
                        <Check className="w-3 h-3 text-primary dark:text-dark-highlight" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Skill bars */}
        <motion.div
          className="mt-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-xl font-bold mb-8 text-center text-gray-800 dark:text-white">
            {t("skills.topSkills")}
          </h3>

          <div className="space-y-6">
            {[{ name: "Java", level: 95 }, { name: "Spring Boot", level: 90 }, { name: "JavaScript/TypeScript", level: 85 }, { name: "React", level: 80 }, { name: "Angular", level: 75 }].map((skill, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{skill.name}</span>
                  <span className="text-gray-500 dark:text-gray-400">{skill.level}%</span>
                </div>
                <div className="w-full h-3 bg-gray-200 dark:bg-dark-secondary rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-blue-400 dark:from-dark-highlight dark:to-blue-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.1 * index }}
                  ></motion.div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
