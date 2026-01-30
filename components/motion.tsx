"use client"

import { motion, useReducedMotion } from "framer-motion"
import { type ComponentProps, type ReactNode, useState, useEffect } from "react"

// Hook to safely handle reduced motion during SSR/Hydration
export function useSafeReducedMotion() {
  const shouldReduceMotion = useReducedMotion()
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    if (shouldReduceMotion) {
      setPrefersReducedMotion(true)
    }
  }, [shouldReduceMotion])

  return prefersReducedMotion
}

// Reusable animation variants
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
}

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
}

export const fadeInDown = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } }
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
}

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
}

// Motion components with reduced motion support
interface MotionDivProps extends ComponentProps<typeof motion.div> {
  children?: ReactNode
}

export function MotionDiv({ children, ...props }: MotionDivProps) {
  const prefersReducedMotion = useSafeReducedMotion()

  if (prefersReducedMotion) {
    return <div className={props.className as string}>{children}</div>
  }

  return <motion.div {...props}>{children}</motion.div>
}

interface MotionSectionProps extends ComponentProps<typeof motion.section> {
  children?: ReactNode
}

export function MotionSection({ children, ...props }: MotionSectionProps) {
  const prefersReducedMotion = useSafeReducedMotion()

  if (prefersReducedMotion) {
    return <section className={props.className as string}>{children}</section>
  }

  return <motion.section {...props}>{children}</motion.section>
}

// Page transition wrapper
export function PageTransition({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useSafeReducedMotion()

  if (prefersReducedMotion) {
    return <>{children}</>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  )
}

// Hover card effect
export function HoverCard({
  children,
  className = ""
}: {
  children: ReactNode
  className?: string
}) {
  const prefersReducedMotion = useSafeReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  )
}

// Animated counter
export function AnimatedCounter({
  value,
  suffix = "",
  className = ""
}: {
  value: number
  suffix?: string
  className?: string
}) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      key={value}
    >
      {value}{suffix}
    </motion.span>
  )
}
