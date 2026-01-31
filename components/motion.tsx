"use client"

import { type ComponentProps, type ReactNode } from "react"

// Dummy variants to maintain API compatibility
export const fadeIn = {}
export const fadeInUp = {}
export const fadeInDown = {}
export const scaleIn = {}
export const staggerContainer = {}
export const staggerItem = {}

// Static replacements for Motion components
interface MotionDivProps extends ComponentProps<"div"> {
  variants?: any
  initial?: any
  animate?: any
  exit?: any
  transition?: any
  viewport?: any
  whileHover?: any
  whileTap?: any
}

export function MotionDiv({ children, variants, initial, animate, exit, transition, viewport, whileHover, whileTap, ...props }: MotionDivProps) {
  return <div {...props}>{children}</div>
}

interface MotionSectionProps extends ComponentProps<"section"> {
  variants?: any
  initial?: any
  animate?: any
  exit?: any
  transition?: any
  viewport?: any
}

export function MotionSection({ children, variants, initial, animate, exit, transition, viewport, ...props }: MotionSectionProps) {
  return <section {...props}>{children}</section>
}

// Page transition wrapper - renders children directly
export function PageTransition({ children }: { children: ReactNode }) {
  return <>{children}</>
}

// Hover card effect - static div
export function HoverCard({
  children,
  className = ""
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={className}>{children}</div>
}

// Animated counter - static span
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
    <span className={className}>
      {value}{suffix}
    </span>
  )
}

// Hook compatibility
export function useSafeReducedMotion() {
  return true // Act as if reduced motion is always preferred (no animations)
}
