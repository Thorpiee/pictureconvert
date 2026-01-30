import React, { useRef, useEffect, useState } from "react"

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
}: CropperBoxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragMode, setDragMode] = useState<null | { type: "drag" | "resize"; pointerId: number; handle?: string; startPointer: { x: number; y: number }; startRect: CropRect }>(null);

  // --- Pointer Events ---
  const handlePointerDown = (e: React.PointerEvent, type: "drag" | "resize", handle?: string) => {
    if (type === "drag" && (e.target as HTMLElement).dataset.handle === "true") return;
    e.preventDefault();
    e.stopPropagation();
    const rect = containerRef.current?.getBoundingClientRect();
    const scaleX = (containerRef.current?.clientWidth ?? 1) / imageNaturalWidth;
    const scaleY = (containerRef.current?.clientHeight ?? 1) / imageNaturalHeight;
    const pointerX = (e.clientX - (rect?.left ?? 0)) / scaleX;
    const pointerY = (e.clientY - (rect?.top ?? 0)) / scaleY;
    setDragMode({ type, pointerId: e.pointerId, handle, startPointer: { x: pointerX, y: pointerY }, startRect: { ...cropRect } });
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragMode || !containerRef.current) return;
    const scaleX = containerRef.current.clientWidth / imageNaturalWidth;
    const scaleY = containerRef.current.clientHeight / imageNaturalHeight;
    const rect = containerRef.current.getBoundingClientRect();
    const pointerX = (e.clientX - rect.left) / scaleX;
    const pointerY = (e.clientY - rect.top) / scaleY;
    const { x, y, width, height } = dragMode.startRect;
    const dx = pointerX - dragMode.startPointer.x;
    const dy = pointerY - dragMode.startPointer.y;
    if (dragMode.type === "drag") {
      let newX = clamp(x + dx, 0, imageNaturalWidth - width);
      let newY = clamp(y + dy, 0, imageNaturalHeight - height);
      onChange({ x: newX, y: newY, width, height });
    } else if (dragMode.type === "resize" && dragMode.handle) {
      // Use doResize logic from previous implementation
      let newRect = { x, y, width, height };
      let minW = minSize, minH = minSize;
      let aspect = aspectMode === "free" ? null : aspectMode;
      switch (dragMode.handle) {
        case "nw":
          newRect.x = clamp(x + dx, 0, x + width - minW);
          newRect.y = clamp(y + dy, 0, y + height - minH);
          newRect.width = width + (x - newRect.x);
          newRect.height = height + (y - newRect.y);
          break;
        case "n":
          newRect.y = clamp(y + dy, 0, y + height - minH);
          newRect.height = height + (y - newRect.y);
          break;
        case "ne":
          newRect.y = clamp(y + dy, 0, y + height - minH);
          newRect.width = clamp(width + dx, minW, imageNaturalWidth - x);
          newRect.height = height + (y - newRect.y);
          break;
        case "e":
          newRect.width = clamp(width + dx, minW, imageNaturalWidth - x);
          break;
        case "se":
          newRect.width = clamp(width + dx, minW, imageNaturalWidth - x);
          newRect.height = clamp(height + dy, minH, imageNaturalHeight - y);
          break;
        case "s":
          newRect.height = clamp(height + dy, minH, imageNaturalHeight - y);
          break;
        case "sw":
          newRect.x = clamp(x + dx, 0, x + width - minW);
          newRect.width = width + (x - newRect.x);
          newRect.height = clamp(height + dy, minH, imageNaturalHeight - y);
          break;
        case "w":
          newRect.x = clamp(x + dx, 0, x + width - minW);
          newRect.width = width + (x - newRect.x);
          break;
      }
      // Aspect ratio lock
      if (aspect) {
        switch (dragMode.handle) {
          case "nw":
          case "ne":
          case "sw":
          case "se": {
            if (newRect.width / newRect.height > aspect) {
              newRect.width = Math.round(newRect.height * aspect);
            } else {
              newRect.height = Math.round(newRect.width / aspect);
            }
            if (dragMode.handle === "nw") {
              newRect.x = x + width - newRect.width;
              newRect.y = y + height - newRect.height;
            } else if (dragMode.handle === "ne") {
              newRect.y = y + height - newRect.height;
            } else if (dragMode.handle === "sw") {
              newRect.x = x + width - newRect.width;
            }
          } break;
          case "n":
          case "s": {
            newRect.width = Math.round(newRect.height * aspect);
            if (dragMode.handle === "n") newRect.x = x + width - newRect.width;
          } break;
          case "e":
          case "w": {
            newRect.height = Math.round(newRect.width / aspect);
            if (dragMode.handle === "w") newRect.y = y + height - newRect.height;
          } break;
        }
        newRect.width = clamp(newRect.width, minW, imageNaturalWidth - newRect.x);
        newRect.height = clamp(newRect.height, minH, imageNaturalHeight - newRect.y);
        newRect.x = clamp(newRect.x, 0, imageNaturalWidth - newRect.width);
        newRect.y = clamp(newRect.y, 0, imageNaturalHeight - newRect.height);
      } else {
        newRect.width = clamp(newRect.width, minW, imageNaturalWidth - newRect.x);
        newRect.height = clamp(newRect.height, minH, imageNaturalHeight - newRect.y);
        newRect.x = clamp(newRect.x, 0, imageNaturalWidth - newRect.width);
        newRect.y = clamp(newRect.y, 0, imageNaturalHeight - newRect.height);
      }
      onChange(newRect);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setDragMode(null);
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
  };

  // --- Responsive rendering ---
  const [containerSize, setContainerSize] = useState({ width: 1, height: 1 });
  useEffect(() => {
    function updateSize() {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    }
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  const scale = Math.min(
    containerSize.width / imageNaturalWidth,
    containerSize.height / imageNaturalHeight
  );
  const cropBoxStyle = {
    left: cropRect.x * scale,
    top: cropRect.y * scale,
    width: cropRect.width * scale,
    height: cropRect.height * scale,
  } as React.CSSProperties;

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video bg-black/80 rounded-lg overflow-hidden flex items-center justify-center select-none"
      style={{ minHeight: 200, touchAction: "none" }}
    >
      <img
        src={imageSrc}
        alt="Crop"
        style={{
          width: imageNaturalWidth * scale,
          height: imageNaturalHeight * scale,
          display: "block",
          pointerEvents: "none",
          userSelect: "none",
        }}
        draggable={false}
      />
      {/* Dimmed overlay outside crop */}
      <div
        className="absolute inset-0"
        style={{
          pointerEvents: "none",
          background: `repeating-linear-gradient(135deg,rgba(0,0,0,0.45),rgba(0,0,0,0.45) 2px,rgba(0,0,0,0.5) 2px,rgba(0,0,0,0.5) 8px)`
        }}
      />
      {/* Crop box */}
      <div
        className="absolute border-2 border-primary bg-black/10 shadow-lg"
        style={{ ...cropBoxStyle, boxSizing: "border-box", cursor: dragMode?.type === "drag" ? "move" : "default", zIndex: 10, pointerEvents: "auto", touchAction: "none" }}
        tabIndex={0}
        onPointerDown={e => handlePointerDown(e, "drag")}
        onPointerMove={dragMode ? handlePointerMove : undefined}
        onPointerUp={dragMode ? handlePointerUp : undefined}
      >
        {/* Handles */}
        {handles.map(h => {
          const size = 14;
          let style: React.CSSProperties = { position: "absolute", width: size, height: size, background: "#fff", borderRadius: 4, border: "2px solid #333", zIndex: 20, cursor: h.cursor, boxShadow: "0 0 0 1px #0002", pointerEvents: "auto", touchAction: "none" };
          switch (h.key) {
            case "nw": style.left = -size/2; style.top = -size/2; break;
            case "n": style.left = "50%"; style.top = -size/2; style.transform = "translateX(-50%)"; break;
            case "ne": style.right = -size/2; style.top = -size/2; break;
            case "e": style.right = -size/2; style.top = "50%"; style.transform = "translateY(-50%)"; break;
            case "se": style.right = -size/2; style.bottom = -size/2; break;
            case "s": style.left = "50%"; style.bottom = -size/2; style.transform = "translateX(-50%)"; break;
            case "sw": style.left = -size/2; style.bottom = -size/2; break;
            case "w": style.left = -size/2; style.top = "50%"; style.transform = "translateY(-50%)"; break;
          }
          return (
            <div
              key={h.key}
              data-handle="true"
              style={style}
              onPointerDown={e => handlePointerDown(e, "resize", h.key)}
            />
          );
        })}
        {/* Live size label */}
        <div className="absolute right-1 bottom-1 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {cropRect.width} × {cropRect.height}
        </div>
      </div>
    </div>
  );
}
