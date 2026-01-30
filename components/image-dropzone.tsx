"use client"

import React from "react"

import { useCallback, useState, useEffect } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Upload, ImageIcon, X, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

type ImageDropzoneProps = {
  acceptedTypes: string[]
  className?: string
} & (
    | { multiple?: false; onImageSelect: (file: File) => void }
    | { multiple: true; onImageSelect: (files: File[]) => void }
  )

export function ImageDropzone(props: ImageDropzoneProps) {
  const { acceptedTypes, className } = props
  const multiple = props.multiple ?? false
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    setMounted(true)
  }, [])

  const validateFile = useCallback((file: File) => {
    if (!acceptedTypes.some(type => file.type === type || file.type.startsWith(type.replace('*', '')))) {
      const acceptedFormats = acceptedTypes.map(t => t.split('/')[1].toUpperCase()).join(', ')
      setError(`Please select a valid file. Accepted formats: ${acceptedFormats}`)
      return false
    }
    if (file.size > 100 * 1024 * 1024) {
      setError("File size must be less than 100MB")
      return false
    }
    setError(null)
    return true
  }, [acceptedTypes])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files)
    if (files.length === 0) return

    if (props.multiple) {
      const validFiles = files.filter(validateFile)
      if (validFiles.length > 0) {
        props.onImageSelect(validFiles)
      }
    } else {
      const file = files[0]
      if (file && validateFile(file)) {
        props.onImageSelect(file)
      }
    }
  }, [props, validateFile])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : []
    if (files.length === 0) return

    if (props.multiple) {
      const validFiles = files.filter(validateFile)
      if (validFiles.length > 0) {
        props.onImageSelect(validFiles)
      }
    } else {
      const file = files[0]
      if (file && validateFile(file)) {
        props.onImageSelect(file)
      }
    }
    e.target.value = ''
  }, [props, validateFile])

  const acceptString = acceptedTypes.join(',')

  const dropzoneContent = (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={cn(
        "relative border-2 border-dashed rounded-2xl transition-colors duration-200",
        "flex flex-col items-center justify-center p-8 md:p-12",
        "cursor-pointer group",
        isDragging
          ? "border-primary bg-primary/10"
          : "border-primary/30 bg-gradient-to-br from-muted/50 to-muted/20 hover:border-primary/50 hover:bg-primary/5",
        error && "border-destructive"
      )}
      role="button"
      tabIndex={0}
      aria-label="Upload image"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          document.getElementById('file-input')?.click()
        }
      }}
    >
      <input
        id="file-input"
        type="file"
        accept={acceptString}
        onChange={handleFileInput}
        multiple={multiple}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        aria-describedby={error ? "upload-error" : undefined}
      />

      <div
        className={cn(
          "flex h-16 w-16 items-center justify-center rounded-2xl mb-4 transition-colors duration-200",
          isDragging ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
        )}
      >
        {isDragging ? (
          <Sparkles className="h-8 w-8" />
        ) : (
          <Upload className="h-8 w-8" />
        )}
      </div>

      <p className="text-lg font-semibold text-foreground">
        {isDragging ? "Drop your image here" : "Drag & drop your image"}
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        or click to browse files
      </p>
      <p className="mt-4 text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full">
        Supports: {acceptedTypes.map(t => t.split('/')[1].toUpperCase()).join(', ')} (max 100MB)
      </p>
    </div>
  )

  if (prefersReducedMotion || !mounted) {
    return (
      <div className={cn("w-full", className)}>
        {dropzoneContent}
        {error && (
          <div
            id="upload-error"
            className="mt-3 flex items-center gap-2 text-sm text-destructive"
            role="alert"
          >
            <X className="h-4 w-4" />
            {error}
          </div>
        )}
      </div>
    )
  }

  return (
    <motion.div
      className={cn("w-full", className)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          "relative border-2 border-dashed rounded-2xl transition-colors duration-200",
          "flex flex-col items-center justify-center p-8 md:p-12",
          "cursor-pointer group",
          isDragging
            ? "border-primary bg-primary/10"
            : "border-primary/30 bg-gradient-to-br from-muted/50 to-muted/20 hover:border-primary/50 hover:bg-primary/5",
          error && "border-destructive"
        )}
        animate={isDragging ? {} : {
          borderColor: ["hsl(var(--primary) / 0.3)", "hsl(var(--primary) / 0.5)", "hsl(var(--primary) / 0.3)"]
        }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        role="button"
        tabIndex={0}
        aria-label="Upload image"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            document.getElementById('file-input')?.click()
          }
        }}
      >
        <input
          id="file-input"
          type="file"
          accept={acceptString}
          onChange={handleFileInput}
          multiple={multiple}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          aria-describedby={error ? "upload-error" : undefined}
        />

        <motion.div
          className={cn(
            "flex h-16 w-16 items-center justify-center rounded-2xl mb-4 transition-colors duration-200",
            isDragging ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
          )}
          animate={isDragging ? {} : { y: [0, -4, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          {isDragging ? (
            <Sparkles className="h-8 w-8" />
          ) : (
            <Upload className="h-8 w-8" />
          )}
        </motion.div>

        <p className="text-lg font-semibold text-foreground">
          {isDragging ? "Drop your image here" : "Drag & drop your image"}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          or click to browse files
        </p>
        <p className="mt-4 text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full">
          Supports: {acceptedTypes.map(t => t.split('/')[1].toUpperCase()).join(', ')} (max 100MB)
        </p>
      </motion.div>

      {error && (
        <motion.div
          id="upload-error"
          className="mt-3 flex items-center gap-2 text-sm text-destructive"
          role="alert"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <X className="h-4 w-4" />
          {error}
        </motion.div>
      )}
    </motion.div>
  )
}
