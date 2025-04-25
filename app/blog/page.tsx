"use client"

import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Calendar, Clock, ArrowRight, Search, Tag, X } from "lucide-react"
import Footer from "@/components/footer"
import { blogPosts } from "@/data/blog-data"
import ComingSoon from "@/components/CommingSoon/CommingSoon"

export default function BlogPage() {
  const { t, i18n } = useTranslation()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [filteredPosts, setFilteredPosts] = useState([])

  // Get the current language data
  const currentLanguage = i18n.language || "en"
  const currentBlogPosts = blogPosts[currentLanguage as keyof typeof blogPosts] || blogPosts.en

  // Extract all unique categories
  const categories = Array.from(new Set(currentBlogPosts.map((post) => post.category)))

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage)
    }

    // Filter posts based on search term and category
    const filtered = currentBlogPosts.filter((post) => {
      const matchesSearch =
        searchTerm === "" ||
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = selectedCategory === null || post.category === selectedCategory

      return matchesSearch && matchesCategory
    })

    setFilteredPosts(filtered)
  }, [i18n, searchTerm, selectedCategory, currentBlogPosts])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  // return (
  //   <main className="bg-white dark:bg-[#0B1120] min-h-screen pt-24">
  //     {/* Hero Section */}
  //     <section className="relative py-20 mb-12 overflow-hidden">
  //       <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-blue-600/5 dark:from-dark-highlight/10 dark:to-blue-700/5 z-0"></div>

  //       <div className="container mx-auto px-4 relative z-10">
  //         <div className="max-w-4xl mx-auto text-center">
  //           <motion.h1
  //             className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-white"
  //             initial={{ opacity: 0, y: 20 }}
  //             animate={{ opacity: 1, y: 0 }}
  //             transition={{ duration: 0.5 }}
  //           >
  //             {t("blog.title")}
  //           </motion.h1>

  //           <motion.p
  //             className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto"
  //             initial={{ opacity: 0, y: 20 }}
  //             animate={{ opacity: 1, y: 0 }}
  //             transition={{ duration: 0.5, delay: 0.1 }}
  //           >
  //             {t("blog.description")}
  //           </motion.p>

  //           {/* Search bar */}
  //           <motion.div
  //             className="mb-8 max-w-2xl mx-auto"
  //             initial={{ opacity: 0, y: 20 }}
  //             animate={{ opacity: 1, y: 0 }}
  //             transition={{ duration: 0.5, delay: 0.2 }}
  //           >
  //             <div className="relative">
  //               <input
  //                 type="text"
  //                 placeholder={t("blog.searchPlaceholder")}
  //                 value={searchTerm}
  //                 onChange={(e) => setSearchTerm(e.target.value)}
  //                 className="w-full px-5 py-4 pl-12 rounded-full border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-highlight dark:bg-dark-secondary/50 dark:text-white shadow-sm"
  //               />
  //               <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
  //               {searchTerm && (
  //                 <button
  //                   onClick={() => setSearchTerm("")}
  //                   className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
  //                 >
  //                   <X size={18} />
  //                 </button>
  //               )}
  //             </div>
  //           </motion.div>

  //           {/* Categories */}
  //           <motion.div
  //             className="flex flex-wrap justify-center gap-3 mb-8"
  //             initial={{ opacity: 0, y: 20 }}
  //             animate={{ opacity: 1, y: 0 }}
  //             transition={{ duration: 0.5, delay: 0.3 }}
  //           >
  //             <button
  //               onClick={() => setSelectedCategory(null)}
  //               className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
  //                 selectedCategory === null
  //                   ? "bg-primary text-white dark:bg-dark-highlight"
  //                   : "bg-gray-100 text-gray-700 dark:bg-dark-secondary/70 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-secondary"
  //               }`}
  //             >
  //               {t("blog.allCategories")}
  //             </button>

  //             {categories.map((category) => (
  //               <button
  //                 key={category}
  //                 onClick={() => setSelectedCategory(category)}
  //                 className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center ${
  //                   selectedCategory === category
  //                     ? "bg-primary text-white dark:bg-dark-highlight"
  //                     : "bg-gray-100 text-gray-700 dark:bg-dark-secondary/70 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-secondary"
  //                 }`}
  //               >
  //                 <Tag size={14} className="mr-1" />
  //                 {category}
  //               </button>
  //             ))}
  //           </motion.div>
  //         </div>
  //       </div>

  //       {/* Background elements */}
  //       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
  //         <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 dark:bg-dark-highlight/5 rounded-full blur-3xl"></div>
  //         <div className="absolute top-1/3 -right-24 w-96 h-96 bg-blue-500/5 dark:bg-blue-700/5 rounded-full blur-3xl"></div>
  //       </div>
  //     </section>

  //     <div className="container mx-auto px-4 mb-20">
  //       {/* Featured post */}
  //       {filteredPosts.length > 0 && (
  //         <motion.div
  //           className="mb-16"
  //           initial={{ opacity: 0, y: 20 }}
  //           animate={{ opacity: 1, y: 0 }}
  //           transition={{ duration: 0.5, delay: 0.3 }}
  //         >
  //           <Link href={`/blog/${filteredPosts[0].slug}`}>
  //             <div className="group relative rounded-2xl overflow-hidden shadow-xl">
  //               <div className="aspect-w-16 aspect-h-9 w-full">
  //                 <img
  //                   src={filteredPosts[0].coverImage || "/placeholder.svg?height=600&width=1200"}
  //                   alt={filteredPosts[0].title}
  //                   className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
  //                 />
  //               </div>
  //               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col justify-end p-8">
  //                 <span className="text-sm font-medium text-primary dark:text-dark-highlight bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full w-fit mb-4">
  //                   {filteredPosts[0].category}
  //                 </span>
  //                 <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-primary dark:group-hover:text-dark-highlight transition-colors">
  //                   {filteredPosts[0].title}
  //                 </h2>
  //                 <p className="text-white/80 mb-4 line-clamp-2">{filteredPosts[0].excerpt}</p>
  //                 <div className="flex items-center text-white/70 text-sm">
  //                   <div className="flex items-center mr-4">
  //                     <Calendar size={14} className="mr-1" />
  //                     <span>{filteredPosts[0].date}</span>
  //                   </div>
  //                   <div className="flex items-center">
  //                     <Clock size={14} className="mr-1" />
  //                     <span>
  //                       {filteredPosts[0].readTime} min {t("blog.readTime")}
  //                     </span>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           </Link>
  //         </motion.div>
  //       )}

  //       {/* No results message */}
  //       {filteredPosts.length === 0 && (
  //         <motion.div
  //           className="text-center py-16"
  //           initial={{ opacity: 0 }}
  //           animate={{ opacity: 1 }}
  //           transition={{ duration: 0.5 }}
  //         >
  //           <div className="mb-6 text-gray-400 dark:text-gray-500">
  //             <Search size={64} className="mx-auto" />
  //           </div>
  //           <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{t("blog.noResults")}</h3>
  //           <p className="text-gray-600 dark:text-gray-400 mb-8">{t("blog.tryDifferentSearch")}</p>
  //           <button
  //             onClick={() => {
  //               setSearchTerm("")
  //               setSelectedCategory(null)
  //             }}
  //             className="px-6 py-3 bg-primary hover:bg-primary/90 dark:bg-dark-highlight dark:hover:bg-dark-highlight/90 text-white rounded-lg transition-colors"
  //           >
  //             {t("blog.clearFilters")}
  //           </button>
  //         </motion.div>
  //       )}

  //       {/* Blog posts grid */}
  //       {filteredPosts.length > 0 && (
  //         <motion.div
  //           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
  //           variants={containerVariants}
  //           initial="hidden"
  //           animate="visible"
  //         >
  //           <AnimatePresence>
  //             {filteredPosts.slice(1).map((post, index) => (
  //               <motion.div key={post.slug} variants={itemVariants} layout exit={{ opacity: 0, y: 20 }}>
  //                 <Link href={`/blog/${post.slug}`}>
  //                   <div className="group bg-white dark:bg-dark-secondary rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col">
  //                     <div className="relative overflow-hidden">
  //                       <img
  //                         src={post.coverImage || "/placeholder.svg?height=400&width=800"}
  //                         alt={post.title}
  //                         className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
  //                       />
  //                       <div className="absolute top-4 left-4">
  //                         <span className="text-xs font-medium text-primary dark:text-dark-highlight bg-white/90 dark:bg-dark-primary/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
  //                           {post.category}
  //                         </span>
  //                       </div>
  //                     </div>
  //                     <div className="p-6 flex-1 flex flex-col">
  //                       <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white group-hover:text-primary dark:group-hover:text-dark-highlight transition-colors">
  //                         {post.title}
  //                       </h3>
  //                       <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-1">{post.excerpt}</p>
  //                       <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
  //                         <div className="flex items-center">
  //                           <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-dark-primary overflow-hidden mr-2">
  //                             <img
  //                               src={post.authorImage || "/placeholder.svg?height=50&width=50"}
  //                               alt={post.author}
  //                               className="w-full h-full object-cover"
  //                             />
  //                           </div>
  //                           <span className="text-sm text-gray-600 dark:text-gray-400">{post.author}</span>
  //                         </div>
  //                         <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
  //                           <Clock size={14} className="mr-1" />
  //                           <span>{post.readTime} min</span>
  //                         </div>
  //                       </div>
  //                     </div>
  //                   </div>
  //                 </Link>
  //               </motion.div>
  //             ))}
  //           </AnimatePresence>
  //         </motion.div>
  //       )}

  //       {/* Load more button */}
  //       {filteredPosts.length > 6 && (
  //         <div className="text-center mb-16">
  //           <motion.button
  //             className="px-6 py-3 bg-gray-100 dark:bg-dark-secondary text-gray-800 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-dark-secondary/80 transition-colors inline-flex items-center shadow-sm"
  //             whileHover={{ y: -3 }}
  //             whileTap={{ y: 0 }}
  //           >
  //             {t("blog.loadMore")}
  //             <ArrowRight size={16} className="ml-2" />
  //           </motion.button>
  //         </div>
  //       )}

  //       {/* Newsletter subscription */}
  //       <motion.div
  //         className="max-w-4xl mx-auto bg-gradient-to-r from-primary/10 to-blue-500/10 dark:from-dark-highlight/10 dark:to-blue-700/10 rounded-2xl p-8 md:p-12"
  //         initial={{ opacity: 0, y: 20 }}
  //         whileInView={{ opacity: 1, y: 0 }}
  //         viewport={{ once: true }}
  //         transition={{ duration: 0.5 }}
  //       >
  //         <div className="text-center mb-8">
  //           <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{t("blog.newsletterTitle")}</h3>
  //           <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{t("blog.newsletterDescription")}</p>
  //         </div>

  //         <form className="max-w-md mx-auto">
  //           <div className="flex flex-col sm:flex-row gap-3">
  //             <input
  //               type="email"
  //               placeholder={t("blog.emailPlaceholder")}
  //               className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-highlight dark:bg-dark-secondary/50 dark:text-white"
  //               required
  //             />
  //             <button
  //               type="submit"
  //               className="px-6 py-3 bg-primary hover:bg-primary/90 dark:bg-dark-highlight dark:hover:bg-dark-highlight/90 text-white rounded-lg transition-colors whitespace-nowrap"
  //             >
  //               {t("blog.subscribe")}
  //             </button>
  //           </div>
  //           <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">{t("blog.privacyNotice")}</p>
  //         </form>
  //       </motion.div>
  //     </div>

  //     <Footer />
  //   </main>
  // )
  // comming soon
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <ComingSoon />
    </div>
  )
}
