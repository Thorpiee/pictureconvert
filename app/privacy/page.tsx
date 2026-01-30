import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how PictureConvert protects your privacy. All image processing happens locally in your browser - your files never leave your device.",
  openGraph: {
    title: "Privacy Policy | PictureConvert",
    description: "Learn how PictureConvert protects your privacy.",
    url: "https://pictureconvert.com/privacy",
  },
  alternates: {
    canonical: "https://pictureconvert.com/privacy",
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

          <div className="mt-8 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-foreground">Our Commitment to Privacy</h2>
              <p className="text-muted-foreground leading-relaxed mt-4">
                At PictureConvert, your privacy is our top priority. We've built our service from the ground up 
                with privacy in mind. Unlike most image conversion tools, <strong>your files never leave your device</strong>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">How Our Tools Work</h2>
              <p className="text-muted-foreground leading-relaxed mt-4">
                All image processing on PictureConvert happens locally in your web browser using JavaScript and 
                modern browser APIs. When you select or drop an image:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-4">
                <li>The file is read directly by your browser</li>
                <li>Processing occurs on your device using your CPU/GPU</li>
                <li>The result is generated locally</li>
                <li>You download the file directly from your browser</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                At no point during this process is your image uploaded to our servers or any third-party servers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">Data We Collect</h2>
              <p className="text-muted-foreground leading-relaxed mt-4">
                <strong>We do not collect, store, or process your images.</strong> Period.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                We may collect anonymous, aggregated analytics data to improve our service, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-4">
                <li>Page views and general traffic patterns</li>
                <li>Browser and device types (anonymized)</li>
                <li>Geographic region (country level only)</li>
                <li>Which tools are most popular</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                This data is collected through privacy-respecting analytics and cannot be used to identify individual users.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">Cookies</h2>
              <p className="text-muted-foreground leading-relaxed mt-4">
                We use minimal cookies for:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-4">
                <li><strong>Theme preference</strong> - Remembering if you prefer light or dark mode</li>
                <li><strong>Analytics</strong> - Anonymous usage statistics</li>
                <li><strong>Advertising</strong> - Our advertising partners may use cookies to show relevant ads</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                You can disable cookies in your browser settings, though this may affect some site functionality.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">Third-Party Services</h2>
              <p className="text-muted-foreground leading-relaxed mt-4">
                We use the following third-party services:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-4">
                <li><strong>Vercel Analytics</strong> - For privacy-respecting website analytics</li>
                <li><strong>Google AdSense</strong> - For displaying advertisements (subject to Google's privacy policy)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">Advertising</h2>
              <p className="text-muted-foreground leading-relaxed mt-4">
                We display advertisements to support the free operation of this service. Our advertising partners may 
                collect and use information about your visits to this and other websites to provide relevant advertisements.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                You can opt out of personalized advertising by visiting{" "}
                <a href="https://www.aboutads.info/choices/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                  www.aboutads.info/choices
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">Data Security</h2>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Since your images are processed locally and never uploaded to our servers, there is no risk of your 
                images being exposed through a data breach on our end. Your files remain under your complete control.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Our service is not directed to children under 13. We do not knowingly collect personal information 
                from children under 13.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">Changes to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed mt-4">
                We may update this privacy policy from time to time. We will notify you of any changes by posting 
                the new privacy policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed mt-4">
                If you have any questions about this privacy policy, please contact us through our{" "}
                <a href="/contact" className="text-primary hover:underline">contact page</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
