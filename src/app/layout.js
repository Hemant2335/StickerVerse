import { Navbar, Footer } from "./components/index";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from "react-hot-toast";
import RecoilContextProvider from "./recoilContextProvider";
import { Suspense } from "react";
import Loading from "./components/Loading";

export const metadata = {
  title: "StickerVerse",
  description: "All your prints at one place",
};    

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
            <div className="m-[5vh]">
            <RecoilContextProvider>
              <Navbar />
              <Suspense fallback = {<Loading/>}/>
              {children}
              <Analytics />
              <SpeedInsights />
              <Toaster />
            </RecoilContextProvider>
            </div>
            <Footer />
      </body>
    </html>
  );
}
