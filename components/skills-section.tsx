import { skillsData } from "@/data/skills-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SkillsSection() {
  return (
    <section id="skills" className="section-container">
      <h2 className="section-title">Skills & Expertise</h2>
      <p className="section-subtitle">Technologies and tools I've worked with throughout my career</p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skillsData.map((category, index) => (
          <Card key={index} className="transition-all duration-300 hover:shadow-md">
            <CardHeader>
              <CardTitle>{category.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span key={skillIndex} className="skill-badge">
                    {skill}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
