import { Navbar, Footer } from "./components/index";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "react-hot-toast";
import RecoilContextProvider from "./recoilContextProvider";
import { Suspense } from "react";
import Loading from "./components/Loading";
import { GoogleOAuthProvider } from "@react-oauth/google";

export const metadata = {
  title: "StickerVerse - All your prints at one place",
  metadataBase: new URL('https://acme.com'),
  description:
    "Our Website is Build to provide the best Quality of Prints which includes printing Posters and Stickers",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="../../public/Logo.png" />
      </head>
      <GoogleOAuthProvider clientId="551918395782-v17s3h8ts05grojf189484cbm816ivnr.apps.googleusercontent.com">
      <body className="">
        <div className="mx-[5vw] relative">
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
        <script src="https://checkout.razorpay.com/v1/checkout.js" async/>
      </body>
      </GoogleOAuthProvider>
    </html>
  );
}
