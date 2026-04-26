import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";

// --- 1. Standard Vertical Card (Desktop Grid / Mobile Featured) ---
export function BlogCard({
  post,
  isLarge = false,
}: {
  post: any;
  isLarge?: boolean;
}) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <div
        className={`bg-white shadow-xl rounded-4xl overflow-hidden  hover: transition-all h-full flex flex-col ${isLarge ? "md:flex-row md:gap-8 md:p-0 md:bg-transparent md:shadow-none" : "border border-gray-100"}`}
      >
        {/* Image Container */}
        <div
          className={`relative overflow-hidden shrink-0 ${isLarge ? "aspect-[4/3] md:w-1/2 rounded-[2rem]" : "aspect-[4/3]"}`}
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-orange-500 uppercase tracking-wider">
            {post.category}
          </div>
        </div>

        {/* Content */}
        <div
          className={`flex flex-col flex-1 ${isLarge ? "py-6 md:py-0 md:justify-center" : "p-5"}`}
        >
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
            <span>{post.publishedAt}</span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{post.readTime}</span>
            </div>
          </div>
          <h3
            className={`${isLarge ? "text-2xl md:text-3xl" : "text-lg"} font-bold text-gray-900 mb-3 leading-tight group-hover: transition-colors`}
          >
            {post.title}
          </h3>
          <p className="text-gray-500 line-clamp-2 mb-4 flex-1">
            {post.excerpt}
          </p>

          {isLarge && (
            <div className="flex items-center gap-2 mt-auto">
              <div className="w-8 h-8 rounded-full bg-orange-100 relative overflow-hidden">
                <Image
                  src={post.authorImage}
                  alt="author"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-sm font-medium">{post.author}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

// --- 2. Horizontal Row Card (Mobile List / Desktop Sidebar) ---
export function BlogRowCard({
  post,
  small = false,
}: {
  post: any;
  small?: boolean;
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex gap-4 items-stretch bg-white p-3 rounded-[1rem] border border-gray-100 shadow-xl hover:shadow-md transition-all"
    >
      <div
        className={`relative shrink-0 overflow-hidden rounded-[1rem] ${small ? "w-20 h-20" : "w-24 h-24 md:w-32 md:h-32"}`}
      >
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col justify-center py-1 flex-1 min-w-0">
        {!small && (
          <span className="text-xs text-orange-500 font-bold uppercase tracking-wider mb-1">
            {post.category}
          </span>
        )}
        <h3
          className={`${small ? "text-sm leading-snug" : "text-base md:text-lg"} font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-500 transition-colors`}
        >
          {post.title}
        </h3>
        <div className="flex items-center gap-2 text-xs text-gray-400 mt-auto">
          <span>{post.publishedAt}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>
      </div>
    </Link>
  );
}
