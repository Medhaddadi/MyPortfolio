"use client"

import { useState } from "react"
import Image from "next/image"
import { experiencesData } from "@/data/experience-data"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Briefcase, Building, Calendar, MapPin } from "lucide-react"

export default function ExperienceSection() {
  const [activeTab, setActiveTab] = useState("all")

  const filteredExperiences =
    activeTab === "all"
      ? experiencesData
      : experiencesData.filter((exp) => exp.type.toLowerCase() === activeTab.toLowerCase())

  return (
    <section id="experience" className="section-container bg-muted/30">
      <h2 className="section-title">Work Experience</h2>
      <p className="section-subtitle">My professional journey and the companies I've worked with</p>

      <Tabs defaultValue="all" className="mx-auto max-w-4xl" onValueChange={setActiveTab}>
        <div className="flex justify-center">
          <TabsList className="mb-8">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="company">Company</TabsTrigger>
            <TabsTrigger value="freelance">Freelance</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={activeTab} className="mt-0">
          <div className="grid gap-6 md:grid-cols-2">
            {filteredExperiences.map((experience, index) => (
              <Card key={index} className="experience-card">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-primary/10">
                    {experience.icon.startsWith("/") ? (
                      <Image
                        src={experience.icon || "/placeholder.svg"}
                        alt={experience.title}
                        width={48}
                        height={48}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl">{experience.icon}</span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold">{experience.title}</h3>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Building className="h-3 w-3" />
                        {experience.location.split("/")[0].trim()}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {experience.location.includes("/") ? experience.location.split("/")[1].trim() : ""}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {experience.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-3 w-3" />
                        {experience.type}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="ml-4 list-disc space-y-1 text-sm text-muted-foreground">
                    {experience.missions.map((mission, mIndex) => (
                      <li key={mIndex}>{mission}</li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {experience.stack.map((tech, tIndex) => (
                      <Badge key={tIndex} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  )
}
