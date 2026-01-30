/**
 * JPG to PNG Converter - Best Possible Client-Side Implementation
 * 
 * ============================================================================
 * ROOT CAUSE ANALYSIS - What Caused Quality Loss & How It Was Fixed:
 * ============================================================================
 * 
 * PRIMARY BUGS FOUND AND FIXED:
 * 
 * 1. ❌ BUG: Using img.width/height instead of img.naturalWidth/naturalHeight
 *    - img.width/height are CSS dimensions and can be scaled by browser
 *    - img.naturalWidth/naturalHeight are the actual pixel dimensions
 *    - FIX: Changed all img.width/height to img.naturalWidth/naturalHeight
 *    - IMPACT: This was causing canvas to be created with wrong dimensions, leading to scaling
 * 
 * 2. ❌ BUG: Potential scaling from CSS transforms or devicePixelRatio
 *    - Canvas CSS size could differ from pixel dimensions
 *    - devicePixelRatio could cause physical vs logical pixel confusion
 *    - FIX: Never use CSS dimensions for canvas sizing, always use pixel dimensions
 *    - FIX: Ensure canvas.width/height are set directly, never from CSS
 * 
 * 3. ❌ BUG: Image smoothing enabled by default
 *    - Canvas applies bilinear interpolation when smoothing is enabled
 *    - This blurs pixels during 1:1 copy operations
 *    - FIX: Explicitly disable imageSmoothingEnabled for JPG→PNG
 * 
 * 4. ❌ BUG: drawImage() with scaling parameters
 *    - Using drawImage(src, 0, 0, width, height) causes scaling
 *    - FIX: Use drawImage(src, 0, 0) with NO destination dimensions
 * 
 * 5. ❌ BUG: EXIF orientation not handled correctly
 *    - Rotated images need dimension swap and transforms
 *    - FIX: Use createImageBitmap with "from-image" when available
 *    - FIX: Manual EXIF reading and canvas transforms as fallback
 *    - FIX: Swap canvas dimensions for 90° rotations
 * 
 * 6. ❌ BUG: No validation of output dimensions
 *    - No check to ensure output matches input dimensions
 *    - FIX: Added dimension validation in dev mode
 *    - FIX: Added pixel-level verification option
 * 
 * ============================================================================
 * QUALITY CHECKLIST - Why this is lossless:
 * ============================================================================
 * 
 * ✓ 1. OPTIMAL DECODE PIPELINE
 *   - Uses createImageBitmap() when available (faster, better quality decode)
 *   - Falls back to <img> element if createImageBitmap unavailable
 *   - No intermediate re-encoding steps
 *   - No JPEG re-encoding (would add loss)
 * 
 * ✓ 2. EXIF ORIENTATION HANDLING
 *   - Uses createImageBitmap(file, { imageOrientation: "from-image" }) when available
 *     → Browser handles orientation automatically, dimensions already correct
 *   - Falls back to manual EXIF reading (getExifOrientation) and canvas transforms
 *   - Ensures output matches visual appearance (how image displays normally)
 *   - No CSS transforms (only canvas transforms for orientation)
 * 
 * ✓ 3. 1:1 PIXEL FIDELITY GUARANTEED
 *   - Canvas dimensions = decoded image dimensions (or swapped if rotated)
 *   - NO CSS-based sizing (only pixel dimensions used)
 *   - NO devicePixelRatio scaling (canvas uses logical pixels)
 *   - Image smoothing DISABLED (ctx.imageSmoothingEnabled = false)
 *     → Preserves exact pixels, no interpolation/blurring
 *   - drawImage() with exact dimensions (no scaling parameters)
 *   - Validation in dev mode: output dimensions must match expected
 * 
 * ✓ 4. LOSSLESS PNG EXPORT
 *   - canvas.toBlob({ type: "image/png" }) - browser's native lossless encoder
 *   - No quality parameter (PNG is always lossless)
 *   - Uses OffscreenCanvas when available for better performance
 *   - No quantization or color space conversion beyond sRGB
 * 
 * ✓ 5. NO ACCIDENTAL RESIZING
 *   - Canvas width/height set from decoded image dimensions
 *   - Orientation-aware dimension calculation (swaps if needed)
 *   - Never uses CSS sizes to determine pixel output
 *   - No resizing or cropping
 *   - No intermediate format conversions
 * 
 * ============================================================================
 * PITFALLS AVOIDED:
 * ============================================================================
 * - ❌ No JPEG re-encoding (would add lossy compression artifacts)
 * - ❌ No quantization or color space conversion beyond sRGB
 * - ❌ No CSS transforms (only canvas transforms for orientation)
 * - ❌ No image smoothing (preserves exact pixels, no interpolation)
 * - ❌ No devicePixelRatio scaling (canvas uses logical pixels)
 * - ❌ No resizing or cropping (1:1 pixel mapping)
 * - ❌ No intermediate format conversions
 * - ❌ No quality parameter for PNG (PNG is always lossless)
 * 
 * ============================================================================
 * TECHNICAL NOTES:
 * ============================================================================
 * - When createImageBitmap uses "from-image", orientation is applied automatically
 *   and dimensions are already swapped if needed
 * - When using manual orientation handling, we swap canvas dimensions and apply
 *   transforms to match the visual appearance
 * - Image smoothing is ALWAYS disabled for JPG→PNG to preserve exact decoded pixels
 * - Memory is properly cleaned up (ImageBitmap.close(), URL.revokeObjectURL)
 */

