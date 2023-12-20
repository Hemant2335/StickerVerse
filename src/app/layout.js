import { Navbar , Footer } from "./components/index"
import "./globals.css"

export const metadata = {
  title: 'ThePrint',
  description: 'All your prints at one place',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className=" m-[5vh]">
        <Navbar/>
        {children}
        <Footer/>
        </body>
    </html>
  )
}
