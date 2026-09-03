'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PlusCircle, Upload, Leaf, CheckCircle2, ShoppingBag } from 'lucide-react';

const presetImages = [
  { name: 'চাল/ধান', url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80' },
  { name: 'আলু', url: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80' },
  { name: 'আম', url: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80' },
  { name: 'পেঁয়াজ', url: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=800&q=80' },
  { name: 'মরিচ', url: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=800&q=80' },
  { name: 'সরিষা/তেল', url: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80' },
];

export default function AddProductPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('ধান ও চাল');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('মণ');
  const [quantity, setQuantity] = useState('');
  const [minOrder, setMinOrder] = useState('1');
  const [district, setDistrict] = useState('বগুড়া');
  const [upazila, setUpazila] = useState('শেরপুর');
  const [isOrganic, setIsOrganic] = useState(true);
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState(presetImages[0].url);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          category,
          price: Number(price),
          unit,
          quantity: Number(quantity),
          minOrder: Number(minOrder),
          district,
          upazila,
          isOrganic,
          description,
          image: imageUrl
        })
      });

      const data = await res.json();
      if (data.success) {
        setSuccessMsg(true);
        setTimeout(() => {
          router.push('/products');
        }, 1500);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
      
      <div className="border-b border-slate-100 pb-4">
        <div className="flex items-center space-x-2 text-emerald-700 font-bold text-xs uppercase tracking-wider mb-1">
          <ShoppingBag className="w-4 h-4" />
          <span>ফসল বিক্রয় ফরম</span>
        </div>
        <h1 className="text-2xl font-black text-slate-900">নতুন শস্য বা ফসল বিক্রি করুন</h1>
        <p className="text-xs text-slate-500">আপনার খেতের তাজা ফসল সরাসরি দেশের ক্রেতাদের সাথে শেয়ার করুন</p>
      </div>

      {successMsg ? (
        <div className="bg-emerald-50 p-8 rounded-2xl text-center space-y-3 border border-emerald-100">
          <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
          <h3 className="text-lg font-bold text-emerald-900">আপনার ফসল সফলভাবে পোস্ট করা হয়েছে!</h3>
          <p className="text-xs text-emerald-700">ফসল ডিরেক্টরিতে রিডাইরেক্ট করা হচ্ছে...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">ফসলের নাম / শিরোনাম (বাংলায়):</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="যেমন: বিষমুক্ত খাঁটি নাজিরশাইল চাল (প্রথম শ্রেণি)"
              required
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Category */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">ক্যাটাগরি:</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none cursor-pointer"
              >
                {['ধান ও চাল', 'সবজি', 'ফলমূল', 'ডাল ও তেলবীজ', 'সবজি ও মশলা'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Organic Flag */}
            <div className="flex items-center">
              <label className="flex items-center space-x-2 bg-amber-50 p-3 rounded-xl border border-amber-200 cursor-pointer w-full">
                <input
                  type="checkbox"
                  checked={isOrganic}
                  onChange={(e) => setIsOrganic(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                />
                <span className="text-xs font-bold text-amber-900 flex items-center space-x-1">
                  <Leaf className="w-4 h-4 text-amber-600 fill-amber-600" />
                  <span>এটি জৈব/অর্গানিক বা ফরমালিন মুক্ত ফসল</span>
                </span>
              </label>
            </div>
          </div>

          {/* Pricing & Quantity */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">একক মূল্য (টাকায়):</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="৩০০০"
                required
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">একক (Unit):</label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none cursor-pointer"
              >
                {['মণ', 'কেজি', 'ডজন', 'লিটার', 'টন'].map(u => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">মোট পরিমাণ:</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="১০০"
                required
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">সর্বনিম্ন অর্ডার:</label>
              <input
                type="number"
                value={minOrder}
                onChange={(e) => setMinOrder(e.target.value)}
                placeholder="৫"
                required
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">জেলা:</label>
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                required
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">উপজেলা:</label>
              <input
                type="text"
                value={upazila}
                onChange={(e) => setUpazila(e.target.value)}
                required
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Image preset selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">ফসলের ছবি নির্বাচন করুন:</label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {presetImages.map((img, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setImageUrl(img.url)}
                  className={`relative rounded-xl overflow-hidden h-20 border-2 transition-all ${
                    imageUrl === img.url ? 'border-emerald-600 ring-2 ring-emerald-500' : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                  <span className="absolute bottom-0 inset-x-0 bg-slate-900/80 text-[10px] text-white font-bold text-center py-0.5">
                    {img.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">ফসলের বর্ণনা ও মান বিস্তারিত:</label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="আপনার খেতের বিষমুক্ত চাষের বর্ণনা, পরিবহণ সুবিধা ও মান উল্লেখ করুন..."
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md transition-colors flex items-center justify-center space-x-2"
          >
            <PlusCircle className="w-5 h-5" />
            <span>{loading ? 'পোস্ট হচ্ছে...' : 'ফসল সরাসরি বাজারে পোস্ট করুন'}</span>
          </button>

        </form>
      )}

    </div>
  );
}
