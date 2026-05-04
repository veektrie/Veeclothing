export default function Loading() {
    return (
        <main className="bg-[#F8FAFC] min-h-screen relative font-sans overflow-x-hidden pt-[clamp(100px,12vh,140px)] pb-24">
            <div className="max-w-[1440px] mx-auto px-[clamp(1.5rem,5vw,4rem)] relative z-20">
                {/* Back Button Skeleton */}
                <div className="w-32 h-4 bg-black/5 animate-pulse rounded-full mb-8"></div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                    {/* Left: Image Skeleton */}
                    <div className="relative w-full aspect-[3/4] bg-white rounded-[2rem] overflow-hidden border border-black/[0.05] shadow-sm p-4">
                        <div className="w-full h-full bg-black/5 animate-pulse rounded-[1.5rem]"></div>
                    </div>

                    {/* Right: Details Skeleton */}
                    <div className="flex flex-col py-4 lg:py-8">
                        <div className="w-24 h-4 bg-black/5 animate-pulse rounded-full mb-4"></div>
                        <div className="w-3/4 h-12 bg-black/5 animate-pulse rounded-full mb-4"></div>
                        <div className="w-1/3 h-8 bg-black/5 animate-pulse rounded-full mb-8"></div>
                        
                        <div className="w-full h-4 bg-black/5 animate-pulse rounded-full mb-3"></div>
                        <div className="w-5/6 h-4 bg-black/5 animate-pulse rounded-full mb-3"></div>
                        <div className="w-4/6 h-4 bg-black/5 animate-pulse rounded-full mb-12"></div>

                        {/* Colors Skeleton */}
                        <div className="mb-8">
                            <div className="w-16 h-4 bg-black/5 animate-pulse rounded-full mb-4"></div>
                            <div className="flex gap-3">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-10 h-10 bg-black/5 animate-pulse rounded-full"></div>
                                ))}
                            </div>
                        </div>

                        {/* Sizes Skeleton */}
                        <div className="mb-12">
                            <div className="w-16 h-4 bg-black/5 animate-pulse rounded-full mb-4"></div>
                            <div className="flex gap-3">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <div key={i} className="w-14 h-10 bg-black/5 animate-pulse rounded-lg"></div>
                                ))}
                            </div>
                        </div>

                        {/* Button Skeleton */}
                        <div className="w-full h-16 bg-black/5 animate-pulse rounded-xl"></div>
                    </div>
                </div>
            </div>
        </main>
    );
}