import type { ProcessingResult } from "./image-processor"
import {
  getExifOrientation,
  applyOrientationTransform,
  getOrientedDimensions,
} from "./exif-orientation"

export interface JpgToPngOptions {
  /** Use OffscreenCanvas for better performance (if available) */
  useOffscreenCanvas?: boolean
  /** Maximum concurrency for batch processing */
  maxConcurrency?: number
  /** Enable debug logging (dev only) */
  enableDebug?: boolean
  /** Enable pixel-level verification (dev only, slow) */
  enablePixelVerification?: boolean
}

export interface JpgToPngResult extends ProcessingResult {
  /** Original file name */
  originalName: string
  /** Input file size */
  inputSize: number
  /** Whether EXIF orientation was applied */
  orientationApplied: boolean
  /** Debug info (dev only) */
  debugInfo?: import("./jpg-to-png-converter-debug").FidelityDebugInfo
}

/**
 * Converts a single JPG/JPEG file to PNG with zero quality loss
 */
export async function convertJpgToPng(
  file: File,
  options: JpgToPngOptions = {}
): Promise<JpgToPngResult> {
  const { useOffscreenCanvas = true, enableDebug = false, enablePixelVerification = false } = options
  const isDev = process.env.NODE_ENV === "development"
  const debug = enableDebug || isDev

  if (debug) {
    console.log("[JPG→PNG] Starting conversion:", {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
    })
  }

  // Step 1: Decode image using createImageBitmap() when available (better quality)
  let imageBitmap: ImageBitmap | null = null
  let img: HTMLImageElement | null = null
  let decodedWidth: number
  let decodedHeight: number
  let orientation = 1
  let orientationHandledByBrowser = false

  try {
    // Try createImageBitmap first (better decode pipeline, handles orientation)
    if (typeof createImageBitmap !== "undefined") {
      try {
        // Modern browsers: let createImageBitmap handle orientation automatically
        imageBitmap = await createImageBitmap(file, {
          imageOrientation: "from-image",
          premultiplyAlpha: "none",
          colorSpaceConversion: "none",
        })
      decodedWidth = imageBitmap.width
      decodedHeight = imageBitmap.height
      // When using "from-image", browser applies orientation and swaps dimensions if needed
      // So decodedWidth/Height are already the display dimensions
      orientation = 1
      orientationHandledByBrowser = true
      if (debug) {
        console.log("[JPG→PNG] Decoded via createImageBitmap (auto-orientation):", {
          width: decodedWidth,
          height: decodedHeight,
        })
      }
      } catch (e) {
        // Fallback: read EXIF manually and handle orientation ourselves
        orientation = await getExifOrientation(file)
        imageBitmap = await createImageBitmap(file, {
          imageOrientation: "none", // We'll handle it manually
          premultiplyAlpha: "none",
          colorSpaceConversion: "none",
        })
        decodedWidth = imageBitmap.width
        decodedHeight = imageBitmap.height
        orientationHandledByBrowser = false
        if (debug) {
          console.log("[JPG→PNG] Decoded via createImageBitmap (manual orientation):", {
            width: decodedWidth,
            height: decodedHeight,
            orientation,
          })
        }
      }
    } else {
      // Fallback to <img> element (doesn't auto-apply orientation)
      orientation = await getExifOrientation(file)
      img = new Image()
      const url = URL.createObjectURL(file)
      await new Promise<void>((resolve, reject) => {
        img!.onload = () => resolve()
        img!.onerror = () => reject(new Error("Failed to load image"))
        img!.src = url
      })
      // CRITICAL: Use naturalWidth/naturalHeight, NOT width/height
      // width/height are CSS dimensions and can be scaled
      // naturalWidth/naturalHeight are the actual pixel dimensions
      decodedWidth = img.naturalWidth
      decodedHeight = img.naturalHeight
      URL.revokeObjectURL(url)
      orientationHandledByBrowser = false
      if (debug) {
        console.log("[JPG→PNG] Decoded via <img> element:", {
          width: decodedWidth,
          height: decodedHeight,
          orientation,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          cssWidth: img.width,
          cssHeight: img.height,
        })
      }
    }
  } catch (error) {
    throw new Error(`Failed to decode image: ${error instanceof Error ? error.message : "Unknown error"}`)
  }

  // Step 2: Calculate output dimensions
  // If browser handled orientation, dimensions are already correct
  // Otherwise, we need to swap if orientation requires it
  let outputWidth: number
  let outputHeight: number
  if (orientationHandledByBrowser) {
    outputWidth = decodedWidth
    outputHeight = decodedHeight
  } else {
    const orientedDims = getOrientedDimensions(decodedWidth, decodedHeight, orientation)
    outputWidth = orientedDims.width
    outputHeight = orientedDims.height
  }

  if (debug) {
    console.log("[JPG→PNG] Output dimensions calculated:", {
      decoded: { width: decodedWidth, height: decodedHeight },
      output: { width: outputWidth, height: outputHeight },
      orientation,
      orientationHandledByBrowser,
    })
  }

  // Step 3: Create canvas with exact pixel dimensions (NO scaling)
  let canvas: HTMLCanvasElement | OffscreenCanvas
  let ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D

  if (useOffscreenCanvas && typeof OffscreenCanvas !== "undefined") {
    canvas = new OffscreenCanvas(outputWidth, outputHeight)
    ctx = canvas.getContext("2d", {
      alpha: true, // PNG supports transparency
      desynchronized: false,
      willReadFrequently: false,
      colorSpace: "srgb",
    }) as OffscreenCanvasRenderingContext2D
  } else {
    canvas = document.createElement("canvas")
    canvas.width = outputWidth
    canvas.height = outputHeight
    ctx = canvas.getContext("2d", {
      alpha: true,
      desynchronized: false,
      willReadFrequently: false,
      colorSpace: "srgb",
    }) as CanvasRenderingContext2D
  }

  if (!ctx) {
    throw new Error("Failed to get canvas context")
  }

  // Step 4: Configure for 1:1 pixel fidelity
  // CRITICAL: Disable smoothing to preserve exact pixels (no interpolation)
  ctx.imageSmoothingEnabled = false

  if (debug) {
    console.log("[JPG→PNG] Canvas created:", {
      width: canvas.width,
      height: canvas.height,
      type: canvas instanceof OffscreenCanvas ? "OffscreenCanvas" : "HTMLCanvasElement",
      imageSmoothingEnabled: ctx.imageSmoothingEnabled,
    })
  }

  // Step 5: Apply EXIF orientation transform if needed
  // Only apply if browser didn't handle it automatically
  if (orientation !== 1 && !orientationHandledByBrowser) {
    applyOrientationTransform(ctx as CanvasRenderingContext2D, orientation, decodedWidth, decodedHeight)
  }

  // Step 6: Draw image at exact dimensions (NO scaling)
  // CRITICAL: Using drawImage(src, 0, 0) with NO destination width/height
  // This ensures 1:1 pixel mapping with no scaling/interpolation
  if (imageBitmap) {
    ctx.drawImage(imageBitmap, 0, 0)
    imageBitmap.close() // Free memory
    if (debug) {
      console.log("[JPG→PNG] Drawn ImageBitmap to canvas (1:1, no scaling)")
    }
  } else if (img) {
    ctx.drawImage(img, 0, 0)
    if (debug) {
      console.log("[JPG→PNG] Drawn <img> to canvas (1:1, no scaling)")
    }
  }

  // Step 7: Export as PNG (lossless)
  const blob = await new Promise<Blob>((resolve, reject) => {
    if (canvas instanceof OffscreenCanvas) {
      canvas.convertToBlob({ type: "image/png" }).then(resolve).catch(reject)
    } else {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob)
          } else {
            reject(new Error("Failed to create PNG blob"))
          }
        },
        "image/png"
        // No quality parameter - PNG is always lossless
      )
    }
  })

  // Step 8: Validation and pixel verification
  if (isDev) {
    const validationImg = new Image()
    const validationUrl = URL.createObjectURL(blob)
    await new Promise<void>((resolve, reject) => {
      validationImg.onload = () => {
        const actualWidth = validationImg.naturalWidth
        const actualHeight = validationImg.naturalHeight
        if (actualWidth !== outputWidth || actualHeight !== outputHeight) {
          console.error(
            `[JPG→PNG] ❌ DIMENSION MISMATCH: expected ${outputWidth}x${outputHeight}, got ${actualWidth}x${actualHeight}`
          )
        } else if (debug) {
          console.log(`[JPG→PNG] ✓ Dimension validation passed: ${outputWidth}x${outputHeight}`)
        }
        URL.revokeObjectURL(validationUrl)
        resolve()
      }
      validationImg.onerror = () => {
        URL.revokeObjectURL(validationUrl)
        reject(new Error("Failed to validate output"))
      }
      validationImg.src = validationUrl
    })

    // Pixel-level verification (slow, dev only)
    if (enablePixelVerification) {
      try {
        const { verifyPixelFidelity } = await import("./jpg-to-png-converter-debug")
        const decodedSource = imageBitmap || img!
        const result = await verifyPixelFidelity(decodedSource, blob, 5000)
        if (result.passed) {
          console.log("[JPG→PNG] ✓ Pixel fidelity verification passed:", result)
        } else {
          console.error("[JPG→PNG] ❌ Pixel fidelity verification FAILED:", result)
        }
      } catch (error) {
        console.warn("[JPG→PNG] Pixel verification error:", error)
      }
    }
  }

  // Cleanup
  if (img) {
    img.src = ""
  }

  if (debug) {
    console.log("[JPG→PNG] Conversion complete:", {
      outputSize: blob.size,
      outputDimensions: `${outputWidth}x${outputHeight}`,
      compressionRatio: ((1 - blob.size / file.size) * 100).toFixed(1) + "%",
    })
  }

  // Collect debug info if in dev mode
  let debugInfo: import("./jpg-to-png-converter-debug").FidelityDebugInfo | undefined
  if (isDev) {
    try {
      const { collectFidelityDebugInfo } = await import("./jpg-to-png-converter-debug")
      const decodedSource = imageBitmap || img!
      debugInfo = await collectFidelityDebugInfo(
        file,
        decodedSource,
        canvas,
        blob,
        orientation,
        orientationHandledByBrowser
      )

      // Add pixel fidelity if verification was enabled
      if (enablePixelVerification) {
        try {
          const { verifyPixelFidelity } = await import("./jpg-to-png-converter-debug")
          const pixelResult = await verifyPixelFidelity(decodedSource, blob, 5000)
          debugInfo.pixelFidelity = pixelResult
        } catch (error) {
          console.warn("[JPG→PNG] Pixel verification error:", error)
        }
      }
    } catch (error) {
      console.warn("[JPG→PNG] Failed to collect debug info:", error)
    }
  }

  return {
    blob,
    url: URL.createObjectURL(blob),
    width: outputWidth,
    height: outputHeight,
    size: blob.size,
    originalName: file.name,
    inputSize: file.size,
    orientationApplied: orientation !== 1 && !orientationHandledByBrowser,
    debugInfo,
  }
}

