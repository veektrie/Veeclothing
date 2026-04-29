'use client';

import React, { useState, useEffect } from 'react';
import { useCartStore } from '@/store/useCartStore';
import Link from 'next/link';
import { ArrowLeft, Lock, ArrowRight, Loader2 } from 'lucide-react';
import Image from 'next/image';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
    const { items, clearCart } = useCartStore();
    const [isMounted, setIsMounted] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    // Calculations
    const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    const total = subtotal;

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

        // 1. Final Validation
        if (!formData.phone || !formData.address || !formData.firstName) {
            toast.error("Please fill in all required shipping details.");
            return;
        }

        if (!termsAccepted) {
            alert("Please accept the Terms and Conditions to proceed.");
            return;
        }
        setIsProcessing(true);

        try {
            // 2. Prepare Order Data for Sanity
            const orderData = {
                customerName: `${formData.firstName} ${formData.lastName}`.trim(),
                phoneNumber: formData.phone,
                address: `${formData.address}, ${formData.state}`,
                city: formData.city,
                items: items.map((item) => ({
                    _key: Math.random().toString(36).substring(7),
                    productName: item.name,
                    quantity: item.quantity,
                    size: item.size || null,
                    color: item.color || null,
                    price: item.price,
                    productImage: item.image,
                })),
                totalPrice: total,
            };

            // 3. Call your internal API Route to save to Sanity
            const response = await fetch("/api/order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderData),
            });

            const result = await response.json();

            if (result.success) {
                // 4. Generate Digital Receipt & WhatsApp Link 
                const orderLink = `${window.location.origin}/order/${result.orderId}`;
                const message = `Hello veeClothingCompany! I've placed a new order.\n\n
        Order ID: ${result.orderId} \n\n
        View Details: ${orderLink}`;

                // Clear the cart since the order is placed
                clearCart();

                // Redirect to WhatsApp (using the official number from your backend logic)
                const whatsappNumber = "2348107902179";
                const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

                window.location.href = whatsappUrl;

            } else {
                throw new Error(result.error || "Failed to save order to database.");
            }

        } catch (error) {
            console.error("Checkout error:", error);
            toast.error("Server-side transaction failed. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    if (items.length === 0 && !isProcessing) {
        return (
            <div className="min-h-screen bg-[#08101A] flex flex-col items-center justify-center">
                <h1 className="font-serif text-3xl text-white mb-4">Your Commission is Empty</h1>
                <Link href="/shop" className="text-[#D4AF37] border-b border-[#D4AF37] pb-1 uppercase text-[10px] tracking-widest font-sans font-bold">
                    Return to Archive
                </Link>
            </div>
        );
    }

    return (
        <main className="bg-[#08101A] min-h-screen relative font-sans overflow-x-hidden pt-[clamp(80px,10vh,120px)] pb-24">

            {/* Background Atmosphere */}
            <div
                className="fixed inset-0 z-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle at 80% 20%, rgba(212,175,55,0.05) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(26, 82, 118, 0.1) 0%, transparent 50%)',
                }}
            />

            <div className="max-w-[1200px] mx-auto px-[clamp(1rem,5vw,4rem)] relative z-20">

                {/* Header */}
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <Link href="/shop/cart" className="inline-flex items-center gap-2 text-white/50 hover:text-[#D4AF37] transition-colors font-sans text-[10px] tracking-[0.2em] uppercase font-bold mb-6">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Cart
                        </Link>
                        <h1 className="font-serif text-4xl md:text-5xl text-white">Secure Checkout</h1>
                    </div>
                    <div className="hidden md:flex items-center gap-2 text-white/40 text-[10px] tracking-[0.2em] uppercase">
                        <Lock className="w-3 h-3" />
                        SSL Encrypted
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

                    {/* LEFT: Shipping Form */}
                    <div className="order-2 lg:order-1">
                        <form onSubmit={handleCheckout} className="space-y-8">

                            {/* Contact Information */}
                            <div className="bg-[#111822] p-8 rounded-[2rem] border border-white/[0.02] shadow-xl">
                                <h2 className="font-serif text-2xl text-white mb-6">Contact Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    <div>
                                        <label className="block text-[10px] tracking-[0.2em] uppercase text-white/50 mb-2">First Name</label>
                                        <input
                                            required type="text" name="firstName" value={formData.firstName} onChange={handleInputChange}
                                            className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] tracking-[0.2em] uppercase text-white/50 mb-2">Last Name</label>
                                        <input
                                            required type="text" name="lastName" value={formData.lastName} onChange={handleInputChange}
                                            className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-[10px] tracking-[0.2em] uppercase text-white/50 mb-2">Phone Number (WhatsApp)</label>
                                        <input
                                            required type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                                            className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Delivery Address */}
                            <div className="bg-[#111822] p-8 rounded-[2rem] border border-white/[0.02] shadow-xl">
                                <h2 className="font-serif text-2xl text-white mb-6">Delivery Details</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="block text-[10px] tracking-[0.2em] uppercase text-white/50 mb-2">Street Address</label>
                                        <input
                                            required type="text" name="address" value={formData.address} onChange={handleInputChange}
                                            className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] tracking-[0.2em] uppercase text-white/50 mb-2">City</label>
                                        <input
                                            required type="text" name="city" value={formData.city} onChange={handleInputChange}
                                            className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] tracking-[0.2em] uppercase text-white/50 mb-2">State</label>
                                        <input
                                            required type="text" name="state" value={formData.state} onChange={handleInputChange}
                                            className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mb-6">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    checked={termsAccepted}
                                    onChange={(e) => setTermsAccepted(e.target.checked)}
                                    className="w-4 h-4 accent-red-600 cursor-pointer"
                                />
                                <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
                                    I agree to the{" "}
                                    <Link href="/terms-and-conditions" className="text-red-600 hover:underline" target="_blank">
                                        Terms and Conditions
                                    </Link>
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isProcessing}
                                className="w-full bg-[#D4AF37] text-black hover:bg-[#b5952f] py-5 rounded-2xl text-[12px] tracking-[0.2em] uppercase font-extrabold transition-colors flex items-center justify-center gap-3 shadow-lg shadow-[#D4AF37]/20 disabled:opacity-70"
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Connecting to WhatsApp...
                                    </>
                                ) : (
                                    <>
                                        Complete Order <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* RIGHT: Order Summary */}
                    <div className="order-1 lg:order-2">
                        <div className="bg-white/[0.02] backdrop-blur-[40px] rounded-[2rem] border border-white/[0.08] p-8 shadow-2xl sticky top-32">
                            <h3 className="font-serif text-2xl text-white mb-8 border-b border-white/10 pb-4">
                                Order Summary
                            </h3>

                            <div className="flex flex-col gap-6 mb-8 max-h-[40vh] overflow-y-auto hide-scrollbar">
                                {items.map((item) => (
                                    <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4">
                                        <div className="relative w-16 h-20 rounded-lg overflow-hidden bg-black/20 shrink-0 border border-white/5">
                                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                                            <div className="absolute top-0 right-0 bg-[#D4AF37] text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-bl-lg">
                                                {item.quantity}
                                            </div>
                                        </div>
                                        <div className="flex-1 flex flex-col justify-center">
                                            <h4 className="text-white text-sm font-medium mb-1">{item.name}</h4>
                                            <p className="text-white/40 text-[10px] uppercase tracking-wider mb-2">
                                                {item.size && `Size: ${item.size} `}
                                                {item.color && `| Color: ${item.color}`}
                                            </p>
                                            <p className="text-[#D4AF37] text-sm">
                                                ₦{(item.price * item.quantity).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col gap-4 text-sm font-sans mb-8 border-t border-white/10 pt-8">
                                <div className="flex justify-between items-center text-white/60">
                                    <span>Subtotal</span>
                                    <span>₦{subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center text-white/60">
                                    <span>Shipping</span>
                                    {/* <span>₦{shipping.toLocaleString()}</span> */}
                                </div>
                            </div>

                            <div className="border-t border-white/10 pt-6 flex justify-between items-center">
                                <span className="text-white text-lg font-medium">Total</span>
                                <span className="font-serif text-3xl text-[#D4AF37]">
                                    ₦{total.toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}