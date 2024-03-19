import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";
 
export const metadata = {
  title: "VeeClothingCompany",
  description: "Discover our custom clothing services tailored to meet your unique style needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className='relative'>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
