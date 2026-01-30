/**
 * EXIF Orientation Utility
 * 
 * Reads EXIF Orientation tag from JPEG files to handle rotation/flipping.
 * This is essential for mobile photos which often have orientation metadata.
 * 
 * EXIF Orientation values:
 * 1 = Normal (0°)
 * 2 = Flip horizontal
 * 3 = Rotate 180°
 * 4 = Flip vertical
 * 5 = Rotate 90° CCW + Flip horizontal
 * 6 = Rotate 90° CW
 * 7 = Rotate 90° CW + Flip horizontal
 * 8 = Rotate 90° CCW
 */

export interface OrientationInfo {
  orientation: number
  width: number
  height: number
  needsRotation: boolean
  needsFlip: boolean
}

/**
 * Reads EXIF Orientation tag from JPEG file
 * Returns 1 (normal) if not found or on error
 */
export async function getExifOrientation(file: File): Promise<number> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    
    reader.onload = (e) => {
      const view = new DataView(e.target?.result as ArrayBuffer)
      
      // JPEG files start with FF D8
      if (view.getUint8(0) !== 0xFF || view.getUint8(1) !== 0xD8) {
        resolve(1) // Not a valid JPEG
        return
      }
      
      const length = view.byteLength
      let offset = 2
      
      // Search for EXIF marker (FF E1)
      while (offset < length) {
        if (view.getUint8(offset) !== 0xFF) {
          offset++
          continue
        }
        
        if (view.getUint8(offset + 1) === 0xE1) {
          // Found EXIF data
          const exifLength = view.getUint16(offset + 2, false)
          const exifStart = offset + 4
          
          // Check for EXIF header "Exif\0\0"
          if (
            view.getUint8(exifStart) === 0x45 &&
            view.getUint8(exifStart + 1) === 0x78 &&
            view.getUint8(exifStart + 2) === 0x69 &&
            view.getUint8(exifStart + 3) === 0x66
          ) {
            // Find Orientation tag (0x0112)
            const tiffOffset = exifStart + 6
            const isLittleEndian = view.getUint16(tiffOffset, false) === 0x4949
            const ifdOffset = view.getUint32(tiffOffset + 4, isLittleEndian)
            const ifdStart = tiffOffset + ifdOffset
            
            const entryCount = view.getUint16(ifdStart, isLittleEndian)
            
            for (let i = 0; i < entryCount; i++) {
              const entryOffset = ifdStart + 2 + (i * 12)
              const tag = view.getUint16(entryOffset, isLittleEndian)
              
              if (tag === 0x0112) {
                // Found Orientation tag
                const type = view.getUint16(entryOffset + 2, isLittleEndian)
                const count = view.getUint32(entryOffset + 4, isLittleEndian)
                
                if (type === 3 && count === 1) {
                  // SHORT type
                  const value = view.getUint16(entryOffset + 8, isLittleEndian)
                  resolve(value)
                  return
                }
              }
            }
          }
          
          offset += exifLength + 2
        } else {
          offset++
        }
      }
      
      resolve(1) // Default: normal orientation
    }
    
    reader.onerror = () => resolve(1)
    
    // Only read first 64KB (EXIF is usually in the first few KB)
    const blob = file.slice(0, Math.min(65536, file.size))
    reader.readAsArrayBuffer(blob)
  })
}

/**
 * Applies EXIF orientation transform to canvas context
 */
export function applyOrientationTransform(
  ctx: CanvasRenderingContext2D,
  orientation: number,
  width: number,
  height: number
): void {
  switch (orientation) {
    case 2:
      // Flip horizontal
      ctx.transform(-1, 0, 0, 1, width, 0)
      break
    case 3:
      // Rotate 180°
      ctx.transform(-1, 0, 0, -1, width, height)
      break
    case 4:
      // Flip vertical
      ctx.transform(1, 0, 0, -1, 0, height)
      break
    case 5:
      // Rotate 90° CCW + Flip horizontal
      ctx.transform(0, 1, 1, 0, 0, 0)
      break
    case 6:
      // Rotate 90° CW
      ctx.transform(0, 1, -1, 0, height, 0)
      break
    case 7:
      // Rotate 90° CW + Flip horizontal
      ctx.transform(0, -1, -1, 0, height, width)
      break
    case 8:
      // Rotate 90° CCW
      ctx.transform(0, -1, 1, 0, 0, width)
      break
    default:
      // Case 1 or unknown: no transform
      break
  }
}

/**
 * Gets the display dimensions after applying orientation
 */
export function getOrientedDimensions(
  width: number,
  height: number,
  orientation: number
): { width: number; height: number } {
  // Orientations 5, 6, 7, 8 swap width and height
  if (orientation >= 5 && orientation <= 8) {
    return { width: height, height: width }
  }
  return { width, height }
}