/**
 * Batch convert multiple JPG files to PNG
 * Processes sequentially by default to avoid memory spikes
 */
export async function convertJpgToPngBatch(
  files: File[],
  options: JpgToPngOptions & {
    onProgress?: (index: number, result: JpgToPngResult | Error) => void
    maxConcurrency?: number
  } = {}
): Promise<JpgToPngResult[]> {
  const { maxConcurrency = 1, onProgress } = options
  const results: (JpgToPngResult | Error | undefined)[] = new Array(files.length)

  // Process files with controlled concurrency
  const processFile = async (file: File, index: number) => {
    try {
      const result = await convertJpgToPng(file, options)
      results[index] = result
      onProgress?.(index, result)
      return result
    } catch (error) {
      const err = error instanceof Error ? error : new Error("Unknown error")
      results[index] = err
      onProgress?.(index, err)
      throw err
    }
  }

  if (maxConcurrency === 1) {
    // Sequential processing (safest for memory)
    for (let i = 0; i < files.length; i++) {
      try {
        await processFile(files[i], i)
      } catch {
        // Error already handled in processFile
      }
    }
  } else {
    // Limited concurrency
    const queue: Promise<void>[] = []
    for (let i = 0; i < files.length; i++) {
      const promise = processFile(files[i], i)
        .then(() => {
          const index = queue.indexOf(promise as any)
          if (index > -1) queue.splice(index, 1)
        })
        .catch(() => {
          const index = queue.indexOf(promise as any)
          if (index > -1) queue.splice(index, 1)
        })
      queue.push(promise as any)

      if (queue.length >= maxConcurrency) {
        await Promise.race(queue)
      }
    }
    await Promise.all(queue)
  }

  const successfulResults = results.filter(
    (r): r is JpgToPngResult => r !== undefined && !(r instanceof Error)
  )

  if (successfulResults.length === 0 && files.length > 0) {
    const firstError = results.find((r) => r instanceof Error)
    throw new Error(
      `All conversions failed: ${firstError instanceof Error ? firstError.message : "Unknown error"}`
    )
  }

  return successfulResults
}
