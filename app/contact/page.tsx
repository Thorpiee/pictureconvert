import { Metadata } from 'next'
import { ContactClient } from './contact-client'
import { SITE_URL } from "@/lib/site-url"

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with PictureConvert. Have questions, feedback, or need help? We are here to assist you.',
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: 'Contact Us | PictureConvert',
    description: 'Get in touch with PictureConvert. Have questions, feedback, or need help? We are here to assist you.',
    url: `${SITE_URL}/contact`,
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'PictureConvert',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | PictureConvert',
    description: 'Get in touch with PictureConvert. Have questions, feedback, or need help? We are here to assist you.',
    images: [`${SITE_URL}/og-image.png`],
  },
}

export default function ContactPage() {
  return <ContactClient />
}
