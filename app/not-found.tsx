"use client"; // Required for the 'back' functionality

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Home } from "lucide-react";
// import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFBF7] text-center px-4">
      <h1 className="text-9xl font-black text-gray-200">404</h1>

      <div className="-mt-12 z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Oops! The page you are looking for doesn't exist or has been moved.
        </p>

        {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="h-12 px-8 rounded-full border-2 border-gray-200 hover:bg-gray-100 text-gray-900 font-bold gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>

          <Link href="/">
            <Button className="h-12 px-8 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold gap-2 shadow-lg shadow-orange-200">
              <Home className="w-4 h-4" />
              Go Home
            </Button>
          </Link>
        </div> */}
      </div>

      <Footer />
    </div>
  );
}
