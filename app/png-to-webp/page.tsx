import { Metadata } from "next"
import { ToolLayout } from "@/components/tool-layout"
import { ConverterTool } from "@/components/tools/converter-tool"
import { getToolBySlug } from "@/lib/tools-config"
import { notFound } from "next/navigation"

const tool = getToolBySlug("png-to-webp")

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

export default function PngToWebpPage() {
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

          <h2 className="text-2xl font-bold tracking-tight">PNG to WebP: The Modern Format for Web Performance</h2>

          <p className="text-muted-foreground leading-7">
            PNG to WebP conversion is the fastest way to modernize your web images. WebP is Google's open-source format designed specifically for web delivery, offering superior compression compared to both PNG and JPG. Converting PNG to WebP typically reduces file size by 25-35% while maintaining or improving visual quality, and critically, WebP preserves PNG's transparency support.
          </p>

          <p className="text-muted-foreground leading-7">
            The tradeoff is browser support: WebP is supported in all modern browsers (Chrome, Firefox, Safari 14+, Edge), but older browsers (especially Internet Explorer) don't recognize it. This is why the industry standard is to serve WebP to modern browsers and provide PNG or JPG fallbacks for legacy users—a technique called responsive images.
          </p>

          <p className="text-muted-foreground leading-7">
            For teams focused on Core Web Vitals, carbon footprint reduction, and bandwidth optimization, PNG to WebP conversion is one of the highest-impact optimizations available. At scale, across hundreds of product images or gallery assets, WebP can reduce your total image payload by 30-40%, improving page speed and user experience dramatically.
          </p>
        </div>

        <section className="space-y-4" aria-labelledby="png-vs-webp-table">
          <h2 id="png-vs-webp-table" className="text-2xl font-bold tracking-tight">
            PNG vs WebP — What's the Difference?
          </h2>

          <div className="overflow-x-auto rounded-lg border">
            <table className="min-w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Factor</th>
                  <th className="px-4 py-3 text-left font-semibold">PNG</th>
                  <th className="px-4 py-3 text-left font-semibold">WebP</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="px-4 py-3 font-medium">Compression type</td>
                  <td className="px-4 py-3">Lossless only</td>
                  <td className="px-4 py-3">Both lossless and lossy (configurable)</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-3 font-medium">Transparency support</td>
                  <td className="px-4 py-3">Yes (alpha channel)</td>
                  <td className="px-4 py-3">Yes (alpha channel)</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-3 font-medium">File size</td>
                  <td className="px-4 py-3">Baseline, larger for photos</td>
                  <td className="px-4 py-3">25-35% smaller than PNG</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-3 font-medium">Best for</td>
                  <td className="px-4 py-3">Graphics, logos, desktop software</td>
                  <td className="px-4 py-3">Web delivery, modern applications</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-3 font-medium">Browser support</td>
                  <td className="px-4 py-3">Universal (100% browsers)</td>
                  <td className="px-4 py-3">~95% modern browsers only</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-3 font-medium">Web performance</td>
                  <td className="px-4 py-3">Good, can be large</td>
                  <td className="px-4 py-3">Excellent, optimized for web</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-3 font-medium">Editing suitability</td>
                  <td className="px-4 py-3">Excellent, native support in most editors</td>
                  <td className="px-4 py-3">Limited, requires compatible tools</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-4" aria-labelledby="when-to-convert">
          <h2 id="when-to-convert" className="text-2xl font-bold tracking-tight">
            When Should You Convert PNG to WebP?
          </h2>

          <h3 className="text-xl font-semibold">1) Website image optimization</h3>
          <p className="text-muted-foreground leading-7">
            If you control the server and support modern browsers, serve WebP versions of your PNG images. Use a picture element with WebP as the primary source and PNG as fallback. This hits the sweet spot of modern performance with legacy support.
          </p>

          <h3 className="text-xl font-semibold">2) Product galleries and catalogs</h3>
          <p className="text-muted-foreground leading-7">
            E-commerce sites with hundreds or thousands of product images see massive bandwidth savings from PNG to WebP conversion. At 25-35% smaller files, the cumulative effect improves page speed, reduces server costs, and improves Core Web Vitals across the board.
          </p>

          <h3 className="text-xl font-semibold">3) Progressive app images</h3>
          <p className="text-muted-foreground leading-7">
            Progressive web apps (PWAs) and modern web applications benefit significantly from WebP. Since PWAs already assume modern browser support, serving WebP reduces bandwidth for mobile users and improves app responsiveness.
          </p>

          <h3 className="text-xl font-semibold">4) Retaining transparency with smaller files</h3>
          <p className="text-muted-foreground leading-7">
            If you need transparent backgrounds (like logos or icons) but can't use JPG, PNG to WebP gives you the best of both worlds—full transparency support plus dramatic file size reduction compared to PNG.
          </p>

          <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
            <p className="font-semibold">Real-world file size examples</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>2MB PNG icon set → ~400-500KB WebP</li>
              <li>1.5MB PNG logo with transparency → ~300-400KB WebP</li>
              <li>3MB PNG screenshot → ~600-800KB WebP</li>
            </ul>
            <p className="text-muted-foreground leading-7">
              WebP achieves smaller sizes through more efficient compression algorithms and color space optimization. It's specifically engineered for web use, which is why the gains are so substantial even before considering quality settings.
            </p>
          </div>
        </section>

        <section className="space-y-4" aria-labelledby="when-not-to-convert">
          <h2 id="when-not-to-convert" className="text-2xl font-bold tracking-tight">
            When NOT to Convert PNG to WebP
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li><span className="font-medium text-foreground">Audience requires IE support:</span> If you need Internet Explorer support (which you shouldn't, but sometimes you must), WebP won't work without fallbacks.</li>
            <li><span className="font-medium text-foreground">Editing in non-WebP-capable software:</span> If your team uses older design tools without WebP support, edit in PNG and convert only for publishing.</li>
            <li><span className="font-medium text-foreground">Archival and preservation:</span> For long-term storage, PNG is a safer choice than WebP since PNG is more universally archived.</li>
            <li><span className="font-medium text-foreground">Sharing with non-technical users:</span> If end-users need to edit downloaded images, they may not have WebP support—consider <a href="/png-to-jpg" className="underline underline-offset-4">PNG to JPG</a> instead.</li>
          </ul>
        </section>

        <section className="space-y-4" aria-labelledby="quality-question">
          <h2 id="quality-question" className="text-2xl font-bold tracking-tight">
            Does Converting PNG to WebP Improve Quality?
          </h2>
          <p className="text-muted-foreground leading-7">
            No, but it also doesn't reduce quality if you configure it properly. PNG to WebP conversion can use lossless mode (exactly like PNG) or lossy mode (more efficient compression at the cost of imperceptible quality loss). When converting PNG graphics with transparency, use lossless mode to preserve exact pixel data while still gaining 10-20% size reduction over PNG.
          </p>
          <p className="text-muted-foreground leading-7">
            The "quality" setting in WebP is different from JPG's slider. At WebP quality 85-90 (default), most quality loss is imperceptible. For graphics with transparency, lossless mode is recommended—you get no quality loss and still beat PNG's file size.
          </p>
        </section>

        <section className="space-y-4" aria-labelledby="seo-question">
          <h2 id="seo-question" className="text-2xl font-bold tracking-tight">
            Is WebP Better for Web Performance and SEO?
          </h2>
          <p className="text-muted-foreground leading-7">
            Yes. WebP is explicitly optimized for web performance and is recognized by Google's Core Web Vitals as a best practice. Smaller files mean faster page load times (Fastest Contentful Paint), improved Cumulative Layout Shift, and better overall user experience. These factors directly impact search rankings.
          </p>
          <p className="text-muted-foreground leading-7">
            At scale, PNG to WebP conversion on a site with 50+ images can reduce total image payload by 30-40%, which compounds into measurable improvements in page speed, server costs, and user satisfaction. This is one of the highest-ROI optimizations available for most websites.
          </p>
          <p className="text-muted-foreground leading-7">
            For best results, combine PNG to WebP conversion with responsive image techniques (using the picture element and srcset) and continue compressing with <a href="/compress-png" className="underline underline-offset-4">PNG compression</a> before any fallback delivery.
          </p>
        </section>

        <section className="space-y-4" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-2xl font-bold tracking-tight">FAQ</h2>
          <div className="space-y-3">
            <details className="rounded-lg border p-4">
              <summary className="cursor-pointer font-medium">Does WebP support transparency like PNG?</summary>
              <p className="mt-3 text-muted-foreground leading-7">
                Yes, WebP fully supports alpha channel transparency, just like PNG. All transparent information from your PNG is preserved.
              </p>
            </details>
            <details className="rounded-lg border p-4">
              <summary className="cursor-pointer font-medium">How much smaller is WebP compared to PNG?</summary>
              <p className="mt-3 text-muted-foreground leading-7">
                Typically 25-35% smaller using lossy compression, or 10-20% smaller in lossless mode. Exact savings depend on the specific image content.
              </p>
            </details>
            <details className="rounded-lg border p-4">
              <summary className="cursor-pointer font-medium">Do all browsers support WebP?</summary>
              <p className="mt-3 text-muted-foreground leading-7">
                Modern browsers (Chrome, Firefox, Safari 14+, Edge) all support WebP. Older browsers don't, which is why developers use fallback images.
              </p>
            </details>
            <details className="rounded-lg border p-4">
              <summary className="cursor-pointer font-medium">How do I handle browser compatibility?</summary>
              <p className="mt-3 text-muted-foreground leading-7">
                Use the HTML5 picture element to serve WebP to modern browsers and PNG/JPG to older ones. Most modern frameworks handle this automatically.
              </p>
            </details>
            <details className="rounded-lg border p-4">
              <summary className="cursor-pointer font-medium">What quality setting should I use?</summary>
              <p className="mt-3 text-muted-foreground leading-7">
                For graphics with transparency, use lossless mode. For photos, try quality 80-85. Experiment and compare to find your balance.
              </p>
            </details>
          </div>
        </section>

        <section className="rounded-lg border bg-muted/30 p-6 space-y-3">
          <h2 className="text-2xl font-bold tracking-tight">Ready to convert PNG to WebP?</h2>
          <p className="text-muted-foreground leading-7">
            Upload your PNG above to convert to WebP in seconds. For production use, remember to serve WebP with PNG fallbacks using responsive image techniques. To further optimize, try <a href="/compress-png" className="underline underline-offset-4">compressing your PNG</a> or converting the PNG back with <a href="/webp-to-png" className="underline underline-offset-4">WebP to PNG</a> if needed.
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
                "name": "Does WebP support transparency like PNG?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, WebP fully supports alpha channel transparency, just like PNG. Transparent information is fully preserved during conversion."
                }
              },
              {
                "@type": "Question",
                "name": "How much smaller is WebP compared to PNG?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Typically 25-35% smaller using lossy compression, or 10-20% smaller in lossless mode, depending on the specific image."
                }
              },
              {
                "@type": "Question",
                "name": "Do all browsers support WebP?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Modern browsers (Chrome, Firefox, Safari 14+, Edge) support WebP. Older browsers don't, which is why fallback images are recommended."
                }
              },
              {
                "@type": "Question",
                "name": "How do I handle browser compatibility for WebP?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Use the HTML5 <picture> element to serve WebP to modern browsers with PNG fallbacks for older ones."
                }
              },
              {
                "@type": "Question",
                "name": "What quality setting should I use for PNG to WebP?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "For graphics with transparency, use lossless mode. For photos, try quality 80-85 and experiment to find your balance."
                }
              }
            ]
          }),
        }}
      />
    </ToolLayout>
  )
}
