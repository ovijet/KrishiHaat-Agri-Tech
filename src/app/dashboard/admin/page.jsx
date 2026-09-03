'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldAlert, Users, ShoppingBag, TrendingUp, Wrench, DollarSign, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStats(data.data);
        }
      });
  }, []);

  if (!stats) return null;

  return (
    <div className="space-y-6">
      
      <div className="bg-amber-500/10 rounded-2xl p-6 border border-amber-200 flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2 text-amber-800 font-bold text-xs uppercase tracking-wider mb-1">
            <ShieldAlert className="w-4 h-4" />
            <span>এডমিন প্যানেল অ্যানালিটিক্স</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900">প্ল্যাটফর্ম সামগ্রিক পরিসংখ্যান</h1>
        </div>

        <div className="flex items-center space-x-2">
          <Link
            href="/dashboard/admin/manage-rates"
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-xs"
          >
            বাজারদর আপডেট প্যানেল →
          </Link>
        </div>
      </div>

      {/* Analytics Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase">মোট ব্যবহারকারী</span>
          <p className="text-2xl font-black text-slate-900">{stats.totalUsers.toLocaleString('bn-BD')}</p>
          <p className="text-[11px] text-emerald-600 font-semibold">কৃষক: {stats.activeFarmers} | ক্রেতা: {stats.activeBuyers}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase">মোট শস্য পোস্ট</span>
          <p className="text-2xl font-black text-slate-900">{stats.totalProducts} টি</p>
          <p className="text-[11px] text-slate-500">পেন্ডিং রিভিউ: {stats.pendingReviews} টি</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase">বাজারদর রেকর্ড</span>
          <p className="text-2xl font-black text-slate-900">{stats.marketRatesCount} টি</p>
          <p className="text-[11px] text-emerald-600 font-semibold">আজকের হালনাগাদ সম্পন্ন</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase">মোট প্ল্যাটফর্ম ভলিউম</span>
          <p className="text-2xl font-black text-emerald-700">{stats.totalTransactions}</p>
          <p className="text-[11px] text-slate-500">মধ্যস্বত্বভোগী মুক্ত ক্রয়-বিক্রয়</p>
        </div>

      </div>

      {/* Top Districts Grid */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-4 shadow-xs">
        <h3 className="font-extrabold text-slate-900 text-base">শীর্ষ সক্রিয় জেলাসমূহ</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.topDistricts.map((d, i) => (
            <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center space-y-1">
              <span className="text-xs text-slate-500 font-bold">{d.name}</span>
              <p className="text-xl font-black text-emerald-700">{d.count} টি</p>
              <span className="text-[10px] text-slate-400">সক্রিয় শস্য লিস্টিং</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
