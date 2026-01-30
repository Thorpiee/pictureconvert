
export type Platform = "instagram" | "twitter" | "linkedin" | "tiktok" | "youtube"

export interface Preset {
  id: string
  name: string
  width: number
  height: number
  quality: number
  description: string
  aspectRatioLabel?: string // e.g. "1:1", "16:9"
}

export const PLATFORM_PRESETS: Record<Platform, Preset[]> = {
  instagram: [
    { id: "ig-square", name: "Square Post", width: 1080, height: 1080, quality: 0.9, description: "Standard 1:1 post", aspectRatioLabel: "1:1" },
    { id: "ig-portrait", name: "Portrait Post", width: 1080, height: 1350, quality: 0.9, description: "Vertical 4:5 post", aspectRatioLabel: "4:5" },
    { id: "ig-landscape", name: "Landscape Post", width: 1080, height: 566, quality: 0.9, description: "Horizontal post", aspectRatioLabel: "1.91:1" },
    { id: "ig-story", name: "Story / Reel", width: 1080, height: 1920, quality: 0.85, description: "Full screen story or reel", aspectRatioLabel: "9:16" },
  ],
  tiktok: [
    { id: "tt-video", name: "Video Cover", width: 1080, height: 1920, quality: 0.85, description: "Standard vertical video format", aspectRatioLabel: "9:16" },
  ],
  youtube: [
    { id: "yt-thumb", name: "Thumbnail", width: 1280, height: 720, quality: 0.85, description: "Standard HD thumbnail", aspectRatioLabel: "16:9" },
    { id: "yt-thumb-hd", name: "Full HD Thumbnail", width: 1920, height: 1080, quality: 0.85, description: "High definition thumbnail", aspectRatioLabel: "16:9" },
  ],
  twitter: [
    { id: "tw-post", name: "In-Stream Photo", width: 1600, height: 900, quality: 0.85, description: "Optimal for timeline", aspectRatioLabel: "16:9" },
    { id: "tw-header", name: "Header Photo", width: 1500, height: 500, quality: 0.85, description: "Profile header banner", aspectRatioLabel: "3:1" },
    { id: "tw-profile", name: "Profile Picture", width: 400, height: 400, quality: 0.9, description: "Square profile photo", aspectRatioLabel: "1:1" },
  ],
  linkedin: [
    { id: "li-post", name: "Shared Image", width: 1200, height: 627, quality: 0.85, description: "Standard post image", aspectRatioLabel: "1.91:1" },
    { id: "li-square", name: "Square Post", width: 1200, height: 1200, quality: 0.85, description: "Square post image", aspectRatioLabel: "1:1" },
    { id: "li-article", name: "Article Cover", width: 1200, height: 644, quality: 0.85, description: "Cover for articles", aspectRatioLabel: "1.86:1" },
    { id: "li-profile", name: "Profile Photo", width: 400, height: 400, quality: 0.9, description: "Professional profile shot", aspectRatioLabel: "1:1" },
    { id: "li-banner", name: "Company Banner", width: 1128, height: 191, quality: 0.85, description: "Company page banner", aspectRatioLabel: "5.9:1" },
  ]
}
