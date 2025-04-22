"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

// Sample certificates data - you can replace with actual data later
const certificatesData = [
  {
    title: "Java Developer Certification",
    issuer: "Oracle",
    date: "2023",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    title: "Spring Boot Professional",
    issuer: "Pivotal",
    date: "2023",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    title: "Angular Developer",
    issuer: "Google",
    date: "2022",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    title: "Docker Certified Associate",
    issuer: "Docker",
    date: "2022",
    image: "/placeholder.svg?height=300&width=500",
  },
]

export default function CertificatesSection() {
  const [selectedCertificate, setSelectedCertificate] = useState(null)

  return (
    <section id="certificates" className="section-container bg-muted/30">
      <h2 className="section-title">Certificates</h2>
      <p className="section-subtitle">Professional certifications and achievements</p>

      <div className="mx-auto mt-12 max-w-5xl">
        <Carousel className="w-full">
          <CarouselContent>
            {certificatesData.map((certificate, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Card className="cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-md">
                      <CardContent className="p-0">
                        <div className="relative aspect-[4/3] w-full">
                          <Image
                            src={certificate.image || "/placeholder.svg"}
                            alt={certificate.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold">{certificate.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {certificate.issuer} • {certificate.date}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <div className="relative aspect-[16/9] w-full">
                      <Image
                        src={certificate.image || "/placeholder.svg"}
                        alt={certificate.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="mt-4">
                      <h3 className="text-xl font-bold">{certificate.title}</h3>
                      <p className="text-muted-foreground">
                        {certificate.issuer} • {certificate.date}
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </div>
    </section>
  )
}
