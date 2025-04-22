"use client"

import { useTheme } from "./theme-provider"
import { motion } from "framer-motion"

interface LogoProps {
  size?: number
  className?: string
}

export default function Logo({ size = 40, className = "" }: LogoProps) {
  const { theme } = useTheme()

  // Définir les couleurs en fonction du thème
  const primaryColor = theme === "light" ? "#4F46E5" : "#0EA5E9"
  const secondaryColor = theme === "light" ? "#38BDF8" : "#22C55E"
  const textColor = theme === "light" ? "#1E293B" : "#FFFFFF"

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial={{ opacity: 0, rotate: -90 }}
      animate={{ opacity: 1, rotate: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Cercle extérieur */}
      <circle cx="20" cy="20" r="20" fill={primaryColor} />

      {/* Cercle intérieur */}
      <circle cx="20" cy="20" r="16" fill="white" />

      {/* Initiales MH stylisées */}
      <path
        d="M10 12L13 28M13 12L16 28M24 12L27 28M27 12L30 28M13 20H16M27 20H24"
        stroke={secondaryColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M10 12L13 28M13 12L16 28M24 12L27 28M27 12L30 28"
        stroke={primaryColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  )
}
