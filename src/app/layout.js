import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MarketRateTicker from "@/components/MarketRateTicker";

export const metadata = {
  title:
    "কৃষিহাট (KrishiHaat) - প্রান্তিক কৃষক ও ক্রেতার এগ্রি-টেক প্ল্যাটফর্ম",

  icons: {
    icon: "/কৃষিহাট.jpg",
  },

  description:
    "কৃষিহাট হলো বাংলাদেশের প্রান্তিক কৃষক, স্থানীয় সার্ভিস প্রোভাইডার এবং পাইকারি ও খুচরা ক্রেতাদের সরাসরি সংযুক্ত করার ডিজিটাল কৃষি বাজার ও সেবা প্ল্যাটফর্ম।",

  keywords: [
    "কৃষিহাট",
    "KrishiHaat",
    "কৃষি বাজারদর",
    "ফসল বিক্রি",
    "মেকানিক সেবা",
    "বাংলাদেশের কৃষি",
    "কৃষক মার্কেট",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body className="bg-slate-50 text-slate-900 min-h-screen flex flex-col antialiased">
        <MarketRateTicker />
        <Navbar />

        <main className="flex-1">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
