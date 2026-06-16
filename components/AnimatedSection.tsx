"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/components/motion";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
}

export default function AnimatedSection({ children, className }: AnimatedSectionProps) {
  return (
    <motion.div variants={fadeUp} className={className}>
      {children}
    </motion.div>
  );
}
