import { Navbar, Footer } from "./components/index";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Toaster } from "react-hot-toast";
import RecoilContextProvider from "./recoilContextProvider";

export const metadata = {
  title: "ThePrint",
  description: "All your prints at one place",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
            <div className="m-[5vh]">
            <RecoilContextProvider>
              <Navbar />
              {children}
              <SpeedInsights />
              <Toaster />
            </RecoilContextProvider>
            </div>
            <Footer />
      </body>
    </html>
  );
}
