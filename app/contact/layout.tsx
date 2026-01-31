import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with PictureConvert. Have questions, feedback, or need help? We're here to assist you with our free image conversion tools.",
  openGraph: {
    title: "Contact Us | PictureConvert",
    description: "Get in touch with PictureConvert. Have questions, feedback, or need help? We're here to assist you.",
    url: "https://pictureconvert.com/contact",
  },
  alternates: {
    canonical: "https://pictureconvert.com/contact",
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
