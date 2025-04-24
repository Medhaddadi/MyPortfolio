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
import { skillsData } from "@/data/skills-data"
import educationData from "@/data/education-data"

export default function Home() {
  const { i18n } = useTranslation()

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage)
    } else {
      i18n.changeLanguage("fr")
      localStorage.setItem("language", "fr")
    }
  }, [i18n])

  // Get the current language data
  const currentLanguage = i18n.language || "en"
  const currentExperiences = experiencesData[currentLanguage as keyof typeof experiencesData] || experiencesData.en
  const currentProjects = projectsData[currentLanguage as keyof typeof projectsData] || projectsData.en
  const currentCertifications =
    certificationsData[currentLanguage as keyof typeof certificationsData] || certificationsData.en
  const currentSkills = skillsData[currentLanguage as keyof typeof skillsData] || skillsData.en
  const currentEducation = educationData[currentLanguage as keyof typeof educationData] || educationData.en

  return (
    <main className="bg-white dark:bg-[#0B1120] min-h-screen">
      <HeroSection />
      <AboutSection />
      <ExperienceTimeline experiences={currentExperiences} />
      <SkillsSection skillsData={currentSkills} />
      <Projects projects={currentProjects} />
      <Certifications certifications={currentCertifications} />
      <ContactForm />
      <Footer />
    </main>
  )
}
