export default function Loading() {
    return (
        <main className="bg-[#F8FAFC] min-h-screen relative overflow-x-hidden pt-[clamp(100px,12vh,140px)] pb-24">
            <div className="max-w-[1440px] mx-auto px-[clamp(1rem,5vw,4rem)]">
                {/* Header Skeleton */}
                <div className="flex flex-col items-center justify-center text-center mb-16 relative z-10">
                    <div className="w-32 h-6 bg-black/5 animate-pulse rounded-full mb-6"></div>
                    <div className="w-64 h-12 bg-black/5 animate-pulse rounded-full mb-4"></div>
                    <div className="w-96 h-4 bg-black/5 animate-pulse rounded-full"></div>
                </div>

                {/* Filters Skeleton */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pt-8">
                    <div className="flex gap-3 overflow-x-hidden">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className="w-24 h-10 bg-black/5 animate-pulse rounded-full"></div>
                        ))}
                    </div>
                    <div className="w-full max-w-[300px] h-10 bg-black/5 animate-pulse rounded-full"></div>
                </div>
                
                {/* Grid Skeleton */}
                <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-[clamp(1rem,3vw,2.5rem)] pt-8">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                        <div key={i} className="bg-white rounded-[24px] overflow-hidden border border-black/[0.06] shadow-sm">
                            <div className="aspect-[3/4] bg-black/5 animate-pulse"></div>
                            <div className="p-8 flex flex-col gap-3">
                                <div className="w-3/4 h-6 bg-black/5 animate-pulse rounded-full"></div>
                                <div className="w-full h-4 bg-black/5 animate-pulse rounded-full mt-2"></div>
                                <div className="w-2/3 h-4 bg-black/5 animate-pulse rounded-full mb-4"></div>
                                <div className="flex justify-between items-center mt-auto pt-4 border-t border-black/5">
                                    <div className="w-20 h-6 bg-black/5 animate-pulse rounded-full"></div>
                                    <div className="w-8 h-8 bg-black/5 animate-pulse rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
