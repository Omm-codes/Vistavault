"use client";

import { motion } from 'framer-motion';

interface HomeAnimationProps {
  children: React.ReactNode;
}

export const AnimatedH1: React.FC<{ text: string }> = ({ text }) => (
  <motion.h1
    className="text-4xl font-bold text-center mb-6"
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    {text}
  </motion.h1>
);

export const AnimatedH2: React.FC<{ text: string }> = ({ text }) => (
  <motion.h2
    className="text-3xl font-bold mb-4"
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
  >
    {text}
  </motion.h2>
);

export const AnimatedDiv: React.FC<HomeAnimationProps> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5, delay: 0.4 }}
  >
    {children}
  </motion.div>
);
