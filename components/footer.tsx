"use client"

import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import Link from "next/link"
import { Github, Linkedin, Mail, Globe, MapPin, Phone, Calendar } from "lucide-react"

export default function Footer() {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 dark:bg-[#0B1120] py-16 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6">
              <img src="/logo-dark.png" alt="Mohamed El Haddadi" className="h-16 w-auto" />
            </div>
            <p className="text-gray-400 mb-6 max-w-md">{t("footer.description")}</p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/Medhaddadi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors p-2 bg-gray-800 dark:bg-gray-700 rounded-full"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com/in/mohamed-el-haddadi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors p-2 bg-gray-800 dark:bg-gray-700 rounded-full"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:contact@mohamed-haddadi.com"
                className="text-gray-400 hover:text-white transition-colors p-2 bg-gray-800 dark:bg-gray-700 rounded-full"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
              <a
                href="https://mohamed-haddadi.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors p-2 bg-gray-800 dark:bg-gray-700 rounded-full"
                aria-label="Website"
              >
                <Globe size={20} />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-xl font-bold mb-6 border-b border-gray-800 pb-3">{t("footer.navigation")}</h3>
            <ul className="space-y-3">
              <li>
                <a href="#home" className="text-gray-400 hover:text-white transition-colors">
                  {t("nav.home")}
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-white transition-colors">
                  {t("nav.about")}
                </a>
              </li>
              <li>
                <a href="#experience" className="text-gray-400 hover:text-white transition-colors">
                  {t("nav.experience")}
                </a>
              </li>
              <li>
                <a href="#skills" className="text-gray-400 hover:text-white transition-colors">
                  {t("nav.skills")}
                </a>
              </li>
              <li>
                <a href="#projects" className="text-gray-400 hover:text-white transition-colors">
                  {t("nav.projects")}
                </a>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
                  {t("nav.blog")}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white transition-colors">
                  {t("nav.services")}
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <Calendar size={14} className="mr-1" />
                  {t("nav.booking")}
                </Link>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white transition-colors">
                  {t("nav.contact")}
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-6 border-b border-gray-800 pb-3">{t("footer.contact")}</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-gray-400 mt-1 mr-3" />
                <span className="text-gray-400">Casablanca, Morocco</span>
              </li>
              <li className="flex items-start">
                <Mail className="w-5 h-5 text-gray-400 mt-1 mr-3" />
                <a
                  href="mailto:contact@mohamedhaddadi.com"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  contact@mohamedhaddadi.com
                </a>
              </li>
              <li className="flex items-start">
                <Phone className="w-5 h-5 text-gray-400 mt-1 mr-3" />
                <span className="text-gray-400">+212 600 000 000</span>
              </li>
              <li className="flex items-start mt-6">
                <Link
                  href="/booking"
                  className="inline-flex items-center px-4 py-2 bg-primary hover:bg-primary/90 dark:bg-dark-highlight dark:hover:bg-dark-highlight/90 text-white rounded-md transition-colors"
                >
                  <Calendar size={16} className="mr-2" />
                  {t("nav.booking")}
                </Link>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="border-t border-gray-800 mt-12 pt-8 text-center"
        >
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} Mohamed El Haddadi. {t("footer.rights")}
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
