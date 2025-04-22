"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Bookmark,
  ThumbsUp,
  MessageSquare,
  Copy,
  Check,
  Twitter,
  Facebook,
  Linkedin,
} from "lucide-react"
import Footer from "@/components/footer"
import { blogPosts } from "@/data/blog-data"

export default function BlogPostPage() {
  const { t, i18n } = useTranslation()
  const params = useParams()
  const slug = params.slug as string
  const [copied, setCopied] = useState(false)
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [comment, setComment] = useState("")

  // Find the current post
  const post = blogPosts.find((post) => post.slug === slug)

  // Get the current URL for sharing
  const shareUrl = typeof window !== "undefined" ? window.location.href : ""

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleLike = () => {
    setLiked(!liked)
  }

  const handleBookmark = () => {
    setBookmarked(!bookmarked)
  }

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would send this to your backend
    console.log("Comment submitted:", comment)
    setComment("")
    alert(t("blog.commentSubmitted"))
  }

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage)
    }

    // Scroll to top when page loads
    window.scrollTo(0, 0)
  }, [i18n])

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0B1120]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{t("blog.postNotFound")}</h1>
          <Link href="/blog" className="text-primary dark:text-dark-highlight hover:underline">
            {t("blog.backToBlog")}
          </Link>
        </div>
      </div>
    )
  }

  // Find related posts (same category, excluding current post)
  const relatedPosts = blogPosts.filter((p) => p.category === post.category && p.slug !== post.slug).slice(0, 3)

  return (
    <main className="bg-white dark:bg-[#0B1120] min-h-screen pt-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back to blog link */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-dark-highlight transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              {t("blog.backToBlog")}
            </Link>
          </motion.div>

          {/* Post header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center mb-4">
              <span className="text-sm font-medium text-primary dark:text-dark-highlight bg-primary/10 dark:bg-dark-highlight/10 px-3 py-1 rounded-full">
                {post.category}
              </span>
              <span className="mx-2 text-gray-300 dark:text-gray-700">•</span>
              <div className="flex items-center text-gray-500 dark:text-gray-400">
                <Calendar size={14} className="mr-1" />
                <span className="text-sm">{post.date}</span>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-800 dark:text-white">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center text-gray-600 dark:text-gray-400 mb-8">
              <div className="flex items-center mr-6 mb-2">
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-dark-secondary overflow-hidden mr-3">
                  <img
                    src={post.authorImage || "/placeholder.svg?height=50&width=50"}
                    alt={post.author}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="font-medium text-gray-800 dark:text-white">{post.author}</span>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{t("blog.author")}</div>
                </div>
              </div>
              <div className="flex items-center mb-2 ml-auto">
                <Clock size={18} className="mr-2" />
                <span>
                  {post.readTime} min {t("blog.readTime")}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Featured image */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src={post.coverImage || "/placeholder.svg?height=600&width=1200"}
                alt={post.title}
                className="w-full h-auto"
              />
            </div>
          </motion.div>

          {/* Social sharing sidebar - desktop */}
          <div className="hidden md:block fixed left-4 top-1/2 transform -translate-y-1/2">
            <div className="flex flex-col space-y-4 bg-white dark:bg-dark-secondary rounded-full shadow-md p-3">
              <button
                onClick={handleLike}
                className={`p-2 rounded-full transition-colors ${
                  liked
                    ? "text-red-500 bg-red-50 dark:bg-red-900/20"
                    : "text-gray-400 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-dark-primary"
                }`}
                aria-label="Like"
              >
                <ThumbsUp size={18} />
              </button>

              <button
                onClick={handleBookmark}
                className={`p-2 rounded-full transition-colors ${
                  bookmarked
                    ? "text-primary dark:text-dark-highlight bg-primary/10 dark:bg-dark-highlight/10"
                    : "text-gray-400 hover:text-primary dark:hover:text-dark-highlight hover:bg-gray-100 dark:hover:bg-dark-primary"
                }`}
                aria-label="Bookmark"
              >
                <Bookmark size={18} />
              </button>

              <button
                onClick={handleCopyLink}
                className={`p-2 rounded-full transition-colors ${
                  copied
                    ? "text-green-500 bg-green-50 dark:bg-green-900/20"
                    : "text-gray-400 hover:text-primary dark:hover:text-dark-highlight hover:bg-gray-100 dark:hover:bg-dark-primary"
                }`}
                aria-label="Copy link"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
              </button>

              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full text-gray-400 hover:text-[#1DA1F2] hover:bg-gray-100 dark:hover:bg-dark-primary transition-colors"
                aria-label="Share on Twitter"
              >
                <Twitter size={18} />
              </a>

              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full text-gray-400 hover:text-[#4267B2] hover:bg-gray-100 dark:hover:bg-dark-primary transition-colors"
                aria-label="Share on Facebook"
              >
                <Facebook size={18} />
              </a>

              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full text-gray-400 hover:text-[#0077B5] hover:bg-gray-100 dark:hover:bg-dark-primary transition-colors"
                aria-label="Share on LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Post content */}
          <motion.div
            className="prose prose-lg max-w-none dark:prose-invert mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            dangerouslySetInnerHTML={{ __html: post.content || "<p>Content coming soon...</p>" }}
          />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mb-12">
              <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">{t("blog.tags")}</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <Link
                    key={index}
                    href={`/blog?tag=${tag}`}
                    className="px-3 py-1 bg-gray-100 dark:bg-dark-secondary text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-dark-secondary/80 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Post actions - mobile */}
          <motion.div
            className="md:hidden flex justify-between items-center border-t border-b border-gray-200 dark:border-gray-700 py-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex space-x-4">
              <button
                onClick={handleLike}
                className={`flex items-center ${liked ? "text-red-500" : "text-gray-600 dark:text-gray-400"}`}
              >
                <ThumbsUp size={20} className="mr-2" />
                <span>{liked ? (post.likes || 0) + 1 : post.likes || 0}</span>
              </button>
              <button
                className="flex items-center text-gray-600 dark:text-gray-400"
                onClick={() => document.getElementById("comments")?.scrollIntoView({ behavior: "smooth" })}
              >
                <MessageSquare size={20} className="mr-2" />
                <span>{post.comments?.length || 0}</span>
              </button>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleBookmark}
                className={`flex items-center ${
                  bookmarked ? "text-primary dark:text-dark-highlight" : "text-gray-600 dark:text-gray-400"
                }`}
              >
                <Bookmark size={20} className="mr-2" />
                <span>{t("blog.saveForLater")}</span>
              </button>
              <button
                onClick={() => {
                  const shareData = {
                    title: post.title,
                    text: post.excerpt,
                    url: shareUrl,
                  }

                  if (navigator.share) {
                    navigator.share(shareData)
                  } else {
                    handleCopyLink()
                  }
                }}
                className="flex items-center text-gray-600 dark:text-gray-400"
              >
                <Share2 size={20} className="mr-2" />
                <span>{t("blog.share")}</span>
              </button>
            </div>
          </motion.div>

          {/* Author bio */}
          <motion.div
            className="bg-gray-50 dark:bg-dark-secondary/30 rounded-xl p-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={post.authorImage || "/placeholder.svg?height=100&width=100"}
                  alt={post.author}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{post.author}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{t("blog.authorBio")}</p>
                <div className="flex space-x-3">
                  <a
                    href="#"
                    className="text-primary dark:text-dark-highlight hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Twitter
                  </a>
                  <a
                    href="#"
                    className="text-primary dark:text-dark-highlight hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="#"
                    className="text-primary dark:text-dark-highlight hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Comments section */}
          <motion.div
            id="comments"
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
              {t("blog.comments")} ({post.comments?.length || 0})
            </h3>

            {/* Comment form */}
            <div className="bg-white dark:bg-dark-secondary rounded-xl shadow-md p-6 mb-8">
              <h4 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">{t("blog.leaveComment")}</h4>
              <form onSubmit={handleSubmitComment}>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-highlight dark:bg-dark-primary dark:border-gray-700 dark:text-white mb-4"
                  rows={4}
                  placeholder={t("blog.commentPlaceholder")}
                  required
                ></textarea>
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary hover:bg-primary/90 dark:bg-dark-highlight dark:hover:bg-dark-highlight/90 text-white rounded-lg transition-colors"
                >
                  {t("blog.submit")}
                </button>
              </form>
            </div>

            {/* Comments list */}
            {post.comments && post.comments.length > 0 ? (
              <div className="space-y-6">
                {post.comments.map((comment, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-dark-secondary rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700"
                  >
                    <div className="flex items-start mb-4">
                      <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-dark-primary overflow-hidden mr-4">
                        <img
                          src="/placeholder.svg?height=50&width=50"
                          alt={comment.author}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h5 className="font-bold text-gray-800 dark:text-white">{comment.author}</h5>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{comment.date}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">{comment.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 dark:bg-dark-secondary/30 rounded-xl">
                <MessageSquare size={40} className="mx-auto mb-4 text-gray-400 dark:text-gray-500" />
                <p className="text-gray-600 dark:text-gray-400">{t("blog.noComments")}</p>
              </div>
            )}
          </motion.div>

          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">{t("blog.relatedPosts")}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`}>
                    <div className="group bg-white dark:bg-dark-secondary rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                      <div className="relative overflow-hidden">
                        <img
                          src={relatedPost.coverImage || "/placeholder.svg?height=300&width=600"}
                          alt={relatedPost.title}
                          className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="text-xs font-medium text-primary dark:text-dark-highlight bg-white/90 dark:bg-dark-primary/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm">
                            {relatedPost.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-4 flex-1 flex flex-col">
                        <h4 className="text-lg font-bold mb-2 text-gray-800 dark:text-white group-hover:text-primary dark:group-hover:text-dark-highlight transition-colors">
                          {relatedPost.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-2 flex-1">
                          {relatedPost.excerpt}
                        </p>
                        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100 dark:border-gray-700">
                          <span className="text-sm text-gray-500 dark:text-gray-400">{relatedPost.date}</span>
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <Clock size={14} className="mr-1" />
                            <span>{relatedPost.readTime} min</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}

          {/* Newsletter subscription */}
          <motion.div
            className="bg-gradient-to-r from-primary/10 to-blue-500/10 dark:from-dark-highlight/10 dark:to-blue-700/10 rounded-2xl p-8 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{t("blog.enjoyedReading")}</h3>
              <p className="text-gray-600 dark:text-gray-300">{t("blog.subscribePrompt")}</p>
            </div>

            <form className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder={t("blog.emailPlaceholder")}
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-highlight dark:bg-dark-secondary/50 dark:text-white"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary hover:bg-primary/90 dark:bg-dark-highlight dark:hover:bg-dark-highlight/90 text-white rounded-lg transition-colors whitespace-nowrap"
                >
                  {t("blog.subscribe")}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
