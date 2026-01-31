import React, { useRef, useEffect, useState, useMemo } from "react"

export type CropRect = {
  x: number
  y: number
  width: number
  height: number
}

export type AspectMode = "free" | number // "free" or a ratio (e.g. 16/9)

export interface CropperBoxProps {
  imageSrc: string
  imageNaturalWidth: number
  imageNaturalHeight: number
  aspectMode: AspectMode
  cropRect: CropRect
  minSize?: number
  onChange: (rect: CropRect) => void
  onCrop: (blob: Blob) => void
  outputType?: string
  resizable?: boolean
}

// Helper: clamp value between min and max
function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(val, max))
}

// Helper: get handle directions
const handles = [
  { key: "nw", cursor: "nwse-resize" },
  { key: "n", cursor: "ns-resize" },
  { key: "ne", cursor: "nesw-resize" },
  { key: "e", cursor: "ew-resize" },
  { key: "se", cursor: "nwse-resize" },
  { key: "s", cursor: "ns-resize" },
  { key: "sw", cursor: "nesw-resize" },
  { key: "w", cursor: "ew-resize" },
]

// Helper: get cropped image as Blob
export async function getCroppedImageBlob(
  imageSrc: string,
  cropRect: CropRect,
  outputType: string = "image/png"
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }
      canvas.width = cropRect.width;
      canvas.height = cropRect.height;
      ctx.drawImage(
        img,
        cropRect.x,
        cropRect.y,
        cropRect.width,
        cropRect.height,
        0,
        0,
        cropRect.width,
        cropRect.height
      );
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Failed to create blob"));
          }
        },
        outputType,
        0.92
      );
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = imageSrc;
  });
}

