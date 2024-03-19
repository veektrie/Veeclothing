import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";


 
export const metadata = {
  title: "Bespoke Tailoring | Vee Clothing Company - Premium Fit & Style",
  description: "Luxurious Minimalist Kaftans | Modern, Effortless Style | Vee Clothing Company |Discover expertly crafted suits with contemporary cuts.Elevate your look with our selection of premium fabrics and personalized tailoring.| Make a lasting impression with our custom corporate branding solutions.Elevate your company's image with apparel, promotional items, and expert design."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      
      {/* Rest of your Kaftans page content */}
    
      <body className='relative'>
        
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
