import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

interface FeaturedCardProps {
  image: string;
  title: string;
  price: string;
  category: string;
}

export function FeaturedCard({ image, title, price, category }: FeaturedCardProps) {
  return (
    <div className="relative group w-[280px] md:w-[350px] flex-shrink-0 cursor-pointer">
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gray-100">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
        
        {/* Floating Add to Cart Button */}
        <button className="absolute bottom-4 right-4 h-12 w-12 bg-white rounded-full flex items-center justify-center shadow-lg translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <ShoppingBag className="w-5 h-5" />
        </button>
      </div>

      <div className="mt-4 space-y-1">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{category}</p>
        <div className="flex justify-between items-start">
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            <span className="font-semibold text-gray-900">{price}</span>
        </div>
      </div>
    </div>
  );
}