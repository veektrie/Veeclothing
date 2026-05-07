'use client';

import React, { useState, useEffect } from 'react';
import { useCartStore } from '@/store/useCartStore';
import Link from 'next/link';
import { ArrowLeft, Lock, ArrowRight, Loader2, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
    const { items, clearCart, hasGiftPackaging } = useCartStore();
    const [isMounted, setIsMounted] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    
    // Calculations
    const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    const giftPackagingPrice = hasGiftPackaging ? 15000 : 0;
    const total = subtotal + giftPackagingPrice;

    // Form State
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        city: '',
        state: '',
    });

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.phone || !formData.address || !formData.firstName) {
            toast.error("Please fill in all required shipping details.");
            return;
        }

        if (!termsAccepted) {
            toast.error("Please accept the Terms and Conditions to proceed.");
            return;
        }
        setIsProcessing(true);

        try {
            const orderData = {
                customerName: `${formData.firstName} ${formData.lastName}`.trim(),
                phoneNumber: formData.phone,
                address: `${formData.address}, ${formData.state}`,
                city: formData.city,
                giftPackaging: hasGiftPackaging,
                items: items.map((item) => ({
                    _key: Math.random().toString(36).substring(7),
                    productName: item.name,
                    quantity: item.quantity,
                    size: item.size || null,
                    color: item.color || null,
                    monogram: item.monogramText || null,
                    price: item.price,
                    productImage: item.image,
                })),
                totalPrice: total,
            };

            const response = await fetch("/api/order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderData),
            });

            const result = await response.json();

            if (result.success) {
                const orderLink = `${window.location.origin}/order/${result.orderId}`;
                const message = `Hello Vee Clothing! I've placed a new commission.\n\nOrder ID: ${result.orderId}\n\nView Details: ${orderLink}`;

                clearCart();
                const whatsappNumber = "2348103031020";
                const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

                window.location.href = whatsappUrl;
            } else {
                throw new Error(result.error || "Failed to save order.");
            }
        } catch (error) {
            console.error("Checkout error:", error);
            toast.error("Transaction failed. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    if (items.length === 0 && !isProcessing) {
        return (
            <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-black/5">
                    <Lock className="w-8 h-8 text-[#1A5276]/20" />
                </div>
                <h1 style={{ fontFamily: 'Inter, sans-serif' }} className="text-2xl font-bold text-[#1C1C1E] mb-4">Your Commission is Empty</h1>
                <Link href="/shop" className="text-[#1A5276] font-bold text-[10px] tracking-[0.2em] uppercase border-b-2 border-[#1A5276] pb-1 hover:opacity-70 transition-opacity">
                    Return to Shop
                </Link>
            </div>
        );
    }

    return (
        <main className="bg-[#F8FAFC] min-h-screen relative font-sans overflow-x-hidden pt-[clamp(120px,15vh,180px)] pb-24">
            
            <div
                className="fixed inset-0 z-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle at 90% 10%, rgba(26, 82, 118, 0.03) 0%, transparent 40%), radial-gradient(circle at 10% 90%, rgba(16, 185, 129, 0.03) 0%, transparent 40%)',
                }}
            />

            <div className="max-w-[1200px] mx-auto px-[clamp(1.5rem,5vw,4rem)] relative z-20">

                {/* Header */}
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <Link href="/cart" className="inline-flex items-center gap-2 text-[#1A5276] hover:opacity-70 transition-opacity font-bold text-[10px] tracking-[0.2em] uppercase mb-6">
                            <ArrowLeft className="w-3.5 h-3.5" />
                            Back to Selection
                        </Link>
                        <h1 style={{ fontFamily: 'Inter, sans-serif' }} className="text-4xl md:text-5xl font-extrabold text-[#1C1C1E] tracking-tight">Checkout.</h1>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* LEFT: Shipping Form */}
                    <div className="lg:col-span-7 order-2 lg:order-1">
                        <form onSubmit={handleCheckout} className="space-y-6">

                            {/* Contact Information */}
                            <div className="bg-white p-8 rounded-[2rem] border border-black/5 shadow-sm">
                                <h2 style={{ fontFamily: 'Inter, sans-serif' }} className="text-xl font-bold text-[#1C1C1E] mb-8">Personal Details</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] tracking-[0.2em] uppercase text-[#64748b] font-bold mb-2.5 ml-1">First Name</label>
                                        <input
                                            required type="text" name="firstName" value={formData.firstName} onChange={handleInputChange}
                                            className="w-full bg-[#F8FAFC] border border-black/5 rounded-2xl px-5 py-4 text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#1A5276]/10 focus:border-[#1A5276] transition-all"
                                            placeholder="John"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] tracking-[0.2em] uppercase text-[#64748b] font-bold mb-2.5 ml-1">Last Name</label>
                                        <input
                                            required type="text" name="lastName" value={formData.lastName} onChange={handleInputChange}
                                            className="w-full bg-[#F8FAFC] border border-black/5 rounded-2xl px-5 py-4 text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#1A5276]/10 focus:border-[#1A5276] transition-all"
                                            placeholder="Doe"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-[10px] tracking-[0.2em] uppercase text-[#64748b] font-bold mb-2.5 ml-1">Phone Number (WhatsApp)</label>
                                        <input
                                            required type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                                            className="w-full bg-[#F8FAFC] border border-black/5 rounded-2xl px-5 py-4 text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#1A5276]/10 focus:border-[#1A5276] transition-all"
                                            placeholder="+234 ..."
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Delivery Address */}
                            <div className="bg-white p-8 rounded-[2rem] border border-black/5 shadow-sm">
                                <h2 style={{ fontFamily: 'Inter, sans-serif' }} className="text-xl font-bold text-[#1C1C1E] mb-8">Delivery Address</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="block text-[10px] tracking-[0.2em] uppercase text-[#64748b] font-bold mb-2.5 ml-1">Street Address</label>
                                        <input
                                            required type="text" name="address" value={formData.address} onChange={handleInputChange}
                                            className="w-full bg-[#F8FAFC] border border-black/5 rounded-2xl px-5 py-4 text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#1A5276]/10 focus:border-[#1A5276] transition-all"
                                            placeholder="123 Luxury Lane"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] tracking-[0.2em] uppercase text-[#64748b] font-bold mb-2.5 ml-1">City</label>
                                        <input
                                            required type="text" name="city" value={formData.city} onChange={handleInputChange}
                                            className="w-full bg-[#F8FAFC] border border-black/5 rounded-2xl px-5 py-4 text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#1A5276]/10 focus:border-[#1A5276] transition-all"
                                            placeholder="Lagos"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] tracking-[0.2em] uppercase text-[#64748b] font-bold mb-2.5 ml-1">State</label>
                                        <input
                                            required type="text" name="state" value={formData.state} onChange={handleInputChange}
                                            className="w-full bg-[#F8FAFC] border border-black/5 rounded-2xl px-5 py-4 text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#1A5276]/10 focus:border-[#1A5276] transition-all"
                                            placeholder="Lagos State"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-4 bg-white/50 rounded-2xl border border-black/5">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    checked={termsAccepted}
                                    onChange={(e) => setTermsAccepted(e.target.checked)}
                                    className="w-5 h-5 accent-[#1A5276] cursor-pointer"
                                />
                                <label htmlFor="terms" className="text-[13px] text-[#64748b] cursor-pointer font-medium">
                                    I agree to the{" "}
                                    <Link href="/terms-and-conditions" className="text-[#1A5276] font-bold hover:underline" target="_blank">
                                        Terms & Conditions
                                    </Link>
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={isProcessing}
                                className="w-full bg-[#1A5276] text-white py-5 rounded-full text-[11px] tracking-[0.2em] uppercase font-bold transition-all hover:bg-[#154360] hover:shadow-xl hover:shadow-blue-900/10 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Processing Order...
                                    </>
                                ) : (
                                    <>
                                        Confirm Order <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* RIGHT: Order Summary */}
                    <div className="lg:col-span-5 order-1 lg:order-2">
                        <div className="bg-white rounded-[2.5rem] border border-black/5 p-8 shadow-sm sticky top-32">
                            <h3 style={{ fontFamily: 'Inter, sans-serif' }} className="text-xl font-bold text-[#1C1C1E] mb-8 border-b border-black/[0.05] pb-5">
                                Commission Summary
                            </h3>

                            <div className="flex flex-col gap-6 mb-8 max-h-[35vh] overflow-y-auto pr-2 custom-scrollbar">
                                {items.map((item) => (
                                    <div key={`${item.id}-${item.size}-${item.color}-${item.monogramText}`} className="flex gap-4">
                                        <div className="relative w-16 h-20 rounded-xl overflow-hidden bg-[#F8FAFC] shrink-0 border border-black/[0.05]">
                                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                                            <div className="absolute top-0 right-0 bg-[#1A5276] text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-bl-lg">
                                                {item.quantity}
                                            </div>
                                        </div>
                                        <div className="flex-1 flex flex-col justify-center">
                                            <h4 className="text-[#1C1C1E] text-[13px] font-bold mb-1 leading-tight">{item.name}</h4>
                                            <p className="text-[#64748b] text-[9px] uppercase tracking-widest font-bold mb-2">
                                                {item.size && `Size: ${item.size} `}
                                                {item.color && `| Color: ${item.color}`}
                                                {item.monogramText && ` | ID: ${item.monogramText}`}
                                            </p>
                                            <p className="text-[#1A5276] text-[13px] font-bold">
                                                ₦{(item.price * item.quantity).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col gap-4 text-sm font-medium mb-8 border-t border-black/[0.05] pt-8">
                                <div className="flex justify-between items-center text-[#64748b]">
                                    <span>Subtotal</span>
                                    <span className="text-[#1C1C1E]">₦{subtotal.toLocaleString()}</span>
                                </div>
                                {hasGiftPackaging && (
                                    <div className="flex justify-between items-center text-[#D4AF37]">
                                        <span>Gift Packaging</span>
                                        <span className="text-[#D4AF37]">₦15,000</span>
                                    </div>
                                )}
                                <div className="flex justify-between items-center text-[#64748b]">
                                    <span>Delivery</span>
                                    <span className="text-[#1A5276]">Calculating...</span>
                                </div>
                            </div>

                            <div className="border-t border-black/[0.05] pt-6 flex justify-between items-center">
                                <span className="text-[#1C1C1E] text-lg font-bold">Total</span>
                                <span style={{ fontFamily: 'Inter, sans-serif' }} className="text-3xl font-black text-[#1A5276]">
                                    ₦{total.toLocaleString()}
                                </span>
                            </div>
                            
                            <div className="mt-8 flex items-center gap-3 p-4 bg-[#F8FAFC] rounded-2xl border border-black/5">
                                <Lock className="w-4 h-4 text-[#64748b]" />
                                <p className="text-[10px] text-[#64748b] leading-tight font-medium">
                                    Your personal data will be used to process your order and support your experience throughout this website.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}