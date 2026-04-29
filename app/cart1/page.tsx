// 'use client';

// import React from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useCartStore } from '@/store/useCartStore';
// import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';

// const CartPage = () => {
//   const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();

//   return (
//     <main className="min-h-screen bg-[#FFFFFF] pt-[150px] pb-32">
//       <div className="max-w-[1200px] mx-auto px-6">
//         {/* Header */}
//         <div className="mb-12">
//           <span className="text-[10px] tracking-[0.3em] uppercase text-[#1A5276] font-bold block mb-4">
//             Your Selection
//           </span>
//           <h1 className="font-serif text-[clamp(2.5rem,5vw,4rem)] text-[#1C1C1E] leading-tight font-light">
//             Shopping Cart.
//           </h1>
//         </div>

//         {items.length > 0 ? (
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
//             {/* Items List */}
//             <div className="lg:col-span-2">
//               <div className="flex flex-col gap-8">
//                 <AnimatePresence mode="popLayout">
//                   {items.map((item) => (
//                     <motion.div
//                       key={`${item.id}-${item.size}-${item.color}`}
//                       layout
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, x: -20 }}
//                       className="flex gap-6 pb-8 border-b border-[#1A5276]/10"
//                     >
//                       {/* Image */}
//                       <div className="relative w-24 h-32 bg-[#F8F8F8] rounded-lg overflow-hidden flex-shrink-0">
//                         {item.image && (
//                           <Image
//                             src={item.image}
//                             alt={item.name}
//                             fill
//                             className="object-cover"
//                           />
//                         )}
//                       </div>

//                       {/* Info */}
//                       <div className="flex-1 flex flex-col justify-between">
//                         <div>
//                           <div className="flex justify-between items-start mb-2">
//                             <h3 className="font-serif text-xl text-[#1C1C1E]">{item.name}</h3>
//                             <button 
//                               onClick={() => removeItem(item.id)}
//                               className="text-[#1C1C1E]/30 hover:text-red-500 transition-colors"
//                             >
//                               <Trash2 size={18} />
//                             </button>
//                           </div>
//                           <div className="flex gap-4 text-[11px] text-[#1C1C1E]/50 uppercase tracking-wider mb-4">
//                             {item.size && <span>Size: {item.size}</span>}
//                             {item.color && <span>Color: {item.color}</span>}
//                           </div>
//                         </div>

//                         <div className="flex justify-between items-end">
//                           {/* Quantity Controls */}
//                           <div className="flex items-center gap-4 border border-[#1A5276]/20 rounded-full px-4 py-2">
//                             <button 
//                               onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                               className="text-[#1C1C1E]/50 hover:text-[#1A5276]"
//                             >
//                               <Minus size={14} />
//                             </button>
//                             <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
//                             <button 
//                               onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                               className="text-[#1C1C1E]/50 hover:text-[#1A5276]"
//                             >
//                               <Plus size={14} />
//                             </button>
//                           </div>
//                           <span className="font-serif text-xl text-[#1A5276]">
//                             ₦{(item.price * item.quantity).toLocaleString()}
//                           </span>
//                         </div>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </AnimatePresence>
//               </div>
//             </div>

//             {/* Summary */}
//             <div className="lg:col-span-1">
//               <div className="bg-[#1A5276]/5 p-8 rounded-3xl border border-[#1A5276]/10 sticky top-[120px]">
//                 <h2 className="font-serif text-2xl text-[#1C1C1E] mb-8">Summary</h2>
                
//                 <div className="space-y-4 mb-8">
//                   <div className="flex justify-between text-sm">
//                     <span className="text-[#1C1C1E]/60">Subtotal</span>
//                     <span className="text-[#1C1C1E]">₦{getTotalPrice().toLocaleString()}</span>
//                   </div>
//                   <div className="flex justify-between text-sm">
//                     <span className="text-[#1C1C1E]/60">Shipping</span>
//                     <span className="text-[#27AE60] font-medium">Free</span>
//                   </div>
//                   <div className="pt-4 border-t border-[#1A5276]/10 flex justify-between items-end">
//                     <span className="text-sm font-semibold uppercase tracking-wider text-[#1C1C1E]">Total</span>
//                     <span className="font-serif text-3xl text-[#1A5276]">₦{getTotalPrice().toLocaleString()}</span>
//                   </div>
//                 </div>

//                 <button className="w-full bg-[#1A5276] text-white py-5 rounded-full font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#1A5276]/90 transition-all">
//                   Proceed to Checkout
//                   <ArrowRight size={16} />
//                 </button>

//                 <p className="mt-6 text-[10px] text-[#1C1C1E]/40 text-center leading-relaxed">
//                   Prices include VAT where applicable. Custom duties may apply for international orders.
//                 </p>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="flex flex-col items-center justify-center py-20 text-center">
//             <div className="w-20 h-20 bg-[#1A5276]/5 rounded-full flex items-center justify-center mb-8 text-[#1A5276]/30">
//               <ShoppingBag size={40} />
//             </div>
//             <h2 className="font-serif text-3xl text-[#1C1C1E] mb-4">Your cart is empty</h2>
//             <p className="text-[#1C1C1E]/50 mb-12 max-w-md">
//               Looks like you haven't added any pieces to your selection yet. Explore our latest collections to find your perfect fit.
//             </p>
//             <Link href="/shop">
//               <button className="bg-[#1A5276] text-white px-10 py-5 rounded-full font-bold text-xs uppercase tracking-[0.2em] hover:bg-[#1A5276]/90 transition-all">
//                 Continue Shopping
//               </button>
//             </Link>
//           </div>
//         )}
//       </div>
//     </main>
//   );
// };

// export default CartPage;
