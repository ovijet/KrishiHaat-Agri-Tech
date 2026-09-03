'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { Search, Filter, MapPin, Leaf, PlusCircle, ShoppingBag, SlidersHorizontal } from 'lucide-react';

const districtsList = [
  'সকল জেলা', 'বগুড়া', 'দিনাজপুর', 'রাজশাহী', 'পাবনা', 'রংপুর', 'খুলনা', 'ঢাকা', 'যশোর', 'সিলেট'
];

const categoriesList = [
  'সকল ক্যাটাগরি', 'ধান ও চাল', 'সবজি', 'ফলমূল', 'ডাল ও তেলবীজ', 'সবজি ও মশলা'
];

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('সকল জেলা');
  const [selectedCategory, setSelectedCategory] = useState('সকল ক্যাটাগরি');
  const [isOrganicOnly, setIsOrganicOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let url = `/api/products?district=${encodeURIComponent(selectedDistrict)}&category=${encodeURIComponent(selectedCategory)}`;
      if (isOrganicOnly) url += '&isOrganic=true';
      if (searchQuery) url += `&search=${encodeURIComponent(searchQuery)}`;
      
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedDistrict, selectedCategory, isOrganicOnly]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Title & Add Button Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-emerald-700 font-bold text-xs uppercase tracking-wider mb-1">
            <ShoppingBag className="w-4 h-4" />
            <span>সরাসরি মাঠ থেকে কৃষকের শস্য</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900">ফসল ও পণ্য ডিরেক্টরি</h1>
        </div>

        <Link
          href="/dashboard/add-product"
          className="inline-flex items-center justify-center space-x-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-sm transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>আপনার ফসল বিক্রি করুন</span>
        </Link>
      </div>

      {/* Filters & Search Controls */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* Search Input */}
          <div className="md:col-span-5 relative">
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ফসলের নাম, কৃষকের নাম বা এলাকা লিখুন..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          {/* District Select */}
          <div className="md:col-span-3 relative">
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
          <div className="md:col-span-4 relative">
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

        {/* Bottom Filter Toggles */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs font-medium text-slate-700">
          
          <label className="flex items-center space-x-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isOrganicOnly}
              onChange={(e) => setIsOrganicOnly(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
            />
            <span className="flex items-center space-x-1 font-bold text-slate-800">
              <Leaf className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>শুধুমাত্র অর্গানিক / ফরমালিন মুক্ত ফসল</span>
            </span>
          </label>

          <span className="text-slate-400 font-normal">
            মোট প্রাপ্ত ফসল: <strong className="text-slate-900">{products.length}</strong> টি
          </span>

        </div>

      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="py-20 text-center text-slate-400 font-medium">
          ফসল ডাটা লোড হচ্ছে...
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 text-center space-y-4 border border-slate-200">
          <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800">কোনো ফসল পাওয়া যায়নি!</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            আপনার নির্বাচিত জেলা বা ফিল্টারে কোনো শস্য তালিকাভুক্ত নেই। অনুগ্রহ করে অন্য ফিল্টার চেষ্টা করুন।
          </p>
        </div>
      )}

    </div>
  );
}
