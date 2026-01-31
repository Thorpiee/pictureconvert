export function JsonLd() {
    const softwareSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "PictureConvert",
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "Any",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "description": "Free online image converter and compressor. Process images locally in your browser with no file uploads.",
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "1250"
        },
        "featureList": [
            "Image Compression",
            "Format Conversion (JPG, PNG, WebP, HEIC, AVIF)",
            "Image Resizing",
            "EXIF Removal",
            "Privacy-focused (Local Processing)"
        ]
    }

    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "PictureConvert",
        "url": "https://pictureconvert.com",
        "logo": "https://pictureconvert.com/android-chrome-512x512.png",
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
