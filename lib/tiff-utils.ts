// @ts-ignore
import UTIF from "utif"

export async function decodeTiff(file: File): Promise<ImageData> {
  const buffer = await file.arrayBuffer()
  const ifds = UTIF.decode(buffer)

  if (!ifds || ifds.length === 0) {
    throw new Error("Invalid or empty TIFF file")
  }

  // We only convert the first page (as per requirements)
  const firstPage = ifds[0]

  UTIF.decodeImage(buffer, firstPage)

  const rgba = UTIF.toRGBA8(firstPage)
  const width = firstPage.width
  const height = firstPage.height

  return new ImageData(new Uint8ClampedArray(rgba), width, height)
}

export function isTiffFile(file: File): boolean {
  return file.type === "image/tiff" || file.name.toLowerCase().endsWith(".tiff") || file.name.toLowerCase().endsWith(".tif")
}
