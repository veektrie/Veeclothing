export default function Loader() {
  return (
    <div className="flex items-center justify-center h-full min-h-50">
      <div className="relative">
        {/* Outer Ring */}
        <div className="h-12 w-12 rounded-full border-4 border-gray-200"></div>
        {/* Spinning Ring */}
        <div className="absolute top-0 left-0 h-12 w-12 rounded-full border-4 border-t-orange-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
      </div>
    </div>
  );
}
