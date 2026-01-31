import type { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Simple, fair terms for using PictureConvert.",
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
            <CardContent className="p-0 space-y-10">
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  1. The Basics
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  PictureConvert is a free, browser-based tool provided "as is". By using it, you agree to these terms. If you don't agree, please don't use the site.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  2. Your Files & Rights
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>You keep all rights to your images.</strong> We do not claim ownership, we do not store them, and we do not use them. Since processing happens on your device, your files technically never leave your possession.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  3. Acceptable Use
                </h2>
                <div className="text-muted-foreground leading-relaxed space-y-3">
                  <p>You agree not to use this site for:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Anything illegal in your jurisdiction.</li>
                    <li>Attempting to hack, disrupt, or reverse-engineer the site.</li>
                    <li>Abusive automated usage (bots) that strains our hosting.</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  4. No Warranties ("As Is")
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We try our best to make PictureConvert useful and safe, but we cannot guarantee perfection. The service is provided without warranties of any kind. We are not responsible if a file conversion fails or if the site is temporarily unavailable.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  5. Limitation of Liability
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  PictureConvert is a free tool. We are not liable for any damages (including lost data or business interruption) arising from the use or inability to use our site.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  6. Contact
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Questions? Reach us at <a href="mailto:support@pictureconvert.com" className="text-primary hover:underline">support@pictureconvert.com</a>.
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
