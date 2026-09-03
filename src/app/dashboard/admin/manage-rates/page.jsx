'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, PlusCircle, CheckCircle2, RefreshCw } from 'lucide-react';

export default function ManageRatesPage() {
  const [rates, setRates] = useState([]);
  const [crop, setCrop] = useState('');
  const [category, setCategory] = useState('সবজি');
  const [district, setDistrict] = useState('ঢাকা');
  const [todayPrice, setTodayPrice] = useState('');
  const [yesterdayPrice, setYesterdayPrice] = useState('');
  const [unit, setUnit] = useState('টাকা/কেজি');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const fetchRates = async () => {
    try {
      const res = await fetch('/api/market-rates');
      const data = await res.json();
      if (data.success) setRates(data.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/market-rates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          crop,
          category,
          district,
          todayPrice: Number(todayPrice),
          yesterdayPrice: Number(yesterdayPrice || todayPrice),
          unit
        })
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        fetchRates();
        setCrop('');
        setTodayPrice('');
        setYesterdayPrice('');
        setTimeout(() => setSuccess(false), 2000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-8">
      
      <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2 text-amber-700 font-bold text-xs uppercase tracking-wider mb-1">
            <TrendingUp className="w-4 h-4" />
            <span>এডমিন ড্যাশবোর্ড</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900">জেলা বাজারদর ম্যানেজমেন্ট</h1>
        </div>

        <button
          onClick={fetchRates}
          className="p-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold flex items-center space-x-1"
        >
          <RefreshCw className="w-4 h-4" />
          <span>রিফ্রেশ</span>
        </button>
      </div>

      {success && (
        <div className="bg-emerald-50 p-4 rounded-xl text-center text-emerald-800 font-bold text-xs">
          ✓ নতুন জেলা বাজারদর ইনপুট সফল হয়েছে!
        </div>
      )}

      {/* Add New Rate Form */}
      <form onSubmit={handleSubmit} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4 text-xs">
        <h3 className="font-bold text-slate-900 text-sm">নতুন কৃষিপণ্য বা বাজারদর ইনপুট দিন:</h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block font-bold text-slate-700 mb-1">ফসলের নাম:</label>
            <input
              type="text"
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              placeholder="যেমন: বেগুন (দেশি)"
              required
              className="w-full p-2.5 bg-white border rounded-xl font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">ক্যাটাগরি:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2.5 bg-white border rounded-xl font-bold focus:ring-2 focus:ring-amber-500 focus:outline-none cursor-pointer"
            >
              {['ধান ও চাল', 'সবজি', 'ফলমূল', 'ডাল ও তেলবীজ', 'সবজি ও মশলা'].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">জেলা / বাজার:</label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full p-2.5 bg-white border rounded-xl font-bold focus:ring-2 focus:ring-amber-500 focus:outline-none cursor-pointer"
            >
              {['ঢাকা', 'বগুড়া', 'দিনাজপুর', 'রাজশাহী', 'পাবনা', 'রংপুর', 'যশোর', 'সিলেট'].map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block font-bold text-slate-700 mb-1">আজকের মূল্য (৳):</label>
            <input
              type="number"
              value={todayPrice}
              onChange={(e) => setTodayPrice(e.target.value)}
              placeholder="৫৫"
              required
              className="w-full p-2.5 bg-white border rounded-xl font-bold focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">গতকালকের মূল্য (৳):</label>
            <input
              type="number"
              value={yesterdayPrice}
              onChange={(e) => setYesterdayPrice(e.target.value)}
              placeholder="৬০"
              className="w-full p-2.5 bg-white border rounded-xl font-bold focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">একক (Unit):</label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full p-2.5 bg-white border rounded-xl font-bold focus:ring-2 focus:ring-amber-500 focus:outline-none cursor-pointer"
            >
              {['টাকা/কেজি', 'টাকা/মণ', 'টাকা/ডজন', 'টাকা/লিটার'].map(u => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center space-x-1"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{loading ? 'সংরক্ষণ হচ্ছে...' : 'নতুন বাজারদর যুক্ত করুন'}</span>
        </button>
      </form>

      {/* Current Rates List Table */}
      <div className="space-y-3">
        <h3 className="font-extrabold text-slate-900 text-sm">বর্তমান লাইভ বাজারদর রেকর্ড ({rates.length} টি)</h3>
        <div className="overflow-x-auto border border-slate-200 rounded-2xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 text-white font-bold">
              <tr>
                <th className="p-3">ফসল</th>
                <th className="p-3">জেলা</th>
                <th className="p-3 text-right">আজকের মূল্য</th>
                <th className="p-3 text-right">গতকালকের মূল্য</th>
                <th className="p-3 text-center">ট্রেন্ড</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {rates.map(r => (
                <tr key={r.id} className="hover:bg-slate-50">
                  <td className="p-3 font-bold">{r.crop}</td>
                  <td className="p-3 text-emerald-800 font-bold">{r.district}</td>
                  <td className="p-3 text-right font-black text-emerald-700">৳ {r.todayPrice}</td>
                  <td className="p-3 text-right text-slate-500">৳ {r.yesterdayPrice}</td>
                  <td className="p-3 text-center">
                    <span className={`px-2 py-0.5 rounded font-bold ${
                      r.trend === 'up' ? 'bg-red-100 text-red-700' : r.trend === 'down' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {r.trend}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
