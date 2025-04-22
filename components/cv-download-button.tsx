"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Download } from "lucide-react"
import { trackCVDownload } from "../utils/track-download"

export default function CVDownloadButton() {
  const { t, i18n } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)

  const handleDownload = async () => {
    setIsLoading(true)

    try {
      // Track the download
      await trackCVDownload()

      // Get the appropriate CV based on language
      const cvPath = i18n.language === "fr" ? "/cv-fr.pdf" : "/cv-en.pdf"

      // Create a link and trigger download
      const link = document.createElement("a")
      link.href = cvPath
      link.download = i18n.language === "fr" ? "CV_FR.pdf" : "CV_EN.pdf"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("Error downloading CV:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleDownload}
      disabled={isLoading}
      className="px-6 py-3 bg-primary hover:bg-primary/90 dark:bg-dark-highlight dark:hover:bg-dark-highlight/90 text-white rounded-md transition-colors flex items-center justify-center"
    >
      {isLoading ? (
        <span className="animate-pulse">{t("hero.downloadCV")}...</span>
      ) : (
        <>
          {t("hero.downloadCV")}
          <Download size={16} className="ml-2" />
        </>
      )}
    </button>
  )
}
