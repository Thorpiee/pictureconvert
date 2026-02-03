


export type ToolCategory = "convert" | "compress" | "edit" | "privacy" | "social" | "guide"

export interface ComparisonTable {
  title: string
  columns: string[]
  rows: string[][]
  intentSentence: string
}

export interface ToolConfig {
  slug: string
  name: string
  shortName: string
  description: string
  longDescription: string
  category: ToolCategory
  icon: string // icon key, not component
  acceptedTypes: string[]
  outputType: string
  whatItDoes: string
  whenToUse: string
  tips: string[]
  faq: { question: string; answer: string }[]
  comparison?: ComparisonTable
  relatedTools: string[]
}

export const toolsConfig: Record<string, ToolConfig> = {
  "jpg-to-png": {
    slug: "jpg-to-png",
    name: "JPG to PNG Converter",
    shortName: "JPG to PNG",
    description: "Convert JPG images to PNG format with transparency support",
    longDescription: "Convert JPG images to PNG instantly in your browser. No uploads, no tracking, no quality loss.",
    category: "convert",
    icon: "ArrowRightLeft",
    acceptedTypes: ["image/jpeg"],
    outputType: "image/png",
    whatItDoes: "This tool converts JPG/JPEG images to PNG format with zero quality loss. PNG (Portable Network Graphics) uses lossless compression, meaning every pixel is preserved exactly as decoded from the original JPG. Unlike JPG, PNG supports transparency (alpha channel), making it ideal for graphics, logos, and images that need transparent backgrounds. The conversion process preserves EXIF orientation data and maintains 1:1 pixel fidelity, ensuring your image looks identical to the original JPG when displayed.",
    whenToUse: "Use this converter when you need transparency in your image, want to preserve image quality for further editing, or need a format that supports [lossless compression](/compress-png). Perfect for logos and graphics that require transparent backgrounds, screenshots that need to be edited, images with text that must remain sharp, or when you're preparing images for design work where [quality preservation](/best-image-format-for-web) is critical. Also ideal when you need to avoid further quality degradation from repeated [JPG compression](/compress-jpg) cycles.",
    tips: [
      "PNG files are typically 2-5x larger than JPGs - only convert if you truly need PNG features like transparency",
      "The conversion preserves exact pixel data - no quality is lost during the conversion process",
      "If your image has a solid background, the conversion won't automatically make it transparent - use an image editor for that",
      "PNG is ideal for images with sharp edges, text overlays, or graphics with few colors",
      "For photographs you'll share online, JPG is usually better for smaller file sizes",
      "PNG supports lossless compression, so you can edit and re-save without quality degradation",
      "Use PNG when you need to preserve exact colors and avoid compression artifacts"
    ],
    faq: [
      { question: "Is JPG or PNG better for images?", answer: "JPG is best for photos to keep file sizes small. PNG is better for graphics, screenshots, and logos because it supports transparency and doesn't lose quality when edited." },
      { question: "Does converting JPG to PNG reduce quality?", answer: "No. PNG is a lossless format, so converting from JPG to PNG preserves the exact quality of your original image. However, it won't improve the quality if the original JPG was already compressed." },
      { question: "Are my images uploaded to a server?", answer: "No. Your images are processed entirely within your browser. We never upload your files to any server, ensuring your photos remain 100% private and secure on your device." }
    ],
    comparison: {
      title: "JPG vs PNG — What’s the Difference?",
      columns: ["Feature", "JPG", "PNG"],
      rows: [
        ["Best for", "Photos & Web", "Graphics & Editing"],
        ["File size", "Small", "Large"],
        ["Transparency", "No", "Yes"],
        ["Compression", "Lossy", "Lossless"]
      ],
      intentSentence: "If you’re converting JPG to PNG, you’re usually trying to preserve quality or add transparency for editing."
    },
    relatedTools: ["png-to-jpg", "compress-png", "resize-image", "crop-image", "remove-exif"]
  },
  "png-to-jpg": {
    slug: "png-to-jpg",
    name: "Convert PNG to JPG Online",
    shortName: "PNG to JPG",
    description: "Free online tool to convert PNG to JPG instantly. Compress images without losing quality. No signup required.",
    longDescription: "Convert PNG images to JPG instantly in your browser. No uploads, no tracking, no quality loss.",
    category: "convert",
    icon: "ArrowRightLeft",
    acceptedTypes: ["image/png"],
    outputType: "image/jpeg",
    whatItDoes: "This free online tool converts PNG images to JPG/JPEG format with advanced quality control. While PNGs are great for transparency, they can be large. Converting to JPG significantly reduces file size (often by 80% or more) for [faster website loading](/website-optimizer) and easier sharing. Our tool processes images entirely in your browser using secure client-side technology, meaning your photos never leave your device. You can adjust the compression level to find the perfect balance between file size and visual quality.",
    whenToUse: "Use this tool when you need to convert PNG to JPG online for faster web performance. It's ideal for bloggers, developers, and social media managers who need lightweight images. If your PNG photo is too large to email or upload, this converter will solve the problem instantly. It's also the best choice when you have opaque images (no transparency) and want to save [significant storage space](/compress-jpg). Supported by all browsers and devices, this tool is the quickest way to optimize your images for the web.",
    tips: [
      "Transparent backgrounds in PNG will automatically become white in JPG",
      "Use the quality slider to control compression - 80% is the sweet spot for web",
      "Converting PNG to JPG online saves bandwidth and storage space",
      "Best for photographs, complex gradients, and realistic images",
      "Process occurs locally in your browser for 100% privacy"
    ],
    faq: [
      { question: "Is PNG or JPG better for photos?", answer: "JPG is usually better for photos because it produces much smaller file sizes while maintaining good visual quality. PNG is better for graphics, logos, or images that need transparency." },
      { question: "Does converting PNG to JPG reduce quality?", answer: "Converting PNG to JPG can slightly reduce quality because JPG uses compression, but for most photos the difference is not noticeable. It’s mainly done to reduce file size." },
      { question: "Are my images uploaded to a server?", answer: "No. All image conversions happen directly in your browser. Files never leave your device and are not uploaded or stored on any server." }
    ],
    comparison: {
      title: "PNG vs JPG — What’s the Difference?",
      columns: ["Feature", "PNG", "JPG"],
      rows: [
        ["Best for", "Graphics & Transparency", "Photos & Web"],
        ["File size", "Large", "Small"],
        ["Transparency", "Yes", "No"],
        ["Compression", "Lossless", "Lossy"]
      ],
      intentSentence: "If you’re converting PNG to JPG, you’re usually trying to reduce file size for photos or web use."
    },
    relatedTools: ["jpg-to-png", "compress-jpg", "resize-image", "crop-image", "remove-exif"]
  },
  "webp-to-png": {
    slug: "webp-to-png",
    name: "Compress WebP to PNG",
    shortName: "WebP to PNG",
    description: "Convert WebP to PNG online. High-quality conversion with optimization options. Free, fast, and secure.",
    longDescription: "Convert WebP images to PNG instantly in your browser. No uploads, no tracking, no quality loss.",
    category: "convert",
    icon: "ArrowRightLeft",
    acceptedTypes: ["image/webp"],
    outputType: "image/png",
    whatItDoes: "This tool converts WebP images to PNG format while optimizing for the best possible balance between quality and file size. While WebP is efficient, PNG offers universal compatibility across all browsers, editors, and operating systems. Our converter handles transparency (alpha channel) perfectly, ensuring your graphics look exactly as intended. It processes everything locally in your browser for maximum speed and privacy.",
    whenToUse: "Use this tool when you have a WebP image that isn't displaying correctly in an older application, email client, or operating system. It's also essential when you need to edit the image in software that doesn't fully support WebP. By converting to PNG, you ensure your image can be viewed and edited anywhere without issues. Use the [optimization settings](/compress-png) to keep the resulting PNG file size as small as possible. If you need to edit metadata, check our [EXIF Viewer](/exif-viewer).",
    tips: [
      "PNG ensures 100% compatibility with all image software",
      "Transparency is perfectly preserved during conversion",
      "Use our compression options to minimize the PNG file size",
      "Batch processing allows you to convert multiple WebP files at once",
      "No quality is lost if you choose high-quality settings"
    ],
    faq: [
      { question: "Is WebP or PNG better for the web?", answer: "WebP is generally better for websites because it offers smaller file sizes. However, PNG is better for editing and compatibility since it works with all software and supports lossless transparency." },
      { question: "Does converting WebP to PNG reduce quality?", answer: "No, converting WebP to PNG does not reduce quality. PNG is a lossless format, so it will perfectly preserve the visual details of your original WebP file, though the file size may increase." },
      { question: "Are my images uploaded to a server?", answer: "No. The conversion happens locally in your web browser. Your files never leave your computer or phone, so you don't need to worry about privacy or data security." }
    ],
    comparison: {
      title: "WebP vs PNG — What’s the Difference?",
      columns: ["Feature", "WebP", "PNG"],
      rows: [
        ["Best for", "Web Performance", "Compatibility & Editing"],
        ["File size", "Smallest", "Large"],
        ["Transparency", "Yes", "Yes"],
        ["Support", "Modern Browsers", "Universal"]
      ],
      intentSentence: "If you’re converting WebP to PNG, you’re usually trying to ensure compatibility with software that doesn't support WebP."
    },
    relatedTools: ["png-to-webp", "compress-png", "resize-image", "jpg-to-png", "crop-image"]
  },
  "png-to-webp": {
    slug: "png-to-webp",
    name: "PNG to WebP Converter",
    shortName: "PNG to WebP",
    description: "Convert PNG images to WebP for better compression",
    longDescription: "Convert PNG images to WebP instantly in your browser. No uploads, no tracking, no quality loss.",
    category: "convert",
    icon: "ArrowRightLeft",
    acceptedTypes: ["image/png"],
    outputType: "image/webp",
    whatItDoes: "This tool converts PNG images to WebP format. WebP, developed by Google, provides superior compression compared to PNG while still supporting transparency. It's widely supported in modern browsers.",
    whenToUse: "Use this converter for web images where you want smaller file sizes without sacrificing transparency. Great for [website optimization](/website-optimizer), faster page loads, and reducing bandwidth usage. If you need to resize first, use our [Image Resizer](/resize-image).",
    tips: [
      "WebP typically produces files 25-35% smaller than PNG",
      "Transparency is fully supported in WebP format",
      "Most modern browsers support WebP, but check compatibility for your audience",
      "Consider providing PNG fallbacks for older browser support"
    ],
    faq: [
      { question: "Is PNG or WebP better for websites?", answer: "WebP is superior for websites because it creates much smaller files (often 25-35% smaller) while maintaining transparency and quality. PNG is better if you need maximum compatibility with very old browsers." },
      { question: "Does converting PNG to WebP reduce quality?", answer: "It depends on your settings. WebP supports both lossless and lossy compression. Our tool lets you choose, but even with slight compression, the visual difference is usually unnoticeable while saving significant space." },
      { question: "Are my images uploaded to a server?", answer: "No. All processing is done client-side in your browser. Your PNG files stay on your device and are never transmitted to any external server or cloud storage." }
    ],
    relatedTools: ["webp-to-png", "compress-png", "jpg-to-webp", "website-optimizer", "resize-image"]
  },
  "jpg-to-webp": {
    slug: "jpg-to-webp",
    name: "JPG to WebP Converter",
    shortName: "JPG to WebP",
    description: "Convert JPG images to WebP for modern web optimization",
    longDescription: "Convert JPG images to WebP instantly in your browser. No uploads, no tracking, no quality loss.",
    category: "convert",
    icon: "ArrowRightLeft",
    acceptedTypes: ["image/jpeg"],
    outputType: "image/webp",
    whatItDoes: "This tool converts JPG/JPEG images to WebP format. WebP provides better compression than JPG, meaning smaller files that load faster on websites while maintaining comparable visual quality.",
    whenToUse: "Use this converter when optimizing images for websites, improving page load times, or reducing storage and bandwidth costs. WebP is the preferred format for modern web development.",
    tips: [
      "WebP files are typically 25-34% smaller than equivalent JPG files",
      "Adjust quality settings to balance file size and visual quality",
      "WebP is ideal for web use but may not be supported by all image editors",
      "Consider your audience's browser support when using WebP"
    ],
    faq: [
      { question: "Is JPG or WebP better for site speed?", answer: "WebP is significantly better for website speed. It can be 25-35% smaller than JPG for the same quality, which helps pages load faster and improves SEO scores." },
      { question: "Does converting JPG to WebP reduce quality?", answer: "WebP is very efficient. You can usually reduce the file size significantly without any visible loss in quality. It uses advanced compression techniques that are superior to JPG." },
      { question: "Are my images uploaded to a server?", answer: "No. All processing occurs on your device. We do not upload, store, or view your images. The conversion is instant and completely private." }
    ],
    comparison: {
      title: "JPG vs WebP — What’s the Difference?",
      columns: ["Feature", "JPG", "WebP"],
      rows: [
        ["Best for", "Universal Compatibility", "Web Performance"],
        ["File size", "Small", "Smallest"],
        ["Transparency", "No", "Yes"],
        ["Compression", "Lossy", "Lossy & Lossless"]
      ],
      intentSentence: "If you’re converting JPG to WebP, you’re usually trying to improve website loading speed."
    },
    relatedTools: ["webp-to-jpg", "png-to-webp", "jpg-to-png", "compress-jpg", "resize-image"]
  },
  "heic-to-jpg": {
    slug: "heic-to-jpg",
    name: "HEIC to JPG Converter",
    shortName: "HEIC to JPG",
    description: "Convert iPhone HEIC photos to universally compatible JPG",
    longDescription: "Convert HEIC images to JPG instantly in your browser. No uploads, no tracking, no quality loss.",
    category: "convert",
    icon: "FileImage",
    acceptedTypes: ["image/heic", "image/heif"],
    outputType: "image/jpeg",
    whatItDoes: "This tool converts HEIC/HEIF images from your iPhone or iPad to the universally compatible JPG format. HEIC (High Efficiency Image Container) is Apple's default photo format, offering superior compression while maintaining quality. However, many platforms, websites, and software applications don't support HEIC, making JPG conversion essential for sharing, uploading, and editing. The conversion preserves image quality and handles EXIF orientation data correctly, ensuring your photos display properly. You can also [remove EXIF data](/remove-exif) for privacy.",
    whenToUse: "Use this converter when you need to share iPhone photos with Windows users or non-Apple devices, upload photos to websites or social media that don't accept HEIC files, edit photos in software that doesn't support HEIC (like older versions of Photoshop or GIMP), send photos via email or messaging apps that don't support HEIC, or when you need maximum compatibility across all platforms and devices. Essential for anyone who takes photos with an iPhone and needs to use them outside the Apple ecosystem. If the file is still too big, use our [JPG Compressor](/compress-jpg).",
    tips: [
      "HEIC files from iPhones contain high-quality images that convert excellently to JPG",
      "You can change your iPhone camera settings to capture in JPG directly if you prefer (Settings > Camera > Formats)",
      "EXIF metadata and orientation are preserved during conversion",
      "Adjust quality settings based on your needs - use 90-95% for printing or professional use, 80-85% for web and social media",
      "HEIC files are typically smaller than equivalent JPGs, so expect the converted JPG to be larger",
      "The conversion maintains the original image dimensions and aspect ratio",
      "All processing happens in your browser - your photos never leave your device"
    ],
    faq: [
      { question: "Is HEIC or JPG better for sharing?", answer: "JPG is much better for sharing because it works on every device, website, and app. HEIC is efficient for storage on iPhones but often cannot be opened on Windows, Android, or web browsers." },
      { question: "Does converting HEIC to JPG reduce quality?", answer: "Converting HEIC to JPG can involve a tiny amount of quality loss since JPG is a compressed format. However, at high quality settings (which we use), the difference is virtually impossible to see with the naked eye." },
      { question: "Are my images uploaded to a server?", answer: "No. Unlike many other converters, our tool processes your photos directly in your browser. Your personal iPhone photos never leave your device and are never uploaded to the cloud." }
    ],
    comparison: {
      title: "HEIC vs JPG — What’s the Difference?",
      columns: ["Feature", "HEIC", "JPG"],
      rows: [
        ["Best for", "iPhone Storage", "Sharing & Compatibility"],
        ["File size", "Smallest", "Small"],
        ["Compatibility", "Apple Only", "Universal"],
        ["Web Support", "No", "Yes"]
      ],
      intentSentence: "If you’re converting HEIC to JPG, you’re usually trying to share iPhone photos with non-Apple users or websites."
    },
    relatedTools: ["jpg-to-png", "jpg-to-webp", "compress-jpg", "resize-image", "remove-exif"]
  },
  "avif-to-jpg": {
    slug: "avif-to-jpg",
    name: "AVIF to JPG Converter",
    shortName: "AVIF to JPG",
    description: "Convert AVIF images to JPG for broader compatibility",
    longDescription: "Convert AVIF images to JPG instantly in your browser. No uploads, no tracking, no quality loss.",
    category: "convert",
    icon: "FileImage",
    acceptedTypes: ["image/avif"],
    outputType: "image/jpeg",
    whatItDoes: "This tool converts AVIF images to JPG format. AVIF is a next-generation image format with excellent compression, but support is still growing. JPG ensures maximum compatibility across all platforms and software. [Compare formats](/best-image-format-for-web) to see why.",
    whenToUse: "Use this converter when you need to open AVIF images in software that doesn't support the format, share images with others, or ensure compatibility across different platforms and devices. If you need to make the resulting JPG smaller, use our [JPG Compressor](/compress-jpg).",
    tips: [
      "AVIF support depends on your browser - conversion may not work in older browsers",
      "JPG output ensures universal compatibility for sharing",
      "Adjust quality settings to balance file size and visual quality",
      "Some advanced AVIF features may not transfer to JPG"
    ],
    faq: [
      { question: "Is AVIF or JPG better?", answer: "AVIF offers better compression and quality, but JPG is universally compatible. Use JPG if you need to ensure the image opens on every device." },
      { question: "Does converting AVIF to JPG reduce quality?", answer: "Converting from AVIF (modern) to JPG (legacy) can introduce slight quality loss due to compression, but our high-quality settings minimize this." },
      { question: "Are my images uploaded to a server?", answer: "No. All image conversions happen directly in your browser. Files never leave your device and are not uploaded or stored on any server." }
    ],
    comparison: {
      title: "AVIF vs JPG — What’s the Difference?",
      columns: ["Feature", "AVIF", "JPG"],
      rows: [
        ["Best for", "Modern Web", "Universal Sharing"],
        ["File size", "Tiny", "Small"],
        ["Compatibility", "New Browsers", "Everywhere"],
        ["Compression", "Excellent", "Good"]
      ],
      intentSentence: "If you’re converting AVIF to JPG, you’re usually trying to open the image in software that doesn't support AVIF yet."
    },
    relatedTools: ["jpg-to-webp", "compress-jpg", "resize-image", "heic-to-jpg", "best-image-format-for-web"]
  },
  "bmp-converter": {
    slug: "bmp-converter",
    name: "BMP to JPG/PNG Converter",
    shortName: "BMP Converter",
    description: "Convert BMP to modern formats like JPG and PNG",
    longDescription: "Convert BMP images to JPG or PNG instantly in your browser. No uploads, no tracking, no quality loss.",
    category: "convert",
    icon: "Image",
    acceptedTypes: ["image/bmp"],
    outputType: "image/jpeg", // Default output, user can switch
    whatItDoes: "This tool converts BMP (Bitmap) images to modern formats like JPG and PNG. BMP files are often large and uncompressed, making them unsuitable for the web. Converting them reduces file size significantly. You can also [resize images](/resize-image) to save even more space.",
    whenToUse: "Use this tool to modernize legacy BMP images, reduce file sizes for web use, or convert to formats that are more widely supported by modern software and browsers. If you need transparency, convert to PNG and then use our [PNG Compressor](/compress-png).",
    tips: [
      "Choose JPG for photographs to get the smallest file size",
      "Choose PNG if you need lossless quality or transparency",
      "BMP files are uncompressed and can be very large - conversion saves space",
      "Quality settings apply when converting to JPG output"
    ],
    faq: [
      { question: "Is BMP or JPG better for the web?", answer: "JPG is much better for the web. BMP files are uncompressed and huge, causing slow page loads. JPGs are compressed and load instantly." },
      { question: "Does converting BMP to JPG reduce quality?", answer: "Converting BMP to JPG involves compression, which can slightly reduce quality, but it makes the file size drastically smaller (often 90% less). Converting BMP to PNG is lossless." },
      { question: "Are my images uploaded to a server?", answer: "No. All image conversions happen directly in your browser. Files never leave your device and are not uploaded or stored on any server." }
    ],
    comparison: {
      title: "BMP vs JPG — What’s the Difference?",
      columns: ["Feature", "BMP", "JPG"],
      rows: [
        ["Best for", "Raw Data", "Web & Sharing"],
        ["File size", "Huge", "Small"],
        ["Compression", "None", "High"],
        ["Web Friendly", "No", "Yes"]
      ],
      intentSentence: "If you’re converting BMP to JPG, you’re usually trying to make the file small enough to share or upload."
    },
    relatedTools: ["tiff-to-jpg", "png-to-jpg", "jpg-to-png", "compress-jpg", "resize-image"]
  },
  "tiff-to-jpg": {
    slug: "tiff-to-jpg",
    name: "TIFF to JPG Converter",
    shortName: "TIFF to JPG",
    description: "Convert TIFF images to high-quality JPG format",
    longDescription: "Convert TIFF images to JPG instantly in your browser. No uploads, no tracking, no quality loss.",
    category: "convert",
    icon: "Image",
    acceptedTypes: ["image/tiff"],
    outputType: "image/jpeg",
    whatItDoes: "This tool converts TIFF (Tagged Image File Format) images to JPG. TIFFs are common in printing and photography but aren't supported by web browsers. This tool makes them viewable on the web. For privacy, you can also [remove metadata](/remove-exif) from the resulting JPG.",
    whenToUse: "Use this when you have high-quality scans or professional photos in TIFF format that you need to share online, email, or use on a website. If you need to crop specific areas, use our [Image Cropper](/crop-image).",
    tips: [
      "We process the first page of multi-page TIFFs",
      "High-quality conversion (95%) ensures minimal detail loss",
      "Large TIFF files may take a moment to process in the browser",
      "The output JPG will be much smaller than the original TIFF"
    ],
    faq: [
      { question: "Is TIFF or JPG better for printing?", answer: "TIFF is the standard for professional printing because it is uncompressed and holds all image data. JPG is better for emailing, sharing online, or storing simply because TIFF files are huge." },
      { question: "Does converting TIFF to JPG reduce quality?", answer: "Yes, because TIFF is lossless and JPG is lossy. However, converting to a high-quality JPG reduces the file size massively while keeping the image looking nearly identical for viewing purposes." },
      { question: "Are my images uploaded to a server?", answer: "No. All image conversions happen directly in your browser. Files never leave your device and are not uploaded or stored on any server." }
    ],
    comparison: {
      title: "TIFF vs JPG — What’s the Difference?",
      columns: ["Feature", "TIFF", "JPG"],
      rows: [
        ["Best for", "Printing & Archives", "Web & Sharing"],
        ["File size", "Huge", "Small"],
        ["Layers", "Yes", "No"],
        ["Web Friendly", "No", "Yes"]
      ],
      intentSentence: "If you’re converting TIFF to JPG, you’re usually trying to preview print files or share them online."
    },
    relatedTools: ["bmp-converter", "compress-jpg", "resize-image", "heic-to-jpg", "crop-image"]
  },
  "svg-to-png": {
    slug: "svg-to-png",
    name: "SVG to PNG Converter",
    shortName: "SVG to PNG",
    description: "Rasterize SVG vectors to high-res PNG images",
    longDescription: "Convert SVG images to PNG instantly in your browser. No uploads, no tracking, no quality loss.",
    category: "convert",
    icon: "Image",
    acceptedTypes: ["image/svg+xml"],
    outputType: "image/png",
    whatItDoes: "This tool rasterizes SVG (Scalable Vector Graphics) files into PNG images. You can specify the output dimensions to get a crisp image at any size. If you need an icon, try our [Favicon Generator](/png-to-ico).",
    whenToUse: "Use this when you need to use a vector logo or icon in software that doesn't support SVG, or when you need a specific size for social media or app icons. You can also [encode to Base64](/base64-image-encoder) for direct embedding.",
    tips: [
      "SVGs can be scaled infinitely - choose a large size for high quality",
      "You can keep the background transparent or fill it with white",
      "Great for converting logos for use in documents or social media",
      "The aspect ratio is preserved automatically"
    ],
    faq: [
      { question: "Is SVG or PNG better for logos?", answer: "SVG is best for web logos because it scales infinitely without blur. PNG is better for social media, email signatures, and documents where SVG isn't supported." },
      { question: "Does converting SVG to PNG reduce quality?", answer: "Not if you choose the right size. SVG is vector-based, so you can export it to PNG at any resolution (even 4K) without pixelation. Just ensure you export at a large enough size." },
      { question: "Are my images uploaded to a server?", answer: "No. All image conversions happen directly in your browser. Files never leave your device and are not uploaded or stored on any server." }
    ],
    comparison: {
      title: "SVG vs PNG — What’s the Difference?",
      columns: ["Feature", "SVG", "PNG"],
      rows: [
        ["Type", "Vector (Math)", "Raster (Pixels)"],
        ["Scaling", "Infinite", "Pixelated"],
        ["Best for", "Web Logos", "Social Media/Docs"],
        ["File size", "Tiny (usually)", "Variable"]
      ],
      intentSentence: "If you’re converting SVG to PNG, you’re usually trying to use a logo in software that doesn't support vector files."
    },
    relatedTools: ["png-to-ico", "resize-image", "base64-image-encoder", "compress-png", "png-to-webp"]
  },
  "png-to-ico": {
    slug: "png-to-ico",
    name: "PNG to ICO Favicon Generator",
    shortName: "Favicon Generator",
    description: "Create multi-size ICO favicons from PNG images",
    longDescription: "Convert PNG images to ICO instantly in your browser. No uploads, no tracking, no quality loss.",
    category: "convert",
    icon: "Image",
    acceptedTypes: ["image/png"],
    outputType: "image/x-icon",
    whatItDoes: "This tool takes a PNG image and creates a multi-resolution ICO file. The resulting file contains standard icon sizes (16px to 256px) required for website favicons and desktop shortcuts. Use [Base64 Encoder](/base64-image-encoder) if you prefer Data URIs.",
    whenToUse: "Use this whenever you're launching a new website or app. A proper .ico file ensures your logo looks crisp on browser tabs, bookmarks, and desktop shortcuts. If you have an SVG, [convert it to PNG](/svg-to-png) first.",
    tips: [
      "Start with a square image at least 256x256 pixels",
      "The tool uses high-quality resampling for crisp small icons",
      "One .ico file contains all necessary sizes",
      "Perfect for website favicons (favicon.ico)"
    ],
    faq: [
      { question: "Is PNG or ICO better for websites?", answer: "Modern browsers support PNG icons, but ICO is still required for maximum compatibility, especially for desktop shortcuts and older browsers. Our tool creates an ICO that works everywhere." },
      { question: "Does converting PNG to ICO reduce quality?", answer: "ICO files support full color and transparency just like PNG. However, creating very small icons (like 16x16) from a large image requires resampling, which can lose detail. We use high-quality algorithms to keep icons crisp." },
      { question: "Are my images uploaded to a server?", answer: "No. All image conversions happen directly in your browser. Files never leave your device and are not uploaded or stored on any server." }
    ],
    comparison: {
      title: "PNG vs ICO — What’s the Difference?",
      columns: ["Feature", "PNG", "ICO"],
      rows: [
        ["Best for", "Web Graphics", "Favicons"],
        ["Sizes", "Single Resolution", "Multiple Resolutions"],
        ["Browser Support", "Modern Only", "All Browsers"],
        ["Transparency", "Yes", "Yes"]
      ],
      intentSentence: "If you’re converting PNG to ICO, you’re usually trying to create a compatible favicon for your website."
    },
    relatedTools: ["svg-to-png", "resize-image", "base64-image-encoder", "compress-png", "crop-image"]
  },
  "webp-to-jpg": {
    slug: "webp-to-jpg",
    name: "WebP to JPG Converter",
    shortName: "WebP to JPG",
    description: "Convert WebP images to standard JPG format",
    longDescription: "Convert WebP images to JPG instantly in your browser. No uploads, no tracking, no quality loss.",
    category: "convert",
    icon: "ArrowRightLeft",
    acceptedTypes: ["image/webp"],
    outputType: "image/jpeg",
    whatItDoes: "This tool converts WebP images to the JPG format. While WebP is great for the web, JPG is the standard for offline viewing, editing, and printing. If you need transparency, [convert to PNG](/webp-to-png) instead.",
    whenToUse: "Use this when you've downloaded a WebP image but your photo viewer or editor can't open it. Also useful for preparing images for print. If you need to make the file smaller, use our [JPG Compressor](/compress-jpg).",
    tips: [
      "Transparency in WebP will be replaced with a white background",
      "High quality setting (95%) ensures the JPG looks great",
      "Ideal for converting images saved from websites",
      "File size may increase slightly as JPG is less efficient than WebP"
    ],
    faq: [
      { question: "Is WebP or JPG better for compatibility?", answer: "JPG is universally compatible with almost every image viewer, editor, and website. WebP is better for modern web performance but may not open in older software." },
      { question: "Does converting WebP to JPG reduce quality?", answer: "Converting from WebP to JPG can involve a small amount of quality loss since both are compressed formats. However, we use high-quality settings so the difference is usually invisible." },
      { question: "Are my images uploaded to a server?", answer: "No. All image conversions happen directly in your browser. Files never leave your device and are not uploaded or stored on any server." }
    ],
    comparison: {
      title: "WebP vs JPG — What’s the Difference?",
      columns: ["Feature", "WebP", "JPG"],
      rows: [
        ["Best for", "Modern Web", "Universal Compatibility"],
        ["File size", "Smallest", "Small"],
        ["Transparency", "Yes", "No"],
        ["Support", "New Browsers", "Everywhere"]
      ],
      intentSentence: "If you’re converting WebP to JPG, you’re usually trying to ensure the image opens in older software or for printing."
    },
    relatedTools: ["jpg-to-webp", "webp-to-png", "compress-jpg", "resize-image", "png-to-jpg"]
  },
  "base64-image-encoder": {
    slug: "base64-image-encoder",
    name: "Base64 Image Encoder / Decoder",
    shortName: "Base64 Tool",
    description: "Convert images to Base64 strings and vice versa",
    longDescription: "Convert images to Base64 strings instantly in your browser. No uploads, no tracking, developer ready.",
    category: "convert",
    icon: "Code",
    acceptedTypes: ["image/png", "image/jpeg", "image/webp", "image/svg+xml"],
    outputType: "text/plain",
    whatItDoes: "This tool encodes binary image data into a text-based Base64 string, or decodes such a string back into an image file. It handles Data URIs commonly used in web development. Great for small icons or [favicons](/png-to-ico).",
    whenToUse: "Use this when you need to embed small images directly into CSS or HTML to reduce HTTP requests. Also useful for debugging Base64 strings found in code. If the string is too long, [resize the image](/resize-image) first.",
    tips: [
      "Great for small icons to reduce website HTTP requests",
      "Includes a 'Copy' button for quick workflow",
      "The decoder handles standard Data URIs automatically",
      "Shows character count and file size estimates"
    ],
    faq: [
      { question: "What is Base64?", answer: "Base64 is a way to represent binary data (like images) as text. This allows images to be embedded directly in code (HTML/CSS) without needing a separate file request." },
      { question: "Should I use this for all images?", answer: "No. Base64 increases file size by ~33%. Only use it for very small images (like icons or placeholders) to avoid slowing down your page load time." },
      { question: "Are my images uploaded to a server?", answer: "No. All image conversions happen directly in your browser. Files never leave your device and are not uploaded or stored on any server." }
    ],
    comparison: {
      title: "Base64 vs Image File — What’s the Difference?",
      columns: ["Feature", "Base64 String", "Image File"],
      rows: [
        ["Format", "Text String", "Binary File"],
        ["Requests", "Zero (Embedded)", "One per Image"],
        ["File Size", "Larger (~33%)", "Standard"],
        ["Best for", "Tiny Icons", "Photos & Graphics"]
      ],
      intentSentence: "If you’re converting to Base64, you’re usually trying to embed an image directly into code to reduce HTTP requests."
    },
    relatedTools: ["svg-to-png", "png-to-ico", "resize-image", "compress-png", "compress-jpg"]
  },
  "compress-jpg": {
    slug: "compress-jpg",
    name: "Compress JPG",
    shortName: "Compress JPG",
    description: "Reduce JPG file size while maintaining visual quality",
    longDescription: "Compress JPG images instantly in your browser. No uploads, no tracking, no quality loss.",
    category: "compress",
    icon: "Minimize2",
    acceptedTypes: ["image/jpeg"],
    outputType: "image/jpeg",
    whatItDoes: "This tool compresses JPG images by intelligently optimizing the compression quality to reduce file size while preserving visual quality. It uses advanced algorithms to minimize file size without creating noticeable artifacts. The tool provides real-time preview so you can see exactly how the compression affects your image before downloading. Perfect for reducing file sizes for web use, email attachments, social media uploads, or storage optimization while maintaining professional image quality. If you need a specific size, try our [Smart Optimizer](/smart-optimizer).",
    whenToUse: "Use this compressor when your JPG files are too large for uploading to websites or social media platforms, sending via email (which often has size limits), optimizing website loading speeds, saving cloud storage space, or meeting specific file size requirements for forms or applications. Ideal for photographers, web developers, social media managers, or anyone who needs smaller file sizes without sacrificing too much quality. For [PNG images](/compress-png), use our dedicated PNG tool.",
    tips: [
      "Start with a quality of 80% - this often provides the best balance of size reduction and visual quality",
      "Always preview the result before downloading to ensure the quality meets your standards",
      "Compression works best on larger, high-resolution images - expect 40-80% size reduction",
      "Already heavily compressed images may not reduce much further without noticeable quality loss",
      "For web use, 70-80% quality is usually sufficient and dramatically reduces file size",
      "For print or professional use, use 85-95% quality to minimize visible compression artifacts",
      "Compare the file sizes before and after to see your savings - often 50-70% reduction is achievable"
    ],
    faq: [
      { question: "How much can I reduce the file size?", answer: "Typically 40-80% reduction is possible. A 5MB photo might become 1MB. It depends on the original image quality and the settings you choose." },
      { question: "Will compression affect my image quality?", answer: "At 70-80% quality, the difference is usually invisible to the human eye. We provide a preview so you can see the result before downloading." },
      { question: "Are my images uploaded to a server?", answer: "No. All image conversions happen directly in your browser. Files never leave your device and are not uploaded or stored on any server." }
    ],
    comparison: {
      title: "Compressed vs Original JPG",
      columns: ["Feature", "Compressed", "Original"],
      rows: [
        ["File Size", "Small (Optimized)", "Large"],
        ["Visual Quality", "Good (Web Ready)", "Maximum"],
        ["Loading Speed", "Fast", "Slow"],
        ["Sharing", "Easy", "Difficult"]
      ],
      intentSentence: "If you’re compressing a JPG, you’re usually trying to save storage space or make it load faster online."
    },
    relatedTools: ["compress-png", "jpg-to-webp", "resize-image", "smart-optimizer", "crop-image"]
  },
  "compress-png": {
    slug: "compress-png",
    name: "Compress PNG",
    shortName: "Compress PNG",
    description: "Reduce PNG file size while preserving transparency",
    longDescription: "Compress PNG images instantly in your browser. No uploads, no tracking, no quality loss.",
    category: "compress",
    icon: "Minimize2",
    acceptedTypes: ["image/png"],
    outputType: "image/png",
    whatItDoes: "This tool compresses PNG images to reduce file size while preserving transparency. It optimizes the image data to create smaller files that still maintain good visual quality. For web-ready images, [converting to WebP](/png-to-webp) often provides even better results.",
    whenToUse: "Use this compressor for PNG images that are too large, especially web graphics, logos, icons, and screenshots. Perfect when you need smaller files but must keep transparency. If you need to [resize the dimensions](/resize-image) as well, we have a tool for that.",
    tips: [
      "PNG compression preserves transparency unlike converting to JPG",
      "Results vary based on image content - graphics compress better than photos",
      "For photos, consider converting to JPG for better compression",
      "Some PNGs with many colors may not compress significantly"
    ],
    faq: [
      { question: "Is transparency preserved?", answer: "Yes! Our PNG compression maintains full transparency (alpha channel), so your logos and graphics will look perfect on any background." },
      { question: "How much compression can I expect?", answer: "Typically 20-50% for graphics. Photos in PNG format may see less compression; for photos, we recommend converting to JPG." },
      { question: "Are my images uploaded to a server?", answer: "No. All image conversions happen directly in your browser. Files never leave your device and are not uploaded or stored on any server." }
    ],
    comparison: {
      title: "Compressed vs Original PNG",
      columns: ["Feature", "Compressed", "Original"],
      rows: [
        ["File Size", "Reduced", "Large"],
        ["Transparency", "Preserved", "Preserved"],
        ["Quality", "Optimized", "Lossless"],
        ["Web Ready", "Yes", "No"]
      ],
      intentSentence: "If you’re compressing a PNG, you’re usually trying to reduce file size without losing transparency."
    },
    relatedTools: ["compress-jpg", "png-to-webp", "resize-image", "website-optimizer", "png-to-jpg"]
  },
  "resize-image": {
    slug: "resize-image",
    name: "Resize Image",
    shortName: "Resize Image",
    description: "Change image dimensions while maintaining aspect ratio",
    longDescription: "Resize images instantly in your browser. No uploads, no tracking, no quality loss.",
    category: "edit",
    icon: "Maximize2",
    acceptedTypes: ["image/jpeg", "image/png", "image/webp"],
    outputType: "same",
    whatItDoes: "This tool resizes images to your specified dimensions. You can set exact width and height, or use the aspect ratio lock to maintain proportions while changing one dimension. For social media, check our [Instagram Resizer](/instagram-image-resizer).",
    whenToUse: "Use this tool when you need images at specific sizes for social media, websites, printing, or any purpose with size requirements. Great for creating thumbnails, profile pictures, or standardizing image dimensions. If you need to [crop images](/crop-image) first, use our cropper tool.",
    tips: [
      "Enable 'Maintain aspect ratio' to prevent distortion",
      "Enlarging images significantly may result in blurriness",
      "Common social media sizes: Instagram (1080x1080), Facebook (1200x630), Twitter (1200x675)",
      "For web use, smaller dimensions mean faster loading times"
    ],
    faq: [
      { question: "Will resizing affect image quality?", answer: "Reducing size generally maintains quality perfectly. Enlarging (upscaling) can cause blurriness as the tool must create new pixels." },
      { question: "What does 'maintain aspect ratio' do?", answer: "It keeps the image proportions locked. When you change width, height adjusts automatically (and vice versa) to prevent stretching." },
      { question: "Are my images uploaded to a server?", answer: "No. All image conversions happen directly in your browser. Files never leave your device and are not uploaded or stored on any server." }
    ],
    comparison: {
      title: "Resized vs Original Image",
      columns: ["Feature", "Resized", "Original"],
      rows: [
        ["Dimensions", "Custom (e.g. 800x600)", "Original"],
        ["File Size", "Smaller", "Original"],
        ["Aspect Ratio", "Maintained", "Original"],
        ["Focus", "Entire Image", "Entire Image"]
      ],
      intentSentence: "If you’re resizing an image, you’re usually trying to fit it into a specific layout or reduce its dimensions."
    },
    relatedTools: ["crop-image", "aspect-ratio-converter", "resize-image-to-exact-pixels", "compress-jpg", "compress-png"]
  },
  "crop-image": {
    slug: "crop-image",
    name: "Crop Image",
    shortName: "Crop Image",
    description: "Crop images to remove unwanted areas or fit specific ratios",
    longDescription: "Crop images instantly in your browser. No uploads, no tracking, no quality loss.",
    category: "edit",
    icon: "Crop",
    acceptedTypes: ["image/jpeg", "image/png", "image/webp"],
    outputType: "same",
    whatItDoes: "This tool lets you crop images by selecting the area you want to keep. Choose from preset aspect ratios for social media platforms or create custom crops for your specific needs. After cropping, you might want to [resize your image](/resize-image) to exact pixels.",
    whenToUse: "Use this tool to remove unwanted parts of an image, fit specific aspect ratios for social media posts, create profile pictures, or focus on a particular subject in your photo. For a specific shape without cropping, try the [Aspect Ratio Converter](/aspect-ratio-converter).",
    tips: [
      "Use preset ratios for consistent social media posts",
      "The rule of thirds can help create better compositions",
      "Cropping removes pixels permanently - keep your original file",
      "Square crops (1:1) work great for profile pictures"
    ],
    faq: [
      { question: "What aspect ratios are available?", answer: "We support common ratios like 1:1 (square), 4:3, 16:9, 9:16 (stories), and free-form for custom crops." },
      { question: "Does cropping reduce quality?", answer: "Cropping removes pixels but doesn't compress the remaining image. The quality of the area you keep is preserved exactly." },
      { question: "Are my images uploaded to a server?", answer: "No. All image conversions happen directly in your browser. Files never leave your device and are not uploaded or stored on any server." }
    ],
    comparison: {
      title: "Cropped vs Full Image",
      columns: ["Feature", "Cropped", "Full Image"],
      rows: [
        ["Composition", "Focused", "Wide"],
        ["Content", "Selected Area", "Everything"],
        ["Dimensions", "Reduced", "Original"],
        ["Distractions", "Removed", "Present"]
      ],
      intentSentence: "If you’re cropping an image, you’re usually trying to improve composition or remove unwanted background."
    },
    relatedTools: ["resize-image", "aspect-ratio-converter", "compress-jpg", "remove-exif", "instagram-image-resizer"]
  },
  "remove-exif": {
    slug: "remove-exif",
    name: "Remove EXIF Data",
    shortName: "Remove EXIF",
    description: "Strip metadata from images for privacy protection",
    longDescription: "Remove EXIF data from images instantly in your browser. No uploads, no tracking, completely private.",
    category: "privacy",
    icon: "ShieldOff",
    acceptedTypes: ["image/jpeg", "image/png", "image/webp"],
    outputType: "same",
    whatItDoes: "This tool removes EXIF metadata from images. EXIF (Exchangeable Image File Format) data is embedded in photos by cameras and phones, containing information like GPS location, date, device model, and camera settings. Use our [EXIF Viewer](/exif-viewer) to see what's currently hidden.",
    whenToUse: "Use this tool before sharing photos online to protect your privacy. Especially important for images taken with smartphones that may contain location data you don't want to share publicly. You can also [compress images](/compress-jpg) for even more privacy and speed.",
    tips: [
      "Always remove EXIF from images before sharing online for privacy",
      "Check the metadata preview to see what information is being removed",
      "GPS coordinates in EXIF can reveal your exact location",
      "Some platforms strip EXIF automatically, but many don't"
    ],
    faq: [
      { question: "What information is in EXIF data?", answer: "EXIF data contains hidden details like GPS location, camera model, date/time, and settings. Removing it protects your privacy when sharing photos online." },
      { question: "Does removing EXIF reduce quality?", answer: "No. Removing EXIF metadata only deletes the hidden text information. It does not change or compress the actual image pixels." },
      { question: "Are my images uploaded to a server?", answer: "No. All processing happens directly in your browser. Files never leave your device and are not uploaded or stored on any server." }
    ],
    comparison: {
      title: "Clean vs Original Image",
      columns: ["Feature", "Clean Image", "Original"],
      rows: [
        ["Metadata", "Removed", "Present"],
        ["GPS Location", "Hidden", "Visible"],
        ["Privacy", "Protected", "Exposed"],
        ["Visual Quality", "Identical", "Identical"]
      ],
      intentSentence: "If you’re removing EXIF data, you’re usually trying to protect your privacy before sharing photos online."
    },
    relatedTools: ["compress-jpg", "compress-png", "resize-image", "crop-image", "jpg-to-png"]
  },
  "smart-optimizer": {
    slug: "smart-optimizer",
    name: "Smart Image Optimizer",
    shortName: "Smart Optimizer",
    description: "Iteratively compresses images to a target file size (KB)",
    longDescription: "Optimize images to specific file sizes instantly in your browser. No uploads, no tracking, no quality loss.",
    category: "compress",
    icon: "Gauge",
    acceptedTypes: ["image/jpeg", "image/png", "image/webp"],
    outputType: "same",
    whatItDoes: "This tool iteratively compresses your image to find the highest quality setting that results in a file size under your specified limit. For general optimization, try [Compress JPG](/compress-jpg).",
    whenToUse: "Use this when you have a strict file size limit (e.g., 'maximum 50KB') for upload forms, email attachments, or performance budgets. If you need to process many files, use [Bulk Compressor](/bulk-compressor).",
    tips: [
      "Set your target size slightly below the absolute limit",
      "The tool finds the best balance between size and quality",
      "Works with JPG, PNG, and WebP formats",
      "Lower target sizes will result in lower image quality"
    ],
    faq: [
      { question: "How does Smart Optimization work?", answer: "The tool intelligently adjusts compression levels to reach your target file size (e.g. 50KB) while maintaining the highest possible visual quality." },
      { question: "Does optimizing reduce quality?", answer: "Compression always involves some trade-off, but our smart algorithm ensures the difference is usually invisible to the human eye." },
      { question: "Are my images uploaded to a server?", answer: "No. All processing happens directly in your browser. Files never leave your device and are not uploaded or stored on any server." }
    ],
    comparison: {
      title: "Smart Optimized vs Standard",
      columns: ["Feature", "Smart Optimized", "Standard"],
      rows: [
        ["File Size", "Targeted (e.g. 50KB)", "Random"],
        ["Efficiency", "Maximum", "Variable"],
        ["Compliance", "Guaranteed", "Guesswork"],
        ["Quality", "Balanced", "Original"]
      ],
      intentSentence: "If you’re using Smart Optimizer, you’re usually trying to meet a specific file size limit for an upload form."
    },
    relatedTools: ["compress-jpg", "bulk-compressor", "website-optimizer", "resize-image", "compress-png"]
  },
  "instagram-image-resizer": {
    slug: "instagram-image-resizer",
    name: "Instagram Image Resizer",
    shortName: "Instagram",
    description: "Resize and crop images for Instagram Posts, Stories, and Reels",
    longDescription: "Resize images for Instagram instantly in your browser. No uploads, no tracking, no quality loss.",
    category: "social",
    icon: "Instagram",
    acceptedTypes: ["image/jpeg", "image/png", "image/webp"],
    outputType: "image/jpeg",
    whatItDoes: "Resizes your photos to the exact dimensions recommended by Instagram to avoid automatic compression and quality loss. It helps you [crop images](/crop-image) to fit perfectly in the feed or stories.",
    whenToUse: "Use this before posting to Instagram to ensure your photos look sharp and aren't cropped unexpectedly. For other platforms like TikTok, use our [TikTok Resizer](/tiktok-image-resizer).",
    tips: [
      "Use 4:5 aspect ratio (1080x1350) for maximum screen real estate in the feed",
      "Stories and Reels should be 1080x1920 pixels (9:16)",
      "Square posts (1080x1080) are classic but take up less space than portrait",
      "We apply high-quality sharpening automatically to prevent blurriness"
    ],
    faq: [
      { question: "What is the best aspect ratio for Instagram?", answer: "For posts, 1080x1350 (4:5) fills the most screen space. For Stories and Reels, use 1080x1920 (9:16) for a full-screen experience." },
      { question: "Does resizing for Instagram reduce quality?", answer: "No. Resizing to the exact recommended dimensions prevents Instagram from applying aggressive compression, resulting in sharper images." },
      { question: "Are my images uploaded to a server?", answer: "No. All processing happens directly in your browser. Files never leave your device and are not uploaded or stored on any server." }
    ],
    comparison: {
      title: "Instagram Ready vs Original",
      columns: ["Feature", "Instagram Ready", "Original"],
      rows: [
        ["Aspect Ratio", "4:5 / 9:16", "Random"],
        ["Cropping", "Perfect Fit", "Awkward Cut"],
        ["Clarity", "Optimized", "Soft"],
        ["Compression", "Platform Safe", "Aggressive"]
      ],
      intentSentence: "If you’re resizing for Instagram, you’re usually trying to avoid auto-cropping or blurry uploads."
    },
    relatedTools: ["tiktok-image-resizer", "crop-image", "smart-optimizer"]
  },
  "tiktok-image-resizer": {
    slug: "tiktok-image-resizer",
    name: "TikTok Image Resizer",
    shortName: "TikTok",
    description: "Create perfect TikTok video covers and photo mode slides",
    longDescription: "Resize images for TikTok instantly in your browser. No uploads, no tracking, no quality loss.",
    category: "social",
    icon: "Music2",
    acceptedTypes: ["image/jpeg", "image/png", "image/webp"],
    outputType: "image/jpeg",
    whatItDoes: "Crops and resizes images to TikTok's 9:16 vertical format or 1:1 profile format. It helps you prepare custom covers and photo slides that fit perfectly. Try our [Instagram Resizer](/instagram-image-resizer) too.",
    whenToUse: "Use this when creating custom thumbnails/covers for your TikToks, updating your profile picture, or creating a photo mode carousel. If you need a specific pixel count, use [Exact Pixel Resizer](/resize-image-to-exact-pixels).",
    tips: [
      "TikTok covers should be 1080x1920 pixels (9:16)",
      "Keep important text in the center to avoid being covered by buttons/captions",
      "Photo Mode images also work best in 9:16 vertical format",
      "Profile pictures should be 1:1 square (min 200x200)"
    ],
    faq: [
      { question: "What is the correct size for TikTok covers?", answer: "1080x1920 pixels (9:16) is the standard for TikTok videos and photo slides. This fills the entire phone screen without black bars." },
      { question: "Does resizing for TikTok reduce quality?", answer: "No. We optimize your images for TikTok's specific requirements, ensuring they look crisp and clear when posted." },
      { question: "Are my images uploaded to a server?", answer: "No. All processing happens directly in your browser. Files never leave your device and are not uploaded or stored on any server." }
    ],
    comparison: {
      title: "TikTok Ready vs Standard",
      columns: ["Feature", "TikTok Ready", "Standard"],
      rows: [
        ["Aspect Ratio", "9:16 (Vertical)", "Random"],
        ["Screen Fill", "Full Screen", "Black Bars"],
        ["Engagement", "Higher", "Lower"],
        ["Text Safety", "Safe Zone", "Risk of Cutoff"]
      ],
      intentSentence: "If you’re resizing for TikTok, you’re usually trying to make a full-screen video cover or photo slide."
    },
    relatedTools: ["instagram-image-resizer", "youtube-thumbnail-resizer"]
  },
  "youtube-thumbnail-resizer": {
    slug: "youtube-thumbnail-resizer",
    name: "YouTube Thumbnail Resizer",
    shortName: "YouTube",
    description: "Make your YouTube thumbnails pop in HD",
    longDescription: "Resize images for YouTube instantly in your browser. No uploads, no tracking, no quality loss.",
    category: "social",
    icon: "Youtube",
    acceptedTypes: ["image/jpeg", "image/png", "image/webp"],
    outputType: "image/jpeg",
    whatItDoes: "Resizes images to 1280x720 (16:9) and optimizes file size for YouTube. It ensures your thumbnail isn't rejected for being too large. Use [Smart Optimizer](/smart-optimizer) for exact size limits.",
    whenToUse: "Always use this before uploading a video thumbnail to ensure it meets YouTube's requirements (under 2MB) and looks high-quality. For social posts, try [Twitter Resizer](/twitter-image-resizer).",
    tips: [
      "Standard YouTube thumbnail size is 1280x720 pixels (16:9)",
      "Use high-contrast images and large text for better CTR",
      "Keep main subjects away from the bottom-right corner (timestamp overlay)",
      "We automatically optimize file size to stay under the 2MB limit"
    ],
    faq: [
      { question: "What is the standard YouTube thumbnail size?", answer: "1280x720 pixels (16:9) is the ideal size for HD thumbnails. It ensures your image looks great on all devices from phones to TVs." },
      { question: "Does resizing reduce image quality?", answer: "No. We resize using high-quality algorithms and optimize the file size to meet YouTube's 2MB limit without sacrificing clarity." },
      { question: "Are my images uploaded to a server?", answer: "No. All processing happens directly in your browser. Files never leave your device and are not uploaded or stored on any server." }
    ],
    comparison: {
      title: "YouTube Ready vs Standard",
      columns: ["Feature", "YouTube Ready", "Standard"],
      rows: [
        ["Dimensions", "1280x720 (HD)", "Random"],
        ["Aspect Ratio", "16:9", "Variable"],
        ["File Size", "< 2MB (Guaranteed)", "Unknown"],
        ["Visibility", "High Contrast", "Low"]
      ],
      intentSentence: "If you’re resizing for YouTube, you’re usually trying to meet the strict 2MB limit and 16:9 ratio."
    },
    relatedTools: ["instagram-image-resizer", "twitter-image-resizer", "linkedin-image-resizer", "tiktok-image-resizer", "smart-optimizer"]
  },
  "twitter-image-resizer": {
    slug: "twitter-image-resizer",
    name: "X (Twitter) Image Resizer",
    shortName: "X / Twitter",
    description: "Optimize images for X/Twitter posts and headers",
    longDescription: "Resize images for X (Twitter) instantly in your browser. No uploads, no tracking, no quality loss.",
    category: "social",
    icon: "Twitter",
    acceptedTypes: ["image/jpeg", "image/png", "image/webp"],
    outputType: "image/jpeg",
    whatItDoes: "Resizes images to X/Twitter's recommended dimensions for in-stream previews, headers, and profile pictures. For professional networking, use our [LinkedIn Resizer](/linkedin-image-resizer).",
    whenToUse: "Use this before tweeting images to ensure they display fully in the timeline, or when updating your profile branding. You can also [crop to ratios](/aspect-ratio-converter) first.",
    tips: [
      "Standard in-stream posts look best at 16:9 (1600x900)",
      "Header images are 1500x500 pixels - keep key info in the center",
      "Profile pictures are circular, but upload a 400x400 square",
      "Tall images (3:4) now work better on mobile, but 16:9 is safest for desktop"
    ],
    faq: [
      { question: "What is the best image size for X / Twitter?", answer: "For in-stream photos, 1600x900 (16:9) works best. For headers, use 1500x500. This ensures your images display correctly without awkward cropping." },
      { question: "Does resizing for Twitter reduce quality?", answer: "No. We optimize your images to look sharp on Twitter while keeping file sizes efficient for fast loading." },
      { question: "Are my images uploaded to a server?", answer: "No. All processing happens directly in your browser. Files never leave your device and are not uploaded or stored on any server." }
    ],
    comparison: {
      title: "X (Twitter) Ready vs Standard",
      columns: ["Feature", "X Ready", "Standard"],
      rows: [
        ["Preview", "Full Image", "Cropped"],
        ["Aspect Ratio", "16:9", "Random"],
        ["Loading", "Instant", "Slow"],
        ["Engagement", "Optimized", "Lower"]
      ],
      intentSentence: "If you’re resizing for X/Twitter, you’re usually trying to stop the platform from cropping your image awkwardly."
    },
    relatedTools: ["linkedin-image-resizer", "instagram-image-resizer", "youtube-thumbnail-resizer", "tiktok-image-resizer", "aspect-ratio-converter"]
  },
  "linkedin-image-resizer": {
    slug: "linkedin-image-resizer",
    name: "LinkedIn Image Resizer",
    shortName: "LinkedIn",
    description: "Professional image sizing for LinkedIn posts and banners",
    longDescription: "Resize images for LinkedIn instantly in your browser. No uploads, no tracking, no quality loss.",
    category: "social",
    icon: "Linkedin",
    acceptedTypes: ["image/jpeg", "image/png", "image/webp"],
    outputType: "image/jpeg",
    whatItDoes: "Adapts your images to LinkedIn's professional layout requirements. It ensures your posts, articles, and profile images look sharp. Use our [Twitter Resizer](/twitter-image-resizer) for cross-posting.",
    whenToUse: "Use this for company updates, profile background banners, shared articles, and professional headshots. For custom pixel sizes, use [Exact Pixel Resizer](/resize-image-to-exact-pixels).",
    tips: [
      "Standard link posts look best at 1200x627 pixels",
      "Personal profile banners should be 1584x396 pixels",
      "Company page banners are slightly different: 1128x191 pixels",
      "Square images (1200x1200) are becoming popular for engagement"
    ],
    faq: [
      { question: "What size should LinkedIn posts be?", answer: "For shared links, 1200x627 is standard. For image posts, 1080x1080 (square) or 1080x1350 (portrait) often perform better in the feed." },
      { question: "Does resizing for LinkedIn reduce quality?", answer: "No. Resizing ensures your professional images meet LinkedIn's specifications, preventing them from being blurred or cropped automatically." },
      { question: "Are my images uploaded to a server?", answer: "No. All processing happens directly in your browser. Files never leave your device and are not uploaded or stored on any server." }
    ],
    comparison: {
      title: "LinkedIn Ready vs Standard",
      columns: ["Feature", "LinkedIn Ready", "Standard"],
      rows: [
        ["Dimensions", "Platform Specific", "Random"],
        ["Professionalism", "Polished", "Unpolished"],
        ["Cropping", "Exact Fit", "Auto-Cropped"],
        ["File Type", "Optimized JPG", "Various"]
      ],
      intentSentence: "If you’re resizing for LinkedIn, you’re usually trying to look professional with perfectly fitted images."
    },
    relatedTools: ["twitter-image-resizer", "instagram-image-resizer", "youtube-thumbnail-resizer", "tiktok-image-resizer", "resize-image-to-exact-pixels"]
  },
  "aspect-ratio-converter": {
    slug: "aspect-ratio-converter",
    name: "Aspect Ratio Converter",
    shortName: "Ratio Convert",
    description: "Change image aspect ratio (16:9, 1:1, 4:5) without distortion",
    longDescription: "Change image aspect ratios instantly in your browser. No uploads, no tracking, no quality loss.",
    category: "edit",
    icon: "Ratio",
    acceptedTypes: ["image/jpeg", "image/png", "image/webp"],
    outputType: "image/jpeg",
    whatItDoes: "This tool changes the proportional relationship between your image's width and height. It can either [crop your image](/crop-image) to fit a new shape or add background bars. For exact sizes, use [Pixel Resizer](/resize-image-to-exact-pixels).",
    whenToUse: "Use this when you need your image to fit a specific shape—like a TV screen (16:9) or a social feed. If you just need a standard resize, use our [Image Resizer](/resize-image).",
    tips: [
      "Use 'Cover' mode if you want the image to fill the entire space (some parts will be cropped)",
      "Use 'Contain' mode if you need to show the whole image (bars will be added)",
      "Common ratios: 16:9 (Video), 1:1 (Square), 4:5 (Portrait), 9:16 (Stories)",
      "We automatically center the image for the best composition"
    ],
    faq: [
      { question: "Is Cover or Contain mode better?", answer: "Use 'Cover' if you want to fill the entire frame without borders, even if it crops some content. Use 'Contain' if you must show the entire image and don't mind background bars." },
      { question: "Does changing aspect ratio reduce quality?", answer: "No. The tool simply crops or adds borders to your image. It does not compress or degrade the actual pixel quality of your photo." },
      { question: "Are my images uploaded to a server?", answer: "No. All processing happens directly in your browser. Files never leave your device and are not uploaded or stored on any server." }
    ],
    comparison: {
      title: "Correct Ratio vs Original",
      columns: ["Feature", "Correct Ratio", "Original"],
      rows: [
        ["Shape", "Specific (e.g. 16:9)", "Original"],
        ["Composition", "Adjusted", "Original"],
        ["Use Case", "Social / TV", "General"],
        ["Distortion", "None", "Potential"]
      ],
      intentSentence: "If you’re changing aspect ratio, you’re usually trying to fit an image into a specific frame or screen."
    },
    relatedTools: ["resize-image-to-exact-pixels", "crop-image", "resize-image", "instagram-image-resizer", "twitter-image-resizer"]
  },
  "resize-image-to-exact-pixels": {
    slug: "resize-image-to-exact-pixels",
    name: "Exact Pixel Resizer",
    shortName: "Pixel Resize",
    description: "Resize image to specific width and height (e.g. 1920x1080)",
    longDescription: "Resize images to exact pixels instantly in your browser. No uploads, no tracking, no quality loss.",
    category: "edit",
    icon: "Maximize",
    acceptedTypes: ["image/jpeg", "image/png", "image/webp"],
    outputType: "image/jpeg",
    whatItDoes: "This tool resizes your image to the exact width and height numbers you enter. It gives you control over how the image fits: crop to fill, fit inside with bars, or stretch. For standard ratios, use [Aspect Ratio Converter](/aspect-ratio-converter).",
    whenToUse: "Use this when a platform explicitly states 'Image must be exactly X by Y pixels'. Common for display ads and passport photos. If the file size is the issue, try [Smart Optimizer](/smart-optimizer).",
    tips: [
      "Check if the requirement allows for 'Letterboxing' (adding bars) before using Contain mode",
      "'Cover' mode is usually best for banners to avoid empty space",
      "Avoid 'Stretch' unless specifically required, as it distorts the image",
      "Use high quality settings to prevent pixelation when resizing up"
    ],
    faq: [
      { question: "Is Cover or Stretch mode better?", answer: "'Cover' is usually better because it fills the dimensions without distorting your image. 'Stretch' forces the image to fit, which often makes it look squashed or stretched." },
      { question: "Does resizing to exact pixels reduce quality?", answer: "Downscaling (making smaller) usually maintains quality. Upscaling (making larger) can cause blurriness as the computer has to invent new pixels." },
      { question: "Are my images uploaded to a server?", answer: "No. All processing happens directly in your browser. Files never leave your device and are not uploaded or stored on any server." }
    ],
    comparison: {
      title: "Exact Size vs Approximate",
      columns: ["Feature", "Exact Pixels", "Approximate"],
      rows: [
        ["Width/Height", "Precise", "Rough"],
        ["Compliance", "100%", "Variable"],
        ["Distortion", "Controlled", "Risk"],
        ["Usage", "Ads/Forms", "General"]
      ],
      intentSentence: "If you’re resizing to exact pixels, you’re usually trying to meet a strict technical requirement."
    },
    relatedTools: ["aspect-ratio-converter", "resize-image", "crop-image", "smart-optimizer", "linkedin-image-resizer"]
  },
  "website-optimizer": {
    slug: "website-optimizer",
    name: "Website Image Optimizer",
    shortName: "Web Optimizer",
    description: "Auto-convert to WebP, resize, and generate HTML snippets",
    longDescription: "Optimize images for websites instantly in your browser. No uploads, no tracking, no quality loss.",
    category: "compress",
    icon: "Layout",
    acceptedTypes: ["image/jpeg", "image/png", "image/webp", "image/avif"],
    outputType: "image/webp",
    whatItDoes: "This tool streamlines adding images to websites. It converts to WebP, optimizes size, and generates HTML. For the ultimate guide, see our [Best Format Guide](/best-image-format-for-web).",
    whenToUse: "Use this whenever you're adding images to a website. It ensures modern formats and correct sizing. If you have many images, use our [Bulk Compressor](/bulk-compressor).",
    tips: [
      "WebP is supported by all modern browsers",
      "The tool generates a responsive <img> tag",
      "You get both the optimized image and the code",
      "Helps improve your Core Web Vitals scores"
    ],
    faq: [
      { question: "Is WebP or JPG better for my website?", answer: "WebP is superior for websites. It offers smaller file sizes for the same quality, which makes your pages load faster and improves SEO." },
      { question: "Does optimizing for web reduce quality?", answer: "It can slightly reduce quality to save space, but our optimizer finds the perfect balance where the visual difference is unnoticeable." },
      { question: "Are my images uploaded to a server?", answer: "No. All image conversions happen directly in your browser. Files never leave your device and are not uploaded or stored on any server." }
    ],
    comparison: {
      title: "Web Optimized vs Raw Image",
      columns: ["Feature", "Web Optimized", "Raw Image"],
      rows: [
        ["Format", "WebP / AVIF", "JPG / PNG"],
        ["File Size", "Tiny", "Huge"],
        ["Loading Speed", "Instant", "Slow"],
        ["SEO Score", "Improved", "Neutral"]
      ],
      intentSentence: "If you’re optimizing for a website, you’re usually trying to improve page load speed and Core Web Vitals."
    },
    relatedTools: ["smart-optimizer", "bulk-compressor", "best-image-format-for-web", "jpg-to-webp", "png-to-webp"]
  },
  "bulk-compressor": {
    slug: "bulk-compressor",
    name: "Bulk Image Compression",
    shortName: "Bulk Compress",
    description: "Compress multiple images at once locally",
    longDescription: "Compress multiple images instantly in your browser. No uploads, no tracking, no quality loss.",
    category: "compress",
    icon: "Layers",
    acceptedTypes: ["image/jpeg", "image/png", "image/webp"],
    outputType: "same",
    whatItDoes: "This tool allows you to select multiple images and compress them all in one go. It processes everything on your device. For individual control, use [Smart Optimizer](/smart-optimizer).",
    whenToUse: "Use this when you have a folder of photos to optimize and don't want to process them one by one. Great for photographers. For web developers, try [Website Optimizer](/website-optimizer).",
    tips: [
      "You can drag and drop multiple files at once",
      "Processing happens in parallel for speed",
      "Download all results in one convenient ZIP package",
      "No data is uploaded - it's all local"
    ],
    faq: [
      { question: "Is bulk compression as good as single image mode?", answer: "Yes. It uses the same advanced compression engine. The only difference is that it processes multiple files in a queue." },
      { question: "Does compressing multiple images reduce quality?", answer: "Compression always involves a trade-off, but our smart algorithm reduces file size significantly with minimal impact on visual quality." },
      { question: "Are my images uploaded to a server?", answer: "No. All image conversions happen directly in your browser. Files never leave your device and are not uploaded or stored on any server." }
    ],
    comparison: {
      title: "Bulk vs Single Processing",
      columns: ["Feature", "Bulk Mode", "Single Mode"],
      rows: [
        ["Speed", "Fast (Parallel)", "Slow"],
        ["Workflow", "One Click", "Repetitive"],
        ["Consistency", "Uniform", "Variable"],
        ["Efficiency", "High", "Low"]
      ],
      intentSentence: "If you’re using Bulk Compressor, you’re usually trying to save time processing many images at once."
    },
    relatedTools: ["smart-optimizer", "website-optimizer", "compress-jpg", "compress-png", "bulk-compressor"]
  },
  "best-image-format-for-web": {
    slug: "best-image-format-for-web",
    name: "Best Image Format for Web",
    shortName: "Format Guide",
    description: "Find the best image format for your website (JPG vs PNG vs WebP vs AVIF).",
    longDescription: "Compare image formats instantly in your browser. No uploads, no tracking, expert advice.",
    category: "guide",
    icon: "Compass",
    acceptedTypes: ["image/jpeg", "image/png", "image/webp", "image/avif"],
    outputType: "image/webp",
    whatItDoes: "This interactive tool helps you decide which image format (WebP, JPG, PNG, or AVIF) is best. It compares efficiency and compatibility. Once you decide, use our [Website Optimizer](/website-optimizer).",
    whenToUse: "Use this guide whenever you are building a website and aren't sure which format to serve. For deep metadata inspection, check our [EXIF Viewer](/exif-viewer).",
    tips: [
      "WebP is generally the best all-around choice for modern web",
      "AVIF offers better compression but has slightly less support",
      "JPG is best for photos where you need maximum compatibility",
      "PNG is essential when you need transparency (or use WebP/AVIF)",
      "SVG is best for logos and icons (vectors)"
    ],
    faq: [
      { question: "What is the best image format for websites?", answer: "For most cases, WebP is currently the best balance of quality, file size, and compatibility. AVIF is better for compression but has slightly less browser support." },
      { question: "When should I use JPG?", answer: "Use JPG for photographs when you need to support very old browsers or systems that don't handle WebP." },
      { question: "Are my images uploaded to a server?", answer: "No. All processing happens directly in your browser. Files never leave your device and are not uploaded or stored on any server." }
    ],
    comparison: {
      title: "WebP vs JPG vs PNG — Comparison",
      columns: ["Feature", "WebP", "JPG", "PNG"],
      rows: [
        ["File Size", "Smallest", "Small", "Large"],
        ["Quality", "High", "Good", "Lossless"],
        ["Transparency", "Yes", "No", "Yes"],
        ["Compatibility", "Modern", "Universal", "Universal"]
      ],
      intentSentence: "If you’re comparing formats, you’re usually trying to find the best balance of quality and speed for your website."
    },
    relatedTools: ["website-optimizer", "jpg-to-webp", "png-to-webp", "avif-to-jpg", "exif-viewer"]
  },
  "exif-viewer": {
    slug: "exif-viewer",
    name: "EXIF Viewer Online",
    shortName: "EXIF Viewer",
    description: "View EXIF data from images online. See camera settings, GPS location, and metadata instantly. Files never leave your device.",
    longDescription: "View EXIF metadata instantly in your browser. No uploads, no tracking, completely private.",
    category: "privacy",
    icon: "Info",
    acceptedTypes: ["image/jpeg", "image/png", "image/webp", "image/heic"],
    outputType: "same",
    whatItDoes: "This tool extracts and displays the invisible 'EXIF' metadata embedded in digital photos. It's like a digital fingerprint. To remove this data, use our [EXIF Remover](/remove-exif).",
    whenToUse: "Use this tool to check camera settings or verify GPS location before sharing. For a full overview of image formats, see our [Format Guide](/best-image-format-for-web).",
    tips: [
      "Check for GPS data before sharing photos on social media to protect your privacy",
      "Photographers can use this to study the settings (ISO, Shutter, Aperture) of photos they admire",
      "Supports standard JPG, PNG, WebP, and HEIC formats",
      "Use our EXIF Remover tool if you want to delete this data"
    ],
    faq: [
      { question: "Is EXIF data visible to others when I share images?", answer: "Yes, if you share the original file. Social media often strips it, but email and file transfers preserve it. This tool lets you see what's hidden." },
      { question: "Does viewing EXIF data alter my image?", answer: "No. Viewing the metadata is a read-only operation. It does not change your image file or quality in any way." },
      { question: "Are my images uploaded to a server?", answer: "No. All processing happens directly in your browser. Files never leave your device and are not uploaded or stored on any server." }
    ],
    comparison: {
      title: "Hidden vs Visible Metadata — What's the Difference?",
      columns: ["Feature", "Standard View", "EXIF View"],
      rows: [
        ["Visible Info", "Pixels (The Image)", "Camera Settings & GPS"],
        ["Privacy Risk", "Low", "High (Location Data)"],
        ["Technical Details", "None", "ISO, Shutter, Model"],
        ["Edit History", "Invisible", "Often Visible"]
      ],
      intentSentence: "If you're viewing EXIF data, you're usually trying to check camera settings or verify what personal information is hidden in the file."
    },
    relatedTools: ["remove-exif", "best-image-format-for-web", "compress-jpg", "heic-to-jpg", "jpg-to-png"]
  }
}

export const toolCategories: { id: ToolCategory; name: string; description: string }[] = [
  { id: "social", name: "Social Media", description: "Optimize for platforms" },
  { id: "convert", name: "Convert", description: "Change image formats" },
  { id: "compress", name: "Compress", description: "Reduce file sizes" },
  { id: "edit", name: "Edit", description: "Modify images" },
  { id: "privacy", name: "Privacy", description: "Protect your data" },
]

export function getToolsByCategory(category: ToolCategory): ToolConfig[] {
  return Object.values(toolsConfig).filter(tool => tool.category === category)
}

export function getAllTools(): ToolConfig[] {
  return Object.values(toolsConfig).filter(tool => tool.category !== "guide")
}

export function getToolBySlug(slug: string): ToolConfig | undefined {
  return toolsConfig[slug]
}
