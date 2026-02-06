import { SITE_URL } from "@/lib/site-url"

export function JsonLd() {
    const softwareSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "@id": `${SITE_URL}/#software`,
        "name": "PictureConvert",
        "url": SITE_URL,
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "Windows, macOS, Android, iOS, Linux",
        "offers": {
            "@type": "Offer",
            "price": 0,
            "priceCurrency": "USD"
        },
        "description": "Free online image converter and compressor. Process images locally in your browser with no file uploads.",
        "featureList": [
            "Image Compression",
            "Format Conversion (JPG, PNG, WebP, HEIC, AVIF)",
            "Image Resizing",
            "EXIF Removal",
            "Privacy-focused (Local Processing)"
        ],
        "publisher": {
            "@type": "Organization",
            "@id": `${SITE_URL}/#organization`
        }
    }

    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        "name": "PictureConvert",
        "url": SITE_URL,
        "logo": {
            "@type": "ImageObject",
            "url": `${SITE_URL}/android-chrome-512x512.png`
        },
        "description": "Secure, privacy-first online image tools for converting, compressing, and editing images locally in your browser."
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
        </>
    )
}
