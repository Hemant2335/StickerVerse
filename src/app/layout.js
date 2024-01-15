import { Navbar, Footer } from "./components/index";
import "./globals.css";
import StateProvider from "@/context/State";


export const metadata = {
  title: "ThePrint",
  description: "All your prints at one place",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
        <StateProvider>
          <div className="m-[5vh]">
            <Navbar />
            {children}
          </div>
          
          <Footer />
        </StateProvider>
      </body>
    </html>
  );
}
