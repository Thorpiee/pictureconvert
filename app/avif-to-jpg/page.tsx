import { Metadata } from "next"
import { generateToolMetadata } from "@/lib/seo-utils"
import { ToolLayout } from "@/components/tool-layout"
import { ConverterTool } from "@/components/tools/converter-tool"
import { getToolBySlug } from "@/lib/tools-config"
import { notFound } from "next/navigation"

const tool = getToolBySlug("avif-to-jpg")

if (!tool) {
  notFound()
}

export const metadata: Metadata = generateToolMetadata(tool!)

export default function AvifToJpgPage() {
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

          <h2 className="text-2xl font-bold tracking-tight">AVIF to JPG: Convert Next-Gen Images for Compatibility</h2>

          <p className="text-muted-foreground leading-7">
            AVIF (AV1 Image File Format) is the newest and most efficient image format available today, offering superior compression compared to WebP, PNG, and JPG. Built on the open-source AV1 video codec, AVIF can be 20-50% smaller than JPG at the same visual quality. However, AVIF's cutting-edge status means browser and software support is still limited to modern platforms.
          </p>

          <p className="text-muted-foreground leading-7">
            AVIF to JPG conversion is necessary when you need universal compatibility. While AVIF is excellent for web delivery to modern browsers, many devices, email clients, cloud storage services, and software tools can't open AVIF files. JPG is the universally compatible fallback that works everywhere.
          </p>

          <p className="text-muted-foreground leading-7">
            Converting AVIF to JPG involves a format compromise—you sacrifice AVIF's superior efficiency for JPG's universal support. The practical choice depends on your audience and use case: if your users have modern browsers, serve AVIF natively. If you need broad compatibility, convert to JPG.
          </p>
        </div>

        <section className="space-y-4" aria-labelledby="avif-vs-jpg-table">
          <h2 id="avif-vs-jpg-table" className="text-2xl font-bold tracking-tight">
            AVIF vs JPG — What's the Difference?
          </h2>

          <div className="overflow-x-auto rounded-lg border">
            <table className="min-w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Factor</th>
                  <th className="px-4 py-3 text-left font-semibold">AVIF</th>
                  <th className="px-4 py-3 text-left font-semibold">JPG</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="px-4 py-3 font-medium">Compression technology</td>
                  <td className="px-4 py-3">Modern (AV1 video codec)</td>
                  <td className="px-4 py-3">Legacy (1989 JPEG standard)</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-3 font-medium">File size at same quality</td>
                  <td className="px-4 py-3">Smallest (reference baseline)</td>
                  <td className="px-4 py-3">20-50% larger than AVIF</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-3 font-medium">Browser support</td>
                  <td className="px-4 py-3">~60-70% modern browsers</td>
                  <td className="px-4 py-3">100% universal</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-3 font-medium">Software / app support</td>
                  <td className="px-4 py-3">Limited, growing slowly</td>
                  <td className="px-4 py-3">Universal across all platforms</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-3 font-medium">Encoding / decoding speed</td>
                  <td className="px-4 py-3">Slower (computationally intensive)</td>
                  <td className="px-4 py-3">Fast (highly optimized)</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-3 font-medium">Patent status</td>
                  <td className="px-4 py-3">Open-source, royalty-free</td>
                  <td className="px-4 py-3">No patent restrictions</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-3 font-medium">Animated support</td>
                  <td className="px-4 py-3">Yes (like WebP)</td>
                  <td className="px-4 py-3">No (static only)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-4" aria-labelledby="when-to-convert">
          <h2 id="when-to-convert" className="text-2xl font-bold tracking-tight">
            When Should You Convert AVIF to JPG?
          </h2>

          <h3 className="text-xl font-semibold">1) Universal sharing and distribution</h3>
          <p className="text-muted-foreground leading-7">
            If you need to share an AVIF file with users on different platforms, older browsers, or software that doesn't support AVIF, conversion to JPG is mandatory. JPG works everywhere.
          </p>

          <h3 className="text-xl font-semibold">2) Email and messaging applications</h3>
          <p className="text-muted-foreground leading-7">
            Email clients and messaging platforms often struggle with new formats. Recipients may not be able to open AVIF attachments. JPG ensures your images arrive safely.
          </p>

          <h3 className="text-xl font-semibold">3) Cloud storage and archiving</h3>
          <p className="text-muted-foreground leading-7">
            Many cloud storage services (Google Drive, OneDrive, Dropbox) have limited AVIF preview and metadata support. Storing as JPG ensures consistent performance across platforms.
          </p>

          <h3 className="text-xl font-semibold">4) Fallback for responsive images</h3>
          <p className="text-muted-foreground leading-7">
            When serving AVIF to modern browsers using the picture element, provide JPG fallbacks. This allows modern users to benefit from AVIF efficiency while ensuring older browsers still work.
          </p>

          <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
            <p className="font-semibold">Real-world file size examples</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>600KB AVIF photo → ~1-1.2MB JPG (quality 85)</li>
              <li>800KB AVIF landscape → ~1.3-1.5MB JPG (quality 85)</li>
              <li>500KB AVIF portrait → ~900KB JPG (quality 85)</li>
            </ul>
            <p className="text-muted-foreground leading-7">
              AVIF's superior compression means converting to JPG usually results in 30-50% larger files. This is the expected tradeoff for universal compatibility.
            </p>
          </div>
        </section>

        <section className="space-y-4" aria-labelledby="when-not-to-convert">
          <h2 id="when-not-to-convert" className="text-2xl font-bold tracking-tight">
            When NOT to Convert AVIF to JPG
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li><span className="font-medium text-foreground">Web-only delivery:</span> If your audience uses modern browsers exclusively, keep AVIF for superior compression and performance.</li>
            <li><span className="font-medium text-foreground">File size is critical:</span> For bandwidth-constrained scenarios or massive image libraries, AVIF's efficiency is too valuable to lose.</li>
            <li><span className="font-medium text-foreground">You're targeting tech-savvy users:</span> Developers, designers, and early adopters will have AVIF support; conversion is unnecessary.</li>
            <li><span className="font-medium text-foreground">Using responsive images correctly:</span> Serve AVIF with fallbacks using the picture element instead of converting—get both efficiency and compatibility.</li>
          </ul>
        </section>

        <section className="space-y-4" aria-labelledby="quality-question">
          <h2 id="quality-question" className="text-2xl font-bold tracking-thick">
            Does Converting AVIF to JPG Reduce Quality?
          </h2>
          <p className="text-muted-foreground leading-7">
            Yes, some quality is lost since both are lossy formats. However, converting AVIF (which is typically high-quality) to JPG at 85% quality usually produces visually excellent results. Since AVIF originals are efficient captures, the conversion quality impact is minimal for most uses.
          </p>
          <p className="text-muted-foreground leading-7">
            The practical truth: an AVIF image converted to JPG at 80-85% quality usually looks identical to a direct-to-JPG capture. Quality loss is imperceptible for web, email, and social media sharing.
          </p>
        </section>

        <section className="space-y-4" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-2xl font-bold tracking-tight">FAQ</h2>
          <div className="space-y-3">
            <details className="rounded-lg border p-4">
              <summary className="cursor-pointer font-medium">What is AVIF format?</summary>
              <p className="mt-3 text-muted-foreground leading-7">
                AVIF is AV1 Image File Format, built on the AV1 video codec. It's the newest image format, offering superior compression (20-50% smaller than JPG).
              </p>
            </details>
            <details className="rounded-lg border p-4">
              <summary className="cursor-pointer font-medium">Why can't I open AVIF files?</summary>
              <p className="mt-3 text-muted-foreground leading-7">
                AVIF support is still growing. Not all browsers, software, or cloud services support it yet. JPG remains the universal fallback.
              </p>
            </details>
            <details className="rounded-lg border p-4">
              <summary className="cursor-pointer font-medium">Will my JPG be the same quality as the original AVIF?</summary>
              <p className="mt-3 text-muted-foreground leading-7">
                At 80-85% quality, JPG will look virtually identical. Some technical quality is lost, but visually imperceptible for most uses.
              </p>
            </details>
            <details className="rounded-lg border p-4">
              <summary className="cursor-pointer font-medium">Should I always convert AVIF to JPG?</summary>
              <p className="mt-3 text-muted-foreground leading-7">
                Only convert when you need broad compatibility. For web delivery, use responsive images with AVIF primary and JPG fallback.
              </p>
            </details>
            <details className="rounded-lg border p-4">
              <summary className="cursor-pointer font-medium">What's the best way to serve both AVIF and JPG?</summary>
              <p className="mt-3 text-muted-foreground leading-7">
                Use the HTML5 picture element with AVIF as primary source and JPG as fallback. This gives modern browsers efficiency and older ones compatibility.
              </p>
            </details>
          </div>
        </section>

        <section className="rounded-lg border bg-muted/30 p-6 space-y-3">
          <h2 className="text-2xl font-bold tracking-tight">Ready to convert AVIF to JPG?</h2>
          <p className="text-muted-foreground leading-7">
            Upload your AVIF file above to convert to JPG in seconds. For web delivery, remember to serve AVIF to modern browsers with JPG fallbacks. For further optimization, try <a href="/compress-jpg" className="underline underline-offset-4">compressing the JPG</a>.
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
                "name": "What is AVIF format?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "AVIF is AV1 Image File Format built on the AV1 video codec. It's the newest image format offering superior compression."
                }
              },
              {
                "@type": "Question",
                "name": "Why can't I open AVIF files?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "AVIF support is still growing. Not all browsers, software, or services support it, making JPG universal compatibility important."
                }
              },
              {
                "@type": "Question",
                "name": "Will my JPG be the same quality as the AVIF?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "At 80-85% quality, JPG looks virtually identical. Some technical quality is lost but visually imperceptible for most uses."
                }
              },
              {
                "@type": "Question",
                "name": "Should I always convert AVIF to JPG?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Only convert when you need compatibility. For web, use responsive images with AVIF primary and JPG fallback instead."
                }
              },
              {
                "@type": "Question",
                "name": "How do I serve both AVIF and JPG?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Use HTML5 <picture> element with AVIF primary source and JPG fallback for maximum efficiency and compatibility."
                }
              }
            ]
          }),
        }}
      />
    </ToolLayout>
  )
}
