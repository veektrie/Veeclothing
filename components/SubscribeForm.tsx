'use client';

import { useState } from "react";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server error: Check if app/api/subscribe/route.ts exists.");
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to subscribe");
      }

      setStatus("success");
      setMessage(data.message);
      setEmail(""); // Clear the input
    } catch (error: any) {
      setStatus("error");
      setMessage(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
        <input 
          type="email" 
          placeholder="Enter your email address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 bg-white/5 border border-white/20 rounded-sm px-4 py-3 text-white font-sans text-sm placeholder:text-white/30 focus:outline-none focus:border-[#D4AF37] transition-colors"
        />
        <button 
          type="submit"
          disabled={status === "loading"}
          className="bg-[#D4AF37] hover:bg-[#b5952f] disabled:bg-white/10 disabled:text-white/50 text-gray-900 px-8 py-3 rounded-sm font-sans text-xs uppercase tracking-widest font-bold transition-colors shrink-0"
        >
          {status === "loading" ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
      
      {/* Display Success or Error Message */}
      {message && (
        <p className={`mt-4 text-xs font-sans tracking-wider ${status === "error" ? "text-red-400" : "text-[#D4AF37]"}`}>
          {message}
        </p>
      )}
    </div>
  );
}