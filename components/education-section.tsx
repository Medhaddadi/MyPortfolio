import Image from "next/image"
import educationData from "@/data/education-data"
import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, MapPin, Calendar } from "lucide-react"

export default function EducationSection() {
  return (
    <section id="education" className="section-container bg-muted/30">
      <h2 className="section-title">Education</h2>
      <p className="section-subtitle">My academic background and qualifications</p>

      <div className="mx-auto mt-12 max-w-4xl space-y-6">
        {educationData.map((education, index) => (
          <Card key={index} className="overflow-hidden transition-all duration-300 hover:shadow-md">
            <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10">
                <Image
                  src={education.logo || "/placeholder.svg"}
                  alt={education.school}
                  width={64}
                  height={64}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex-grow">
                <h3 className="text-xl font-bold">{education.degree}</h3>
                <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <GraduationCap className="h-4 w-4" />
                    {education.school}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {education.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {education.date}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
