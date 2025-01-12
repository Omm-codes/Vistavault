"use client";

import { motion } from "framer-motion";

export default function AnimatedHomeTitle() {
  return (
    <motion.h1
      className="text-4xl font-bold text-center mb-6 text-red-500"
      animate={{ scale: 1.1 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    >
      Welcome to Vistavault - Spider-Man Edition
    </motion.h1>
  );
}
