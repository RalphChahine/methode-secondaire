import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

export default function MotionCard({ className = "", children, ...props }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 240, damping: 24 }}
      {...props}
    >
      <Card className={`glow-border transform-gpu ${className}`}>
        {children}
      </Card>
    </motion.div>
  )
}
