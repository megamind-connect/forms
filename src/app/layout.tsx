import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { redHatDisplay } from "@/utils/fonts/font";
import { Toaster } from "react-hot-toast";


export const metadata: Metadata = {
  title: {
    default: "Megamind Forms Portal",
    template: "%s | Megamind Forms Portal",
  },
  description:
    "Megamind Forms Portal provides secure and streamlined access for employees and managers to submit, review, and manage organizational forms and requests.",
  keywords: [
    "Megamind Forms",
    "Employee Portal",
    "Manager Dashboard",
    "Internal Forms",
    "Document Workflow",
    "Request Management",
  ],

  openGraph: {
    title: "Megamind Forms Portal",
    description:
      "A secure internal platform for employees and managers to submit and manage organizational forms.",
    url: "https://forms.megamind.studio", // or your deployed URL
    siteName: "Megamind Forms Portal",
    images: [
      {
        url: "/icon.png", // Add your internal OG image, else use a placeholder
        width: 1200,
        height: 630,
        alt: "Megamind Forms Portal Dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Megamind Forms Portal",
    description:
      "Secure internal portal for form submission, approvals, and workflow tracking.",
    images: ["/og-forms.png"],
  },

  icons: {
    icon: "/icon.png", // replace with your system icon
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  manifest: "/site.webmanifest",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${redHatDisplay.variable} antialiased font-redhat`}
      >
          <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}
