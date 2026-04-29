import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-[#F5F5F7] dark:bg-[#1a1a1a] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white dark:bg-[#272727] rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800">
        <div className="px-6 py-8 sm:p-10">
          <div className="flex items-center gap-4 mb-8">
            <Link
              href="/"
              className="p-2 bg-gray-50 dark:bg-gray-800 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </Link>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Terms and Conditions</h1>
          </div>

          <div className="prose prose-orange max-w-none text-gray-600 dark:text-gray-300 space-y-6">
            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">1. Introduction</h2>
              <p>
                Welcome to Vee Clothing Company. By accessing or using our website, you agree to be bound by these Terms and Conditions. Please read them carefully before making a purchase.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">2. Intellectual Property Rights</h2>
              <p>
                Other than the content you own, under these Terms, vee  Clothing Company and/or its licensors own all the intellectual property rights and materials contained in this Website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">3. User Responsibilities</h2>
              <p>
                As a user, you agree not to use the website in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of the website. You must not use our website to copy, store, host, transmit, send, use, publish, or distribute any material which consists of (or is linked to) any spyware, computer virus, Trojan horse, worm, keystroke logger, rootkit, or other malicious computer software.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">4. Limitation of Liability</h2>
              <p>
                In no event shall vee  Clothing Company, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this Website. vee  Clothing Company, including its officers, directors, and employees shall not be held liable for any indirect, consequential, or special liability arising out of or in any way related to your use of this Website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">5. Return & Refund Policy</h2>
              <p>
                We stand behind our products. If you are not entirely satisfied with your purchase, please contact us within 7 days of receiving your item. Items must be returned in their original condition and packaging. Shipping costs for returns are non-refundable.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">6. Modifications</h2>
              <p>
                vee Clothing Company is permitted to revise these Terms at any time as it sees fit, and by using this Website you are expected to review these Terms on a regular basis.
              </p>
            </section>
          </div>

          <div className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-800 text-sm text-gray-500 dark:text-gray-400">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
        </div>
      </div>
    </div>
  );
}
