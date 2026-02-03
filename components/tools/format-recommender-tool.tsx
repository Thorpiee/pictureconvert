"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CheckCircle, ArrowRight, RefreshCw, Info } from "lucide-react"
import Link from "next/link"

type ImageType = "photo" | "graphic" | "screenshot"
type Transparency = "yes" | "no"
type Animation = "yes" | "no"

interface Recommendation {
  format: string
  description: string
  pros: string[]
  cons: string[]
  toolSlug: string
  toolName: string
}

export function FormatRecommenderTool() {
  const [step, setStep] = useState(1)
  const [imageType, setImageType] = useState<ImageType | null>(null)
  const [transparency, setTransparency] = useState<Transparency | null>(null)
  const [animation, setAnimation] = useState<Animation | null>(null)

  const getRecommendation = (): Recommendation => {
    // Logic for recommendation
    if (animation === "yes") {
      return {
        format: "WebP (Animated)",
        description: "WebP is the modern replacement for GIF. It supports animation with much smaller file sizes and higher quality (supports millions of colors vs GIF's 256).",
        pros: ["Much smaller than GIF", "Supports full colors", "Variable transparency"],
        cons: ["Slightly less supported than GIF (but works in all modern browsers)"],
        toolSlug: "website-optimizer", // We might not have this, default to generic
        toolName: "Optimize for Web"
      }
    }

    if (transparency === "yes") {
      if (imageType === "photo") {
        return {
          format: "WebP",
          description: "For photos with transparency, WebP is unbeatable. It offers lossy compression with transparency (which JPG can't do) and is much smaller than PNG.",
          pros: ["Supports transparency", "Smaller than PNG", "Good for photos"],
          cons: ["Lossy compression (optional)"],
          toolSlug: "png-to-webp",
          toolName: "Convert PNG to WebP"
        }
      }
      // Graphic or Screenshot with transparency
      return {
        format: "PNG",
        description: "For graphics, logos, and screenshots requiring transparency, PNG is the standard. It uses lossless compression so your edges stay sharp.",
        pros: ["Lossless quality", "Perfect for sharp edges", "Universal support"],
        cons: ["Larger file sizes", "Not good for photos"],
        toolSlug: "compress-png",
        toolName: "Compress PNG"
      }
    }

    // No transparency
    if (imageType === "photo") {
      return {
        format: "JPG (or WebP)",
        description: "For standard photographs, JPG is the universal standard. However, WebP can be 30% smaller with the same quality.",
        pros: ["Universal compatibility", "Small file sizes for photos", "Control over quality"],
        cons: ["No transparency", "Artifacts at low quality"],
        toolSlug: "png-to-jpg",
        toolName: "Convert to JPG"
      }
    }

    // Graphic or Screenshot, no transparency
    return {
      format: "WebP (Lossless) or PNG",
      description: "For graphics without transparency, Lossless WebP is the most efficient. PNG is a safe fallback.",
      pros: ["Sharp edges", "Small size (WebP)", "No compression artifacts"],
      cons: ["WebP not supported in very old browsers"],
      toolSlug: "png-to-webp",
      toolName: "Convert to WebP"
    }
  }

  const handleReset = () => {
    setStep(1)
    setImageType(null)
    setTransparency(null)
    setAnimation(null)
  }

  const recommendation = (step === 4) ? getRecommendation() : null

  return (
    <Card className="w-full max-w-2xl mx-auto border-2">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          {step < 4 ? `Step ${step} of 3` : "Your Recommendation"}
        </CardTitle>
        <CardDescription className="text-center">
          {step === 1 && "What type of image are you working with?"}
          {step === 2 && "Do you need transparency (invisible background)?"}
          {step === 3 && "Do you need animation (moving image)?"}
          {step === 4 && "Here is the best format for your needs"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {step === 1 && (
          <RadioGroup value={imageType || ""} onValueChange={(v) => setImageType(v as ImageType)} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Label htmlFor="photo" className="cursor-pointer border rounded-lg p-4 hover:bg-accent flex flex-col items-center gap-2 [&:has(:checked)]:border-primary [&:has(:checked)]:bg-accent/50">
              <RadioGroupItem value="photo" id="photo" className="sr-only" />
              <span className="text-4xl">📷</span>
              <span className="font-semibold">Photograph</span>
              <span className="text-xs text-muted-foreground text-center">Real world scene, many colors</span>
            </Label>
            <Label htmlFor="graphic" className="cursor-pointer border rounded-lg p-4 hover:bg-accent flex flex-col items-center gap-2 [&:has(:checked)]:border-primary [&:has(:checked)]:bg-accent/50">
              <RadioGroupItem value="graphic" id="graphic" className="sr-only" />
              <span className="text-4xl">🎨</span>
              <span className="font-semibold">Graphic / Logo</span>
              <span className="text-xs text-muted-foreground text-center">Flat colors, sharp lines</span>
            </Label>
            <Label htmlFor="screenshot" className="cursor-pointer border rounded-lg p-4 hover:bg-accent flex flex-col items-center gap-2 [&:has(:checked)]:border-primary [&:has(:checked)]:bg-accent/50">
              <RadioGroupItem value="screenshot" id="screenshot" className="sr-only" />
              <span className="text-4xl">💻</span>
              <span className="font-semibold">Screenshot</span>
              <span className="text-xs text-muted-foreground text-center">UI elements, text</span>
            </Label>
          </RadioGroup>
        )}

        {step === 2 && (
          <RadioGroup value={transparency || ""} onValueChange={(v) => setTransparency(v as Transparency)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Label htmlFor="transparency-yes" className="cursor-pointer border rounded-lg p-4 hover:bg-accent flex flex-col items-center gap-2 [&:has(:checked)]:border-primary [&:has(:checked)]:bg-accent/50">
              <RadioGroupItem value="yes" id="transparency-yes" className="sr-only" />
              <span className="text-4xl">✨</span>
              <span className="font-semibold">Yes</span>
              <span className="text-xs text-muted-foreground text-center">I need a transparent background</span>
            </Label>
            <Label htmlFor="transparency-no" className="cursor-pointer border rounded-lg p-4 hover:bg-accent flex flex-col items-center gap-2 [&:has(:checked)]:border-primary [&:has(:checked)]:bg-accent/50">
              <RadioGroupItem value="no" id="transparency-no" className="sr-only" />
              <span className="text-4xl">⬛</span>
              <span className="font-semibold">No</span>
              <span className="text-xs text-muted-foreground text-center">The image is a full rectangle</span>
            </Label>
          </RadioGroup>
        )}

        {step === 3 && (
          <RadioGroup value={animation || ""} onValueChange={(v) => setAnimation(v as Animation)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Label htmlFor="animation-yes" className="cursor-pointer border rounded-lg p-4 hover:bg-accent flex flex-col items-center gap-2 [&:has(:checked)]:border-primary [&:has(:checked)]:bg-accent/50">
              <RadioGroupItem value="yes" id="animation-yes" className="sr-only" />
              <span className="text-4xl">🎬</span>
              <span className="font-semibold">Yes</span>
              <span className="text-xs text-muted-foreground text-center">It moves (like a GIF)</span>
            </Label>
            <Label htmlFor="animation-no" className="cursor-pointer border rounded-lg p-4 hover:bg-accent flex flex-col items-center gap-2 [&:has(:checked)]:border-primary [&:has(:checked)]:bg-accent/50">
              <RadioGroupItem value="no" id="animation-no" className="sr-only" />
              <span className="text-4xl">🖼️</span>
              <span className="font-semibold">No</span>
              <span className="text-xs text-muted-foreground text-center">Static image</span>
            </Label>
          </RadioGroup>
        )}

        {step === 4 && recommendation && (
          <div className="space-y-6">
            <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 text-center space-y-2">
              <h3 className="text-lg font-medium text-muted-foreground">You should use</h3>
              <div className="text-4xl font-bold text-primary">{recommendation.format}</div>
              <p className="text-sm pt-2">{recommendation.description}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-4 h-4" /> Pros
                </h4>
                <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                  {recommendation.pros.map((pro, i) => (
                    <li key={i}>{pro}</li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2 text-amber-600">
                  <Info className="w-4 h-4" /> Cons
                </h4>
                <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                  {recommendation.cons.map((con, i) => (
                    <li key={i}>{con}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {step > 1 && step < 4 && (
          <Button variant="outline" onClick={() => setStep(step - 1)}>Back</Button>
        )}
        {step === 4 && (
          <Button variant="outline" onClick={handleReset} className="gap-2">
            <RefreshCw className="w-4 h-4" /> Start Over
          </Button>
        )}

        {step < 3 && (
          <Button
            onClick={() => setStep(step + 1)}
            disabled={(step === 1 && !imageType) || (step === 2 && !transparency)}
            className="ml-auto"
          >
            Next <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
        {step === 3 && (
          <Button
            onClick={() => setStep(4)}
            disabled={!animation}
            className="ml-auto"
          >
            See Result <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
        {step === 4 && recommendation && (
          <Button asChild className="ml-auto">
            <Link href={`/${recommendation.toolSlug}`}>
              {recommendation.toolName} <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
