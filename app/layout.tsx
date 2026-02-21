import type { Metadata, Viewport } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Zyra Dashboard",
  description: "OpenClaw Control Center",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0f0f0f",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ro">
      <body className="bg-[#0a0a0a] text-white min-h-screen">
        {children}
      </body>
    </html>
  )
}
