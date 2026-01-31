


export type ToolCategory = "convert" | "compress" | "edit" | "privacy" | "social"

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
  relatedTools: string[]
}

export const toolsConfig: Record<string, ToolConfig> = {
  "jpg-to-png": {
    slug: "jpg-to-png",
    name: "JPG to PNG Converter",
    shortName: "JPG to PNG",
    description: "Convert JPG images to PNG format with transparency support",
    longDescription: "Transform your JPG/JPEG images into high-quality PNG files. PNG format supports transparency and lossless compression, making it perfect for graphics, logos, and images that need a transparent background.",
    category: "convert",
    icon: "ArrowRightLeft",
    acceptedTypes: ["image/jpeg"],
    outputType: "image/png",
    whatItDoes: "This tool converts JPG/JPEG images to PNG format with zero quality loss. PNG (Portable Network Graphics) uses lossless compression, meaning every pixel is preserved exactly as decoded from the original JPG. Unlike JPG, PNG supports transparency (alpha channel), making it ideal for graphics, logos, and images that need transparent backgrounds. The conversion process preserves EXIF orientation data and maintains 1:1 pixel fidelity, ensuring your image looks identical to the original JPG when displayed.",
    whenToUse: "Use this converter when you need transparency in your image, want to preserve image quality for further editing, or need a format that supports lossless compression. Perfect for logos and graphics that require transparent backgrounds, screenshots that need to be edited, images with text that must remain sharp, or when you're preparing images for design work where quality preservation is critical. Also ideal when you need to avoid further quality degradation from repeated JPG compression cycles.",
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
      { question: "Will converting to PNG improve my image quality?", answer: "Converting from JPG to PNG won't recover quality that was already lost during the original JPG compression. However, PNG will preserve the current decoded quality perfectly - no additional quality loss occurs. This means if you need to edit the image multiple times, PNG prevents the quality degradation that would happen with repeated JPG saves." },
      { question: "Why is my PNG file larger than the original JPG?", answer: "PNG uses lossless compression while JPG uses lossy compression. JPG achieves smaller file sizes by discarding some image data, while PNG preserves every pixel exactly. This means PNG files are typically 2-5x larger but maintain perfect pixel fidelity. The trade-off is worth it when you need transparency or want to avoid further quality loss." },
      { question: "Can I add transparency after converting?", answer: "The conversion itself doesn't add transparency - it preserves the image as-is. To add transparency, you'll need to use an image editor to remove the background. Once you have a transparent PNG, you can use it in designs, websites, or anywhere you need a transparent background." },
      { question: "Is this conversion secure and private?", answer: "Yes! All processing happens entirely in your browser using client-side JavaScript. Your images are never uploaded to any server, ensuring complete privacy and security. The conversion happens instantly on your device." },
      { question: "Does the tool preserve EXIF data and orientation?", answer: "Yes, the tool correctly handles EXIF orientation data, ensuring your image displays with the correct orientation. However, EXIF metadata (like GPS, camera settings) is typically not preserved in PNG format, which can be a privacy benefit." },
      { question: "Can I convert multiple JPG files at once?", answer: "Yes! The tool supports batch conversion. Simply drag and drop multiple JPG files, and they'll all be converted to PNG format. Each file is processed individually to ensure quality." }
    ],
    relatedTools: ["png-to-jpg", "jpg-to-webp", "compress-png", "resize-image", "crop-image"]
  },
  "png-to-jpg": {
    slug: "png-to-jpg",
    name: "PNG to JPG Converter",
    shortName: "PNG to JPG",
    description: "Convert PNG images to JPG format for smaller file sizes",
    longDescription: "Convert your PNG images to JPG format to reduce file size significantly. JPG is ideal for photographs and complex images where smaller file sizes are more important than perfect quality.",
    category: "convert",
    icon: "ArrowRightLeft",
    acceptedTypes: ["image/png"],
    outputType: "image/jpeg",
    whatItDoes: "This tool converts PNG images to JPG/JPEG format with customizable quality settings. JPG uses lossy compression to create significantly smaller files - typically 50-90% smaller than PNG. The conversion process allows you to control the quality vs. file size trade-off, making it ideal for photographs, web images, and any situation where file size matters more than pixel-perfect quality. Transparent areas in PNG are automatically filled with a white background since JPG doesn't support transparency.",
    whenToUse: "Use this converter when you need smaller file sizes for web uploads, email attachments, social media posts, or storage optimization. Perfect for photographs taken from cameras or phones, social media images where file size limits apply, website images where loading speed matters, or when sharing images via email or messaging apps. Also ideal when you don't need transparency and want to save storage space or bandwidth.",
    tips: [
      "Transparent areas in PNG will become white (or the selected background color) in JPG - this is automatic",
      "Adjust the quality slider to find the perfect balance between file size and image quality",
      "JPG is best for photographs and complex images; for graphics with sharp edges or text, consider keeping PNG",
      "A quality setting of 80-85% usually provides excellent results with reasonable file sizes",
      "For web use, 70-80% quality is often sufficient and dramatically reduces file size",
      "For print or high-quality displays, use 90-95% quality to minimize visible compression artifacts",
      "Photos compress better than graphics - expect larger size reductions for photographic content"
    ],
    faq: [
      { question: "What happens to transparency when converting PNG to JPG?", answer: "JPG format doesn't support transparency. When converting, all transparent areas in your PNG will be automatically filled with a solid color - typically white. If you need transparency, keep your image as PNG or use a format like WebP that supports transparency." },
      { question: "How much smaller will my file be after conversion?", answer: "Typically 50-90% smaller, depending on the original PNG image content and the quality setting you choose. Photographs usually compress better than graphics or images with many solid colors. A high-quality photo PNG might reduce from 5MB to 500KB, while a simple graphic might go from 200KB to 100KB." },
      { question: "What quality setting should I use for PNG to JPG conversion?", answer: "For most web and social media uses, 80-85% offers an excellent balance of quality and file size. Use 90-95% for print, professional photography, or when quality is critical. Use 70-75% for thumbnails, previews, or when file size is the primary concern. The tool lets you preview the result before downloading." },
      { question: "Is there any quality loss when converting to JPG?", answer: "Yes, JPG uses lossy compression, which means some image data is discarded to achieve smaller file sizes. However, at quality settings of 80% and above, the quality loss is often imperceptible to the human eye, especially for photographs. The trade-off is worth it for the significant file size reduction." },
      { question: "Can I convert PNG with transparency and keep it transparent?", answer: "No, JPG doesn't support transparency. If you need to keep transparency, consider converting to WebP format instead, which supports transparency and still offers better compression than PNG. Alternatively, keep your image as PNG if transparency is essential." },
      { question: "Will the conversion work for all PNG files?", answer: "Yes, the tool supports all standard PNG files including those with transparency, indexed colors, and full-color images. Very large PNG files (over 50MB) may take longer to process depending on your device's capabilities." }
    ],
    relatedTools: ["jpg-to-png", "png-to-webp", "compress-jpg", "resize-image", "crop-image"]
  },
  "webp-to-png": {
    slug: "webp-to-png",
    name: "WebP to PNG Converter",
    shortName: "WebP to PNG",
    description: "Convert WebP images to PNG format for wider compatibility",
    longDescription: "Convert WebP images to the universally supported PNG format. While WebP offers excellent compression, PNG ensures your images work everywhere, including older software and systems.",
    category: "convert",
    icon: "ArrowRightLeft",
    acceptedTypes: ["image/webp"],
    outputType: "image/png",
    whatItDoes: "This tool converts WebP images to PNG format. WebP is a modern format with great compression, but PNG offers universal compatibility and is supported by virtually all image software and platforms.",
    whenToUse: "Use this converter when you need maximum compatibility, want to edit images in software that doesn't support WebP, or need to ensure your images display correctly on all devices and platforms.",
    tips: [
      "PNG files may be larger than the original WebP",
      "Transparency is preserved during conversion",
      "PNG is supported by virtually all image editors and platforms",
      "Consider keeping WebP for web use where supported for better performance"
    ],
    faq: [
      { question: "Why convert from WebP?", answer: "While WebP is efficient, some older software, email clients, and platforms don't support it. PNG ensures universal compatibility." },
      { question: "Is transparency preserved?", answer: "Yes! Both WebP and PNG support transparency, so it's fully preserved during conversion." },
      { question: "Will the file size increase?", answer: "Usually yes, as WebP has more efficient compression. However, PNG ensures the image works everywhere." },
      { question: "Can I batch convert multiple images?", answer: "Currently, you can convert one image at a time. Process each image separately for best results." }
    ],
    relatedTools: ["png-to-webp", "webp-to-jpg", "jpg-to-png", "compress-png", "resize-image"]
  },
  "png-to-webp": {
    slug: "png-to-webp",
    name: "PNG to WebP Converter",
    shortName: "PNG to WebP",
    description: "Convert PNG images to WebP for better compression",
    longDescription: "Convert your PNG images to WebP format for significantly smaller file sizes while maintaining quality. WebP is ideal for web use, offering both lossy and lossless compression with transparency support.",
    category: "convert",
    icon: "ArrowRightLeft",
    acceptedTypes: ["image/png"],
    outputType: "image/webp",
    whatItDoes: "This tool converts PNG images to WebP format. WebP, developed by Google, provides superior compression compared to PNG while still supporting transparency. It's widely supported in modern browsers.",
    whenToUse: "Use this converter for web images where you want smaller file sizes without sacrificing transparency. Great for website optimization, faster page loads, and reducing bandwidth usage.",
    tips: [
      "WebP typically produces files 25-35% smaller than PNG",
      "Transparency is fully supported in WebP format",
      "Most modern browsers support WebP, but check compatibility for your audience",
      "Consider providing PNG fallbacks for older browser support"
    ],
    faq: [
      { question: "How much smaller will my WebP file be?", answer: "WebP files are typically 25-35% smaller than equivalent PNG files while maintaining similar visual quality." },
      { question: "Is WebP widely supported?", answer: "Yes, all modern browsers (Chrome, Firefox, Safari, Edge) support WebP. Some older browsers may not." },
      { question: "Does WebP support transparency?", answer: "Yes! WebP fully supports transparency (alpha channel), just like PNG." },
      { question: "Should I use WebP for all my images?", answer: "WebP is great for web use. For maximum compatibility or print, PNG or JPG may be better choices." }
    ],
    relatedTools: ["webp-to-png", "jpg-to-webp", "png-to-jpg", "compress-png", "resize-image"]
  },
  "jpg-to-webp": {
    slug: "jpg-to-webp",
    name: "JPG to WebP Converter",
    shortName: "JPG to WebP",
    description: "Convert JPG images to WebP for modern web optimization",
    longDescription: "Convert your JPG images to WebP format for better web performance. WebP offers superior compression, resulting in smaller file sizes that load faster while maintaining excellent visual quality.",
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
      { question: "How much smaller will my WebP file be?", answer: "WebP files are typically 25-34% smaller than JPG files at equivalent visual quality." },
      { question: "Is there quality loss in conversion?", answer: "Both JPG and WebP use lossy compression. You can adjust the quality setting to control the balance between size and quality." },
      { question: "When should I use WebP over JPG?", answer: "Use WebP for web images where browser support isn't a concern. Use JPG for maximum compatibility or when sharing images." },
      { question: "Do all browsers support WebP?", answer: "All modern browsers support WebP. Some very old browsers don't, but this is increasingly rare." }
    ],
    relatedTools: ["webp-to-jpg", "png-to-webp", "jpg-to-png", "compress-jpg", "resize-image"]
  },
  "heic-to-jpg": {
    slug: "heic-to-jpg",
    name: "HEIC to JPG Converter",
    shortName: "HEIC to JPG",
    description: "Convert iPhone HEIC photos to universally compatible JPG",
    longDescription: "Convert HEIC images from your iPhone or iPad to the universally compatible JPG format. HEIC is Apple's efficient format, but JPG works everywhere - perfect for sharing, uploading, and editing.",
    category: "convert",
    icon: "FileImage",
    acceptedTypes: ["image/heic", "image/heif"],
    outputType: "image/jpeg",
    whatItDoes: "This tool converts HEIC/HEIF images from your iPhone or iPad to the universally compatible JPG format. HEIC (High Efficiency Image Container) is Apple's default photo format, offering superior compression while maintaining quality. However, many platforms, websites, and software applications don't support HEIC, making JPG conversion essential for sharing, uploading, and editing. The conversion preserves image quality and handles EXIF orientation data correctly, ensuring your photos display properly.",
    whenToUse: "Use this converter when you need to share iPhone photos with Windows users or non-Apple devices, upload photos to websites or social media that don't accept HEIC files, edit photos in software that doesn't support HEIC (like older versions of Photoshop or GIMP), send photos via email or messaging apps that don't support HEIC, or when you need maximum compatibility across all platforms and devices. Essential for anyone who takes photos with an iPhone and needs to use them outside the Apple ecosystem.",
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
      { question: "What is HEIC format and why does my iPhone use it?", answer: "HEIC (High Efficiency Image Container) is Apple's modern photo format introduced with iOS 11. It provides better compression than JPG (typically 50% smaller files) while maintaining similar or better quality. Apple uses it as the default to save storage space on iPhones. However, it has limited compatibility outside the Apple ecosystem." },
      { question: "Why can't I open HEIC files on my Windows computer or upload them to websites?", answer: "HEIC requires specific software support that many platforms lack. Windows 10/11 can view HEIC files with a codec pack, but many websites, email clients, and image editing software don't support it. Converting to JPG ensures universal compatibility - JPG works on virtually every device, platform, and application." },
      { question: "Is there quality loss when converting HEIC to JPG?", answer: "There's minimal quality loss when converting at high quality settings (90-95%). HEIC images are high-quality, and JPG preserves most of that quality. At 90% quality, the difference is typically imperceptible. The tool allows you to choose the quality setting to balance file size and quality based on your needs." },
      { question: "Can I convert multiple HEIC files at once?", answer: "Currently, you can convert one HEIC file at a time for optimal quality and processing. For batch conversion, process each file separately. The conversion is fast, so processing multiple files doesn't take long." },
      { question: "Will the converted JPG be larger or smaller than the original HEIC?", answer: "The converted JPG will typically be larger than the original HEIC file. HEIC uses more efficient compression, so a 2MB HEIC might become a 3-4MB JPG at high quality. However, JPG offers universal compatibility, which is often worth the larger file size." },
      { question: "Is my privacy protected when converting HEIC files?", answer: "Yes! All conversion happens entirely in your browser. Your HEIC photos are never uploaded to any server - they stay on your device throughout the entire process. This ensures complete privacy and security for your personal photos." }
    ],
    relatedTools: ["jpg-to-png", "jpg-to-webp", "compress-jpg", "resize-image", "remove-exif"]
  },
  "avif-to-jpg": {
    slug: "avif-to-jpg",
    name: "AVIF to JPG Converter",
    shortName: "AVIF to JPG",
    description: "Convert AVIF images to JPG for broader compatibility",
    longDescription: "Convert AVIF images to the universally compatible JPG format. AVIF offers excellent compression but limited support. JPG ensures your images work everywhere.",
    category: "convert",
    icon: "FileImage",
    acceptedTypes: ["image/avif"],
    outputType: "image/jpeg",
    whatItDoes: "This tool converts AVIF images to JPG format. AVIF is a next-generation image format with excellent compression, but support is still growing. JPG ensures maximum compatibility across all platforms and software.",
    whenToUse: "Use this converter when you need to open AVIF images in software that doesn't support the format, share images with others, or ensure compatibility across different platforms and devices.",
    tips: [
      "AVIF support depends on your browser - conversion may not work in older browsers",
      "JPG output ensures universal compatibility for sharing",
      "Adjust quality settings to balance file size and visual quality",
      "Some advanced AVIF features may not transfer to JPG"
    ],
    faq: [
      { question: "What is AVIF format?", answer: "AVIF (AV1 Image File Format) is a modern image format offering superior compression. It's based on the AV1 video codec and provides excellent quality at small file sizes." },
      { question: "Why doesn't AVIF work in my browser?", answer: "AVIF requires a modern browser with specific support. Chrome, Firefox, and Safari support it, but some older browsers don't." },
      { question: "Is there quality loss?", answer: "Some quality may be lost as JPG uses lossy compression. However, at high quality settings, the difference is minimal." },
      { question: "Will this work with all AVIF files?", answer: "Browser support for AVIF decoding varies. If conversion fails, your browser may not support the specific AVIF features used." }
    ],
    relatedTools: ["jpg-to-avif", "jpg-to-webp", "jpg-to-png", "compress-jpg", "resize-image"]
  },
  "bmp-converter": {
    slug: "bmp-converter",
    name: "BMP to JPG/PNG Converter",
    shortName: "BMP Converter",
    description: "Convert BMP to modern formats like JPG and PNG",
    longDescription: "Update your old BMP files to modern, web-friendly formats. Convert BMP to high-quality JPG for smaller file sizes or PNG for lossless quality with transparency support.",
    category: "convert",
    icon: "Image",
    acceptedTypes: ["image/bmp"],
    outputType: "image/jpeg", // Default output, user can switch
    whatItDoes: "This tool converts BMP (Bitmap) images to modern formats like JPG and PNG. BMP files are often large and uncompressed, making them unsuitable for the web. Converting them reduces file size significantly.",
    whenToUse: "Use this tool to modernize legacy BMP images, reduce file sizes for web use, or convert to formats that are more widely supported by modern software and browsers.",
    tips: [
      "Choose JPG for photographs to get the smallest file size",
      "Choose PNG if you need lossless quality or transparency",
      "BMP files are uncompressed and can be very large - conversion saves space",
      "Quality settings apply when converting to JPG output"
    ],
    faq: [
      { question: "Why convert BMP files?", answer: "BMP files are uncompressed and very large. Converting to JPG or PNG drastically reduces file size without significant quality loss." },
      { question: "Which output format should I choose?", answer: "Use JPG for photos to save space. Use PNG for graphics, screenshots, or if you need to preserve exact pixel quality." },
      { question: "Is transparency supported?", answer: "Standard BMPs don't support transparency. If you convert to PNG, you can add transparency later in an editor." },
      { question: "How much space will I save?", answer: "A lot! JPGs can be 90% smaller than BMPs. Even PNGs are typically much smaller due to efficient compression." }
    ],
    relatedTools: ["tiff-to-jpg", "png-to-jpg", "jpg-to-png", "compress-jpg", "resize-image"]
  },
  "tiff-to-jpg": {
    slug: "tiff-to-jpg",
    name: "TIFF to JPG Converter",
    shortName: "TIFF to JPG",
    description: "Convert TIFF images to high-quality JPG format",
    longDescription: "Convert professional TIFF images to standard JPG files. Perfect for making high-resolution scans and print assets web-ready while preserving image details.",
    category: "convert",
    icon: "Image",
    acceptedTypes: ["image/tiff"],
    outputType: "image/jpeg",
    whatItDoes: "This tool converts TIFF (Tagged Image File Format) images to JPG. TIFFs are common in printing and photography but aren't supported by web browsers. This tool makes them viewable on the web.",
    whenToUse: "Use this when you have high-quality scans or professional photos in TIFF format that you need to share online, email, or use on a website.",
    tips: [
      "We process the first page of multi-page TIFFs",
      "High-quality conversion (95%) ensures minimal detail loss",
      "Large TIFF files may take a moment to process in the browser",
      "The output JPG will be much smaller than the original TIFF"
    ],
    faq: [
      { question: "Can it handle multi-page TIFFs?", answer: "Currently, the tool converts the first page of a multi-page TIFF file to a JPG image." },
      { question: "Will I lose image quality?", answer: "TIFF is lossless, while JPG is lossy. However, we use high-quality settings (95%) to ensure the result looks virtually identical." },
      { question: "Why is my TIFF file so big?", answer: "TIFFs store a lot of data for printing. Converting to JPG removes unnecessary print data, making the file much smaller for screen use." },
      { question: "Is it secure?", answer: "Yes, the conversion happens entirely in your browser. Your large TIFF files are never uploaded to a server." }
    ],
    relatedTools: ["bmp-converter", "png-to-jpg", "compress-jpg", "resize-image", "heic-to-jpg"]
  },
  "svg-to-png": {
    slug: "svg-to-png",
    name: "SVG to PNG Converter",
    shortName: "SVG to PNG",
    description: "Rasterize SVG vectors to high-res PNG images",
    longDescription: "Convert scalable SVG vector graphics into portable PNG images. Set your desired resolution and choose between transparent or white backgrounds for the perfect output.",
    category: "convert",
    icon: "Image",
    acceptedTypes: ["image/svg+xml"],
    outputType: "image/png",
    whatItDoes: "This tool rasterizes SVG (Scalable Vector Graphics) files into PNG images. You can specify the output dimensions to get a crisp image at any size.",
    whenToUse: "Use this when you need to use a vector logo or icon in software that doesn't support SVG, or when you need a specific size for social media or app icons.",
    tips: [
      "SVGs can be scaled infinitely - choose a large size for high quality",
      "You can keep the background transparent or fill it with white",
      "Great for converting logos for use in documents or social media",
      "The aspect ratio is preserved automatically"
    ],
    faq: [
      { question: "What is rasterization?", answer: "It's the process of turning mathematical vector paths (SVG) into a grid of pixels (PNG). This makes the image usable in all standard image viewers." },
      { question: "Can I choose the output size?", answer: "Yes! You can specify the width or height, and the tool will scale the vector to match perfectly without blurriness." },
      { question: "Does it support transparency?", answer: "Yes, by default the background is transparent. You can optionally add a white background if needed." },
      { question: "Will animations work?", answer: "No, this tool captures a static snapshot of the SVG. Animated SVGs will be converted to a static PNG." }
    ],
    relatedTools: ["png-to-ico", "png-to-jpg", "resize-image", "base64-image-encoder", "compress-png"]
  },
  "png-to-ico": {
    slug: "png-to-ico",
    name: "PNG to ICO Favicon Generator",
    shortName: "Favicon Generator",
    description: "Create multi-size ICO favicons from PNG images",
    longDescription: "The ultimate favicon generator. Convert a single PNG image into a standard .ico file containing multiple sizes (16x16, 32x32, 48x48, etc.) for full device compatibility.",
    category: "convert",
    icon: "Image",
    acceptedTypes: ["image/png"],
    outputType: "image/x-icon",
    whatItDoes: "This tool takes a PNG image and creates a multi-resolution ICO file. The resulting file contains standard icon sizes (16px to 256px) required for website favicons and desktop shortcuts.",
    whenToUse: "Use this whenever you're launching a new website or app. A proper .ico file ensures your logo looks crisp on browser tabs, bookmarks, and desktop shortcuts.",
    tips: [
      "Start with a square image at least 256x256 pixels",
      "The tool uses high-quality resampling for crisp small icons",
      "One .ico file contains all necessary sizes",
      "Perfect for website favicons (favicon.ico)"
    ],
    faq: [
      { question: "What sizes are included?", answer: "The generated ICO includes 16x16, 32x32, 48x48, 64x64, 128x128, and 256x256 sizes for maximum compatibility." },
      { question: "Why do I need an ICO file?", answer: "Browsers look for favicon.ico to display in tabs and bookmarks. A multi-size ICO ensures it looks good on both low-res and retina screens." },
      { question: "Can I use a non-square image?", answer: "Yes, but it will be centered and resized to fit a square. For best results, crop your image to a square first." },
      { question: "Is the background preserved?", answer: "Yes, transparency in your PNG is preserved in the ICO file." }
    ],
    relatedTools: ["svg-to-png", "resize-image", "base64-image-encoder", "png-to-webp", "crop-image"]
  },
  "webp-to-jpg": {
    slug: "webp-to-jpg",
    name: "WebP to JPG Converter",
    shortName: "WebP to JPG",
    description: "Convert WebP images to standard JPG format",
    longDescription: "Make your WebP images universally compatible by converting them to JPG. Essential for using web images in legacy software or printing services.",
    category: "convert",
    icon: "ArrowRightLeft",
    acceptedTypes: ["image/webp"],
    outputType: "image/jpeg",
    whatItDoes: "This tool converts WebP images to the JPG format. While WebP is great for the web, JPG is the standard for offline viewing, editing, and printing.",
    whenToUse: "Use this when you've downloaded a WebP image but your photo viewer or editor can't open it. Also useful for preparing images for print.",
    tips: [
      "Transparency in WebP will be replaced with a white background",
      "High quality setting (95%) ensures the JPG looks great",
      "Ideal for converting images saved from websites",
      "File size may increase slightly as JPG is less efficient than WebP"
    ],
    faq: [
      { question: "Why convert WebP to JPG?", answer: "Many older image viewers and editors don't support WebP. JPG works on virtually every device and software." },
      { question: "What happens to transparent backgrounds?", answer: "JPG doesn't support transparency. We replace transparent areas with a white background automatically." },
      { question: "Will I lose quality?", answer: "We use a high quality setting (95%) to minimize loss. However, converting from a compressed format like WebP to JPG is technically lossy." },
      { question: "Can I convert back to WebP later?", answer: "Yes, you can use our JPG to WebP tool, but repeated conversions can degrade quality." }
    ],
    relatedTools: ["jpg-to-webp", "webp-to-png", "compress-jpg", "resize-image", "png-to-jpg"]
  },
  "base64-image-encoder": {
    slug: "base64-image-encoder",
    name: "Base64 Image Encoder / Decoder",
    shortName: "Base64 Tool",
    description: "Convert images to Base64 strings and vice versa",
    longDescription: "A developer-focused tool to convert images into Base64 strings for use in CSS/HTML, or decode Base64 strings back into image files. Supports Data URI formatting.",
    category: "convert",
    icon: "Code",
    acceptedTypes: ["image/png", "image/jpeg", "image/webp", "image/svg+xml"],
    outputType: "text/plain",
    whatItDoes: "This tool encodes binary image data into a text-based Base64 string, or decodes such a string back into an image file. It handles Data URIs commonly used in web development.",
    whenToUse: "Use this when you need to embed small images directly into CSS or HTML to reduce HTTP requests. Also useful for debugging Base64 strings found in code.",
    tips: [
      "Great for small icons to reduce website HTTP requests",
      "Includes a 'Copy' button for quick workflow",
      "The decoder handles standard Data URIs automatically",
      "Shows character count and file size estimates"
    ],
    faq: [
      { question: "What is Base64?", answer: "Base64 is a way to represent binary data (like images) as text. This allows images to be embedded directly in code." },
      { question: "Should I use this for all images?", answer: "No. Base64 increases file size by ~33%. Only use it for very small images (like icons) to avoid slowing down your page." },
      { question: "What formats are supported?", answer: "The encoder accepts JPG, PNG, WebP, and SVG. The decoder works with any valid image Base64 string." },
      { question: "Is the output ready for CSS?", answer: "Yes, the output is a Data URI (e.g., data:image/png;base64,...) ready to be pasted into 'background-image' or 'src' attributes." }
    ],
    relatedTools: ["svg-to-png", "png-to-ico", "resize-image", "compress-png", "compress-jpg"]
  },
  "compress-jpg": {
    slug: "compress-jpg",
    name: "Compress JPG",
    shortName: "Compress JPG",
    description: "Reduce JPG file size while maintaining visual quality",
    longDescription: "Compress your JPG images to reduce file size without noticeable quality loss. Perfect for web uploads, email attachments, and saving storage space.",
    category: "compress",
    icon: "Minimize2",
    acceptedTypes: ["image/jpeg"],
    outputType: "image/jpeg",
    whatItDoes: "This tool compresses JPG images by intelligently optimizing the compression quality to reduce file size while preserving visual quality. It uses advanced algorithms to minimize file size without creating noticeable artifacts. The tool provides real-time preview so you can see exactly how the compression affects your image before downloading. Perfect for reducing file sizes for web use, email attachments, social media uploads, or storage optimization while maintaining professional image quality.",
    whenToUse: "Use this compressor when your JPG files are too large for uploading to websites or social media platforms, sending via email (which often has size limits), optimizing website loading speeds, saving cloud storage space, or meeting specific file size requirements for forms or applications. Ideal for photographers, web developers, social media managers, or anyone who needs smaller file sizes without sacrificing too much quality.",
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
      { question: "How much can I reduce the file size with JPG compression?", answer: "Typically 40-80% reduction is possible, depending on the original image quality and the compression setting you choose. High-quality, uncompressed original images compress the most. For example, a 5MB high-quality photo might compress to 1-2MB at 80% quality, while an already compressed 500KB image might only reduce to 400KB." },
      { question: "Will compression affect my image quality?", answer: "Some quality loss occurs with JPG compression, but at 70-85% quality settings, it's often imperceptible to the human eye, especially for photographs. The tool provides a preview so you can see exactly how the compression affects your specific image before downloading. Higher quality settings (85-95%) preserve more detail, while lower settings (60-70%) prioritize file size." },
      { question: "What quality setting should I use for JPG compression?", answer: "80% is an excellent starting point for most uses - it provides significant file size reduction with minimal visible quality loss. Use 90%+ for important images, professional photography, or print. Use 60-70% for thumbnails, previews, or when maximum compression is needed. The preview feature helps you find the perfect balance for your specific image." },
      { question: "Can I compress the same image multiple times?", answer: "Yes, but each compression cycle adds more quality loss. It's always better to start from the original, uncompressed image when possible. If you must compress multiple times, use higher quality settings (85%+) to minimize cumulative quality degradation. For best results, keep your original file and compress it once to your target size." },
      { question: "Is the compression secure and private?", answer: "Yes! All compression happens entirely in your browser. Your images are never uploaded to any server, ensuring complete privacy and security. The compression is instant and works offline once the page is loaded." },
      { question: "Why is my compressed file not much smaller?", answer: "If your original JPG is already heavily compressed (low quality), there's less room for further compression. High-resolution, high-quality originals compress the most. Also, images with lots of detail, noise, or fine textures compress less than smooth, simple images. Try a slightly lower quality setting if you need more compression." }
    ],
    relatedTools: ["compress-png", "jpg-to-webp", "resize-image", "jpg-to-png", "crop-image"]
  },
  "compress-png": {
    slug: "compress-png",
    name: "Compress PNG",
    shortName: "Compress PNG",
    description: "Reduce PNG file size while preserving transparency",
    longDescription: "Compress your PNG images to reduce file size while maintaining transparency and quality. Ideal for web graphics, logos, and images where you need smaller files without losing transparency.",
    category: "compress",
    icon: "Minimize2",
    acceptedTypes: ["image/png"],
    outputType: "image/png",
    whatItDoes: "This tool compresses PNG images to reduce file size while preserving transparency. It optimizes the image data to create smaller files that still maintain good visual quality.",
    whenToUse: "Use this compressor for PNG images that are too large, especially web graphics, logos, icons, and screenshots. Perfect when you need smaller files but must keep transparency.",
    tips: [
      "PNG compression preserves transparency unlike converting to JPG",
      "Results vary based on image content - graphics compress better than photos",
      "For photos, consider converting to JPG for better compression",
      "Some PNGs with many colors may not compress significantly"
    ],
    faq: [
      { question: "Is transparency preserved?", answer: "Yes! PNG compression in this tool maintains full transparency support." },
      { question: "How much compression can I expect?", answer: "Typically 20-50% for graphics. Photos in PNG format may see less compression." },
      { question: "Is PNG compression lossless?", answer: "This tool uses quality-based compression which may reduce some quality. For true lossless, use PNG optimization tools." },
      { question: "When should I use PNG vs JPG?", answer: "Use PNG when you need transparency or have graphics/text. Use JPG for photographs where smaller size matters more." }
    ],
    relatedTools: ["compress-jpg", "png-to-webp", "png-to-jpg", "resize-image", "crop-image"]
  },
  "resize-image": {
    slug: "resize-image",
    name: "Resize Image",
    shortName: "Resize Image",
    description: "Change image dimensions while maintaining aspect ratio",
    longDescription: "Resize your images to specific dimensions. Whether you need to make images smaller for web use or larger for printing, this tool handles all common image formats with aspect ratio preservation.",
    category: "edit",
    icon: "Maximize2",
    acceptedTypes: ["image/jpeg", "image/png", "image/webp"],
    outputType: "same",
    whatItDoes: "This tool resizes images to your specified dimensions. You can set exact width and height, or use the aspect ratio lock to maintain proportions while changing one dimension.",
    whenToUse: "Use this tool when you need images at specific sizes for social media, websites, printing, or any purpose with size requirements. Great for creating thumbnails, profile pictures, or standardizing image dimensions.",
    tips: [
      "Enable 'Maintain aspect ratio' to prevent distortion",
      "Enlarging images significantly may result in blurriness",
      "Common social media sizes: Instagram (1080x1080), Facebook (1200x630), Twitter (1200x675)",
      "For web use, smaller dimensions mean faster loading times"
    ],
    faq: [
      { question: "Will resizing affect image quality?", answer: "Reducing size generally maintains quality. Enlarging can cause blurriness as the tool must create new pixels." },
      { question: "What does 'maintain aspect ratio' do?", answer: "It keeps the image proportions. When you change width, height adjusts automatically (and vice versa) to prevent stretching." },
      { question: "What's the maximum size I can resize to?", answer: "There's no hard limit, but very large sizes may affect browser performance and image quality when enlarging." },
      { question: "Can I resize to exact dimensions?", answer: "Yes! Disable 'maintain aspect ratio' to set exact width and height, though this may stretch or squash the image." }
    ],
    relatedTools: ["crop-image", "compress-jpg", "compress-png", "jpg-to-png", "png-to-webp"]
  },
  "crop-image": {
    slug: "crop-image",
    name: "Crop Image",
    shortName: "Crop Image",
    description: "Crop images to remove unwanted areas or fit specific ratios",
    longDescription: "Crop your images to focus on what matters. Remove unwanted areas, fit specific aspect ratios for social media, or create perfectly framed compositions.",
    category: "edit",
    icon: "Crop",
    acceptedTypes: ["image/jpeg", "image/png", "image/webp"],
    outputType: "same",
    whatItDoes: "This tool lets you crop images by selecting the area you want to keep. Choose from preset aspect ratios for social media platforms or create custom crops for your specific needs.",
    whenToUse: "Use this tool to remove unwanted parts of an image, fit specific aspect ratios for social media posts, create profile pictures, or focus on a particular subject in your photo.",
    tips: [
      "Use preset ratios for consistent social media posts",
      "The rule of thirds can help create better compositions",
      "Cropping removes pixels permanently - keep your original file",
      "Square crops (1:1) work great for profile pictures"
    ],
    faq: [
      { question: "What aspect ratios are available?", answer: "Common ratios include 1:1 (square), 4:3, 16:9, 9:16 (stories), and free-form for custom crops." },
      { question: "Can I undo a crop?", answer: "Once downloaded, the crop is permanent. Keep your original file if you might need different crops later." },
      { question: "Does cropping reduce quality?", answer: "Cropping removes pixels but doesn't compress the remaining image. Quality of the kept area is preserved." },
      { question: "Can I crop to exact pixel dimensions?", answer: "You can crop to aspect ratios, then use the resize tool for exact pixel dimensions." }
    ],
    relatedTools: ["resize-image", "compress-jpg", "compress-png", "jpg-to-png", "remove-exif"]
  },
  "remove-exif": {
    slug: "remove-exif",
    name: "Remove EXIF Data",
    shortName: "Remove EXIF",
    description: "Strip metadata from images for privacy protection",
    longDescription: "Remove EXIF metadata from your images to protect your privacy. EXIF data can include your location, camera settings, date/time, and other personal information you may not want to share.",
    category: "privacy",
    icon: "ShieldOff",
    acceptedTypes: ["image/jpeg", "image/png", "image/webp"],
    outputType: "same",
    whatItDoes: "This tool removes EXIF metadata from images. EXIF (Exchangeable Image File Format) data is embedded in photos by cameras and phones, containing information like GPS location, date, device model, and camera settings.",
    whenToUse: "Use this tool before sharing photos online to protect your privacy. Especially important for images taken with smartphones that may contain location data you don't want to share publicly.",
    tips: [
      "Always remove EXIF from images before sharing online for privacy",
      "Check the metadata preview to see what information is being removed",
      "GPS coordinates in EXIF can reveal your exact location",
      "Some platforms strip EXIF automatically, but many don't"
    ],
    faq: [
      { question: "What information is in EXIF data?", answer: "EXIF can include: GPS location, date/time, camera model, lens info, exposure settings, software used, and sometimes even your name." },
      { question: "Why should I remove EXIF data?", answer: "To protect privacy. Location data can reveal where you live or work. Other data can be used for tracking or profiling." },
      { question: "Does removing EXIF affect image quality?", answer: "No, EXIF removal doesn't change the actual image pixels. Your photo will look identical." },
      { question: "Is EXIF data always present?", answer: "Most camera and phone photos have EXIF. Screenshots and graphics typically don't. The tool will show what metadata is found." }
    ],
    relatedTools: ["compress-jpg", "compress-png", "resize-image", "crop-image", "jpg-to-png"]
  },
  "smart-optimizer": {
    slug: "smart-optimizer",
    name: "Smart Image Optimizer",
    shortName: "Smart Optimizer",
    description: "Iteratively compresses images to a target file size (KB)",
    longDescription: "Intelligently compresses your images to reach a specific target file size (KB) while maintaining the highest possible quality. Perfect for meeting strict upload requirements.",
    category: "compress",
    icon: "Gauge",
    acceptedTypes: ["image/jpeg", "image/png", "image/webp"],
    outputType: "same",
    whatItDoes: "This tool iteratively compresses your image to find the highest quality setting that results in a file size under your specified limit.",
    whenToUse: "Use this when you have a strict file size limit (e.g., 'maximum 50KB') for upload forms, email attachments, or performance budgets.",
    tips: [
      "Set your target size slightly below the absolute limit",
      "The tool finds the best balance between size and quality",
      "Works with JPG, PNG, and WebP formats",
      "Lower target sizes will result in lower image quality"
    ],
    faq: [
      { question: "How does it work?", answer: "It uses a binary search algorithm to try different compression levels until it finds the highest quality that fits your size target." },
      { question: "Will it always reach the target size?", answer: "It will try its best. If an image cannot be compressed to the target size even at lowest quality, it will provide the smallest possible result." },
      { question: "Does it resize the image?", answer: "No, this tool only adjusts compression quality. Use the Resize tool if you need to change dimensions." },
      { question: "Is it secure?", answer: "Yes, all processing happens in your browser. Your images are never uploaded." }
    ],
    relatedTools: ["compress-jpg", "compress-png", "resize-image", "bulk-compressor"]
  },
  "instagram-image-resizer": {
    slug: "instagram-image-resizer",
    name: "Instagram Image Resizer",
    shortName: "Instagram",
    description: "Resize and crop images for Instagram Posts, Stories, and Reels",
    longDescription: "The best tool to resize, crop, and optimize images for Instagram. Supports all formats: Square (1:1), Portrait (4:5), Landscape (1.91:1), and Story (9:16). Ensures your photos look sharp and professional.",
    category: "social",
    icon: "Instagram",
    acceptedTypes: ["image/jpeg", "image/png", "image/webp"],
    outputType: "image/jpeg",
    whatItDoes: "Resizes your photos to the exact dimensions recommended by Instagram to avoid automatic compression and quality loss. It helps you crop images to fit perfectly in the feed or stories.",
    whenToUse: "Use this before posting to Instagram to ensure your photos look sharp and aren't cropped unexpectedly. Essential for professional photographers and social media managers.",
    tips: [
      "Use 4:5 aspect ratio (1080x1350) for maximum screen real estate in the feed",
      "Stories and Reels should be 1080x1920 pixels (9:16)",
      "Square posts (1080x1080) are classic but take up less space than portrait",
      "We apply high-quality sharpening automatically to prevent blurriness"
    ],
    faq: [
      { question: "What is the best size for Instagram posts?", answer: "For posts, 1080x1350 (4:5) is best as it takes up the most vertical space. 1080x1080 (1:1) is also standard." },
      { question: "What size should Instagram Stories be?", answer: "Instagram Stories and Reels should be 1080x1920 pixels (9:16 aspect ratio)." },
      { question: "Does this tool reduce quality?", answer: "No, it optimizes the image to prevent Instagram's servers from aggressively compressing it, often resulting in BETTER quality." },
      { question: "Can I resize for profile pictures?", answer: "Yes, use the Square (1:1) preset. Instagram profile pictures are circular, so keep important details in the center." }
    ],
    relatedTools: ["tiktok-image-resizer", "crop-image", "smart-optimizer"]
  },
  "tiktok-image-resizer": {
    slug: "tiktok-image-resizer",
    name: "TikTok Image Resizer",
    shortName: "TikTok",
    description: "Create perfect TikTok video covers and photo mode slides",
    longDescription: "Resize images for TikTok Video Covers, Profile Pictures, and Photo Mode. Ensures your content looks professional and isn't cut off by the UI overlay.",
    category: "social",
    icon: "Music2",
    acceptedTypes: ["image/jpeg", "image/png", "image/webp"],
    outputType: "image/jpeg",
    whatItDoes: "Crops and resizes images to TikTok's 9:16 vertical format or 1:1 profile format. It helps you prepare custom covers and photo slides that fit perfectly.",
    whenToUse: "Use this when creating custom thumbnails/covers for your TikToks, updating your profile picture, or creating a photo mode carousel.",
    tips: [
      "TikTok covers should be 1080x1920 pixels (9:16)",
      "Keep important text in the center to avoid being covered by buttons/captions",
      "Photo Mode images also work best in 9:16 vertical format",
      "Profile pictures should be 1:1 square (min 200x200)"
    ],
    faq: [
      { question: "What size is a TikTok video cover?", answer: "1080x1920 pixels (9:16 aspect ratio) is the standard size for TikTok covers." },
      { question: "Can I resize for Photo Mode?", answer: "Yes! Use the 9:16 Vertical preset. This ensures your photos take up the full screen in TikTok's photo carousel." },
      { question: "Why is my profile picture blurry?", answer: "Make sure your source image is at least 200x200 pixels. Our tool helps you crop it to a perfect square first." },
      { question: "Where is the 'safe zone'?", answer: "The center of the screen. The bottom and right sides are often covered by the caption and like/share buttons." }
    ],
    relatedTools: ["instagram-image-resizer", "youtube-thumbnail-resizer"]
  },
  "youtube-thumbnail-resizer": {
    slug: "youtube-thumbnail-resizer",
    name: "YouTube Thumbnail Resizer",
    shortName: "YouTube",
    description: "Make your YouTube thumbnails pop in HD",
    longDescription: "Resize and format images for YouTube Thumbnails (1280x720). Ensures your thumbnail meets the 2MB limit and looks crisp on all devices.",
    category: "social",
    icon: "Youtube",
    acceptedTypes: ["image/jpeg", "image/png", "image/webp"],
    outputType: "image/jpeg",
    whatItDoes: "Resizes images to 1280x720 (16:9) and optimizes file size for YouTube. It ensures your thumbnail isn't rejected for being too large or too small.",
    whenToUse: "Always use this before uploading a video thumbnail to ensure it meets YouTube's requirements (under 2MB) and looks high-quality.",
    tips: [
      "Standard YouTube thumbnail size is 1280x720 pixels (16:9)",
      "Use high-contrast images and large text for better CTR",
      "Keep main subjects away from the bottom-right corner (timestamp overlay)",
      "We automatically optimize file size to stay under the 2MB limit"
    ],
    faq: [
      { question: "What is the best size for YouTube thumbnails?", answer: "1280x720 pixels is the standard HD size recommended by YouTube." },
      { question: "Why is my thumbnail rejected?", answer: "It might be larger than 2MB. Our tool automatically compresses it to fit within this limit." },
      { question: "Should I use JPG or PNG?", answer: "JPG is usually better for keeping file size down, but PNG is good for graphics. We support both." },
      { question: "Can I resize for channel art?", answer: "Yes, use the 'Channel Art' preset (2560x1440) to ensure your banner looks good on TV, desktop, and mobile." }
    ],
    relatedTools: ["exact-pixel-resizer", "smart-optimizer"]
  },
  "twitter-image-resizer": {
    slug: "twitter-image-resizer",
    name: "X (Twitter) Image Resizer",
    shortName: "X / Twitter",
    description: "Optimize images for X/Twitter posts and headers",
    longDescription: "Format images for X (Twitter) posts, headers, and profile pictures. Avoids awkward cropping in the timeline and ensures your profile looks professional.",
    category: "social",
    icon: "Twitter",
    acceptedTypes: ["image/jpeg", "image/png", "image/webp"],
    outputType: "image/jpeg",
    whatItDoes: "Resizes images to X/Twitter's recommended dimensions for in-stream previews, headers, and profile pictures.",
    whenToUse: "Use this before tweeting images to ensure they display fully in the timeline, or when updating your profile branding.",
    tips: [
      "Standard in-stream posts look best at 16:9 (1600x900)",
      "Header images are 1500x500 pixels - keep key info in the center",
      "Profile pictures are circular, but upload a 400x400 square",
      "Tall images (3:4) now work better on mobile, but 16:9 is safest for desktop"
    ],
    faq: [
      { question: "Does Twitter crop images?", answer: "It used to strictly crop to 16:9, but now supports taller images on mobile. However, 16:9 is still the safest bet for consistent display across all devices." },
      { question: "What is the best size for a header?", answer: "1500x500 pixels. Note that parts of the top and bottom may be cropped on different screen sizes." },
      { question: "Can I upload PNGs?", answer: "Yes, PNGs are supported and great for graphics. For photos, JPG is recommended for smaller file sizes." },
      { question: "What is the max file size?", answer: "Twitter supports up to 5MB for photos on mobile and 15MB on web. We optimize your image to stay well within these limits." }
    ],
    relatedTools: ["linkedin-image-resizer", "aspect-ratio-converter"]
  },
  "linkedin-image-resizer": {
    slug: "linkedin-image-resizer",
    name: "LinkedIn Image Resizer",
    shortName: "LinkedIn",
    description: "Professional image sizing for LinkedIn posts and banners",
    longDescription: "Resize images for LinkedIn posts, articles, and personal/company banners. Maintain a professional look with correct dimensions and avoid blurry or cropped images.",
    category: "social",
    icon: "Linkedin",
    acceptedTypes: ["image/jpeg", "image/png", "image/webp"],
    outputType: "image/jpeg",
    whatItDoes: "Adapts your images to LinkedIn's professional layout requirements. It ensures your posts, articles, and profile images look sharp and credible.",
    whenToUse: "Use this for company updates, profile background banners, shared articles, and professional headshots.",
    tips: [
      "Standard link posts look best at 1200x627 pixels",
      "Personal profile banners should be 1584x396 pixels",
      "Company page banners are slightly different: 1128x191 pixels",
      "Square images (1200x1200) are becoming popular for engagement"
    ],
    faq: [
      { question: "What is the best size for a LinkedIn post?", answer: "1200x627 pixels is standard for link shares. For image-only posts, 1200x1200 (Square) or 1080x1350 (Portrait) works well." },
      { question: "Why is my banner blurry?", answer: "Banners are often stretched. Ensure you upload at least 1584x396 for personal profiles to maintain quality." },
      { question: "Can I use this for my profile picture?", answer: "Yes, use the Profile Picture preset (400x400) to get a perfect square ready for upload." },
      { question: "Does LinkedIn compress images?", answer: "Yes, heavily. Our tool optimizes the image before upload to minimize the quality loss from LinkedIn's compression." }
    ],
    relatedTools: ["twitter-image-resizer", "exact-pixel-resizer"]
  },
  "aspect-ratio-converter": {
    slug: "aspect-ratio-converter",
    name: "Aspect Ratio Converter",
    shortName: "Ratio Convert",
    description: "Change image aspect ratio (16:9, 1:1, 4:5) without distortion",
    longDescription: "Easily convert images to any standard aspect ratio like 16:9, 4:3, or 1:1. Choose between 'Cover' mode to crop and fill the frame, or 'Contain' mode to add background bars (letterboxing) and preserve the entire image.",
    category: "edit",
    icon: "Ratio",
    acceptedTypes: ["image/jpeg", "image/png", "image/webp"],
    outputType: "image/jpeg",
    whatItDoes: "This tool changes the proportional relationship between your image's width and height. It can either crop your image to fit a new shape (like turning a landscape photo into a square) or add background bars to fit the shape without losing any part of the image.",
    whenToUse: "Use this when you need your image to fit a specific shape container—like a TV screen (16:9), a standard print (4:6), or a social media feed—but don't have a strict requirement for the exact pixel count.",
    tips: [
      "Use 'Cover' mode if you want the image to fill the entire space (some parts will be cropped)",
      "Use 'Contain' mode if you need to show the whole image (bars will be added)",
      "Common ratios: 16:9 (Video), 1:1 (Square), 4:5 (Portrait), 9:16 (Stories)",
      "We automatically center the image for the best composition"
    ],
    faq: [
      { question: "What is aspect ratio?", answer: "Aspect ratio is the ratio of the width to the height of an image. For example, 16:9 means for every 16 units of width, there are 9 units of height." },
      { question: "Will my image be stretched?", answer: "No. We never stretch your images. We either crop them ('Cover') or add background bars ('Contain') to fit the new ratio." },
      { question: "What color are the background bars?", answer: "In 'Contain' mode, you can choose between white, black, or transparent (for PNG/WebP) backgrounds." },
      { question: "Can I use custom ratios?", answer: "This tool focuses on standard presets. For custom dimensions, use the Exact Pixel Resizer." }
    ],
    relatedTools: ["exact-pixel-resizer", "crop-image", "resize-image"]
  },
  "resize-image-to-exact-pixels": {
    slug: "resize-image-to-exact-pixels",
    name: "Exact Pixel Resizer",
    shortName: "Pixel Resize",
    description: "Resize image to specific width and height (e.g. 1920x1080)",
    longDescription: "Force an image to an exact pixel size (e.g., 1200x628). Perfect for strict submission requirements like ad banners, government forms, or specific website headers. Includes options to crop, letterbox, or stretch.",
    category: "edit",
    icon: "Maximize",
    acceptedTypes: ["image/jpeg", "image/png", "image/webp"],
    outputType: "image/jpeg",
    whatItDoes: "This tool resizes your image to the exact width and height numbers you enter. Unlike standard resizing, it gives you control over how the image fits into those new dimensions: crop to fill, fit inside with bars, or stretch.",
    whenToUse: "Use this when a platform or form explicitly states 'Image must be exactly X by Y pixels'. Common for display ads, app store screenshots, and passport photo uploads.",
    tips: [
      "Check if the requirement allows for 'Letterboxing' (adding bars) before using Contain mode",
      "'Cover' mode is usually best for banners to avoid empty space",
      "Avoid 'Stretch' unless specifically required, as it distorts the image",
      "Use high quality settings to prevent pixelation when resizing up"
    ],
    faq: [
      { question: "Will my image look distorted?", answer: "Only if you choose 'Stretch' mode. 'Cover' mode crops the image to fit, and 'Contain' mode adds background bars to preserve proportions." },
      { question: "What if I don't know the exact pixels?", answer: "If you just need a standard shape (like square), try the Aspect Ratio Converter instead." },
      { question: "Does this change the file size (MB)?", answer: "Yes, changing dimensions affects file size. Smaller dimensions usually mean a smaller file size." },
      { question: "Can I change the DPI?", answer: "This tool changes pixel dimensions (screen resolution). DPI is a print setting and doesn't affect how the image looks on screens." }
    ],
    relatedTools: ["aspect-ratio-converter", "compress-jpg", "crop-image"]
  },
  "website-optimizer": {
    slug: "website-optimizer",
    name: "Website Image Optimizer",
    shortName: "Web Optimizer",
    description: "Auto-convert to WebP, resize, and generate HTML snippets",
    longDescription: "The all-in-one tool for web developers. Upload an image to automatically convert it to WebP, resize it for web standards, and get a ready-to-use <img> snippet.",
    category: "compress",
    icon: "Layout",
    acceptedTypes: ["image/jpeg", "image/png", "image/webp", "image/avif"],
    outputType: "image/webp",
    whatItDoes: "This tool streamlines the workflow for adding images to websites. It converts to WebP (best for web), optimizes file size, and generates the HTML code you need.",
    whenToUse: "Use this whenever you're adding images to a website. It ensures you're using modern formats and correct sizing for optimal page load speed.",
    tips: [
      "WebP is supported by all modern browsers",
      "The tool generates a responsive <img> tag",
      "You get both the optimized image and the code",
      "Helps improve your Core Web Vitals scores"
    ],
    faq: [
      { question: "Why WebP?", answer: "WebP offers superior compression and quality for the web compared to JPG and PNG." },
      { question: "What does the code snippet do?", answer: "It provides a standard HTML <img> tag with width, height, and alt attributes ready for your project." },
      { question: "Can I use this for background images?", answer: "Yes, just use the downloaded image file in your CSS." },
      { question: "Is it better than manual optimization?", answer: "It's faster and follows best practices automatically." }
    ],
    relatedTools: ["smart-optimizer", "jpg-to-webp", "png-to-webp", "resize-image", "bulk-compressor"]
  },
  "bulk-compressor": {
    slug: "bulk-compressor",
    name: "Bulk Image Compression",
    shortName: "Bulk Compress",
    description: "Compress multiple images at once locally",
    longDescription: "Batch compress up to 30 images simultaneously right in your browser. Download all optimized images as a single ZIP file. Fast, free, and private.",
    category: "compress",
    icon: "Layers",
    acceptedTypes: ["image/jpeg", "image/png", "image/webp"],
    outputType: "same",
    whatItDoes: "This tool allows you to select multiple images and compress them all in one go. It processes everything on your device and bundles the results into a ZIP file.",
    whenToUse: "Use this when you have a folder of photos to optimize and don't want to process them one by one. Great for photographers and archiving.",
    tips: [
      "You can drag and drop multiple files at once",
      "Processing happens in parallel for speed",
      "Download all results in one convenient ZIP package",
      "No data is uploaded - it's all local"
    ],
    faq: [
      { question: "How many images can I process?", answer: "We recommend up to 30 images at a time for optimal browser performance." },
      { question: "Is it slower than single image tools?", answer: "It might take a moment to process the batch, but it's much faster than doing them one by one." },
      { question: "Do you keep my photos?", answer: "No. Your photos never leave your computer. All processing is client-side." },
      { question: "Can I mix different formats?", answer: "Yes, you can upload JPGs, PNGs, and WebPs together in the same batch." }
    ],
    relatedTools: ["smart-optimizer", "compress-jpg", "compress-png", "website-optimizer"]
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
  return Object.values(toolsConfig)
}

export function getToolBySlug(slug: string): ToolConfig | undefined {
  return toolsConfig[slug]
}
