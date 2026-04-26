import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { StaticImageData } from "next/image";

interface CollectionCardProps {
  image: string | StaticImageData;
  title: string;
  subtitle: string;
}

export function CollectionCard({
  image,
  title,
  subtitle,
}: CollectionCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl shadow-xl shadow-gray-500 cursor-pointer">
      <div className="aspect-3/4 w-full relative">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
      </div>
      <div className="absolute bottom-6 left-6 text-white">
        <p className="text-sm font-medium text-gray-200 mb-1">{subtitle}</p>
        <h3 className="text-xl font-bold flex items-center gap-2">{title}</h3>
      </div>
    </div>
  );
}
