"use client";

import React, { useEffect, useState, use } from "react";
import Image from "next/image";
import { client } from "@/lib/sanity";
import { Loader2, CheckCircle2, Printer } from "lucide-react";
import image1 from "@/public/VCC-white.png";

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
      <div className="h-screen flex items-center justify-center bg-[#FDFBF7] dark:bg-zinc-950 transition-colors duration-300">
        <Loader2 className="animate-spin text-[#1A5276] dark:text-[#85c1e9] w-10 h-10" />
      </div>
    );

  if (!order)
    return (
      <div className="h-screen flex flex-col items-center justify-center p-20 text-center font-['Metrophobic'] bg-[#FDFBF7] dark:bg-zinc-950 transition-colors duration-300">
        <h2 className="text-[#1A5276] dark:text-[#85c1e9] text-2xl font-bold">
          Order details not found.
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Please contact The Vinono Brand if you believe this is an error.
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-zinc-950 py-12 px-4 font-['Metrophobic'] transition-colors duration-300 text-gray-900 dark:text-white">
      <div className="max-w-3xl mx-auto bg-white dark:bg-[#111] shadow-2xl rounded-[2rem] overflow-hidden border border-[#1A5276]/5 dark:border-zinc-800">
        {/* HEADER */}
        <div className="bg-black dark:bg-black p-8 text-center text-white border-b border-transparent dark:border-zinc-800">
          <div className="flex justify-center mb-4">
            <Image
              src={image1}
              alt="VINONO"
              width={100}
              height={100}
              className="w-20 h-auto brightness-0 invert"
            />
          </div>
          <CheckCircle2 className="mx-auto w-12 h-12 text-green-600 mb-2" />
          <h1 className="font-['Kento'] text-2xl uppercase tracking-widest">
            Order Confirmed
          </h1>
          <p className="text-sm opacity-80 uppercase tracking-tighter text-gray-300">
            ID: {order._id}
          </p>
        </div>

        <div className="p-8 md:p-12 space-y-8">
          {/* CUSTOMER DETAILS */}
          <section className="grid grid-cols-2 gap-8 border-b border-gray-100 dark:border-zinc-800 pb-8">
            <div>
              <h4 className="uppercase text-xl font-bold mb-2 text-gray-800 dark:text-gray-300">
                Customer
              </h4>
              <p className="font-bold text-xl">{order.customerName}</p>
              <p className="text-xl font-bold">{order.phoneNumber}</p>
            </div>
            <div className="text-right">
              <h4 className="uppercase text-xl font-bold mb-2 text-gray-800 dark:text-gray-300">
                Shipping To
              </h4>
              <p className="text-xl font-bold">{order.address}</p>
              <p className="text-xl font-bold">{order.city}</p>
            </div>
          </section>

          {/* ITEM LISTING */}
          <section>
            <h4 className="text-lg font-bold uppercase mb-6 text-gray-800 dark:text-gray-300">
              Selection Summary
            </h4>
            <div className="space-y-6">
              {order.items.map((item: any) => (
                <div
                  key={item._key}
                  className="flex gap-4 items-center border-b border-gray-50 dark:border-zinc-800/50 pb-6"
                >
                  {/* Product Thumbnail */}
                  <div className="relative w-20 h-24 bg-gray-100 dark:bg-zinc-900 rounded-lg overflow-hidden shrink-0 shadow-sm border border-gray-100 dark:border-zinc-800">
                    {item.productImage ? (
                      <Image
                        src={item.productImage}
                        alt={item.productName}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-zinc-800">
                        <span className="text-[10px] text-gray-500 dark:text-gray-400">
                          No Image
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <p className="font-bold text-lg uppercase leading-tight">
                      {item.productName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest mt-1">
                      Size:{" "}
                      <span className="text-xl font-bold text-gray-900 dark:text-gray-200">
                        {item.size}
                      </span>{" "}
                      | Qty:{" "}
                      <span className="text-xl font-bold text-gray-900 dark:text-gray-200">
                        {item.quantity}
                      </span>
                    </p>
                  </div>

                  {/* Price */}
                  <p className="text-xl font-bold">₦{item.price.toFixed(3)}</p>
                </div>
              ))}
            </div>
          </section>

          {/* TOTALS */}
          <section className="bg-gray-200 dark:bg-zinc-900 p-6 rounded-2xl border border-transparent dark:border-zinc-800">
            <div className="flex justify-between items-center text-xl font-bold">
              <span className="uppercase font-bold text-black dark:text-white">
                Final Estimate
              </span>
              <span className="font-bold text-xl text-black dark:text-white">
                ₦ {order.totalPrice.toFixed(3)}
              </span>
            </div>
          </section>

          {/* PRINT ACTION */}
          <div className="pt-6 flex justify-center">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 text-[#1A5276] dark:text-[#85c1e9] hover:text-[#D4AF37] dark:hover:text-[#D4AF37] transition-colors text-sm uppercase font-bold tracking-widest cursor-pointer"
            >
              <Printer size={18} /> Print for Records
            </button>
          </div>
        </div>
      </div>
      {/* 
      <p className="text-center mt-8 text-xs text-gray-400 dark:text-gray-600 uppercase tracking-[0.3em]">
        @Kels Development
      </p> */}
    </div>
  );
}
