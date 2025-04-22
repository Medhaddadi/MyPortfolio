"use client"

import { useState } from "react"
import Image from "next/image"
import { projectsData } from "@/data/projects-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Github } from "lucide-react"

export default function ProjectsSection() {
  const [visibleProjects, setVisibleProjects] = useState(3)

  const showMoreProjects = () => {
    setVisibleProjects((prev) => Math.min(prev + 3, projectsData.length))
  }

  return (
    <section id="projects" className="section-container">
      <h2 className="section-title">Projects</h2>
      <p className="section-subtitle">Some of the projects I've worked on throughout my career</p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projectsData.slice(0, visibleProjects).map((project, index) => (
          <Card key={index} className="project-card">
            <div className="aspect-video overflow-hidden">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                width={400}
                height={225}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag, tagIndex) => (
                  <Badge key={tagIndex} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="ghost" size="sm" className="gap-1" asChild>
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  Demo
                </a>
              </Button>
              <Button variant="ghost" size="sm" className="gap-1" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                  Code
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {visibleProjects < projectsData.length && (
        <div className="mt-10 flex justify-center">
          <Button onClick={showMoreProjects}>Load More Projects</Button>
        </div>
      )}
    </section>
  )
}
