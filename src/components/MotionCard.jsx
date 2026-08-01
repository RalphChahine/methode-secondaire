import { Card } from "@/components/ui/card"

export default function MotionCard({ className = "", children, interactive = false, ...props }) {
  return <div {...props} className={interactive ? "motion-card-interactive" : undefined}>
    <Card className={`glow-border ${className}`}>{children}</Card>
  </div>
}
