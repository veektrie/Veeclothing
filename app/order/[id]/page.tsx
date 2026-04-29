"use client";

import React, { useEffect, useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/lib/sanity";
import { Loader2, CheckCircle2, Printer, ArrowLeft, Download } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function OrderSummaryPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const orderId = resolvedParams.id;

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "order" && _id == $id][0]`,
          { id: orderId },
        );
        setOrder(data);
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) fetchOrder();
  }, [orderId]);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-[#F8FAFC]">
        <Loader2 className="animate-spin text-[#1A5276] w-10 h-10" />
      </div>
    );

  if (!order)
    return (
      <div className="h-screen flex flex-col items-center justify-center p-6 text-center bg-[#F8FAFC]">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-black/5">
            <CheckCircle2 className="w-8 h-8 text-[#1A5276]/10" />
        </div>
        <h2 style={{ fontFamily: 'Inter, sans-serif' }} className="text-[#1C1C1E] text-2xl font-bold">
          Commission Details Not Found
        </h2>
        <p className="text-[#64748b] mt-3 mb-10 max-w-sm font-medium">
          We couldn't find the details for this commission. Please contact Vee Clothing support.
        </p>
        <Link href="/shop">
            <button className="bg-[#1A5276] text-white px-10 py-4 rounded-full text-[11px] tracking-[0.2em] uppercase font-bold transition-all hover:bg-[#154360]">
                Return to Shop
            </button>
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-20 px-6 font-sans text-[#1C1C1E]">
      
      <div className="max-w-3xl mx-auto">
        
        {/* Back Link */}
        <Link href="/shop" className="inline-flex items-center gap-2 text-[#1A5276] font-bold text-[10px] tracking-[0.2em] uppercase mb-10 hover:opacity-70 transition-opacity">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Shop
        </Link>

        <div className="bg-white shadow-xl shadow-blue-900/5 rounded-[2.5rem] overflow-hidden border border-black/[0.05]">
          
          {/* HEADER */}
          <div className="bg-[#1A5276] p-10 text-center text-white relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, white 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            
            <div className="flex justify-center mb-6">
               <Image
                src="/VCC-white.png"
                alt="Vee Clothing Company"
                width={120}
                height={40}
                className="h-8 w-auto object-contain"
              />
            </div>
            
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            
            <h1 style={{ fontFamily: 'Inter, sans-serif' }} className="text-2xl font-extrabold uppercase tracking-[0.15em] mb-2">
              Commission Confirmed
            </h1>
            <p className="text-[10px] font-bold opacity-60 uppercase tracking-[0.3em]">
              ID: {order._id}
            </p>
          </div>

          <div className="p-8 md:p-12 space-y-12">
            {/* DETAILS GRID */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-10 border-b border-black/[0.05] pb-10">
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#64748b] mb-4">
                  Client Information
                </h4>
                <p className="font-bold text-lg text-[#1C1C1E]">{order.customerName}</p>
                <p className="text-[#64748b] font-medium mt-1">{order.phoneNumber}</p>
              </div>
              <div className="md:text-right">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#64748b] mb-4">
                  Delivery Destination
                </h4>
                <p className="font-bold text-lg text-[#1C1C1E]">{order.address}</p>
                <p className="text-[#64748b] font-medium mt-1">{order.city}</p>
              </div>
            </section>

            {/* SELECTION SUMMARY */}
            <section>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#64748b] mb-8">
                Selection Summary
              </h4>
              <div className="space-y-6">
                {order.items.map((item: any) => (
                  <div
                    key={item._key}
                    className="flex gap-6 items-center border-b border-black/[0.03] pb-6 last:border-0"
                  >
                    {/* Product Thumbnail */}
                    <div className="relative w-20 h-24 bg-[#F8FAFC] rounded-xl overflow-hidden shrink-0 border border-black/[0.05] shadow-sm">
                      {item.productImage ? (
                        <Image
                          src={item.productImage}
                          alt={item.productName}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                           <Loader2 className="w-4 h-4 text-[#1A5276]/20" />
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <p className="font-bold text-base text-[#1C1C1E] leading-tight mb-2">
                        {item.productName}
                      </p>
                      <div className="flex flex-wrap gap-3 items-center">
                          {item.size && (
                             <span className="text-[9px] font-bold uppercase tracking-widest bg-[#F8FAFC] px-2 py-1 rounded border border-black/[0.05] text-[#64748b]">
                                Size: <span className="text-[#1A5276]">{item.size}</span>
                             </span>
                          )}
                          <span className="text-[9px] font-bold uppercase tracking-widest bg-[#F8FAFC] px-2 py-1 rounded border border-black/[0.05] text-[#64748b]">
                            Qty: <span className="text-[#1A5276]">{item.quantity}</span>
                          </span>
                      </div>
                    </div>

                    {/* Price */}
                    <p className="font-bold text-[#1C1C1E]">₦{item.price.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* TOTALS */}
            <section className="bg-[#F8FAFC] p-8 rounded-3xl border border-black/[0.05]">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#64748b]">
                  Final Commission Value
                </span>
                <span style={{ fontFamily: 'Inter, sans-serif' }} className="text-3xl font-black text-[#1A5276]">
                  ₦ {order.totalPrice.toLocaleString()}
                </span>
              </div>
            </section>

            {/* ACTIONS */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-6">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2.5 text-[#1A5276] hover:opacity-70 transition-all text-[10px] uppercase font-bold tracking-[0.15em] bg-white border border-black/[0.08] px-8 py-4 rounded-full shadow-sm"
              >
                <Printer size={14} /> Print Receipt
              </button>
              
              <Link href="/shop" className="text-[#64748b] hover:text-[#1A5276] text-[10px] uppercase font-bold tracking-[0.15em] transition-colors">
                Continue Exploring
              </Link>
            </div>
          </div>
          
          {/* Support Footer */}
          <div className="bg-[#F8FAFC] p-6 text-center border-t border-black/[0.05]">
              <p className="text-[10px] text-[#94a3b8] font-medium leading-relaxed">
                  A representative will contact you shortly to finalize details.<br/>
                  For urgent inquiries, please contact <span className="text-[#1A5276] font-bold">+234 810 303 1020</span>
              </p>
          </div>

        </div>
      </div>
      
    </div>
  );
}
