import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

export default function MotionCard({ className = "", children, interactive = false, ...props }) {
  const interaction = interactive
    ? {
        whileHover: { y: -3 },
        whileTap: { scale: 0.985 },
        transition: { type: "spring", stiffness: 280, damping: 24 },
      }
    : {}

  return (
    <motion.div
      {...interaction}
      {...props}
    >
      <Card className={`glow-border transform-gpu ${className}`}>
        {children}
      </Card>
    </motion.div>
  )
}
