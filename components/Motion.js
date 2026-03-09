import { motion } from "framer-motion";

export const FadeUp = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.25 }}
    transition={{ duration: 0.6, ease: "easeOut", delay }}
  >
    {children}
  </motion.div>
);

export const Stagger = ({ children }) => (
  <motion.div
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.2 }}
    variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
  >
    {children}
  </motion.div>
);

export const Item = ({ children }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 12 },
      show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    }}
  >
    {children}
  </motion.div>
);
