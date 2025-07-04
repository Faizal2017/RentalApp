import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import Authprovider from "@/components/Authprovider";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: "Rental App",
  description: "A rental application built with Next.js and Tailwind CSS",
};

export default function RootLayout({ children }) {
  return (
    <Authprovider>
      <html lang="en">
        <head />
        <body suppressHydrationWarning={true}>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ToastContainer/>
        </body>
      </html>
    </Authprovider>
  );
}
