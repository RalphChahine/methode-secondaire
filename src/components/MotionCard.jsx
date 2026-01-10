import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

export default function MotionCard({ className = "", children, ...props }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      {...props}
    >
      <Card className={`glow-border ${className}`}>
        {children}
      </Card>
    </motion.div>
  )
}
