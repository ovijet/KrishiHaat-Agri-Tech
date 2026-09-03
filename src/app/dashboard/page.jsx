'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { ShoppingBag, DollarSign, Package, TrendingUp, PlusCircle, CheckCircle2, Clock } from 'lucide-react';

export default function UserDashboardPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProducts(data.data);
        }
      });
  }, []);

  return (
    <div className="space-y-6">
      
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-emerald-600">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">মোট বিক্রিত পরিমাণ</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900">৳ ১২,৮০,০০০</p>
          <span className="text-[11px] text-emerald-600 font-semibold">↑ চলতি মৌসুমে ৪টি সফল ডিল</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-blue-600">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">সক্রিয় শস্য পোস্ট</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900">{products.length} টি</p>
          <span className="text-[11px] text-slate-500 font-medium">লাইভ মার্কেটে সক্রিয়</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-amber-600">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">কোল্ড স্টোরেজ / মজুদ</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center">
              <Package className="w-5 h-5 text-amber-600" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900">১,৫৫০ মণ</p>
          <span className="text-[11px] text-amber-700 font-medium">শেরপুর ও বগুড়া গুদাম</span>
        </div>

      </div>

      {/* Quick Action Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-green-700 rounded-2xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-extrabold text-lg">আপনার কাছে কোনো উদ্বৃত্ত ফসল রয়েছে?</h3>
          <p className="text-xs text-emerald-100">আজই বিনামূল্যে পোস্ট করুন এবং সরাসরি পাইকারি ক্রেতার কাছে বিক্রি করুন।</p>
        </div>
        <Link
          href="/dashboard/add-product"
          className="px-5 py-3 bg-white text-slate-950 hover:bg-slate-100 font-extrabold text-xs rounded-xl shadow-md transition-colors flex-shrink-0 flex items-center space-x-1.5"
        >
          <PlusCircle className="w-4 h-4 text-emerald-700" />
          <span>নতুন ফসল বিক্রির বিজ্ঞাপন দিন</span>
        </Link>
      </div>

      {/* Recent Posted Products List */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h3 className="font-extrabold text-slate-900 text-base">সাম্প্রতিক পোস্ট করা ফসলসমূহ</h3>
          <Link href="/dashboard/my-products" className="text-xs font-bold text-emerald-700 hover:underline">
            সকল পোস্ট পরিচালনা করুন →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {products.slice(0, 4).map(product => (
            <div key={product.id} className="flex items-center space-x-3.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <img src={product.image} alt="" className="w-16 h-16 rounded-lg object-cover" />
              <div className="flex-1">
                <h4 className="font-bold text-slate-900 text-xs line-clamp-1">{product.title}</h4>
                <p className="text-xs text-emerald-700 font-black">৳ {product.price} /{product.unit}</p>
                <p className="text-[10px] text-slate-400">মজুদ: {product.quantity} {product.unit}</p>
              </div>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-1 rounded-md">
                সক্রিয়
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
