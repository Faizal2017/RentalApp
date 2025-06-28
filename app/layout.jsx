import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import Authprovider from "@/components/Authprovider";

export const metadata = {
  title: "Rental App",
  description: "A rental application built with Next.js and Tailwind CSS",
};

export default function RootLayout({ children }) {
  return (
    <Authprovider>
      <html lang="en">
        <head />
        <body
          className="min-h-screen bg-gray-100"
          data-new-gr-c-s-check-loaded="14.1241.0"
          data-gr-ext-installed=""
        >
          <Navbar />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </Authprovider>
  );
}
