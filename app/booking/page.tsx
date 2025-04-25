"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { format, addDays, startOfWeek, addWeeks, setHours, setMinutes, isBefore } from "date-fns"
import { fr, enUS } from "date-fns/locale"
import { Calendar, Clock, ChevronLeft, ChevronRight, Check, User, Mail, Briefcase, Video, Phone } from "lucide-react"
import Footer from "@/components/footer"
import ComingSoon from "@/components/CommingSoon/CommingSoon"

// Types
type MeetingType = "consultation" | "interview" | "project_discussion" | "technical_support"
type MeetingDuration = 15 | 30 | 45 | 60
type MeetingMethod = "video" | "phone" | "in_person"

interface TimeSlot {
  startTime: Date
  endTime: Date
  available: boolean
}

interface BookingFormData {
  name: string
  email: string
  company?: string
  message?: string
  meetingType: MeetingType
  meetingDuration: MeetingDuration
  meetingMethod: MeetingMethod
}

export default function BookingPage() {
  const { t, i18n } = useTranslation()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([])
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    email: "",
    company: "",
    message: "",
    meetingType: "consultation",
    meetingDuration: 30,
    meetingMethod: "video",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingComplete, setBookingComplete] = useState(false)

  // Get locale for date formatting
  const locale = i18n.language === "fr" ? fr : enUS

  // Generate available time slots for the selected date
  useEffect(() => {
    if (!selectedDate) return

    // Define working hours (9 AM to 6 PM)
    const workingHoursStart = 9
    const workingHoursEnd = 18

    // Generate time slots every 30 minutes
    const slots: TimeSlot[] = []
    for (let hour = workingHoursStart; hour < workingHoursEnd; hour++) {
      for (const minute of [0, 30]) {
        const startTime = setMinutes(setHours(new Date(selectedDate), hour), minute)
        const endTime = setMinutes(
          setHours(new Date(selectedDate), hour + (minute === 30 ? 1 : 0)),
          minute === 30 ? 0 : 30,
        )

        // Skip time slots in the past
        if (isBefore(startTime, new Date())) continue

        // Simulate some slots being unavailable (in a real app, this would come from your database)
        const isAvailable = Math.random() > 0.3 // 70% chance of being available

        slots.push({
          startTime,
          endTime,
          available: isAvailable,
        })
      }
    }

    setTimeSlots(slots)
  }, [selectedDate])

  // Handle date selection
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setSelectedTimeSlot(null)
  }

  // Handle time slot selection
  const handleTimeSlotSelect = (slot: TimeSlot) => {
    setSelectedTimeSlot(slot)
  }

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real app, you would send this data to your backend
      // For now, we'll simulate a successful booking
      await new Promise((resolve) => setTimeout(resolve, 1500))

      console.log("Booking details:", {
        ...formData,
        date: selectedDate,
        timeSlot: selectedTimeSlot,
      })

      setBookingComplete(true)
    } catch (error) {
      console.error("Error submitting booking:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Navigate to next step
  const goToNextStep = () => {
    setCurrentStep((prev) => prev + 1)
  }

  // Navigate to previous step
  const goToPreviousStep = () => {
    setCurrentStep((prev) => prev - 1)
  }

  // Reset the booking process
  const resetBooking = () => {
    setSelectedDate(null)
    setSelectedTimeSlot(null)
    setCurrentStep(1)
    setFormData({
      name: "",
      email: "",
      company: "",
      message: "",
      meetingType: "consultation",
      meetingDuration: 30,
      meetingMethod: "video",
    })
    setBookingComplete(false)
  }

  // Generate an array of dates for the current week view
  const getDatesForWeekView = () => {
    const startDate = startOfWeek(currentDate, { weekStartsOn: 1 }) // Start from Monday
    return Array.from({ length: 7 }).map((_, index) => addDays(startDate, index))
  }

  // Navigate to previous week
  const goToPreviousWeek = () => {
    setCurrentDate(addWeeks(currentDate, -1))
  }

  // Navigate to next week
  const goToNextWeek = () => {
    setCurrentDate(addWeeks(currentDate, 1))
  }

  // Format time for display
  const formatTime = (date: Date) => {
    return format(date, "HH:mm", { locale })
  }

  // return (
  //   <main className="bg-white dark:bg-[#0B1120] min-h-screen pt-24">
  //     <div className="container mx-auto px-4 py-12">
  //       <div className="max-w-4xl mx-auto">
  //         {/* Header */}
  //         <motion.div
  //           className="text-center mb-12"
  //           initial={{ opacity: 0, y: 20 }}
  //           animate={{ opacity: 1, y: 0 }}
  //           transition={{ duration: 0.5 }}
  //         >
  //           <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">{t("booking.title")}</h1>
  //           <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{t("booking.description")}</p>
  //         </motion.div>

  //         {/* Progress Steps */}
  //         <div className="mb-12">
  //           <div className="flex items-center justify-between max-w-md mx-auto">
  //             {[1, 2, 3].map((step) => (
  //               <div key={step} className="flex flex-col items-center">
  //                 <div
  //                   className={`w-10 h-10 rounded-full flex items-center justify-center ${
  //                     currentStep >= step
  //                       ? "bg-primary dark:bg-dark-highlight text-white"
  //                       : "bg-gray-200 dark:bg-dark-secondary text-gray-500 dark:text-gray-400"
  //                   }`}
  //                 >
  //                   {currentStep > step ? <Check size={20} /> : <span className="text-sm font-medium">{step}</span>}
  //                 </div>
  //                 <span
  //                   className={`text-sm mt-2 ${
  //                     currentStep >= step
  //                       ? "text-gray-800 dark:text-white font-medium"
  //                       : "text-gray-500 dark:text-gray-400"
  //                   }`}
  //                 >
  //                   {t(`booking.step${step}`)}
  //                 </span>
  //               </div>
  //             ))}
  //           </div>
  //           <div className="relative h-1 max-w-md mx-auto mt-4 bg-gray-200 dark:bg-dark-secondary rounded-full overflow-hidden">
  //             <div
  //               className="absolute top-0 left-0 h-full bg-primary dark:bg-dark-highlight transition-all duration-300"
  //               style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
  //             ></div>
  //           </div>
  //         </div>

  //         {/* Booking Complete Message */}
  //         {bookingComplete ? (
  //           <motion.div
  //             className="bg-white dark:bg-dark-secondary rounded-xl shadow-lg p-8 text-center"
  //             initial={{ opacity: 0, scale: 0.9 }}
  //             animate={{ opacity: 1, scale: 1 }}
  //             transition={{ duration: 0.5 }}
  //           >
  //             <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
  //               <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
  //             </div>
  //             <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{t("booking.bookingComplete")}</h2>
  //             <p className="text-gray-600 dark:text-gray-300 mb-6">
  //               {t("booking.confirmationSent", { email: formData.email })}
  //             </p>
  //             <div className="bg-gray-50 dark:bg-dark-primary/50 rounded-lg p-6 mb-8">
  //               <div className="flex items-center justify-between mb-4">
  //                 <div className="flex items-center">
  //                   <Calendar className="w-5 h-5 text-primary dark:text-dark-highlight mr-2" />
  //                   <span className="text-gray-700 dark:text-gray-300">
  //                     {selectedDate && format(selectedDate, "EEEE, d MMMM yyyy", { locale })}
  //                   </span>
  //                 </div>
  //                 <div className="flex items-center">
  //                   <Clock className="w-5 h-5 text-primary dark:text-dark-highlight mr-2" />
  //                   <span className="text-gray-700 dark:text-gray-300">
  //                     {selectedTimeSlot &&
  //                       `${formatTime(selectedTimeSlot.startTime)} - ${formatTime(selectedTimeSlot.endTime)}`}
  //                   </span>
  //                 </div>
  //               </div>
  //               <div className="flex items-center mb-2">
  //                 <User className="w-5 h-5 text-primary dark:text-dark-highlight mr-2" />
  //                 <span className="text-gray-700 dark:text-gray-300">{formData.name}</span>
  //               </div>
  //               <div className="flex items-center">
  //                 <Mail className="w-5 h-5 text-primary dark:text-dark-highlight mr-2" />
  //                 <span className="text-gray-700 dark:text-gray-300">{formData.email}</span>
  //               </div>
  //             </div>
  //             <button
  //               onClick={resetBooking}
  //               className="px-6 py-3 bg-primary hover:bg-primary/90 dark:bg-dark-highlight dark:hover:bg-dark-highlight/90 text-white rounded-lg transition-colors"
  //             >
  //               {t("booking.bookAnother")}
  //             </button>
  //           </motion.div>
  //         ) : (
  //           <>
  //             {/* Step 1: Select Date and Time */}
  //             {currentStep === 1 && (
  //               <motion.div
  //                 className="bg-white dark:bg-dark-secondary rounded-xl shadow-lg overflow-hidden"
  //                 initial={{ opacity: 0, y: 20 }}
  //                 animate={{ opacity: 1, y: 0 }}
  //                 transition={{ duration: 0.5 }}
  //               >
  //                 <div className="p-6 border-b border-gray-200 dark:border-gray-700">
  //                   <h2 className="text-xl font-bold text-gray-800 dark:text-white">{t("booking.selectDateTime")}</h2>
  //                 </div>

  //                 {/* Calendar Week View */}
  //                 <div className="p-6">
  //                   <div className="flex items-center justify-between mb-6">
  //                     <button
  //                       onClick={goToPreviousWeek}
  //                       className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-primary/50 transition-colors"
  //                       aria-label="Previous week"
  //                     >
  //                       <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
  //                     </button>
  //                     <h3 className="text-lg font-medium text-gray-800 dark:text-white">
  //                       {format(startOfWeek(currentDate, { weekStartsOn: 1 }), "MMMM yyyy", { locale })}
  //                     </h3>
  //                     <button
  //                       onClick={goToNextWeek}
  //                       className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-primary/50 transition-colors"
  //                       aria-label="Next week"
  //                     >
  //                       <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
  //                     </button>
  //                   </div>

  //                   <div className="grid grid-cols-7 gap-2 mb-6">
  //                     {getDatesForWeekView().map((date, index) => {
  //                       const isToday = format(date, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")
  //                       const isPast = isBefore(date, new Date()) && !isToday
  //                       const isSelected =
  //                         selectedDate && format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")

  //                       return (
  //                         <button
  //                           key={index}
  //                           onClick={() => !isPast && handleDateSelect(date)}
  //                           disabled={isPast}
  //                           className={`p-3 rounded-lg flex flex-col items-center transition-colors ${
  //                             isSelected
  //                               ? "bg-primary dark:bg-dark-highlight text-white"
  //                               : isToday
  //                                 ? "bg-primary/10 dark:bg-dark-highlight/10 text-primary dark:text-dark-highlight"
  //                                 : isPast
  //                                   ? "bg-gray-100 dark:bg-dark-primary/30 text-gray-400 dark:text-gray-600 cursor-not-allowed"
  //                                   : "hover:bg-gray-100 dark:hover:bg-dark-primary/50 text-gray-700 dark:text-gray-300"
  //                           }`}
  //                         >
  //                           <span className="text-xs font-medium mb-1">{format(date, "EEE", { locale })}</span>
  //                           <span className="text-lg font-bold">{format(date, "d", { locale })}</span>
  //                         </button>
  //                       )
  //                     })}
  //                   </div>

  //                   {/* Time Slots */}
  //                   {selectedDate ? (
  //                     <div>
  //                       <h4 className="text-md font-medium text-gray-800 dark:text-white mb-4">
  //                         {format(selectedDate, "EEEE, d MMMM yyyy", { locale })}
  //                       </h4>

  //                       {timeSlots.length > 0 ? (
  //                         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
  //                           {timeSlots.map((slot, index) => (
  //                             <button
  //                               key={index}
  //                               onClick={() => slot.available && handleTimeSlotSelect(slot)}
  //                               disabled={!slot.available}
  //                               className={`p-3 rounded-lg text-center transition-colors ${
  //                                 selectedTimeSlot === slot
  //                                   ? "bg-primary dark:bg-dark-highlight text-white"
  //                                   : slot.available
  //                                     ? "bg-gray-100 dark:bg-dark-primary/50 hover:bg-gray-200 dark:hover:bg-dark-primary text-gray-700 dark:text-gray-300"
  //                                     : "bg-gray-100 dark:bg-dark-primary/30 text-gray-400 dark:text-gray-600 cursor-not-allowed"
  //                               }`}
  //                             >
  //                               {formatTime(slot.startTime)}
  //                             </button>
  //                           ))}
  //                         </div>
  //                       ) : (
  //                         <div className="text-center py-8">
  //                           <p className="text-gray-500 dark:text-gray-400">{t("booking.noAvailableSlots")}</p>
  //                         </div>
  //                       )}
  //                     </div>
  //                   ) : (
  //                     <div className="text-center py-8">
  //                       <p className="text-gray-500 dark:text-gray-400">{t("booking.selectDatePrompt")}</p>
  //                     </div>
  //                   )}
  //                 </div>

  //                 <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
  //                   <button
  //                     onClick={goToNextStep}
  //                     disabled={!selectedTimeSlot}
  //                     className={`px-6 py-3 rounded-lg transition-colors ${
  //                       selectedTimeSlot
  //                         ? "bg-primary hover:bg-primary/90 dark:bg-dark-highlight dark:hover:bg-dark-highlight/90 text-white"
  //                         : "bg-gray-200 dark:bg-dark-primary/50 text-gray-500 dark:text-gray-400 cursor-not-allowed"
  //                     }`}
  //                   >
  //                     {t("booking.continue")}
  //                   </button>
  //                 </div>
  //               </motion.div>
  //             )}

  //             {/* Step 2: Meeting Details */}
  //             {currentStep === 2 && (
  //               <motion.div
  //                 className="bg-white dark:bg-dark-secondary rounded-xl shadow-lg overflow-hidden"
  //                 initial={{ opacity: 0, y: 20 }}
  //                 animate={{ opacity: 1, y: 0 }}
  //                 transition={{ duration: 0.5 }}
  //               >
  //                 <div className="p-6 border-b border-gray-200 dark:border-gray-700">
  //                   <h2 className="text-xl font-bold text-gray-800 dark:text-white">{t("booking.meetingDetails")}</h2>
  //                 </div>

  //                 <div className="p-6">
  //                   {/* Selected Date and Time Summary */}
  //                   <div className="bg-gray-50 dark:bg-dark-primary/50 rounded-lg p-4 mb-6 flex items-center justify-between">
  //                     <div className="flex items-center">
  //                       <Calendar className="w-5 h-5 text-primary dark:text-dark-highlight mr-2" />
  //                       <span className="text-gray-700 dark:text-gray-300">
  //                         {selectedDate && format(selectedDate, "EEEE, d MMMM yyyy", { locale })}
  //                       </span>
  //                     </div>
  //                     <div className="flex items-center">
  //                       <Clock className="w-5 h-5 text-primary dark:text-dark-highlight mr-2" />
  //                       <span className="text-gray-700 dark:text-gray-300">
  //                         {selectedTimeSlot &&
  //                           `${formatTime(selectedTimeSlot.startTime)} - ${formatTime(selectedTimeSlot.endTime)}`}
  //                       </span>
  //                     </div>
  //                   </div>

  //                   {/* Meeting Type */}
  //                   <div className="mb-6">
  //                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
  //                       {t("booking.meetingType")}
  //                     </label>
  //                     <select
  //                       name="meetingType"
  //                       value={formData.meetingType}
  //                       onChange={handleInputChange}
  //                       className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-highlight dark:bg-dark-primary dark:text-white"
  //                     >
  //                       <option value="consultation">{t("booking.meetingTypes.consultation")}</option>
  //                       <option value="interview">{t("booking.meetingTypes.interview")}</option>
  //                       <option value="project_discussion">{t("booking.meetingTypes.project_discussion")}</option>
  //                       <option value="technical_support">{t("booking.meetingTypes.technical_support")}</option>
  //                     </select>
  //                   </div>

  //                   {/* Meeting Duration */}
  //                   <div className="mb-6">
  //                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
  //                       {t("booking.meetingDuration")}
  //                     </label>
  //                     <div className="grid grid-cols-4 gap-3">
  //                       {[15, 30, 45, 60].map((duration) => (
  //                         <button
  //                           key={duration}
  //                           type="button"
  //                           onClick={() =>
  //                             setFormData((prev) => ({ ...prev, meetingDuration: duration as MeetingDuration }))
  //                           }
  //                           className={`p-3 rounded-lg text-center transition-colors ${
  //                             formData.meetingDuration === duration
  //                               ? "bg-primary dark:bg-dark-highlight text-white"
  //                               : "bg-gray-100 dark:bg-dark-primary/50 hover:bg-gray-200 dark:hover:bg-dark-primary text-gray-700 dark:text-gray-300"
  //                           }`}
  //                         >
  //                           {duration} {t("booking.minutes")}
  //                         </button>
  //                       ))}
  //                     </div>
  //                   </div>

  //                   {/* Meeting Method */}
  //                   <div className="mb-6">
  //                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
  //                       {t("booking.meetingMethod")}
  //                     </label>
  //                     <div className="grid grid-cols-3 gap-3">
  //                       <button
  //                         type="button"
  //                         onClick={() => setFormData((prev) => ({ ...prev, meetingMethod: "video" }))}
  //                         className={`p-4 rounded-lg flex flex-col items-center transition-colors ${
  //                           formData.meetingMethod === "video"
  //                             ? "bg-primary dark:bg-dark-highlight text-white"
  //                             : "bg-gray-100 dark:bg-dark-primary/50 hover:bg-gray-200 dark:hover:bg-dark-primary text-gray-700 dark:text-gray-300"
  //                         }`}
  //                       >
  //                         <Video className="w-6 h-6 mb-2" />
  //                         <span>{t("booking.meetingMethods.video")}</span>
  //                       </button>
  //                       <button
  //                         type="button"
  //                         onClick={() => setFormData((prev) => ({ ...prev, meetingMethod: "phone" }))}
  //                         className={`p-4 rounded-lg flex flex-col items-center transition-colors ${
  //                           formData.meetingMethod === "phone"
  //                             ? "bg-primary dark:bg-dark-highlight text-white"
  //                             : "bg-gray-100 dark:bg-dark-primary/50 hover:bg-gray-200 dark:hover:bg-dark-primary text-gray-700 dark:text-gray-300"
  //                         }`}
  //                       >
  //                         <Phone className="w-6 h-6 mb-2" />
  //                         <span>{t("booking.meetingMethods.phone")}</span>
  //                       </button>
  //                       <button
  //                         type="button"
  //                         onClick={() => setFormData((prev) => ({ ...prev, meetingMethod: "in_person" }))}
  //                         className={`p-4 rounded-lg flex flex-col items-center transition-colors ${
  //                           formData.meetingMethod === "in_person"
  //                             ? "bg-primary dark:bg-dark-highlight text-white"
  //                             : "bg-gray-100 dark:bg-dark-primary/50 hover:bg-gray-200 dark:hover:bg-dark-primary text-gray-700 dark:text-gray-300"
  //                         }`}
  //                       >
  //                         <Briefcase className="w-6 h-6 mb-2" />
  //                         <span>{t("booking.meetingMethods.in_person")}</span>
  //                       </button>
  //                     </div>
  //                   </div>
  //                 </div>

  //                 <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-between">
  //                   <button
  //                     onClick={goToPreviousStep}
  //                     className="px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-dark-primary/50 dark:hover:bg-dark-primary text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
  //                   >
  //                     {t("booking.back")}
  //                   </button>
  //                   <button
  //                     onClick={goToNextStep}
  //                     className="px-6 py-3 bg-primary hover:bg-primary/90 dark:bg-dark-highlight dark:hover:bg-dark-highlight/90 text-white rounded-lg transition-colors"
  //                   >
  //                     {t("booking.continue")}
  //                   </button>
  //                 </div>
  //               </motion.div>
  //             )}

  //             {/* Step 3: Contact Information */}
  //             {currentStep === 3 && (
  //               <motion.div
  //                 className="bg-white dark:bg-dark-secondary rounded-xl shadow-lg overflow-hidden"
  //                 initial={{ opacity: 0, y: 20 }}
  //                 animate={{ opacity: 1, y: 0 }}
  //                 transition={{ duration: 0.5 }}
  //               >
  //                 <div className="p-6 border-b border-gray-200 dark:border-gray-700">
  //                   <h2 className="text-xl font-bold text-gray-800 dark:text-white">
  //                     {t("booking.contactInformation")}
  //                   </h2>
  //                 </div>

  //                 <form onSubmit={handleSubmit} className="p-6">
  //                   {/* Selected Date, Time, and Meeting Details Summary */}
  //                   <div className="bg-gray-50 dark:bg-dark-primary/50 rounded-lg p-4 mb-6">
  //                     <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
  //                       <div className="flex items-center mb-2 sm:mb-0">
  //                         <Calendar className="w-5 h-5 text-primary dark:text-dark-highlight mr-2" />
  //                         <span className="text-gray-700 dark:text-gray-300">
  //                           {selectedDate && format(selectedDate, "EEEE, d MMMM yyyy", { locale })}
  //                         </span>
  //                       </div>
  //                       <div className="flex items-center">
  //                         <Clock className="w-5 h-5 text-primary dark:text-dark-highlight mr-2" />
  //                         <span className="text-gray-700 dark:text-gray-300">
  //                           {selectedTimeSlot &&
  //                             `${formatTime(selectedTimeSlot.startTime)} - ${formatTime(selectedTimeSlot.endTime)}`}
  //                         </span>
  //                       </div>
  //                     </div>
  //                     <div className="flex flex-wrap gap-2">
  //                       <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 dark:bg-dark-highlight/10 text-primary dark:text-dark-highlight">
  //                         {t(`booking.meetingTypes.${formData.meetingType}`)}
  //                       </span>
  //                       <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 dark:bg-dark-highlight/10 text-primary dark:text-dark-highlight">
  //                         {formData.meetingDuration} {t("booking.minutes")}
  //                       </span>
  //                       <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 dark:bg-dark-highlight/10 text-primary dark:text-dark-highlight">
  //                         {t(`booking.meetingMethods.${formData.meetingMethod}`)}
  //                       </span>
  //                     </div>
  //                   </div>

  //                   {/* Contact Form */}
  //                   <div className="space-y-6">
  //                     {/* Name */}
  //                     <div>
  //                       <label
  //                         htmlFor="name"
  //                         className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
  //                       >
  //                         {t("booking.name")} *
  //                       </label>
  //                       <input
  //                         type="text"
  //                         id="name"
  //                         name="name"
  //                         value={formData.name}
  //                         onChange={handleInputChange}
  //                         required
  //                         className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-highlight dark:bg-dark-primary dark:text-white"
  //                       />
  //                     </div>

  //                     {/* Email */}
  //                     <div>
  //                       <label
  //                         htmlFor="email"
  //                         className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
  //                       >
  //                         {t("booking.email")} *
  //                       </label>
  //                       <input
  //                         type="email"
  //                         id="email"
  //                         name="email"
  //                         value={formData.email}
  //                         onChange={handleInputChange}
  //                         required
  //                         className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-highlight dark:bg-dark-primary dark:text-white"
  //                       />
  //                     </div>

  //                     {/* Company */}
  //                     <div>
  //                       <label
  //                         htmlFor="company"
  //                         className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
  //                       >
  //                         {t("booking.company")}
  //                       </label>
  //                       <input
  //                         type="text"
  //                         id="company"
  //                         name="company"
  //                         value={formData.company}
  //                         onChange={handleInputChange}
  //                         className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-highlight dark:bg-dark-primary dark:text-white"
  //                       />
  //                     </div>

  //                     {/* Message */}
  //                     <div>
  //                       <label
  //                         htmlFor="message"
  //                         className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
  //                       >
  //                         {t("booking.message")}
  //                       </label>
  //                       <textarea
  //                         id="message"
  //                         name="message"
  //                         value={formData.message}
  //                         onChange={handleInputChange}
  //                         rows={4}
  //                         className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-highlight dark:bg-dark-primary dark:text-white"
  //                       />
  //                     </div>
  //                   </div>
  //                 </form>

  //                 <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-between">
  //                   <button
  //                     onClick={goToPreviousStep}
  //                     className="px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-dark-primary/50 dark:hover:bg-dark-primary text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
  //                   >
  //                     {t("booking.back")}
  //                   </button>
  //                   <button
  //                     onClick={handleSubmit}
  //                     disabled={isSubmitting || !formData.name || !formData.email}
  //                     className={`px-6 py-3 rounded-lg transition-colors ${
  //                       isSubmitting || !formData.name || !formData.email
  //                         ? "bg-gray-200 dark:bg-dark-primary/50 text-gray-500 dark:text-gray-400 cursor-not-allowed"
  //                         : "bg-primary hover:bg-primary/90 dark:bg-dark-highlight dark:hover:bg-dark-highlight/90 text-white"
  //                     }`}
  //                   >
  //                     {isSubmitting ? t("booking.submitting") : t("booking.confirmBooking")}
  //                   </button>
  //                 </div>
  //               </motion.div>
  //             )}
  //           </>
  //         )}
  //       </div>
  //     </div>
  //     <Footer />
  //   </main>
  // )
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <ComingSoon />
    </div>
  )
}
