import React from "react"
import { Shield } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface PrivacyBadgeProps {
  className?: string
  label?: string
}

export function PrivacyBadge({ className, label = "Private" }: PrivacyBadgeProps) {
  return (
    <Badge variant="outline" className={cn("gap-1.5", className)}>
      <Shield className="h-3 w-3" />
      {label}
    </Badge>
  )
}
