"use client"

import type React from "react"
import { useState, type FormEvent, useRef } from "react"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import emailjs from "@emailjs/browser"
import { Send, CheckCircle, AlertCircle, User, Mail, MessageSquare, MapPin, Phone, Globe } from "lucide-react"

export default function ContactForm() {
  const { t } = useTranslation()
  const formRef = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFocus = (field: string) => {
    setFocusedField(field)
  }

  const handleBlur = () => {
    setFocusedField(null)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      // Simulate sending email
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log("Form submitted:", formData)

      // Replace with your email sending logic (e.g., EmailJS)
      await emailjs.send(
        "service_pl4n3de",
        "template_zpwmz8e",
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        "8jECNjMQXo5aL4lIb"
      )

      setStatus("success")
      setFormData({ name: "", email: "", message: "" })

      setTimeout(() => {
        setStatus("idle")
      }, 5000)
    } catch (error) {
      console.error("Error sending email:", error)
      setStatus("error")

      setTimeout(() => {
        setStatus("idle")
      }, 5000)
    }
  }

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-[#0B1120]">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Contact Me</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Feel free to reach out to me for any inquiries or collaborations.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <motion.div
            className="bg-white dark:bg-dark-secondary rounded-2xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid md:grid-cols-5">
              {/* Contact Info */}
              <div className="md:col-span-2 bg-gradient-to-br from-primary to-blue-600 dark:from-dark-highlight dark:to-blue-700 p-8 text-white">
                <h3 className="text-xl font-bold mb-6">{t("contact.getInTouch")}</h3>
                <p className="mb-8 opacity-90">{t("contact.reachOut")}</p>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-white/20 p-3 rounded-full mr-4 flex-shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold uppercase opacity-80">{t("contact.email")}</h4>
                      <a href="mailto:contact@mohamedhaddadi.com" className="hover:underline">
                        contact@elhaddadidev.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-white/20 p-3 rounded-full mr-4 flex-shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold uppercase opacity-80">{t("contact.location")}</h4>
                      <p>Lyon, France</p>
                    </div>
                  </div>

                  <div className="flex items-star tmd:flex hidden">
                    <div className="bg-white/20 p-3 rounded-full mr-4 flex-shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold uppercase opacity-80">{t("contact.phone")}</h4>
                      <p>+212 600 000 000</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-white/20 p-3 rounded-full mr-4 flex-shrink-0">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold uppercase opacity-80">{t("contact.social")}</h4>
                      <div className="flex space-x-3 mt-2">
                        <a
                          href="https://linkedin.com/in/mohamed-el-haddadi"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors"
                          aria-label="LinkedIn"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                          </svg>
                        </a>
                        <a
                          href="https://github.com/Medhaddadi"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors"
                          aria-label="GitHub"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="md:col-span-3 p-8">
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div className="relative">
                    <div
                      className={`absolute left-3 top-1/2 -translate-y-1/2 transition-all duration-300 ${
                        focusedField === "name" || formData.name
                          ? "text-primary dark:text-dark-highlight -translate-y-10 text-sm"
                          : "text-gray-400"
                      }`}
                    >
                      <User size={focusedField === "name" || formData.name ? 16 : 20} className="inline mr-2" />
                      <label htmlFor="name">{t("contact.name")}</label>
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => handleFocus("name")}
                      onBlur={handleBlur}
                      required
                      className={`w-full px-4 py-4 pt-6 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
                        focusedField === "name"
                          ? "border-primary dark:border-dark-highlight focus:ring-primary/20 dark:focus:ring-dark-highlight/20"
                          : "border-gray-300 dark:border-gray-600"
                      } dark:bg-dark-primary dark:text-white`}
                    />
                  </div>

                  <div className="relative">
                    <div
                      className={`absolute left-3 top-1/2 -translate-y-1/2 transition-all duration-300 ${
                        focusedField === "email" || formData.email
                          ? "text-primary dark:text-dark-highlight -translate-y-10 text-sm"
                          : "text-gray-400"
                      }`}
                    >
                      <Mail size={focusedField === "email" || formData.email ? 16 : 20} className="inline mr-2" />
                      <label htmlFor="email">{t("contact.email")}</label>
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => handleFocus("email")}
                      onBlur={handleBlur}
                      required
                      className={`w-full px-4 py-4 pt-6 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
                        focusedField === "email"
                          ? "border-primary dark:border-dark-highlight focus:ring-primary/20 dark:focus:ring-dark-highlight/20"
                          : "border-gray-300 dark:border-gray-600"
                      } dark:bg-dark-primary dark:text-white`}
                    />
                  </div>

                  <div className="relative">
                    <div
                      className={`absolute left-3 top-6 transition-all duration-300 ${
                        focusedField === "message" || formData.message
                          ? "text-primary dark:text-dark-highlight -translate-y-4 text-sm"
                          : "text-gray-400"
                      }`}
                    >
                      <MessageSquare
                        size={focusedField === "message" || formData.message ? 16 : 20}
                        className="inline mr-2"
                      />
                      <label htmlFor="message">{t("contact.message")}</label>
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => handleFocus("message")}
                      onBlur={handleBlur}
                      required
                      rows={5}
                      className={`w-full px-4 py-4 pt-8 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
                        focusedField === "message"
                          ? "border-primary dark:border-dark-highlight focus:ring-primary/20 dark:focus:ring-dark-highlight/20"
                          : "border-gray-300 dark:border-gray-600"
                      } dark:bg-dark-primary dark:text-white`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full py-4 px-6 bg-primary hover:bg-primary/90 dark:bg-dark-highlight dark:hover:bg-dark-highlight/90 text-white rounded-lg transition-colors flex items-center justify-center group"
                  >
                    {status === "loading" ? (
                      <span className="animate-pulse">{t("contact.sending")}...</span>
                    ) : (
                      <>
                        {t("contact.send")}
                        <Send size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </button>

                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg flex items-center"
                    >
                      <CheckCircle size={20} className="mr-2 flex-shrink-0" />
                      <span>{t("contact.success")}</span>
                    </motion.div>
                  )}

                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg flex items-center"
                    >
                      <AlertCircle size={20} className="mr-2 flex-shrink-0" />
                      <span>{t("contact.error")}</span>
                    </motion.div>
                  )}
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
