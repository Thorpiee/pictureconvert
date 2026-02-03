"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface LogoProps {
  className?: string
  iconClassName?: string
  textClassName?: string
  showText?: boolean
}

export function Logo({ className, iconClassName, textClassName, showText = true }: LogoProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Default to light logo if not mounted or theme is undefined
  const logoSrc = mounted && resolvedTheme === "dark"
    ? "/logo-darkmode.png"
    : "/logo-lightmode.png"

  return (
    <div className={cn("flex items-center", className)}>
      <div className={cn("relative flex items-center justify-center", iconClassName)}>
        <Image
          src={logoSrc}
          alt="PictureConvert Logo"
          width={200}
          height={56}
          className="h-full w-auto object-contain"
          priority
        />
      </div>
    </div>
  )
}
