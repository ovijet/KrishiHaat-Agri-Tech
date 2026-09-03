'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import ServiceCard from '@/components/ServiceCard';
import { 
  Sprout, 
  TrendingUp, 
  ShoppingBag, 
  Wrench, 
  ShieldCheck, 
  Truck, 
  DollarSign, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  Search,
  ChevronRight,
  Flame,
  Award,
  PhoneCall
} from 'lucide-react';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [rates, setRates] = useState([]);
  const [services, setServices] = useState([]);
  const [activeTab, setActiveTab] = useState('সকল');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch products
    fetch('/api/products?isFeatured=true')
      .then(res => res.json())
      .then(data => { if (data.success) setProducts(data.data); });

    // Fetch market rates summary
    fetch('/api/market-rates')
      .then(res => res.json())
      .then(data => { if (data.success) setRates(data.data.slice(0, 6)); });

    // Fetch top services
    fetch('/api/services')
      .then(res => res.json())
      .then(data => { if (data.success) setServices(data.data.slice(0, 3)); });
  }, []);

  const filteredProducts = activeTab === 'সকল'
    ? products
    : products.filter(p => p.category === activeTab);

  return (
    <div className="space-y-16 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-b from-emerald-900 via-slate-900 to-slate-950 text-white overflow-hidden pt-12 pb-20">
        
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-green-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Col */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center space-x-2 bg-emerald-800/60 border border-emerald-600/50 px-3.5 py-1.5 rounded-full text-xs font-semibold text-emerald-300">
                <Sprout className="w-4 h-4 text-emerald-400" />
                <span>বাংলাদেশের ১ নম্বর ডিজিটাল এগ্রি-টেক প্ল্যাটফর্ম</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
                মধ্যস্বত্বভোগী ছাড়া <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-emerald-400 via-green-300 to-amber-300 bg-clip-text text-transparent">
                  সরাসরি ফসল বিক্রি ও ক্রয়
                </span> করুন
              </h1>

              <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed mx-auto lg:mx-0">
                কৃষিহাট সরাসরি প্রান্তিক কৃষক, পাইকারি ক্রেতা এবং স্থানীয় যন্ত্র মেরামতকারী সেবা প্রদানকারীদের সংযুক্ত করে। পান সঠিক দৈনন্দিন জেলাভিত্তিক বাজারদর।
              </p>

              {/* Quick Action Search Bar */}
              <div className="bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 max-w-xl mx-auto lg:mx-0 shadow-2xl">
                <form action="/products" method="GET" className="flex flex-col sm:flex-row items-center gap-2">
                  <div className="relative flex-1 w-full">
                    <Search className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      name="search"
                      placeholder="ধান, আলু, আম বা জেলা দিয়ে খুঁজুন..."
                      className="w-full pl-11 pr-4 py-3 bg-white text-slate-900 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-slate-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center space-x-2"
                  >
                    <span>অনুসন্ধান</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>

              {/* Quick CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/dashboard/add-product"
                  className="px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-slate-950 font-extrabold text-sm rounded-xl shadow-lg hover:shadow-emerald-500/20 transition-all flex items-center space-x-2"
                >
                  <ShoppingBag className="w-4 h-4 text-slate-950" />
                  <span>ফসল পোস্ট করুন (ফ্রি)</span>
                </Link>
                
                <Link
                  href="/market-rates"
                  className="px-6 py-3.5 bg-slate-800/90 hover:bg-slate-700 text-emerald-300 border border-slate-700 font-bold text-sm rounded-xl transition-all flex items-center space-x-2"
                >
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span>আজকের বাজারদর দেখুন</span>
                </Link>
              </div>

              {/* Trust badges */}
              <div className="pt-4 flex items-center justify-center lg:justify-start space-x-6 text-xs text-slate-400">
                <span className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>১০০% কৃষকমুক্ত প্ল্যাটফর্ম</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>সরাসরি কল করার সুবিধা</span>
                </span>
              </div>

            </div>

            {/* Right Col: Visual Card Preview */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
                  <img
                    src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80"
                    alt="Bangladeshi Agriculture"
                    className="w-full h-96 sm:h-[450px] object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

                  {/* Floating Stat Card */}
                  <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl text-slate-900 shadow-xl border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-lg">
                        🌾
                      </div>
                      <div>
                        <p className="text-xs font-bold text-emerald-800">সর্বশেষ সফল বিক্রি</p>
                        <h4 className="font-extrabold text-slate-900 text-sm">১৫০ মণ নাজিরশাইল ধান</h4>
                        <p className="text-[10px] text-slate-500">বিক্রেতা: রফিকুল ইসলাম (বগুড়া)</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-600 text-white font-extrabold text-xs rounded-lg">
                      ৳ ৩,১০০/মণ
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* DAILY MARKET RATES HIGHLIGHT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <div className="flex items-center space-x-2 text-emerald-700 font-bold text-xs uppercase tracking-wider mb-1">
                <TrendingUp className="w-4 h-4" />
                <span>দৈনন্দিন সঠিক বাজারদর</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                আজকের জেলাভিত্তিক কৃষি বাজারদর
              </h2>
            </div>

            <Link
              href="/market-rates"
              className="inline-flex items-center space-x-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-800 hover:underline"
            >
              <span>সকল জেলার বাজারদর দেখুন</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Rates Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {rates.map(rate => (
              <div key={rate.id} className="bg-slate-50 hover:bg-emerald-50/60 p-4 rounded-2xl border border-slate-200/60 transition-all text-center flex flex-col justify-between space-y-2">
                <span className="text-xs font-bold text-slate-500">{rate.district}</span>
                <h4 className="font-extrabold text-slate-900 text-sm line-clamp-1">{rate.crop}</h4>
                <div className="py-1">
                  <span className="text-xl font-black text-emerald-700">৳ {rate.todayPrice}</span>
                  <span className="text-[10px] text-slate-400 block font-medium">/{rate.unit.split('/')[1] || rate.unit}</span>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block ${
                  rate.trend === 'up' ? 'bg-red-100 text-red-700' : rate.trend === 'down' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-700'
                }`}>
                  {rate.trend === 'up' ? '▲ দাম বেড়েছে' : rate.trend === 'down' ? '▼ দাম কমেছে' : '● অপরিবর্তিত'}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FEATURED PRODUCTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-emerald-700 font-bold text-xs uppercase tracking-wider mb-1">
              <ShoppingBag className="w-4 h-4" />
              <span>সরাসরি খেত থেকে</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              সেরা শস্য ও ফসল সমূহ
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
            {['সকল', 'ধান ও চাল', 'সবজি', 'ফলমূল', 'ডাল ও তেলবীজ'].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeTab === cat
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center pt-4">
          <Link
            href="/products"
            className="inline-flex items-center space-x-2 px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl shadow-md transition-colors"
          >
            <span>সকল শস্য ডিরেক্টরি দেখুন ({products.length}+ টি রয়েছে)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* WHY KRISHIHAAT / BENEFIT CARDS */}
      <section className="bg-emerald-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-emerald-400 font-bold text-xs uppercase tracking-widest">কেন কৃষিহাট প্ল্যাটফর্ম?</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold">কৃষক ও ক্রেতার লাভজনক ডিজিটাল মিলনমেলা</h2>
            <p className="text-slate-300 text-sm">আমাদের লক্ষ্য প্রান্তিক কৃষককে প্রযুক্তির মাধ্যমে স্বাবলম্বী করা ও সঠিক মূল্য প্রাপ্তি নিশ্চিত করা।</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-slate-800/80 p-8 rounded-2xl border border-slate-700/80 space-y-4 hover:border-emerald-500 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <DollarSign className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">মধ্যস্বত্বভোগী মুক্ত ক্রয়-বিক্রয়</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                কোনো ফড়িয়া বা দালালের ঝামেলা ছাড়াই কৃষক সরাসরি পাইকারি ও খুচরা ক্রেতার সাথে ফোনের মাধ্যমে দরদাম করে ফসল বিক্রি করতে পারেন।
              </p>
            </div>

            <div className="bg-slate-800/80 p-8 rounded-2xl border border-slate-700/80 space-y-4 hover:border-emerald-500 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">সঠিক জেলা বাজারদর</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                প্রতিদিন সকালের আপডেটকৃত ঢাকার কারওয়ান বাজার, রাজশাহী, রংপুর ও বগুড়ার সঠিক খুচরা ও পাইকারি দাম জানুন এক ক্লিকে।
              </p>
            </div>

            <div className="bg-slate-800/80 p-8 rounded-2xl border border-slate-700/80 space-y-4 hover:border-emerald-500 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">স্থানীয় মেকানিক ও পরিবহন সেবা</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                পাওয়ার টিলার, সেচ পাম্প মেকানিক এবং খেতের শস্য গন্তব্যে পৌঁছাতে পিকআপ বা ট্রাক ড্রাইভারদের সরাসরি ডিরেক্টরি সাপোর্ট।
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* LOCAL SERVICES HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-emerald-700 font-bold text-xs uppercase tracking-wider mb-1">
              <Wrench className="w-4 h-4" />
              <span>গ্রামীণ সেবা ডিরেক্টরি</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              জরুরি কৃষি মেকানিক ও পরিবহন চালক
            </h2>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center space-x-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-800"
          >
            <span>সকল সেবাদাতা দেখুন</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* STATS COUNTER BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-700 to-green-600 rounded-3xl p-8 sm:p-12 text-white shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            
            <div className="space-y-1">
              <p className="text-3xl sm:text-5xl font-black">১০,০০০+</p>
              <p className="text-xs sm:text-sm font-medium text-emerald-100">নিবন্ধিত কৃষক</p>
            </div>

            <div className="space-y-1">
              <p className="text-3xl sm:text-5xl font-black">৫০,০০০+</p>
              <p className="text-xs sm:text-sm font-medium text-emerald-100">সফল শস্য বিক্রি</p>
            </div>

            <div className="space-y-1">
              <p className="text-3xl sm:text-5xl font-black">৬৪</p>
              <p className="text-xs sm:text-sm font-medium text-emerald-100">জেলা কভারেজ</p>
            </div>

            <div className="space-y-1">
              <p className="text-3xl sm:text-5xl font-black">১,২০০+</p>
              <p className="text-xs sm:text-sm font-medium text-emerald-100">স্থানীয় মেকানিক ও ড্রাইভার</p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
