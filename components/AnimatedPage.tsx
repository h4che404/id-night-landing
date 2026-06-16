"use client";

import { motion } from "framer-motion";
import { stagger } from "@/components/motion";

interface AnimatedPageProps {
  children: React.ReactNode;
  className?: string;
}

export default function AnimatedPage({ children, className }: AnimatedPageProps) {
  return (
    <motion.div
      variants={stagger(0.08)}
      initial="hidden"
      animate="show"
      className={className}
    >
      {children}
    </motion.div>
  );
}
