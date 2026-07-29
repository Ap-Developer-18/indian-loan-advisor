import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/common/lennis";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Seaone Synergy | Hassle-Free Loans & Financial Solutions",
    template: "%s | Seaone Synergy",
  },
  description:
    "Get low-interest Home Loans, Business Capital, Overdraft (OD/CC), Loan Against Property, NPA & OTS Funding, and Govt Subsidies with fast approval at Seaone Synergy Pvt Ltd.",
  keywords: [
    "Business Loans Faridabad",
    "Home Loan Provider in Faridabad",
    "Loan Against Property Faridabad",
    "Personal Loans Low Interest",
    "Overdraft Limit OD CC Facility",
    "Cash Credit Limit",
    "Project Loan Funding",
    "Govt Subsidy Scheme Loans",
    "NPA and OTS Funding Solutions",
    "Stressed Asset Finance",
    "Bridge Finance India",
    "Seaone Synergy",
    "Seaone Synergy Pvt Ltd",
    "Best Loan Agency in Faridabad",
    "Financial Consultants Ajronda Chowk Faridabad",
    "DSA Partner Faridabad",
    "Low Interest Loans Haryana",
  ],
  authors: [{ name: "Seaone Synergy Pvt Ltd" }],
  creator: "Seaone Synergy Pvt Ltd",
  publisher: "Seaone Synergy Pvt Ltd",
  metadataBase: new URL("https://seaonesynergy.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "Seaone Synergy | Trusted Financial Partner for Business & Home Loans",
    description:
      "Fast approvals, low interest rates, and expert financial assistance. Access top Bank & NBFC loan offers with 100% transparent processing.",
    url: "https://seaonesynergy.com",
    siteName: "Seaone Synergy",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Seaone Synergy | Fast & Hassle-Free Loans",
    description:
      "Get Home Loans, Business Capital, and OD/CC limits with custom repayment plans.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
