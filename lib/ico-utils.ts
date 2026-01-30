import JSZip from "jszip"

// Favicon sizes: 16, 32, 48, 64, 128, 256
const ICO_SIZES = [16, 32, 48, 64, 128, 256]

// Additional PNG sizes for the package
const PNG_SIZES = [
  { size: 16, name: "favicon-16x16.png" },
  { size: 32, name: "favicon-32x32.png" },
  { size: 180, name: "apple-touch-icon.png" },
  { size: 192, name: "android-chrome-192x192.png" },
  { size: 512, name: "android-chrome-512x512.png" },
]

// Helper to write Little Endian values
const writeLE16 = (arr: Uint8Array, pos: number, val: number) => {
  arr[pos] = val & 0xff
  arr[pos + 1] = (val >> 8) & 0xff
}

const writeLE32 = (arr: Uint8Array, pos: number, val: number) => {
  arr[pos] = val & 0xff
  arr[pos + 1] = (val >> 8) & 0xff
  arr[pos + 2] = (val >> 16) & 0xff
  arr[pos + 3] = (val >> 24) & 0xff
}

async function resizeImage(img: HTMLImageElement, size: number): Promise<Blob> {
  const canvas = document.createElement("canvas")
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext("2d")

  if (!ctx) throw new Error("Could not get canvas context")

  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = "high"
  ctx.drawImage(img, 0, 0, size, size)

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b) => {
      if (b) resolve(b)
      else reject(new Error("Failed to create blob"))
    }, "image/png")
  })
}

export async function generateIco(file: File): Promise<Blob> {
  const img = new Image()
  const url = URL.createObjectURL(file)

  await new Promise((resolve, reject) => {
    img.onload = resolve
    img.onerror = reject
    img.src = url
  })

  const resizedImages = []

  for (const size of ICO_SIZES) {
    try {
      const blob = await resizeImage(img, size)
      resizedImages.push({ size, blob, buffer: await blob.arrayBuffer() })
    } catch (e) {
      console.error(`Failed to generate ${size}x${size} icon`, e)
    }
  }

  URL.revokeObjectURL(url)

  // ICO Header: 6 bytes
  const headerSize = 6
  const directorySize = 16 * resizedImages.length
  const header = new Uint8Array(headerSize)
  writeLE16(header, 2, 1)
  writeLE16(header, 4, resizedImages.length)

  let offset = headerSize + directorySize
  const directories: Uint8Array[] = []

  for (const img of resizedImages) {
    const dir = new Uint8Array(16)
    const width = img.size === 256 ? 0 : img.size
    const height = img.size === 256 ? 0 : img.size

    dir[0] = width
    dir[1] = height
    dir[2] = 0 // Palette count
    dir[3] = 0 // Reserved
    writeLE16(dir, 4, 1) // Color planes
    writeLE16(dir, 6, 32) // Bits per pixel
    writeLE32(dir, 8, img.buffer.byteLength) // Size
    writeLE32(dir, 12, offset) // Offset

    directories.push(dir)
    offset += img.buffer.byteLength
  }

  const parts = [
    header.buffer as ArrayBuffer,
    ...directories.map(dir => dir.buffer as ArrayBuffer),
    ...resizedImages.map(img => img.buffer as ArrayBuffer)
  ]

  return new Blob(parts, { type: "image/x-icon" })
}

export async function generateFaviconPackage(file: File): Promise<Blob> {
  const zip = new JSZip()
  const img = new Image()
  const url = URL.createObjectURL(file)

  await new Promise((resolve, reject) => {
    img.onload = resolve
    img.onerror = reject
    img.src = url
  })

  // 1. Generate ICO (standard sizes)
  const icoBlob = await generateIco(file)
  zip.file("favicon.ico", icoBlob)

  // 2. Generate PNGs
  for (const { size, name } of PNG_SIZES) {
    try {
      const blob = await resizeImage(img, size)
      zip.file(name, blob)
    } catch (e) {
      console.error(`Failed to generate ${name}`, e)
    }
  }

  URL.revokeObjectURL(url)

  // 3. Generate site.webmanifest
  const manifest = {
    name: "My Website",
    short_name: "Website",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ],
    theme_color: "#ffffff",
    background_color: "#ffffff",
    display: "standalone"
  }

  zip.file("site.webmanifest", JSON.stringify(manifest, null, 2))

  return zip.generateAsync({ type: "blob" })
}
