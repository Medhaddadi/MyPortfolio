"use client"

import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import Link from "next/link"
import Footer from "@/components/footer"
import { servicesData } from "@/data/services-data"
import { Code, Globe, ShoppingCart, Bot, Database, Server, Zap, ArrowRight } from "lucide-react"

export default function ServicesPage() {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage)
    }
  }, [i18n])

  // Helper function to get the appropriate icon
  const getServiceIcon = (type: string) => {
    switch (type) {
      case "web":
        return <Globe className="w-6 h-6" />
      case "ecommerce":
        return <ShoppingCart className="w-6 h-6" />
      case "ai":
        return <Bot className="w-6 h-6" />
      case "backend":
        return <Server className="w-6 h-6" />
      case "database":
        return <Database className="w-6 h-6" />
      case "performance":
        return <Zap className="w-6 h-6" />
      default:
        return <Code className="w-6 h-6" />
    }
  }

  return (
    <main className="bg-white dark:bg-[#0B1120] min-h-screen pt-24">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-blue-600/5 dark:from-dark-highlight/10 dark:to-blue-700/5 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {t("services.title")}
            </motion.h1>

            <motion.p
              className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {t("services.description")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link
                href="#contact"
                className="px-8 py-4 bg-primary hover:bg-primary/90 dark:bg-dark-highlight dark:hover:bg-dark-highlight/90 text-white rounded-lg transition-colors inline-flex items-center"
              >
                {t("services.getInTouch")}
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 dark:bg-dark-highlight/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 -right-24 w-96 h-96 bg-blue-500/5 dark:bg-blue-700/5 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-dark-secondary rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="p-6">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 dark:bg-dark-highlight/10 flex items-center justify-center mb-6 text-primary dark:text-dark-highlight">
                    {getServiceIcon(service.type)}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{service.description}</p>

                  <div className="space-y-3">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-start">
                        <div className="text-primary dark:text-dark-highlight mr-3 mt-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                          </svg>
                        </div>
                        <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="px-6 py-4 bg-gray-50 dark:bg-dark-primary border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{t("services.startingAt")}</span>
                    <span className="font-bold text-primary dark:text-dark-highlight">{service.pricing}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50 dark:bg-[#0B1120]/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <motion.h2
              className="text-3xl font-bold mb-6 text-gray-800 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {t("services.processTitle")}
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 dark:text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {t("services.processDescription")}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: t("services.step1Title"),
                description: t("services.step1Description"),
              },
              {
                step: "02",
                title: t("services.step2Title"),
                description: t("services.step2Description"),
              },
              {
                step: "03",
                title: t("services.step3Title"),
                description: t("services.step3Description"),
              },
              {
                step: "04",
                title: t("services.step4Title"),
                description: t("services.step4Description"),
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Connector line */}
                {index < 3 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gray-200 dark:bg-gray-700 -z-10 transform -translate-x-1/2"></div>
                )}

                <div className="bg-white dark:bg-dark-secondary rounded-xl p-6 shadow-md relative z-10">
                  <div className="w-12 h-12 rounded-full bg-primary dark:bg-dark-highlight text-white flex items-center justify-center font-bold text-lg mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-gradient-to-r from-primary to-blue-600 dark:from-dark-highlight dark:to-blue-700 rounded-2xl overflow-hidden shadow-xl">
            <div className="grid md:grid-cols-2 items-center">
              <div className="p-12">
                <motion.h2
                  className="text-3xl font-bold mb-6 text-white"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  {t("services.ctaTitle")}
                </motion.h2>
                <motion.p
                  className="text-white/90 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  {t("services.ctaDescription")}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Link
                    href="#contact"
                    className="px-8 py-4 bg-white text-primary dark:text-dark-highlight hover:bg-white/90 rounded-lg transition-colors inline-flex items-center"
                  >
                    {t("services.ctaButton")}
                    <ArrowRight size={18} className="ml-2" />
                  </Link>
                </motion.div>
              </div>
              <div className="hidden md:block h-full">
                <img
                  src="/services-cta.jpg"
                  alt="Services"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg?height=600&width=600"
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
