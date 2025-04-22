"use client"

import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import Image from "next/image"
import { FileText, Mail, MapPin, Phone } from "lucide-react"

export default function AboutSection() {
  const { t } = useTranslation()

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-[#0B1120]">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl font-bold text-center mb-16 text-gray-800 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {t("about.title")}
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Mohamed El Haddadi</h3>
            <h4 className="text-xl text-primary dark:text-dark-highlight mb-6">{t("about.jobTitle")}</h4>

            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{t("about.description")}</p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-primary dark:text-dark-highlight mt-1 mr-3" />
                <span className="text-gray-600 dark:text-gray-300">Casablanca, Morocco</span>
              </div>
              <div className="flex items-start">
                <Mail className="w-5 h-5 text-primary dark:text-dark-highlight mt-1 mr-3" />
                <a
                  href="mailto:contact@mohamedhaddadi.com"
                  className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-dark-highlight transition-colors"
                >
                  contact@mohamedhaddadi.com
                </a>
              </div>
              <div className="flex items-start">
                <Phone className="w-5 h-5 text-primary dark:text-dark-highlight mt-1 mr-3" />
                <span className="text-gray-600 dark:text-gray-300">+212 600 000 000</span>
              </div>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary/90 dark:bg-dark-highlight dark:hover:bg-dark-highlight/90 text-white rounded-md transition-colors"
            >
              <FileText className="w-5 h-5 mr-2" />
              {t("about.contactMe")}
            </a>
          </motion.div>

          <motion.div
            className="order-1 lg:order-2 flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white dark:border-dark-secondary shadow-xl">
              <Image
                src="/placeholder.svg?height=320&width=320"
                alt="Mohamed El Haddadi"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
