"use client"

import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import ExperienceTimeline from "@/components/experience-timeline"
import Certifications from "@/components/certifications"
import Projects from "@/components/projects"
import ContactForm from "@/components/contact-form"
import Footer from "@/components/footer"
import SkillsSection from "@/components/skills-section"
import experiencesData from "@/data/experiences-data"
import { projectsData } from "@/data/projects-data"
import { certificationsData } from "@/data/certifications-data"

export default function Home() {
  const { i18n } = useTranslation()

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage)
    }
  }, [i18n])

  return (
    <main className="bg-white dark:bg-[#0B1120] min-h-screen">
      <HeroSection />
      <AboutSection />
      <ExperienceTimeline experiences={experiencesData} />
      <SkillsSection />
      <Projects projects={projectsData} />
      <Certifications certifications={certificationsData} />
      <ContactForm />
      <Footer />
    </main>
  )
}
