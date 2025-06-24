import { motion } from 'framer-motion';
import { type PropsWithChildren } from 'react';

export default function AnimatedPage({ children }: PropsWithChildren) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}
