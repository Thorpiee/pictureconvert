/**
 * Debug utilities for JPG to PNG conversion fidelity verification
 * DEV-ONLY: These functions are only used in development mode
 */

export interface FidelityDebugInfo {
  inputFileName: string
  inputByteSize: number
  decodedDimensions: { width: number; height: number }
  canvasDimensions: { width: number; height: number }
  cssRenderedSize?: { width: number; height: number }
  devicePixelRatio: number
  exportedPngDimensions: { width: number; height: number }
  orientation: number
  orientationHandledByBrowser: boolean
  warnings: string[]
  pixelFidelity?: {
    averageRgbDifference: number
    maxRgbDifference: number
    sampleCount: number
    passed: boolean
  }
}

/**
 * Extracts ImageData from a canvas or image
 */
async function getImageData(source: HTMLImageElement | ImageBitmap | HTMLCanvasElement): Promise<ImageData> {
  if (source instanceof HTMLCanvasElement) {
    const ctx = source.getContext("2d", { willReadFrequently: true })
    if (!ctx) throw new Error("Failed to get 2d context")
    return ctx.getImageData(0, 0, source.width, source.height)
  }

  // For ImageBitmap or HTMLImageElement, draw to temp canvas
  const canvas = document.createElement("canvas")
  if (source instanceof ImageBitmap) {
    canvas.width = source.width
    canvas.height = source.height
  } else {
    canvas.width = source.naturalWidth
    canvas.height = source.naturalHeight
  }

  const ctx = canvas.getContext("2d", { willReadFrequently: true })
  if (!ctx) throw new Error("Failed to get 2d context")

  ctx.drawImage(source, 0, 0)
  return ctx.getImageData(0, 0, canvas.width, canvas.height)
}

/**
 * Compares two ImageData objects pixel-by-pixel
 * Samples random pixels to compute average RGB difference
 */
export async function verifyPixelFidelity(
  inputSource: HTMLImageElement | ImageBitmap | HTMLCanvasElement,
  outputBlob: Blob,
  sampleCount: number = 5000
): Promise<{
  averageRgbDifference: number
  maxRgbDifference: number
  sampleCount: number
  passed: boolean
}> {
  // Decode input
  const inputData = await getImageData(inputSource)

  // Decode output PNG
  const outputUrl = URL.createObjectURL(outputBlob)
  const outputImg = new Image()
  await new Promise<void>((resolve, reject) => {
    outputImg.onload = () => resolve()
    outputImg.onerror = () => reject(new Error("Failed to load output PNG"))
    outputImg.src = outputUrl
  })

  const outputData = await getImageData(outputImg)
  URL.revokeObjectURL(outputUrl)

  // Dimension check
  if (
    inputData.width !== outputData.width ||
    inputData.height !== outputData.height
  ) {
    throw new Error(
      `Dimension mismatch: input ${inputData.width}x${inputData.height}, output ${outputData.width}x${outputData.height}`
    )
  }

  // Sample random pixels
  const totalPixels = inputData.width * inputData.height
  const samples = Math.min(sampleCount, totalPixels)
  const indices = new Set<number>()

  // Generate random indices
  while (indices.size < samples) {
    indices.add(Math.floor(Math.random() * totalPixels))
  }

  let totalDiff = 0
  let maxDiff = 0

  for (const pixelIndex of indices) {
    const inputIdx = pixelIndex * 4
    const outputIdx = pixelIndex * 4

    const rDiff = Math.abs(inputData.data[inputIdx] - outputData.data[outputIdx])
    const gDiff = Math.abs(inputData.data[inputIdx + 1] - outputData.data[outputIdx + 1])
    const bDiff = Math.abs(inputData.data[inputIdx + 2] - outputData.data[outputIdx + 2])
    // Skip alpha channel for JPG (JPG doesn't have alpha)

    const pixelDiff = (rDiff + gDiff + bDiff) / 3
    totalDiff += pixelDiff
    maxDiff = Math.max(maxDiff, pixelDiff)
  }

  const averageDiff = totalDiff / samples

  // Pass if average difference is < 1 (allowing for minor color profile rounding)
  // In a perfect lossless conversion, difference should be 0
  const passed = averageDiff < 1 && maxDiff < 5

  return {
    averageRgbDifference: averageDiff,
    maxRgbDifference: maxDiff,
    sampleCount: samples,
    passed,
  }
}

