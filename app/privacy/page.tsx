import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Our privacy promise: 100% local processing. Your files never leave your device. Learn how PictureConvert protects your privacy with browser-based image processing. No uploads, no data collection, no tracking.",
  openGraph: {
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PictureConvert',
      },
    ],
    title: "Privacy Policy | PictureConvert",
    description: "Our privacy promise: 100% local processing. Your files never leave your device.",
    url: "/privacy",
    type: 'website',
  },
  alternates: {
    canonical: "/privacy",
  },
}

export default function PrivacyPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto prose prose-neutral dark:prose-invert">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground mt-2">
            Last updated: January 2026
          </p>

          <div className="mt-8 space-y-10">
            <section>
              <h2 className="text-2xl font-bold text-foreground">The Short Version</h2>
              <p className="text-muted-foreground leading-relaxed mt-4 text-lg">
                We built PictureConvert to be privacy-first. <strong>We do not see, store, or process your images.</strong> All processing happens locally in your web browser.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">How Image Processing Works</h2>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Unlike other converters that upload your files to a cloud server, our tools run entirely on your device using your browser's capabilities.
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-4">
                <li><strong>Local Processing:</strong> Your images never leave your computer or phone.</li>
                <li><strong>No Uploads:</strong> We have no server-side file storage.</li>
                <li><strong>No Copies:</strong> We cannot view, copy, or sell your images because we never have them.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">What Data We Collect</h2>
              <p className="text-muted-foreground leading-relaxed mt-4">
                We collect minimal, anonymous data to keep the site running:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-4">
                <li><strong>Usage Stats:</strong> We use anonymous analytics (Google Analytics) to see which tools are popular. This does not include any personal info or image data.</li>
                <li><strong>Errors:</strong> If a tool crashes, we may receive an anonymous error report to help us fix it.</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                <strong>We do not collect:</strong> Names, emails, IP addresses attached to activity, or image content.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">Analytics & Cookies</h2>
              <p className="text-muted-foreground leading-relaxed mt-4">
                We use a small number of cookies to make the site work:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-4">
                <li><strong>Preferences:</strong> To remember if you like Dark Mode.</li>
                <li><strong>Analytics:</strong> To count visitors (anonymously).</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                You can block cookies in your browser settings, and the image tools will still work fine.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">Third-Party Services</h2>
              <p className="text-muted-foreground leading-relaxed mt-4">
                We use trusted third-party providers for specific functions:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-4">
                <li><strong>Google Analytics:</strong> For anonymous site usage stats.</li>
                <li><strong>Vercel:</strong> For hosting the website code.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Have questions about privacy? Email us directly:
              </p>
              <p className="mt-2">
                <a href="mailto:support@pictureconvert.com" className="text-primary hover:underline font-medium">
                  support@pictureconvert.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
