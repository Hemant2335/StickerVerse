import { Navbar, Footer } from "./components/index";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "react-hot-toast";
import RecoilContextProvider from "./recoilContextProvider";
import { Suspense } from "react";
import Loading from "./components/Loading";
import { images } from "../../next.config.js/index.js";

export const metadata = {
  title: "StickerVerse - All your prints at one place",
  metadataBase: new URL('https://acme.com'),
  description:
    "Our Website is Build to provide the best Quality of Prints which includes printing Posters and Stickers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="../../public/Logo.png" />
      </head>
      <body className="">
        <div className="mx-[5vw]">
          <RecoilContextProvider>
            <Navbar />
            <Suspense fallback={<Loading />} />
            {children}
            <Analytics />
            <SpeedInsights />
            <Toaster />
          </RecoilContextProvider>
        </div>
        <Footer />
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </body>
    </html>
  );
}
