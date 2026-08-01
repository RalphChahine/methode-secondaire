import { useEffect, useRef, useState } from "react"

export default function NotebookReveal({ children, className = "" }) {
  const elementRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element || typeof window === "undefined") {
      return undefined
    }

    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
      setIsVisible(true)
      return undefined
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        return
      }

      setIsVisible(true)
      observer.disconnect()
    }, { threshold: 0.12 })

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={elementRef} className={`notebook-reveal ${isVisible ? "is-visible" : ""} ${className}`}>
      {children}
    </div>
  )
}
