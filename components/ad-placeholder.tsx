import { cn } from "@/lib/utils"

interface AdPlaceholderProps {
  className?: string
  size?: "banner" | "rectangle" | "leaderboard"
}

const sizes = {
  banner: "h-[90px] max-w-[728px]",
  rectangle: "h-[250px] max-w-[300px]",
  leaderboard: "h-[90px] max-w-[970px]",
}

export function AdPlaceholder({ className, size = "banner" }: AdPlaceholderProps) {
  return (
    <div className={cn("flex justify-center px-4", className)}>
      <div
        className={cn(
          "w-full flex items-center justify-center bg-muted/50 border border-dashed border-border rounded-lg text-muted-foreground text-sm",
          sizes[size]
        )}
        role="complementary"
        aria-label="Advertisement"
      >
        <span className="opacity-50">Advertisement</span>
      </div>
    </div>
  )
}
