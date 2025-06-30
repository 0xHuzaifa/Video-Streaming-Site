"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Home as HomeIcon,
  Compass,
  PlaySquare,
  Clock,
  ThumbsUp,
  Bookmark,
  Download,
  Flame,
  ShoppingBag,
  Music,
  Film,
  Radio,
  Gamepad2,
  Newspaper,
  Trophy,
  Lightbulb,
  Play,
  MoreHorizontal,
  Zap,
  Star,
  TrendingUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// thumbnail images from assets
import nextjs from "@/assets/NextJS.jpg";
import javascript from "@/assets/JavaScript.jpg";
import deploy from "@/assets/Deploy.jpg";
import python from "@/assets/Python.jpg";
import css from "@/assets/CSS.jpg";
import typescript from "@/assets/TypeScript.jpg";
import Header from "@/components/common/Header";

// Mock data for videos
const mockVideos = [
  {
    id: 1,
    title: "Building a Modern React App with Next.js 14",
    channel: "TechTutorials",
    views: "1.2M",
    timestamp: "2 days ago",
    duration: "15:32",
    thumbnail: nextjs,
    avatar: "/placeholder.svg?height=36&width=36",
    verified: true,
    trending: true,
  },
  {
    id: 2,
    title: "10 JavaScript Tips Every Developer Should Know",
    channel: "CodeMaster",
    views: "856K",
    timestamp: "1 week ago",
    duration: "12:45",
    thumbnail: javascript,
    avatar: "/placeholder.svg?height=36&width=36",
    verified: false,
    trending: false,
  },
  {
    id: 3,
    title: "CSS Grid vs Flexbox: Complete Guide 2024",
    channel: "WebDesign Pro",
    views: "2.1M",
    timestamp: "3 days ago",
    duration: "18:20",
    thumbnail: css,
    avatar: "/placeholder.svg?height=36&width=36",
    verified: true,
    trending: true,
  },
  {
    id: 4,
    title: "Python Machine Learning Tutorial for Beginners",
    channel: "DataScience Hub",
    views: "3.4M",
    timestamp: "1 day ago",
    duration: "45:12",
    thumbnail: python,
    avatar: "/placeholder.svg?height=36&width=36",
    verified: true,
    trending: false,
  },
  {
    id: 5,
    title: "How to Deploy Your App to Vercel in 5 Minutes",
    channel: "DevOps Daily",
    views: "567K",
    timestamp: "4 days ago",
    duration: "8:30",
    thumbnail: deploy,
    avatar: "/placeholder.svg?height=36&width=36",
    verified: false,
    trending: false,
  },
  {
    id: 6,
    title: "TypeScript Best Practices and Common Mistakes",
    channel: "TypeScript Weekly",
    views: "1.8M",
    timestamp: "6 days ago",
    duration: "22:15",
    thumbnail: typescript,
    avatar: "/placeholder.svg?height=36&width=36",
    verified: true,
    trending: true,
  },
];

