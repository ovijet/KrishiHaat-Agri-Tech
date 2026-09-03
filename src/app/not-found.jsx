import React from 'react';
import Link from 'next/link';
import { Sprout, Home, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xl space-y-6">
        
        <div className="w-20 h-20 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-3xl font-black shadow-inner">
          🌾 404
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            পেজটি পাওয়া যায়নি!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
            আপনি যে পেজটিতে প্রবেশের চেষ্টা করছেন তা হয়তো সরিয়ে ফেলা হয়েছে অথবা লিংকটি ভুল প্রদান করা হয়েছে।
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <Link
            href="/"
            className="flex items-center justify-center space-x-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>হোম পেজে যান</span>
          </Link>

          <Link
            href="/products"
            className="flex items-center justify-center space-x-2 py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors"
          >
            <ShoppingBag className="w-4 h-4 text-emerald-400" />
            <span>ফসল দেখুন</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