/**
 * Collects debug information about the conversion process
 */
export async function collectFidelityDebugInfo(
  file: File,
  decodedSource: HTMLImageElement | ImageBitmap,
  canvas: HTMLCanvasElement | OffscreenCanvas,
  outputBlob: Blob,
  orientation: number,
  orientationHandledByBrowser: boolean
): Promise<FidelityDebugInfo> {
  const warnings: string[] = []

  // Get decoded dimensions
  let decodedWidth: number
  let decodedHeight: number
  if (decodedSource instanceof ImageBitmap) {
    decodedWidth = decodedSource.width
    decodedHeight = decodedSource.height
  } else {
    decodedWidth = decodedSource.naturalWidth
    decodedHeight = decodedSource.naturalHeight
  }

  // Get canvas dimensions
  let canvasWidth: number
  let canvasHeight: number
  if (canvas instanceof OffscreenCanvas) {
    canvasWidth = canvas.width
    canvasHeight = canvas.height
  } else {
    canvasWidth = canvas.width
    canvasHeight = canvas.height

    // Check CSS size if HTMLCanvasElement
    const rect = canvas.getBoundingClientRect()
    const cssWidth = rect.width
    const cssHeight = rect.height

    // Warn if CSS size doesn't match pixel dimensions (indicates scaling)
    if (Math.abs(cssWidth - canvasWidth) > 1 || Math.abs(cssHeight - canvasHeight) > 1) {
      warnings.push(
        `CSS size (${cssWidth}x${cssHeight}) doesn't match canvas dimensions (${canvasWidth}x${canvasHeight}) - may indicate scaling`
      )
    }
  }

  // Verify canvas dimensions match decoded dimensions (accounting for orientation)
  const needsSwap = orientation >= 5 && orientation <= 8
  const expectedWidth = needsSwap ? decodedHeight : decodedWidth
  const expectedHeight = needsSwap ? decodedWidth : decodedHeight

  if (canvasWidth !== expectedWidth || canvasHeight !== expectedHeight) {
    warnings.push(
      `Canvas dimensions (${canvasWidth}x${canvasHeight}) don't match expected (${expectedWidth}x${expectedHeight})`
    )
  }

  // Decode output PNG to verify dimensions
  const outputUrl = URL.createObjectURL(outputBlob)
  const outputImg = new Image()
  await new Promise<void>((resolve, reject) => {
    outputImg.onload = () => resolve()
    outputImg.onerror = () => reject(new Error("Failed to load output PNG"))
    outputImg.src = outputUrl
  })

  const exportedWidth = outputImg.naturalWidth
  const exportedHeight = outputImg.naturalHeight
  URL.revokeObjectURL(outputUrl)

  if (exportedWidth !== canvasWidth || exportedHeight !== canvasHeight) {
    warnings.push(
      `Exported PNG dimensions (${exportedWidth}x${exportedHeight}) don't match canvas (${canvasWidth}x${canvasHeight})`
    )
  }

  // Get device pixel ratio
  const devicePixelRatio = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1

  if (devicePixelRatio !== 1) {
    warnings.push(`devicePixelRatio is ${devicePixelRatio} - ensure canvas uses logical pixels, not physical`)
  }

  const info: FidelityDebugInfo = {
    inputFileName: file.name,
    inputByteSize: file.size,
    decodedDimensions: { width: decodedWidth, height: decodedHeight },
    canvasDimensions: { width: canvasWidth, height: canvasHeight },
    devicePixelRatio,
    exportedPngDimensions: { width: exportedWidth, height: exportedHeight },
    orientation,
    orientationHandledByBrowser,
    warnings,
  }

  // Add CSS size if HTMLCanvasElement
  if (canvas instanceof HTMLCanvasElement) {
    const rect = canvas.getBoundingClientRect()
    info.cssRenderedSize = { width: rect.width, height: rect.height }
  }

  return info
}