const categories = [
  { name: "All", icon: null },
  { name: "JavaScript", icon: null },
  { name: "React", icon: null },
  { name: "Next.js", icon: null },
  { name: "TypeScript", icon: null },
  { name: "CSS", icon: null },
  { name: "Python", icon: null },
  { name: "AI/ML", icon: Zap },
  { name: "Web Dev", icon: null },
  { name: "Tutorial", icon: null },
  { name: "Tech News", icon: null },
];

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Animation variants
  const sidebarVariants = {
    open: {
      width: "18rem", // w-72
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      width: "5rem", // w-20
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const contentVariants = {
    open: {
      marginLeft: "18rem",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      marginLeft: "5rem",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const sidebarContentVariants = {
    open: {
      opacity: 1,
      transition: {
        delay: 0.1,
        duration: 0.2,
      },
    },
    closed: {
      opacity: 0,
      transition: {
        duration: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-x-hidden">
      {/* Header */}
      <Header setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

      <div className="flex pt-20">
        {/* Sidebar */}
        <motion.aside
          variants={sidebarVariants}
          animate={sidebarOpen ? "open" : "closed"}
          className="fixed left-0 top-20 h-full bg-slate-900/50 backdrop-blur-xl border-r border-slate-800/50 z-40 overflow-hidden"
        >
          <div className="py-6 h-full overflow-y-auto sidebar-scroll">
            {/* Main Navigation */}
            <div className="px-4 mb-6">
              <div className="space-y-2">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="ghost"
                    className="w-full justify-start bg-gradient-to-r from-purple-500/20 to-blue-500/20 hover:from-purple-500/30 hover:to-blue-500/30 text-white border border-purple-500/30 rounded-xl"
                  >
                    <HomeIcon className="w-5 h-5 mr-3 flex-shrink-0" />
                    <AnimatePresence>
                      {sidebarOpen && (
                        <motion.span
                          variants={sidebarContentVariants}
                          initial="closed"
                          animate="open"
                          exit="closed"
                        >
                          Home
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="ghost"
                    className="w-full justify-start hover:bg-slate-800/50 text-slate-300 hover:text-white rounded-xl"
                  >
                    <Compass className="w-5 h-5 mr-3 flex-shrink-0" />
                    <AnimatePresence>
                      {sidebarOpen && (
                        <motion.span
                          variants={sidebarContentVariants}
                          initial="closed"
                          animate="open"
                          exit="closed"
                        >
                          Explore
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="ghost"
                    className="w-full justify-start hover:bg-slate-800/50 text-slate-300 hover:text-white rounded-xl"
                  >
                    <PlaySquare className="w-5 h-5 mr-3 flex-shrink-0" />
                    <AnimatePresence>
                      {sidebarOpen && (
                        <motion.span
                          variants={sidebarContentVariants}
                          initial="closed"
                          animate="open"
                          exit="closed"
                        >
                          Shorts
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="ghost"
                    className="w-full justify-start hover:bg-slate-800/50 text-slate-300 hover:text-white rounded-xl"
                  >
                    <Radio className="w-5 h-5 mr-3 flex-shrink-0" />
                    <AnimatePresence>
                      {sidebarOpen && (
                        <motion.span
                          variants={sidebarContentVariants}
                          initial="closed"
                          animate="open"
                          exit="closed"
                        >
                          Subscriptions
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>
                </motion.div>
              </div>
            </div>

            <AnimatePresence>
              {sidebarOpen && (
                <motion.div
                  variants={sidebarContentVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                >
                  <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent my-4" />

                  {/* Your Library section */}
                  <div className="px-4 mb-6">
                    <h3 className="text-sm font-semibold text-slate-400 mb-3 px-3 uppercase tracking-wider">
                      Your Library
                    </h3>
                    <div className="space-y-2">
                      {[
                        { icon: Clock, label: "History" },
                        { icon: PlaySquare, label: "Your videos" },
                        { icon: ThumbsUp, label: "Liked videos" },
                        { icon: Bookmark, label: "Watch later" },
                        { icon: Download, label: "Downloads" },
                      ].map((item, index) => (
                        <motion.div
                          key={item.label}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Button
                            variant="ghost"
                            className="w-full justify-start hover:bg-slate-800/50 text-slate-300 hover:text-white rounded-xl"
                          >
                            <item.icon className="w-5 h-5 mr-3" />
                            {item.label}
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent my-4" />

                  {/* Discover section */}
                  <div className="px-4 mb-6">
                    <h3 className="text-sm font-semibold text-slate-400 mb-3 px-3 uppercase tracking-wider">
                      Discover
                    </h3>
                    <div className="space-y-2">
                      {[
                        {
                          icon: Flame,
                          label: "Trending",
                          color: "text-orange-500",
                        },
                        {
                          icon: ShoppingBag,
                          label: "Shopping",
                          color: "text-green-500",
                        },
                        { icon: Music, label: "Music", color: "text-pink-500" },
                        {
                          icon: Film,
                          label: "Movies & TV",
                          color: "text-blue-500",
                        },
                        { icon: Radio, label: "Live", color: "text-red-500" },
                        {
                          icon: Gamepad2,
                          label: "Gaming",
                          color: "text-purple-500",
                        },
                        {
                          icon: Newspaper,
                          label: "News",
                          color: "text-yellow-500",
                        },
                        {
                          icon: Trophy,
                          label: "Sports",
                          color: "text-amber-500",
                        },
                        {
                          icon: Lightbulb,
                          label: "Learning",
                          color: "text-cyan-500",
                        },
                      ].map((item, index) => (
                        <motion.div
                          key={item.label}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Button
                            variant="ghost"
                            className="w-full justify-start hover:bg-slate-800/50 text-slate-300 hover:text-white rounded-xl"
                          >
                            <item.icon
                              className={`w-5 h-5 mr-3 ${item.color}`}
                            />
                            {item.label}
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent my-4" />

                  {/* Premium section */}
                  <div className="px-4 mb-6">
                    <motion.div
                      className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-2xl p-4"
                      whileHover={{ scale: 1.02 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      }}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                          <Star className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-semibold text-white">
                          StreamVibe Pro
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mb-3">
                        Unlock premium features and ad-free experience
                      </p>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          size="sm"
                          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-xl"
                        >
                          Upgrade Now
                        </Button>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.aside>

        {/* Main Content */}
        <motion.main
          variants={contentVariants}
          animate={sidebarOpen ? "open" : "closed"}
          className="flex-1 min-w-0"
        >
          {/* Category Pills */}
          <div className="sticky top-20 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/50 z-30">
            <div className="flex items-center space-x-3 px-8 py-4 overflow-x-auto">
              {categories.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant={
                      selectedCategory === category.name
                        ? "default"
                        : "secondary"
                    }
                    size="sm"
                    onClick={() => setSelectedCategory(category.name)}
                    className={`whitespace-nowrap rounded-full px-6 py-2 transition-all ${
                      selectedCategory === category.name
                        ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25"
                        : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white border border-slate-700/50"
                    }`}
                  >
                    {category.icon && (
                      <category.icon className="w-4 h-4 mr-2" />
                    )}
                    {category.name}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Video Grid */}
          <div className="p-8">
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {mockVideos.map((video, index) => (
                <motion.div
                  key={video.id}
                  className="group cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  {/* Video Thumbnail */}
                  <motion.div
                    className="relative aspect-video bg-slate-800 rounded-2xl overflow-hidden mb-4 ring-1 ring-slate-800/50 hover:ring-2 hover:ring-slate-400/50"
                    whileHover={{
                      scale: 1.02,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <motion.img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                      }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Duration Badge */}
                    <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-lg font-medium">
                      {video.duration}
                    </div>

                    {/* Trending Badge */}
                    {video.trending && (
                      <motion.div
                        className="absolute top-3 left-3"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          delay: 0.2,
                          type: "spring",
                          stiffness: 300,
                        }}
                      >
                        <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 rounded-full px-2 py-1">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Trending
                        </Badge>
                      </motion.div>
                    )}

                    {/* Play Button Overlay */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                      }}
                    >
                      <motion.div
                        className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Play className="w-6 h-6 text-white fill-white ml-1" />
                      </motion.div>
                    </motion.div>
                  </motion.div>

                  {/* Video Info */}
                  <div className="flex space-x-3">
                    <motion.div whileHover={{ scale: 1.1 }}>
                      <Avatar className="w-10 h-10 flex-shrink-0 ring-2 ring-slate-800/50">
                        <AvatarImage src={video.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm">
                          {video.channel[0]}
                        </AvatarFallback>
                      </Avatar>
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <motion.h3
                        className="font-semibold text-white line-clamp-2 text-sm leading-5 mb-2 transition-colors"
                        whileHover={{ color: "rgb(196 181 253)" }}
                      >
                        {video.title}
                      </motion.h3>
                      <div className="flex items-center space-x-1 mb-1">
                        <motion.p
                          className="text-slate-400 text-sm cursor-pointer transition-colors"
                          whileHover={{ color: "rgb(255 255 255)" }}
                        >
                          {video.channel}
                        </motion.p>
                        {video.verified && (
                          <motion.div
                            className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                              delay: 0.3,
                              type: "spring",
                              stiffness: 300,
                            }}
                          >
                            <svg
                              className="w-2.5 h-2.5 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </motion.div>
                        )}
                      </div>
                      <div className="flex items-center text-slate-500 text-sm space-x-1">
                        <span>{video.views} views</span>
                        <span>•</span>
                        <span>{video.timestamp}</span>
                      </div>
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:bg-slate-800/50 text-slate-400 hover:text-white rounded-xl"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.main>
      </div>
    </div>
  );
}