// CropperBox Component
export function CropperBox({
  imageSrc,
  imageNaturalWidth,
  imageNaturalHeight,
  aspectMode,
  cropRect,
  minSize = 10,
  onChange,
  onCrop,
  outputType = "image/png",
  resizable = true,
}: CropperBoxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragMode, setDragMode] = useState<null | { type: "drag" | "resize"; pointerId: number; handle?: string; startPointer: { x: number; y: number }; startRect: CropRect }>(null);

  // --- Responsive rendering calculations ---
  const [containerSize, setContainerSize] = useState({ width: 1, height: 1 });

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setContainerSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Calculate layout metrics
  const { scale, offsetX, offsetY } = useMemo(() => {
    if (!imageNaturalWidth || !imageNaturalHeight) return { scale: 1, offsetX: 0, offsetY: 0 };

    const scaleX = containerSize.width / imageNaturalWidth;
    const scaleY = containerSize.height / imageNaturalHeight;
    const s = Math.min(scaleX, scaleY); // fit contain

    const renderedW = imageNaturalWidth * s;
    const renderedH = imageNaturalHeight * s;

    const ox = (containerSize.width - renderedW) / 2;
    const oy = (containerSize.height - renderedH) / 2;

    return { scale: s, offsetX: ox, offsetY: oy };
  }, [containerSize, imageNaturalWidth, imageNaturalHeight]);

  // Helper to get image-relative coordinates from pointer event
  const getImagePoint = (e: React.PointerEvent) => {
    if (!containerRef.current) return { x: 0, y: 0 };
    const rect = containerRef.current.getBoundingClientRect();

    // Pointer relative to container top-left
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    // Convert to image coordinates
    // clientX = offsetX + imageX * scale  =>  imageX = (clientX - offsetX) / scale
    const x = (clientX - offsetX) / scale;
    const y = (clientY - offsetY) / scale;

    return { x, y };
  };

  // --- Pointer Events ---
  const handlePointerDown = (e: React.PointerEvent, type: "drag" | "resize", handle?: string) => {
    if (type === "drag" && (e.target as HTMLElement).dataset.handle === "true") return;
    e.preventDefault();
    e.stopPropagation();

    const point = getImagePoint(e);

    setDragMode({
      type,
      pointerId: e.pointerId,
      handle,
      startPointer: point,
      startRect: { ...cropRect }
    });

    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragMode) return;
    e.preventDefault();
    e.stopPropagation();

    const point = getImagePoint(e);

    const dx = point.x - dragMode.startPointer.x;
    const dy = point.y - dragMode.startPointer.y;

    const { x, y, width, height } = dragMode.startRect;

    if (dragMode.type === "drag") {
      let newX = clamp(x + dx, 0, imageNaturalWidth - width);
      let newY = clamp(y + dy, 0, imageNaturalHeight - height);
      onChange({ x: newX, y: newY, width, height });
    } else if (dragMode.type === "resize" && dragMode.handle) {
      let newRect = { x, y, width, height };
      let minW = minSize;
      let minH = minSize;
      const aspect = typeof aspectMode === "number" ? aspectMode : null;

      // 1. Calculate free transform based on handle
      switch (dragMode.handle) {
        case "nw":
          newRect.x = x + dx;
          newRect.y = y + dy;
          newRect.width = width - dx;
          newRect.height = height - dy;
          break;
        case "n":
          newRect.y = y + dy;
          newRect.height = height - dy;
          break;
        case "ne":
          newRect.y = y + dy;
          newRect.width = width + dx;
          newRect.height = height - dy;
          break;
        case "e":
          newRect.width = width + dx;
          break;
        case "se":
          newRect.width = width + dx;
          newRect.height = height + dy;
          break;
        case "s":
          newRect.height = height + dy;
          break;
        case "sw":
          newRect.x = x + dx;
          newRect.width = width - dx;
          newRect.height = height + dy;
          break;
        case "w":
          newRect.x = x + dx;
          newRect.width = width - dx;
          break;
      }

      // 2. Enforce Aspect Ratio
      if (aspect) {
        // Simple strategy: width drives height (except for N/S handles)
        // For corner handles, we pick the dominant dimension or just enforce width -> height

        if (["n", "s"].includes(dragMode.handle)) {
          // Height changed, adjust width
          newRect.width = newRect.height * aspect;
          // Center width adjustment usually? Or fix one side?
          // For 'n'/'s', usually we want to keep center x? Or fix left?
          // Let's fix center X to be intuitive
          const centerX = x + width / 2;
          newRect.x = centerX - newRect.width / 2;
        } else if (["e", "w"].includes(dragMode.handle)) {
          // Width changed, adjust height
          newRect.height = newRect.width / aspect;
          const centerY = y + height / 2;
          newRect.y = centerY - newRect.height / 2;
        } else {
          // Corners: typically width drives height or projection
          if (dragMode.handle.includes("w")) {
            // Moving left side
            newRect.x = x + width - newRect.width; // Anchor right
          }
          if (dragMode.handle.includes("n")) {
            // Moving top side
            newRect.y = y + height - newRect.height; // Anchor bottom
          }

          // Enforce ratio
          // We need to decide which delta is "stronger" or just project
          // Simplest: take width, set height
          const currentRatio = newRect.width / newRect.height;

          if (dragMode.handle === "se") {
            newRect.height = newRect.width / aspect;
          } else if (dragMode.handle === "sw") {
            newRect.height = newRect.width / aspect;
          } else if (dragMode.handle === "ne") {
            newRect.height = newRect.width / aspect;
            newRect.y = y + height - newRect.height;
          } else if (dragMode.handle === "nw") {
            newRect.height = newRect.width / aspect;
            newRect.y = y + height - newRect.height;
          }
        }
      }

      // 3. Clamp dimensions (min size)
      if (newRect.width < minW) {
        newRect.width = minW;
        if (dragMode.handle.includes("w")) newRect.x = x + width - minW; // Anchor right
      }
      if (newRect.height < minH) {
        newRect.height = minH;
        if (dragMode.handle.includes("n")) newRect.y = y + height - minH; // Anchor bottom
      }

      // Recalculate aspect after clamping min size
      if (aspect) {
        if (newRect.width / newRect.height !== aspect) {
          // If width hit min, adjust height
          newRect.height = newRect.width / aspect;
        }
      }

      // 4. Clamp to bounds (contain inside image)
      // This is tricky with aspect ratio. 
      // Simple approach: slide back if out of bounds

      // Check right/bottom bounds
      if (newRect.x + newRect.width > imageNaturalWidth) {
        const overflow = (newRect.x + newRect.width) - imageNaturalWidth;
        // If moving right side ('e', 'ne', 'se'), reduce width
        if (dragMode.handle.includes("e")) {
          newRect.width -= overflow;
          if (aspect) newRect.height = newRect.width / aspect;
        }
        // If moving whole rect (not resize), shift x. But this is resize.
        // If moving 'w', we increased width to left, so right side is fixed (startRect.x + startRect.width).
        // It shouldn't exceed right bound unless it was already out.
      }

      if (newRect.y + newRect.height > imageNaturalHeight) {
        const overflow = (newRect.y + newRect.height) - imageNaturalHeight;
        if (dragMode.handle.includes("s")) {
          newRect.height -= overflow;
          if (aspect) newRect.width = newRect.height * aspect;
        }
      }

      // Check left/top bounds
      if (newRect.x < 0) {
        if (dragMode.handle.includes("w")) {
          newRect.width += newRect.x; // reduce width by the negative overflow
          newRect.x = 0;
          if (aspect) newRect.height = newRect.width / aspect;
        }
      }

      if (newRect.y < 0) {
        if (dragMode.handle.includes("n")) {
          newRect.height += newRect.y;
          newRect.y = 0;
          if (aspect) newRect.width = newRect.height * aspect;
        }
      }

      // Final sanity clamp (in case aspect adjustments pushed it out again)
      // If still out of bounds, we might have to break aspect ratio or shrink further.
      // For now, hard clamp to ensure no crash, even if aspect drifts slightly at edges.
      newRect.x = clamp(newRect.x, 0, imageNaturalWidth - minW);
      newRect.y = clamp(newRect.y, 0, imageNaturalHeight - minH);
      newRect.width = clamp(newRect.width, minW, imageNaturalWidth - newRect.x);
      newRect.height = clamp(newRect.height, minH, imageNaturalHeight - newRect.y);

      onChange(newRect);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setDragMode(null);
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
  };

  const cropBoxStyle = {
    left: offsetX + cropRect.x * scale,
    top: offsetY + cropRect.y * scale,
    width: cropRect.width * scale,
    height: cropRect.height * scale,
  } as React.CSSProperties;

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video bg-black/90 rounded-lg overflow-hidden flex select-none"
      style={{ minHeight: 400, touchAction: "none" }}
    >
      {/* Image Layer */}
      <img
        src={imageSrc}
        alt="Crop"
        style={{
          position: "absolute",
          left: offsetX,
          top: offsetY,
          width: imageNaturalWidth * scale,
          height: imageNaturalHeight * scale,
          display: "block",
          pointerEvents: "none",
          userSelect: "none",
        }}
        draggable={false}
      />

      {/* Crop Box Layer */}
      <div
        className="absolute border-2 border-primary"
        style={{
          ...cropBoxStyle,
          boxSizing: "border-box",
          cursor: "move",
          zIndex: 10,
          pointerEvents: "auto",
          touchAction: "none",
          boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.6)" // Dim everything outside
        }}
        tabIndex={0}
        onPointerDown={e => handlePointerDown(e, "drag")}
        onPointerMove={dragMode ? handlePointerMove : undefined}
        onPointerUp={dragMode ? handlePointerUp : undefined}
      >
        {/* Handles */}
        {resizable && handles.map(h => {
          const size = 24; // Increased for better touch targets
          let style: React.CSSProperties = {
            position: "absolute",
            width: size,
            height: size,
            background: "#fff",
            border: "1px solid #333",
            zIndex: 20,
            cursor: h.cursor,
            pointerEvents: "auto",
            touchAction: "none",
            borderRadius: "50%",
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
          };

          switch (h.key) {
            case "nw": style.left = -size / 2; style.top = -size / 2; break;
            case "n": style.left = "50%"; style.top = -size / 2; style.transform = "translateX(-50%)"; break;
            case "ne": style.right = -size / 2; style.top = -size / 2; break;
            case "e": style.right = -size / 2; style.top = "50%"; style.transform = "translateY(-50%)"; break;
            case "se": style.right = -size / 2; style.bottom = -size / 2; break;
            case "s": style.left = "50%"; style.bottom = -size / 2; style.transform = "translateX(-50%)"; break;
            case "sw": style.left = -size / 2; style.bottom = -size / 2; break;
            case "w": style.left = -size / 2; style.top = "50%"; style.transform = "translateY(-50%)"; break;
          }
          return (
            <div
              key={h.key}
              data-handle="true"
              style={style}
              onPointerDown={e => handlePointerDown(e, "resize", h.key)}
              onPointerMove={dragMode ? handlePointerMove : undefined}
              onPointerUp={dragMode ? handlePointerUp : undefined}
            />
          );
        })}

        {/* Grid lines (Rule of Thirds) */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute top-1/3 left-0 right-0 h-px bg-white shadow-sm"></div>
          <div className="absolute top-2/3 left-0 right-0 h-px bg-white shadow-sm"></div>
          <div className="absolute left-1/3 top-0 bottom-0 w-px bg-white shadow-sm"></div>
          <div className="absolute left-2/3 top-0 bottom-0 w-px bg-white shadow-sm"></div>
        </div>

        {/* Live size label */}
        <div className="absolute left-0 -top-6 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded pointer-events-none whitespace-nowrap">
          {Math.round(cropRect.width)} × {Math.round(cropRect.height)}
        </div>
      </div>
    </div>
  );
}
