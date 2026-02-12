import { Metadata } from "next"
import { generateToolMetadata } from "@/lib/seo-utils"
import { ToolLayout } from "@/components/tool-layout"
import { ConverterTool } from "@/components/tools/converter-tool"
import { getToolBySlug } from "@/lib/tools-config"
import { notFound } from "next/navigation"

const tool = getToolBySlug("heic-to-jpg")

if (!tool) {
  notFound()
}

export const metadata: Metadata = generateToolMetadata(tool!)

export default function HeicToJpgPage() {
  return (
    <ToolLayout tool={tool!}>
      <ConverterTool
        acceptedTypes={tool!.acceptedTypes}
        outputType={tool!.outputType}
        showQuality
      />

      <section className="mt-12 space-y-10">
        <div className="space-y-4">
          <p className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium">
            Updated for 2026
          </p>

          <h2 className="text-2xl font-bold tracking-tight">HEIC to JPG: Convert iPhone Photos for Universal Compatibility</h2>

          <p className="text-muted-foreground leading-7">
            HEIC (High Efficiency Image Container) is Apple's default photo format on iPhones and iPads since iOS 11. It provides exceptional compression—Apple HEIC files are often 40-50% smaller than equivalent JPG files because HEIC uses H.265 video codec technology. However, HEIC's problem is simple: most non-Apple devices, software, and platforms don't support it natively.
          </p>

          <p className="text-muted-foreground leading-7">
            If you've ever tried to upload an iPhone photo to Windows, Android, or older software, you've likely encountered frustration. HEIC to JPG conversion is the practical solution—convert Apple's proprietary format to the universally compatible standard that works everywhere: on the web, in email, on Android, in cloud storage, and on desktops worldwide.
          </p>

          <p className="text-muted-foreground leading-7">
            The tradeoff is file size. JPG files are typically 25-40% larger than the original HEIC because JPG is older and less efficient. However, universal compatibility almost always outweighs file size concerns. For professional workflows, product uploads, and cross-platform sharing, HEIC to JPG is non-negotiable.
          </p>
        </div>

        <section className="space-y-4" aria-labelledby="heic-vs-jpg-table">
          <h2 id="heic-vs-jpg-table" className="text-2xl font-bold tracking-tight">
            HEIC vs JPG — What's the Difference?
          </h2>

          <div className="overflow-x-auto rounded-lg border">
            <table className="min-w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Factor</th>
                  <th className="px-4 py-3 text-left font-semibold">HEIC</th>
                  <th className="px-4 py-3 text-left font-semibold">JPG</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="px-4 py-3 font-medium">Compression type</td>
                  <td className="px-4 py-3">Lossy (H.265 video codec)</td>
                  <td className="px-4 py-3">Lossy (JPEG 1991 algorithm)</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-3 font-medium">Typical file size</td>
                  <td className="px-4 py-3">Apple standard, ~4MB per photo</td>
                  <td className="px-4 py-3">~1.5-2MB per photo (25-40% larger than HEIC)</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-3 font-medium">Device support</td>
                  <td className="px-4 py-3">Apple only (iPhone, iPad, Mac)</td>
                  <td className="px-4 py-3">Universal (100% of devices/platforms)</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-3 font-medium">Metadata preservation</td>
                  <td className="px-4 py-3">EXIF, GPS, timestamps included</td>
                  <td className="px-4 py-3">EXIF preserved, may lose some metadata</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-3 font-medium">Quality at equivalent size</td>
                  <td className="px-4 py-3">Excellent (newer codec)</td>
                  <td className="px-4 py-3">Good (older codec)</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-3 font-medium">Best for</td>
                  <td className="px-4 py-3">Apple ecosystem, storage optimization</td>
                  <td className="px-4 py-3">Universal sharing, web delivery</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-3 font-medium">Editing software support</td>
                  <td className="px-4 py-3">Limited (mostly Apple tools)</td>
                  <td className="px-4 py-3">Universal (every photo editor)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-4" aria-labelledby="when-to-convert">
          <h2 id="when-to-convert" className="text-2xl font-bold tracking-tight">
            When Should You Convert HEIC to JPG?
          </h2>

          <h3 className="text-xl font-semibold">1) Uploading to non-Apple platforms</h3>
          <p className="text-muted-foreground leading-7">
            Windows computers, Android devices, most web platforms, and cloud storage services don't recognize HEIC natively. If you're uploading iPhone photos to Google Drive, Dropbox, your website, or emailing to non-Apple users, HEIC to JPG is essential.
          </p>

          <h3 className="text-xl font-semibold">2) E-commerce and product photography</h3>
          <p className="text-muted-foreground leading-7">
            Product listings, eBay, Etsy, Amazon, and most online marketplaces cannot process HEIC files. HEIC to JPG conversion is a mandatory workflow step for sellers using iPhones to photograph products.
          </p>

          <h3 className="text-xl font-semibold">3) Professional workflows and team collaboration</h3>
          <p className="text-muted-foreground leading-7">
            Design teams, marketing departments, and photo workflows typically work across platforms. HEIC files create bottlenecks when team members use Windows or Android. JPG ensures file compatibility across the entire team.
          </p>

          <h3 className="text-xl font-semibold">4) Long-term archival and preservation</h3>
          <p className="text-muted-foreground leading-7">
            JPG has 35+ years of universal support and isn't going anywhere. HEIC's long-term viability is uncertain since it's proprietary. For archiving important photos, JPG is the safer choice.
          </p>

          <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
            <p className="font-semibold">Real-world file size examples</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>iPhone 4MB HEIC → ~1.5-2MB JPG (quality 85)</li>
              <li>iPhone 6MB HEIC portrait → ~2-2.5MB JPG (quality 85)</li>
              <li>iPhone 3MB HEIC landscape → ~1.2-1.5MB JPG (quality 85)</li>
            </ul>
            <p className="text-muted-foreground leading-7">
              HEIC's superior compression means iPhones store more photos per GB. When converting to JPG, file size increases 25-40%, which is normal. The JPG quality remains excellent because HEIC originals are high-quality captures.
            </p>
          </div>
        </section>

        <section className="space-y-4" aria-labelledby="when-not-to-convert">
          <h2 id="when-not-to-convert" className="text-2xl font-bold tracking-tight">
            When NOT to Convert HEIC to JPG
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li><span className="font-medium text-foreground">Staying in Apple ecosystem:</span> If your entire workflow is Mac/iPhone/iPad and you don't share externally, keep HEIC for maximum storage efficiency.</li>
            <li><span className="font-medium text-foreground">Archiving with future Apple dependency:</span> If you're archiving for personal use and plan to always use Apple devices, HEIC is fine.</li>
            <li><span className="font-medium text-foreground">Maximum photo count per GB:</span> If storage space is your only constraint and you don't need cross-platform compatibility, HEIC's smaller size is an advantage.</li>
          </ul>

          <p className="text-muted-foreground leading-7">
            For professional or shared use, convert to JPG. For personal iPhone backup exclusively on Apple devices, HEIC is acceptable, though JPG is the safer archival choice.
          </p>
        </section>

        <section className="space-y-4" aria-labelledby="quality-question">
          <h2 id="quality-question" className="text-2xl font-bold tracking-thick">
            Does Converting HEIC to JPG Reduce Quality?
          </h2>
          <p className="text-muted-foreground leading-7">
            Minimally, if configured properly. HEIC to JPG is a conversion between two lossy formats, but the visual impact depends on JPG quality settings. Since HEIC use H.265 (a modern, efficient codec), conversion to JPG at quality 80-85% typically produces visually identical results to a direct iPhone-to-JPG capture.
          </p>
          <p className="text-muted-foreground leading-7">
            The practical truth: an iPhone HEIC photo converted to JPG at 85% quality will look virtually identical to the original capture. Quality loss is imperceptible for sharing, social media, and most professional use.
          </p>
          <p className="text-muted-foreground leading-7">
            If you want to minimize quality loss, use quality settings of 85-90%. If file size is more important, 75-80% is still excellent for most purposes. Test your specific photos to find your comfort level.
          </p>
        </section>

        <section className="space-y-4" aria-labelledby="tips-section">
          <h2 id="tips-section" className="text-2xl font-bold tracking-tight">
            Tips for HEIC to JPG Conversion
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li><span className="font-medium text-foreground">Check iOS settings:</span> You can change your iPhone to capture RAW or JPG directly instead of HEIC. Go to Settings → Camera → Formats.</li>
            <li><span className="font-medium text-foreground">Batch convert:</span> If you have many HEIC files, process them in batches using this tool rather than one-by-one in slower apps.</li>
            <li><span className="font-medium text-foreground">Preserve metadata:</span> HEIC includes EXIF data like location. Use <a href="/remove-exif" className="underline underline-offset-4">Remove EXIF</a> if you need to strip location before sharing.</li>
            <li><span className="font-medium text-foreground">Compress further:</span> After conversion, <a href="/compress-jpg" className="underline underline-offset-4">compress the JPG</a> if you need smaller files for email or web.</li>
          </ul>
        </section>

        <section className="space-y-4" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-2xl font-bold tracking-tight">FAQ</h2>
          <div className="space-y-3">
            <details className="rounded-lg border p-4">
              <summary className="cursor-pointer font-medium">What is HEIC format?</summary>
              <p className="mt-3 text-muted-foreground leading-7">
                HEIC (High Efficiency Image Container) is Apple's default photo format since iOS 11. It uses H.265 codec for superior compression compared to JPG but is only supported on Apple devices.
              </p>
            </details>
            <details className="rounded-lg border p-4">
              <summary className="cursor-pointer font-medium">Why can't I open HEIC files on Windows or Android?</summary>
              <p className="mt-3 text-muted-foreground leading-7">
                HEIC support requires specific software. Windows, Android, most web platforms, and legacy photo software don't natively support it. That's why conversion to JPG is standard.
              </p>
            </details>
            <details className="rounded-lg border p-4">
              <summary className="cursor-pointer font-medium">Will conversion reduce photo quality?</summary>
              <p className="mt-3 text-muted-foreground leading-7">
                Minimal quality loss at 80-85% quality settings. Since HEIC originals are high-quality iPhone captures, the conversion typically looks virtually identical.
              </p>
            </details>
            <details className="rounded-lg border p-4">
              <summary className="cursor-pointer font-medium">Why is JPG larger than HEIC?</summary>
              <p className="mt-3 text-muted-foreground leading-7">
                HEIC uses a newer, more efficient codec (H.265). JPG is older and less efficient. This tradeoff is normal when converting to a universally supported format.
              </p>
            </details>
            <details className="rounded-lg border p-4">
              <summary className="cursor-pointer font-medium">Can I change my iPhone to save as JPG instead of HEIC?</summary>
              <p className="mt-3 text-muted-foreground leading-7">
                Yes. Go to iPhone Settings → Camera → Formats → Most Compatible. This sets new photos to JPG instead of HEIC.
              </p>
            </details>
          </div>
        </section>

        <section className="rounded-lg border bg-muted/30 p-6 space-y-3">
          <h2 className="text-2xl font-bold tracking-tight">Ready to convert HEIC to JPG?</h2>
          <p className="text-muted-foreground leading-7">
            Upload your HEIC photos from your iPhone above to convert to universally compatible JPG in seconds. For additional optimization, consider <a href="/compress-jpg" className="underline underline-offset-4">compressing the JPG</a> afterward or using <a href="/jpg-to-webp" className="underline underline-offset-4">JPG to WebP</a> for web delivery.
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
                "name": "What is HEIC format?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "HEIC is Apple's default photo format since iOS 11. It uses H.265 codec for superior compression but only works on Apple devices."
                }
              },
              {
                "@type": "Question",
                "name": "Why can't I open HEIC on Windows or Android?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "HEIC support requires specific software. Windows, Android, and most platforms don't support it natively."
                }
              },
              {
                "@type": "Question",
                "name": "Does HEIC to JPG reduce quality?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Minimal quality loss at 80-85% settings. Since HEIC originals are high-quality iPhone captures, conversion looks virtually identical."
                }
              },
              {
                "@type": "Question",
                "name": "Why is JPG larger than HEIC?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "HEIC uses a newer, more efficient codec (H.265). JPG is older and less efficient, resulting in 25-40% larger files."
                }
              },
              {
                "@type": "Question",
                "name": "Can I change my iPhone to save as JPG?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Go to Settings → Camera → Formats → Most Compatible to set new photos to JPG."
                }
              }
            ]
          }),
        }}
      />
    </ToolLayout>
  )
}
