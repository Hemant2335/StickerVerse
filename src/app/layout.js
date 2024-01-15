import { Navbar, Footer } from "./components/index";
import "./globals.css";
import StateProvider from "@/context/State";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
            <ToastContainer position="bottom-right"/>
          </div>

          <Footer />
        </StateProvider>
      </body>
    </html>
  );
}
