'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Minus, Filter, RefreshCw, Printer, Search, MapPin, Calendar } from 'lucide-react';

const districtsList = [
  'সকল জেলা', 'ঢাকা', 'রাজশাহী', 'বগুড়া', 'রংপুর', 'দিনাজপুর', 'পাবনা', 'যশোর', 'সিলেট', 'চট্টগ্রাম', 'খুলনা'
];

const categoriesList = [
  'সকল ক্যাটাগরি', 'ধান ও চাল', 'সবজি', 'ফলমূল', 'ডাল ও তেলবীজ', 'সবজি ও মশলা'
];

export default function MarketRatesPage() {
  const [rates, setRates] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('সকল জেলা');
  const [selectedCategory, setSelectedCategory] = useState('সকল ক্যাটাগরি');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchRates = async () => {
    setLoading(true);
    try {
      let url = `/api/market-rates?district=${encodeURIComponent(selectedDistrict)}&category=${encodeURIComponent(selectedCategory)}`;
      if (searchQuery) url += `&query=${encodeURIComponent(searchQuery)}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setRates(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, [selectedDistrict, selectedCategory]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchRates();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-emerald-950 rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-emerald-800/40">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 bg-emerald-800/70 text-emerald-300 px-3 py-1 rounded-full text-xs font-bold">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>প্রতিদিনের হালনাগাদ কৃষিপণ্য দর</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black">দৈনন্দিন কৃষি বাজারদর</h1>
          <p className="text-slate-300 text-sm max-w-xl">
            বাংলাদেশের প্রধান প্রধান জেলা ও কারওয়ান বাজারের দৈনন্দিন শস্য, সবজি ও ফলের সঠিক পাইকারি ও খুচরা দর জানুন।
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={fetchRates}
            className="flex items-center space-x-2 bg-emerald-700 hover:bg-emerald-600 px-4 py-2.5 rounded-xl font-bold text-xs shadow-md transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>রিফ্রেশ করুন</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2.5 rounded-xl font-bold text-xs border border-slate-700 transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>প্রিন্ট/ডাউনলোড</span>
          </button>
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Search */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="পণ্য বা শস্যের নাম লিখুন..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </form>

          {/* District Select */}
          <div className="relative">
            <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-emerald-600" />
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none appearance-none cursor-pointer"
            >
              {districtsList.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Category Select */}
          <div className="relative">
            <Filter className="absolute left-3.5 top-3.5 w-4 h-4 text-emerald-600" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none appearance-none cursor-pointer"
            >
              {categoriesList.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Market Rate Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            
            <thead className="bg-slate-900 text-white text-xs font-bold uppercase tracking-wider">
              <tr>
                <th className="py-4 px-6">ফসলের নাম</th>
                <th className="py-4 px-4">ক্যাটাগরি</th>
                <th className="py-4 px-4">জেলা / বাজার</th>
                <th className="py-4 px-4 text-right">আজকের মূল্য</th>
                <th className="py-4 px-4 text-right">গতকালকের মূল্য</th>
                <th className="py-4 px-4 text-center">পরিবর্তন ও ট্রেন্ড</th>
                <th className="py-4 px-6 text-right">সর্বশেষ আপডেট</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-slate-800">
              {rates.length > 0 ? (
                rates.map((item, index) => {
                  const diff = item.todayPrice - item.yesterdayPrice;
                  return (
                    <tr key={item.id} className={index % 2 === 0 ? 'bg-white hover:bg-slate-50' : 'bg-slate-50/50 hover:bg-slate-50'}>
                      
                      <td className="py-4 px-6 font-bold text-slate-900">
                        {item.crop}
                      </td>

                      <td className="py-4 px-4 text-xs font-medium text-slate-600">
                        <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md">
                          {item.category}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-xs font-semibold text-emerald-800">
                        📍 {item.district}
                      </td>

                      <td className="py-4 px-4 text-right font-black text-emerald-700 text-base">
                        ৳ {item.todayPrice.toLocaleString('bn-BD')}
                        <span className="text-[10px] text-slate-400 font-normal block">/{item.unit.split('/')[1] || item.unit}</span>
                      </td>

                      <td className="py-4 px-4 text-right font-medium text-slate-500 text-xs">
                        ৳ {item.yesterdayPrice.toLocaleString('bn-BD')}
                      </td>

                      <td className="py-4 px-4 text-center">
                        {item.trend === 'up' && (
                          <span className="inline-flex items-center text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-lg border border-red-100">
                            <TrendingUp className="w-3.5 h-3.5 mr-1" /> +৳ {diff} (বৃদ্ধি)
                          </span>
                        )}
                        {item.trend === 'down' && (
                          <span className="inline-flex items-center text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                            <TrendingDown className="w-3.5 h-3.5 mr-1" /> -৳ {Math.abs(diff)} (হ্রাস)
                          </span>
                        )}
                        {item.trend === 'same' && (
                          <span className="inline-flex items-center text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                            <Minus className="w-3.5 h-3.5 mr-1" /> অপরিবর্তিত
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-6 text-right text-xs text-slate-400 font-medium">
                        {item.lastUpdated}
                      </td>

                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400 font-medium">
                    কোনো বাজারদর তথ্য পাওয়া যায়নি। অন্য জেলা বা ক্যাটাগরি নির্বাচন করুন।
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
}
