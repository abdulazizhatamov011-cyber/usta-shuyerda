import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Manrope } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext", "cyrillic"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ishonchli ustalar bir joyda`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "usta",
    "santexnik",
    "elektrik",
    "ta’mirlash",
    "O‘zbekiston",
    "Toshkent",
    "xizmatlar",
    "UstaTop",
  ],
  openGraph: {
    title: `${site.name} — ishonchli ustalar bir joyda`,
    description: site.description,
    locale: "uz_UZ",
    type: "website",
    siteName: site.name,
  },
};

export const viewport: Viewport = {
  themeColor: "#0e8a85",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="uz"
      className={`${manrope.variable} ${bricolage.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
