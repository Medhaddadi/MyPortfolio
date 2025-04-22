"use client"

import { useState, useEffect } from "react"
import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  const [typedText, setTypedText] = useState("")
  const fullText = "Fullstack Java Developer"

  useEffect(() => {
    let currentIndex = 0
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(typingInterval)
      }
    }, 100)

    return () => clearInterval(typingInterval)
  }, [])

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden py-20">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background to-background/80 dark:from-background dark:to-background/90"></div>

      <div className="container relative z-10 mx-auto px-4 text-center sm:px-6 lg:px-8">
        <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="block">Hello, I'm</span>
          <span className="block bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Mohamed El Haddadi
          </span>
        </h1>

        <div className="mx-auto h-12 overflow-hidden">
          <p className="text-xl font-medium sm:text-2xl md:text-3xl">
            <span className="inline-block border-r-4 border-primary pr-1">{typedText}</span>
          </p>
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          Building robust and scalable applications with Java, Spring Boot, and modern frontend technologies.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="rounded-full">
            <a href="#contact">Contact Me</a>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <a href="#about">Learn More</a>
          </Button>
        </div>

        <div className="mt-16 animate-bounce">
          <a href="#about" className="inline-block rounded-full p-2">
            <ArrowDown className="h-6 w-6" />
          </a>
        </div>
      </div>
    </section>
  )
}
