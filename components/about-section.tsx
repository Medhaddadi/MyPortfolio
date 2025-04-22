import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download } from "lucide-react"

export default function AboutSection() {
  return (
    <section id="about" className="section-container">
      <h2 className="section-title">About Me</h2>
      <p className="section-subtitle">Get to know more about my background and what drives me as a developer</p>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        <div className="flex flex-col justify-center">
          <h3 className="mb-4 text-2xl font-bold">Who am I?</h3>
          <p className="mb-4 text-muted-foreground">
            I'm a passionate Fullstack Java Developer with expertise in building robust and scalable applications. With
            a strong foundation in both backend and frontend technologies, I specialize in creating efficient,
            user-friendly solutions that solve real-world problems.
          </p>
          <p className="mb-4 text-muted-foreground">
            My journey in software engineering has equipped me with a diverse skill set spanning Java, Spring Boot,
            Angular, React, and various database technologies. I'm committed to writing clean, maintainable code and
            staying updated with the latest industry trends.
          </p>
          <p className="mb-6 text-muted-foreground">
            When I'm not coding, I enjoy exploring new technologies, contributing to open-source projects, and sharing
            knowledge with the developer community.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <a href="#contact">Get In Touch</a>
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download CV
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <Card className="w-full max-w-md overflow-hidden">
            <CardContent className="p-0">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Mohamed El Haddadi"
                width={400}
                height={400}
                className="h-auto w-full object-cover"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
