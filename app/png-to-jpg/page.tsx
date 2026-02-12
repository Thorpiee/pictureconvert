import { Metadata } from "next"
import { ToolLayout } from "@/components/tool-layout"
import { ConverterTool } from "@/components/tools/converter-tool"
import { getToolBySlug } from "@/lib/tools-config"
import { notFound } from "next/navigation"

const tool = getToolBySlug("png-to-jpg")

if (!tool) {
  notFound()
}

export const metadata: Metadata = {
  title: tool.name,
  description: tool.description,
  openGraph: {
    title: `${tool.name} | PictureConvert`,
    description: tool.description,
    url: `https://pictureconvert.com/${tool.slug}`,
  },
  alternates: {
    canonical: `https://pictureconvert.com/${tool.slug}`,
  },
}

export default function PngToJpgPage() {
  return (
    <ToolLayout tool={tool}>
      <ConverterTool
        acceptedTypes={tool.acceptedTypes}
        outputType={tool.outputType}
        showQuality
      />

      <section className="mt-12 space-y-10">
        <div className="space-y-4">
          <p className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium">
            Updated for 2026
          </p>

          <h2 className="text-2xl font-bold tracking-tight">PNG to JPG: Reduce File Size Without Sacrificing Usability</h2>

          <p className="text-muted-foreground leading-7">
            Converting PNG to JPG is one of the most straightforward ways to reduce image file sizes—often by 50-90%. PNG uses lossless compression and stores every pixel perfectly, which makes it ideal for graphics and logos but wasteful for photographs and web galleries. JPG uses lossy compression, discarding data strategically so you get comparable visual quality in a fraction of the space.
          </p>

          <p className="text-muted-foreground leading-7">
            However, PNG to JPG conversion comes with a critical tradeoff: you lose transparency support. If your PNG has a transparent background, converting to JPG will fill that transparency with a solid color (usually white). The choice should depend on your actual use case—whether the smaller file size is worth losing lossless quality and transparency.
          </p>

          <p className="text-muted-foreground leading-7">
            This guide explains when to convert PNG to JPG, how lossy compression works, what quality settings mean, and how to evaluate the size-versus-quality balance for your specific project. For most web and email scenarios, PNG to JPG conversion makes practical sense. For design assets and transparent graphics, PNG should stay PNG.
          </p>
        </div>

        <section className="space-y-4" aria-labelledby="png-vs-jpg-table">
          <h2 id="png-vs-jpg-table" className="text-2xl font-bold tracking-tight">
            PNG vs JPG — What's the Difference?
          </h2>

          <div className="overflow-x-auto rounded-lg border">
            <table className="min-w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Factor</th>
                  <th className="px-4 py-3 text-left font-semibold">PNG</th>
                  <th className="px-4 py-3 text-left font-semibold">JPG</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="px-4 py-3 font-medium">Compression type</td>
                  <td className="px-4 py-3">Lossless (preserves all pixel data)</td>
                  <td className="px-4 py-3">Lossy (discards data strategically)</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-3 font-medium">Transparency support</td>
                  <td className="px-4 py-3">Yes (full alpha channel)</td>
                  <td className="px-4 py-3">No true transparency support</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-3 font-medium">File size</td>
                  <td className="px-4 py-3">Usually larger, especially for photos</td>
                  <td className="px-4 py-3">Usually 50-90% smaller than PNG</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-3 font-medium">Best for</td>
                  <td className="px-4 py-3">Graphics, logos, screenshots, design assets</td>
                  <td className="px-4 py-3">Photographs, galleries, web content</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-3 font-medium">Image quality</td>
                  <td className="px-4 py-3">Pixel-perfect, no quality degradation</td>
                  <td className="px-4 py-3">Quality depends on compression level</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-3 font-medium">Editing suitability</td>
                  <td className="px-4 py-3">Ideal for layered edits and revisions</td>
                  <td className="px-4 py-3">Each save adds compression artifacts</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-3 font-medium">Web performance</td>
                  <td className="px-4 py-3">Slower loading due to larger files</td>
                  <td className="px-4 py-3">Fast loading, better Core Web Vitals</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-4" aria-labelledby="when-to-convert">
          <h2 id="when-to-convert" className="text-2xl font-bold tracking-tight">
            When Should You Convert PNG to JPG?
          </h2>

          <h3 className="text-xl font-semibold">1) Photographs and natural images</h3>
          <p className="text-muted-foreground leading-7">
            Photos contain millions of color variations and gradients where lossy compression excels. JPG's compression algorithm is specifically optimized for photographic content, making it the ideal format for camera shots, landscape photos, and any image with continuous color transitions.
          </p>

          <h3 className="text-xl font-semibold">2) Web and email optimization</h3>
          <p className="text-muted-foreground leading-7">
            If file size matters—whether for faster page load, lower bandwidth costs, or email attachment limits—PNG to JPG conversion is the practical choice. Smaller files mean better Core Web Vitals, faster mobile experience, and reduced storage costs when scaled across thousands of images.
          </p>

          <h3 className="text-xl font-semibold">3) Social media and content galleries</h3>
          <p className="text-muted-foreground leading-7">
            Sites like Instagram, Facebook, and Pinterest handle JPG more efficiently. They often compress PNGs on upload anyway, so converting first gives you control over the quality-to-size ratio. For galleries with dozens or hundreds of images, JPG conversion reduces overall bandwidth significantly.
          </p>

          <h3 className="text-xl font-semibold">4) PNG files without transparency</h3>
          <p className="text-muted-foreground leading-7">
            If your PNG has no transparent areas—meaning it uses a solid background—there's no practical reason to keep it in PNG format. Converting to JPG at 80-85% quality will cut the file by half or more without any visible difference to most users.
          </p>

          <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
            <p className="font-semibold">Real-world file size examples</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>2MB PNG photo → ~300-400KB JPG (80-85% quality)</li>
              <li>5MB PNG gallery → ~600-800KB JPG (75% quality)</li>
              <li>1.5MB PNG screenshot → ~200-300KB JPG (85% quality)</li>
            </ul>
            <p className="text-muted-foreground leading-7">
              Size reduction is dramatic because JPG discards redundant color information the human eye doesn't notice. PNG keeps every pixel exactly, which is overkill for photographs but unnecessary overhead for web delivery.
            </p>
          </div>
        </section>

        <section className="space-y-4" aria-labelledby="when-not-to-convert">
          <h2 id="when-not-to-convert" className="text-2xl font-bold tracking-tight">
            When NOT to Convert PNG to JPG
          </h2>

          <p className="text-muted-foreground leading-7">
            PNG to JPG makes sense in most cases, but there are specific scenarios where you should keep PNG.
          </p>

          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li><span className="font-medium text-foreground">Transparent backgrounds:</span> If your PNG has a transparent background you want to preserve, JPG will fill it with solid color—usually white.</li>
            <li><span className="font-medium text-foreground">Text and graphics:</span> Sharp text, lines, and flat colors show artifacts in JPG. Graphics stay crisper in PNG or modern formats like WebP.</li>
            <li><span className="font-medium text-foreground">Print content:</span> For print workflows, PNG or PDF is usually preferred. JPG artifacts may be visible at high resolutions.</li>
            <li><span className="font-medium text-foreground">Archival and preservation:</span> When long-term quality matters, lossless PNG is the safer choice than JPG.</li>
          </ul>

          <p className="text-muted-foreground leading-7">
            For modern web delivery with even better compression than JPG, consider <a href="/png-to-webp" className="underline underline-offset-4">converting PNG to WebP</a> instead. WebP preserves transparency and provides 25-35% smaller files than PNG without the quality concerns of JPG conversion.
          </p>
        </section>

        <section className="space-y-4" aria-labelledby="quality-question">
          <h2 id="quality-question" className="text-2xl font-bold tracking-tight">
            Does Converting PNG to JPG Reduce Quality?
          </h2>
          <p className="text-muted-foreground leading-7">
            Yes, JPG is lossy compression—some data is discarded. However, "reduced quality" doesn't mean visibly worse. At quality settings of 80-85%, most people cannot detect the difference between the PNG original and the JPG version. The human eye has blind spots where JPG compression exploits natural color perception limits.
          </p>
          <p className="text-muted-foreground leading-7">
            The tradeoff is intentional: you sacrifice imperceptible quality details to cut file size in half. For photographs, this tradeoff is almost always worth it. For graphics with sharp edges and flat colors, JPG artifacts become visible at lower quality settings, which is why graphics stay better in PNG or WebP.
          </p>
          <p className="text-muted-foreground leading-7">
            The quality you lose in PNG to JPG conversion is *not* cumulative—unlike saving a JPG as JPG repeatedly. Convert once at your target quality, and that quality remains stable. The risk is only when you edit a JPG, save it, edit again, and save again—each cycle adds artifacts.
          </p>
        </section>

        <section className="space-y-4" aria-labelledby="seo-question">
          <h2 id="seo-question" className="text-2xl font-bold tracking-tight">
            Is JPG Better for Web Performance and SEO?
          </h2>
          <p className="text-muted-foreground leading-7">
            Yes. Smaller JPG files load faster, which directly improves Core Web Vitals—a ranking factor in Google's algorithm. Pages with slower image loads see higher bounce rates and lower time-on-page, both of which signal poor experience to search engines. Converting PNG to JPG reduces file size substantially, improving Largest Contentful Paint (LCP) and overall page speed.
          </p>
          <p className="text-muted-foreground leading-7">
            However, SEO is about the whole page, not just format choice. A page with a single JPG won't rank better than a page with a compressed PNG if other factors are poor. The SEO win from PNG to JPG conversion comes when applied at scale—across product galleries, blog images, or lead-gen pages where bandwidth and speed matter.
          </p>
          <p className="text-muted-foreground leading-7">
            For best results, combine format optimization with proper img dimensions, responsive images, and lazy loading. You can also consider <a href="/compress-jpg" className="underline underline-offset-4">compressing JPG further</a> or converting to <a href="/jpg-to-webp" className="underline underline-offset-4">WebP for even better performance</a>.
          </p>
        </section>

        <section className="space-y-4" aria-labelledby="technical-explaining">
          <h2 id="technical-explaining" className="text-2xl font-bold tracking-tight">
            How PNG to JPG Conversion Works (Technical Explanation)
          </h2>
          <p className="text-muted-foreground leading-7">
            <strong>PNG uses lossless compression:</strong> Every pixel is stored exactly. PNG data can be reconstructed perfectly every time. This is why PNGs are larger—no information is thrown away.
          </p>
          <p className="text-muted-foreground leading-7">
            <strong>JPG uses lossy compression:</strong> The image is converted to a color space (YCbCr) where the human eye is less sensitive to certain color information. JPG then discards fine color details while preserving brightness and shape. The quality slider (80%, 90%, etc.) controls how aggressively JPG discards data.
          </p>
          <p className="text-muted-foreground leading-7">
            <strong>The conversion process:</strong> When you convert PNG to JPG, the data from the PNG is decoded, then re-encoded using JPG's compression. No new compression artifacts are added beyond what JPG compression naturally creates—you're not "double-compressing."
          </p>
          <p className="text-muted-foreground leading-7">
            <strong>Transparency handling:</strong> JPG has no alpha channel. If your PNG has transparent pixels, they cannot be represented. The conversion tool fills transparent areas with a solid background color (typically white).
          </p>
        </section>

        <section className="space-y-4" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-2xl font-bold tracking-tight">FAQ</h2>
          <div className="space-y-3">
            <details className="rounded-lg border p-4">
              <summary className="cursor-pointer font-medium">What happens to transparent areas when I convert PNG to JPG?</summary>
              <p className="mt-3 text-muted-foreground leading-7">
                Transparent areas will be filled with a solid background color, typically white. JPG does not have an alpha channel for transparency.
              </p>
            </details>
            <details className="rounded-lg border p-4">
              <summary className="cursor-pointer font-medium">How much smaller will the JPG file be?</summary>
              <p className="mt-3 text-muted-foreground leading-7">
                Usually 50-90% smaller, depending on the original PNG and your quality setting. Photographs compress more dramatically than graphics or screenshots.
              </p>
            </details>
            <details className="rounded-lg border p-4">
              <summary className="cursor-pointer font-medium">What quality setting should I use?</summary>
              <p className="mt-3 text-muted-foreground leading-7">
                Start at 80%. Most users cannot detect quality loss at this setting. Use 85-90% for important images, 70-75% for thumbnails or when maximum compression is needed.
              </p>
            </details>
            <details className="rounded-lg border p-4">
              <summary className="cursor-pointer font-medium">Can I convert PNG to JPG and then edit the JPG?</summary>
              <p className="mt-3 text-muted-foreground leading-7">
                You can, but don't repeatedly edit and save the same JPG. Each save adds compression artifacts. Edit your PNG original, convert once at your final quality setting.
              </p>
            </details>
            <details className="rounded-lg border p-4">
              <summary className="cursor-pointer font-medium">Is there a better format than JPG for web images?</summary>
              <p className="mt-3 text-muted-foreground leading-7">
                WebP is more efficient than JPG and supports transparency. Use WebP for modern browsers, with JPG as a fallback for older browsers.
              </p>
            </details>
          </div>
        </section>

        <section className="rounded-lg border bg-muted/30 p-6 space-y-3">
          <h2 className="text-2xl font-bold tracking-tight">Ready to convert PNG to JPG?</h2>
          <p className="text-muted-foreground leading-7">
            Upload your PNG above to convert to JPG in seconds. Adjust the quality slider to find your balance between file size and visual quality. For additional optimization, try <a href="/compress-jpg" className="underline underline-offset-4">compressing the JPG</a> afterward or exploring <a href="/jpg-to-webp" className="underline underline-offset-4">JPG to WebP</a> for modern browsers.
          </p>
        </section>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What happens to transparent areas when I convert PNG to JPG?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Transparent areas will be filled with a solid background color, typically white. JPG does not have an alpha channel for transparency."
                }
              },
              {
                "@type": "Question",
                "name": "How much smaller will the JPG file be?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Usually 50-90% smaller, depending on the original PNG and quality setting. Photographs compress more dramatically than graphics or screenshots."
                }
              },
              {
                "@type": "Question",
                "name": "What quality setting should I use?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Start at 80%. Most users cannot detect quality loss at this setting. Use 85-90% for important images, 70-75% for thumbnails."
                }
              },
              {
                "@type": "Question",
                "name": "Can I convert PNG to JPG and then edit the JPG?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You can, but avoid repeatedly editing and saving the same JPG. Each save adds artifacts. Edit your PNG original, then convert once at your final quality."
                }
              },
              {
                "@type": "Question",
                "name": "Is there a better format than JPG for web images?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "WebP is more efficient than JPG and supports transparency. Use WebP for modern browsers, with JPG as fallback."
                }
              }
            ]
          }),
        }}
      />
    </ToolLayout>
  )
}
