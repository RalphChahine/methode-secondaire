import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

export default function MotionCard({ className = "", children, ...props }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.008 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 220, damping: 24 }}
      {...props}
    >
      <Card className={`glow-border transform-gpu ${className}`}>
        {children}
      </Card>
    </motion.div>
  )
}
