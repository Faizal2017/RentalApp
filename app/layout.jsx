import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
export const metadata = {
  title: "Rental App",
  description: "A rental application built with Next.js and Tailwind CSS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className="min-h-screen bg-gray-100">
        <Navbar />
        <main>{children}</main>
        <Footer/>

      </body>
    </html>
  );
}
