import { Shield } from "lucide-react"
import { cn } from "@/lib/utils"

interface PrivacyBadgeProps {
  className?: string
}

export function PrivacyBadge({ className }: PrivacyBadgeProps) {
  return (
    <div className={cn(
      "inline-flex items-center gap-2 px-4 py-2 rounded-full",
      "bg-primary/10 text-primary text-sm font-medium",
      className
    )}>
      <Shield className="h-4 w-4" />
      <span>Runs locally. Files never uploaded.</span>
    </div>
  )
}
