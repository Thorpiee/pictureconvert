import { Metadata } from "next"
import { ToolLayout } from "@/components/tool-layout"
import { ConverterTool } from "@/components/tools/converter-tool"
import { getToolBySlug } from "@/lib/tools-config"
import { notFound } from "next/navigation"

const tool = getToolBySlug("jpg-to-webp")

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

export default function JpgToWebpPage() {
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

          <h2 className="text-2xl font-bold tracking-tight">JPG to WebP: Next-Generation Web Image Optimization</h2>

          <p className="text-muted-foreground leading-7">
            JPG to WebP conversion is the fastest path to modern image delivery. WebP, Google's open-source successor to JPG, provides 25-34% better compression than JPG while maintaining or exceeding visual quality. For websites serving photographs and gallery content, this format change is one of the highest-impact optimizations for performance and cost reduction.
          </p>

          <p className="text-muted-foreground leading-7">
            WebP is designed from the ground up for web delivery. It uses advanced compression algorithms that exploit modern browser capabilities and human perception. Unlike JPG, which is nearly 30 years old and designed for 1990s hardware, WebP is built for today's web—with support in all modern browsers and explicit optimization for Core Web Vitals.
          </p>

          <p className="text-muted-foreground leading-7">
            The primary consideration with JPG to WebP is browser support: modern browsers (Chrome, Firefox, Safari 14+, Edge) all support WebP, but older browsers don't. This is why the industry standard is responsive images—serving WebP to modern browsers and providing JPG fallbacks for legacy support. For teams focused on speed and user experience, JPG to WebP is a no-brainer.
          </p>
        </div>

        <section className="space-y-4" aria-labelledby="jpg-vs-webp-table">
          <h2 id="jpg-vs-webp-table" className="text-2xl font-bold tracking-tight">
            JPG vs WebP — What's the Difference?
          </h2>

          <div className="overflow-x-auto rounded-lg border">
            <table className="min-w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Factor</th>
                  <th className="px-4 py-3 text-left font-semibold">JPG</th>
                  <th className="px-4 py-3 text-left font-semibold">WebP</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="px-4 py-3 font-medium">Compression type</td>
                  <td className="px-4 py-3">Lossy only (1989 algorithm)</td>
                  <td className="px-4 py-3">Lossy and lossless (modern algorithms)</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-3 font-medium">Transparency support</td>
                  <td className="px-4 py-3">No</td>
                  <td className="px-4 py-3">Yes (alpha channel)</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-3 font-medium">File size</td>
                  <td className="px-4 py-3">Baseline</td>
                  <td className="px-4 py-3">25-34% smaller at same visual quality</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-3 font-medium">Best for</td>
                  <td className="px-4 py-3">Photos, universal compatibility</td>
                  <td className="px-4 py-3">Web images, maximum efficiency</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-3 font-medium">Browser support</td>
                  <td className="px-4 py-3">100% (universal)</td>
                  <td className="px-4 py-3">~95% (modern browsers only)</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-3 font-medium">Artifact behavior</td>
                  <td className="px-4 py-3">Visible at lower quality settings</td>
                  <td className="px-4 py-3">Less perceptible compression artifacts</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-3 font-medium">Core Web Vitals impact</td>
                  <td className="px-4 py-3">Good, smaller files improve speed</td>
                  <td className="px-4 py-3">Excellent, optimized for metrics</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-4" aria-labelledby="when-to-convert">
          <h2 id="when-to-convert" className="text-2xl font-bold tracking-tight">
            When Should You Convert JPG to WebP?
          </h2>

          <h3 className="text-xl font-semibold">1) Website image optimization at scale</h3>
          <p className="text-muted-foreground leading-7">
            If you're running a website with image galleries, product photos, or hero images, JPG to WebP conversion directly improves Core Web Vitals. A site with 50 product images can reduce total image payload by 30-40%, which translates to faster load times, better mobile performance, and improved search rankings.
          </p>

          <h3 className="text-xl font-semibold">2) Content delivery networks (CDNs)</h3>
          <p className="text-muted-foreground leading-7">
            Most modern CDNs (Cloudinary, Imgix, AWS CloudFront) automatically serve WebP to compatible browsers. By converting your existing JPG library to WebP upstream, you let the CDN optimize for maximum efficiency at every scale.
          </p>

          <h3 className="text-xl font-semibold">3) Mobile and bandwidth-constrained environments</h3>
          <p className="text-muted-foreground leading-7">
            Mobile users on 3G/4G networks benefit significantly from WebP's superior compression. Smaller files mean faster delivery, lower data usage, and better user experience on low bandwidth connections.
          </p>

          <h3 className="text-xl font-semibold">4) Cost reduction and sustainability</h3>
          <p className="text-muted-foreground leading-7">
            Storage and bandwidth account for significant costs at scale. JPG to WebP conversion reduces these costs directly. A media company serving millions of images daily can reduce bandwidth spend by 25-30% through format optimization alone.
          </p>

          <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
            <p className="font-semibold">Real-world file size examples</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>3MB JPG photo → ~1.5-2MB WebP (quality 85)</li>
              <li>2MB JPG gallery image → ~1-1.3MB WebP (quality 80)</li>
              <li>5MB JPG hero image → ~2-3MB WebP (quality 85)</li>
            </ul>
            <p className="text-muted-foreground leading-7">
              WebP's superior compression comes from modern algorithms that better predict pixel values and more efficient entropy encoding. These gains compound significantly at scale and directly improve user experience through faster page speed.
            </p>
          </div>
        </section>

        <section className="space-y-4" aria-labelledby="when-not-to-convert">
          <h2 id="when-not-to-convert" className="text-2xl font-bold tracking-tight">
            When NOT to Convert JPG to WebP
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li><span className="font-medium text-foreground">Audience requires universal compatibility:</span> If you must support Internet Explorer or very old devices, provide JPG fallbacks alongside WebP.</li>
            <li><span className="font-medium text-foreground">Simple single-image downloads:</span> For one-off image sharing or downloads, JPG is still universally the safest choice.</li>
            <li><span className="font-medium text-foreground">Print-ready images:</span> Print workflows typically expect JPG or TIFF. While WebP is excellent for web, it's not established in print.</li>
            <li><span className="font-medium text-foreground">Legacy tech stacks:</span> If your infrastructure can't handle WebP serving or you don't have responsive image support, maintain JPG until you can upgrade.</li>
          </ul>

          <p className="text-muted-foreground leading-7">
            If transparency is needed, convert to <a href="/jpg-to-png" className="underline underline-offset-4">JPG to PNG</a> instead—WebP also supports transparency but PNG is the traditional choice for graphics.
          </p>
        </section>

        <section className="space-y-4" aria-labelledby="quality-question">
          <h2 id="quality-question" className="text-2xl font-bold tracking-tight">
            Does Converting JPG to WebP Improve Quality?
          </h2>
          <p className="text-muted-foreground leading-7">
            No—conversion can't restore quality lost in JPG compression. However, WebP's more efficient algorithm can achieve similar visual quality to JPG at a lower quality setting. For example, a JPG at 85% quality and a WebP at 75% quality may look identical, with the WebP being significantly smaller.
          </p>
          <p className="text-muted-foreground leading-7">
            The practical benefit: you can convert a JPG to WebP and achieve the same visual result with 25-34% smaller files. This is true quality improvement in the economic sense—better value (quality per byte).
          </p>
          <p className="text-muted-foreground leading-7">
            To recover quality from a JPG that was already compressed, you need the original source or a higher-quality JPG backup. Format conversion alone cannot restore lost data.
          </p>
        </section>

        <section className="space-y-4" aria-labelledby="seo-question">
          <h2 id="seo-question" className="text-2xl font-bold tracking-tight">
            Is WebP Better for SEO and Web Vitals?
          </h2>
          <p className="text-muted-foreground leading-7">
            Absolutely. Google explicitly recommends WebP in performance audits and includes image optimization in Core Web Vitals assessment. Pages with faster image delivery see better Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS), and Interaction to Next Paint (INP)—all ranking factors.
          </p>
          <p className="text-muted-foreground leading-7">
            JPG to WebP conversion is one of the most impactful SEO improvements available for image-heavy sites. Tools like Lighthouse, PageSpeed Insights, and GTmetrix all flag JPG images as optimization opportunities when WebP is available.
          </p>
          <p className="text-muted-foreground leading-7">
            For best results, combine JPG to WebP conversion with responsive images (using picture element and srcset), lazy loading, proper dimensions, and consider <a href="/compress-jpg" className="underline underline-offset-4">compressing JPG further</a> before serving fallbacks.
          </p>
        </section>

        <section className="space-y-4" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-2xl font-bold tracking-tight">FAQ</h2>
          <div className="space-y-3">
            <details className="rounded-lg border p-4">
              <summary className="cursor-pointer font-medium">How much bandwidth will I save with JPG to WebP?</summary>
              <p className="mt-3 text-muted-foreground leading-7">
                Expect 25-34% bandwidth savings, compounding across your image library. A site with 100 JPG images serving millions of impressions can reduce bandwidth costs by 25-30%.
              </p>
            </details>
            <details className="rounded-lg border p-4">
              <summary className="cursor-pointer font-medium">Does WebP support transparency?</summary>
              <p className="mt-3 text-muted-foreground leading-7">
                Yes, WebP supports alpha channel transparency, though JPG files don't, so converted WebP won't have transparency unless added separately.
              </p>
            </details>
            <details className="rounded-lg border p-4">
              <summary className="cursor-pointer font-medium">What quality should I use for JPG to WebP?</summary>
              <p className="mt-3 text-muted-foreground leading-7">
                Start with quality 75-80. Most users can't detect quality loss at this level. For critical images, use 85+. Experiment and compare.
              </p>
            </details>
            <details className="rounded-lg border p-4">
              <summary className="cursor-pointer font-medium">How do I serve WebP with JPG fallbacks?</summary>
              <p className="mt-3 text-muted-foreground leading-7">
                Use the HTML5 picture element. Serve WebP as the primary source with a JPG fallback. Most web frameworks handle this automatically.
              </p>
            </details>
            <details className="rounded-lg border p-4">
              <summary className="cursor-pointer font-medium">Is JPG to WebP a one-way conversion?</summary>
              <p className="mt-3 text-muted-foreground leading-7">
                You can convert WebP back to JPG if needed, but conversion isn't lossless. Start from the highest-quality original when possible.
              </p>
            </details>
          </div>
        </section>

        <section className="rounded-lg border bg-muted/30 p-6 space-y-3">
          <h2 className="text-2xl font-bold tracking-tight">Ready to convert JPG to WebP?</h2>
          <p className="text-muted-foreground leading-7">
            Upload your JPG above to convert to WebP in seconds. For production deployment, serve WebP to compatible browsers using the picture element with JPG fallbacks. To further optimize, consider <a href="/compress-jpg" className="underline underline-offset-4">compressing your JPG</a> first or combining with <a href="/resize-image" className="underline underline-offset-4">image resizing</a> for maximum performance.
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
                "name": "How much bandwidth will I save with JPG to WebP?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Expect 25-34% bandwidth savings. A site with many images can reduce bandwidth costs by 25-30% overall."
                }
              },
              {
                "@type": "Question",
                "name": "Does WebP support transparency?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, WebP supports transparency via alpha channel. JPG doesn't, so converted files won't have transparency unless added separately."
                }
              },
              {
                "@type": "Question",
                "name": "What quality setting should I use?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Start with 75-80. Most users can't detect quality loss at this level. For critical images, use 85+."
                }
              },
              {
                "@type": "Question",
                "name": "How do I serve WebP with JPG fallbacks?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Use the HTML5 <picture> element with WebP as the primary source and JPG as fallback. Most frameworks handle this automatically."
                }
              },
              {
                "@type": "Question",
                "name": "Can I convert WebP back to JPG?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, but conversion isn't lossless. For best results, start from the highest-quality original available."
                }
              }
            ]
          }),
        }}
      />
    </ToolLayout>
  )
}
