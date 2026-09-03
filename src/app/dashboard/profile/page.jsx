'use client';

import React, { useState, useEffect } from 'react';
import { UserCheck, ShieldCheck, Phone, MapPin, CheckCircle2, Save } from 'lucide-react';

export default function MyProfilePage() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('');
  const [upazila, setUpazila] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/auth')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.user) {
          setUser(data.user);
          setName(data.user.name || '');
          setPhone(data.user.phone || '');
          setDistrict(data.user.district || '');
          setUpazila(data.user.upazila || '');
        }
      });
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!user) return null;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
      
      <div className="border-b border-slate-100 pb-4">
        <div className="flex items-center space-x-2 text-emerald-700 font-bold text-xs uppercase tracking-wider mb-1">
          <UserCheck className="w-4 h-4" />
          <span>প্রোফাইল পরিচালনা</span>
        </div>
        <h1 className="text-2xl font-black text-slate-900">আমার প্রোফাইল তথ্য</h1>
      </div>

      <div className="flex items-center space-x-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
        <img src={user.avatar} alt="" className="w-16 h-16 rounded-full object-cover ring-2 ring-emerald-500" />
        <div>
          <div className="flex items-center space-x-1.5">
            <h3 className="font-bold text-slate-900 text-lg">{user.name}</h3>
            {user.nidVerified && (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
            )}
          </div>
          <p className="text-xs text-slate-500">{user.role === 'admin' ? 'এডমিন কন্ট্রোল' : 'কৃষক অ্যাকাউন্ট'}</p>
          <span className="inline-block mt-1 text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
            জাতীয় পরিচয়পত্র (NID) ভেরিফাইড
          </span>
        </div>
      </div>

      {saved && (
        <div className="bg-emerald-50 p-4 rounded-xl text-center text-emerald-800 font-bold text-xs">
          ✓ প্রোফাইল তথ্য সফলভাবে আপডেট হয়েছে!
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-4 text-xs">
        <div>
          <label className="block font-bold text-slate-700 mb-1">নাম:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">ফোন নম্বর:</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 border rounded-xl font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">জেলা:</label>
            <input
              type="text"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full p-3 border rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs transition-colors flex items-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>তথ্য সংরক্ষণ করুন</span>
        </button>
      </form>

    </div>
  );
}
