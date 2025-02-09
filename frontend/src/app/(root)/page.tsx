"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { AccountCircle } from "@mui/icons-material";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r pb-28 pt-36 flex justify-center items-center from-slate-950 via-slate-800 to-slate-950 flex-col text-white p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-extrabold text-center drop-shadow-lg"
      >
        Welcome to{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-400 to-blue-600">
          BLOG MANIA
        </span>
      </motion.h1>
      <p className="mt-4 text-lg text-center opacity-90">
        Discover, Share, and Create Amazing Stories.
      </p>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-6"
      >
        <Link href="/sign-in">
          <span className="px-6 py-3 bg-blue-800 text-white font-semibold text-lg rounded-xl shadow-md hover:bg-white hover:text-black transition-all duration-300">
            Explore Blogs
          </span>
        </Link>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-3xl pt-20 font-bold text-center text-blue-500 mb-8"
      >
        MOST LIKED POSTS
      </motion.div>
      <div className="w-full max-w-4xl grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((blog) => (
          <motion.div
            key={blog}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: blog * 0.2, duration: 0.5 }}
            className="p-6 bg-white text-gray-800 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 hover:shadow-black hover:shadow-md"
          >
            {/* Profile Section */}
            <div className="flex items-center gap-3">
              <AccountCircle className="text-gray-600" fontSize="large" />
              <span className="text-lg font-semibold">John Doe</span>
            </div>
            <h3 className="text-xl font-bold">Awesome Blog #{blog}</h3>
            <p className="mt-2 text-sm text-gray-600">
              A sneak peek into an amazing story...
            </p>
            <Link href="/sign-in">
              <span className="mt-3 inline-block text-blue-500 font-semibold hover:underline">
                Read More →
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
