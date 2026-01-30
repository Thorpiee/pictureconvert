"use client"

import type { ProcessingResult } from "./image-processor"

let heic2any: ((options: { blob: Blob; toType?: string; quality?: number }) => Promise<Blob | Blob[]>) | null = null

export async function loadHeicConverter() {
  if (!heic2any) {
    const module = await import("heic2any")
    heic2any = module.default
  }
  return heic2any
}

export async function convertHeicToJpg(
  file: File,
  quality: number = 0.95
): Promise<ProcessingResult> {
  const converter = await loadHeicConverter()
  
  const result = await converter({
    blob: file,
    toType: "image/jpeg",
    quality,
  })

  const blob = Array.isArray(result) ? result[0] : result
  
  // Get dimensions
  const url = URL.createObjectURL(blob)
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = reject
    image.src = url
  })

  return {
    blob,
    url,
    width: img.width,
    height: img.height,
    size: blob.size,
  }
}

export function isHeicSupported(): boolean {
  // HEIC conversion is supported via heic2any library
  return true
}
