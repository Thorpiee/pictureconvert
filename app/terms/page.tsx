import type { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for using PictureConvert image conversion tools.",
}

export default function TermsPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Terms of Service
            </h1>
            <p className="mt-4 text-muted-foreground">
              Last updated: January 2026
            </p>
          </div>

          <Card className="border-0 shadow-none bg-transparent">
            <CardContent className="p-0 space-y-8">
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  1. Acceptance of Terms
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using PictureConvert ("the Service"), you accept and agree to be bound by 
                  these Terms of Service. If you do not agree to these terms, please do not use the Service.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  2. Description of Service
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  PictureConvert provides free, browser-based image conversion, compression, and editing tools. 
                  All image processing occurs locally on your device; no images are uploaded to our servers.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  3. User Responsibilities
                </h2>
                <div className="text-muted-foreground leading-relaxed space-y-3">
                  <p>You agree to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Use the Service only for lawful purposes</li>
                    <li>Not use the Service to process illegal, harmful, or offensive content</li>
                    <li>Not attempt to reverse engineer, decompile, or exploit the Service</li>
                    <li>Not use automated systems to access the Service in a manner that exceeds reasonable use</li>
                    <li>Ensure you have the necessary rights to any images you process</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  4. Intellectual Property
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  The Service, including its design, features, and content, is protected by copyright and 
                  other intellectual property laws. You retain all rights to your images. We claim no 
                  ownership or rights to any images you process using the Service.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  5. Disclaimer of Warranties
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  The Service is provided "as is" without warranties of any kind, either express or implied. 
                  We do not guarantee that the Service will be uninterrupted, error-free, or meet your 
                  specific requirements. Use of the Service is at your own risk.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  6. Limitation of Liability
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  To the fullest extent permitted by law, PictureConvert shall not be liable for any 
                  indirect, incidental, special, consequential, or punitive damages arising from your 
                  use of the Service, including but not limited to loss of data or image quality.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  7. Advertising
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  The Service may display advertisements to support its free availability. These ads 
                  are provided by third-party advertising networks and are subject to their own terms 
                  and privacy policies.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  8. Modifications to Service
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify, suspend, or discontinue the Service at any time 
                  without notice. We may also update these Terms of Service periodically. Continued 
                  use of the Service after changes constitutes acceptance of the modified terms.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  9. Governing Law
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms shall be governed by and construed in accordance with applicable laws, 
                  without regard to conflict of law principles.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  10. Contact
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have questions about these Terms of Service, please contact us through our 
                  contact page or at legal@pictureconvert.com.
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
