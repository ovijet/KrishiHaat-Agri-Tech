'use client';

import React, { useState, useEffect } from 'react';
import ServiceCard from '@/components/ServiceCard';
import { Wrench, MapPin, Search, PlusCircle, Filter, CheckCircle2 } from 'lucide-react';

const serviceCategories = [
  'সকল সেবা',
  'পাওয়ার টিলার ও ট্রাক্টর মেকানিক',
  'কৃষি শস্য পরিবহন ট্রাক/পিকআপ',
  'সেচ পাম্প ও মোটর্স টেকনিশিয়ান',
  'কম্বাইন হারভেস্টার অপারেটর'
];

const districtsList = [
  'সকল জেলা', 'বগুড়া', 'ঢাকা', 'রংপুর', 'দিনাজপুর', 'রাজশাহী', 'যশোর', 'পাবনা'
];

export default function LocalServicesPage() {
  const [services, setServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('সকল সেবা');
  const [selectedDistrict, setSelectedDistrict] = useState('সকল জেলা');
  const [searchQuery, setSearchQuery] = useState('');
  const [showRegModal, setShowRegModal] = useState(false);
  const [regSuccess, setRegSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    setLoading(true);
    try {
      let url = `/api/services?district=${encodeURIComponent(selectedDistrict)}&category=${encodeURIComponent(selectedCategory)}`;
      if (searchQuery) url += `&search=${encodeURIComponent(searchQuery)}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setServices(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [selectedCategory, selectedDistrict]);

  const handleRegSubmit = (e) => {
    e.preventDefault();
    setRegSuccess(true);
    setTimeout(() => {
      setShowRegModal(false);
      setRegSuccess(false);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-emerald-900/50">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 bg-emerald-800/60 text-emerald-300 px-3 py-1 rounded-full text-xs font-bold">
            <Wrench className="w-4 h-4 text-emerald-400" />
            <span>গ্রামীণ কৃষি সেবা ডিরেক্টরি</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black">স্থানীয় সার্ভিস ও টেকনিশিয়ান</h1>
          <p className="text-slate-300 text-sm max-w-xl">
            জরুরি সময়ে আপনার উপজেলার মেকানিক, সেচ পাম্প ইলেকট্রিশিয়ান, ট্রাক্টর ড্রাইভার ও হারভেস্টার অপারেটরদের সরাসরি কল করুন।
          </p>
        </div>

        <button
          onClick={() => setShowRegModal(true)}
          className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-md transition-all flex-shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>আপনার সার্ভিস নিবন্ধন করুন</span>
        </button>
      </div>

      {/* Filter Controls */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* Search */}
          <div className="md:col-span-5 relative">
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="নাম, পেশা বা এলাকা লিখুন..."
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
              {serviceCategories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

        </div>

      </div>

      {/* Services Cards Grid */}
      {loading ? (
        <div className="py-20 text-center text-slate-400 font-medium">
          সেবাদাতা তালিকা লোড হচ্ছে...
        </div>
      ) : services.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 text-center space-y-4 border border-slate-200">
          <Wrench className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800">কোনো সেবাদাতা পাওয়া যায়নি!</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            আপনার নির্বাচনকৃত এলাকা বা ক্যাটাগরিতে সেবা নিবন্ধিত নেই। অন্য জেলা চেষ্টা করুন।
          </p>
        </div>
      )}

      {/* SERVICE REGISTRATION MODAL */}
      {showRegModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 border border-slate-100 max-h-[90vh] overflow-y-auto">
            <h3 className="font-bold text-slate-900 text-lg">কৃষি সেবাদাতা হিসেবে যুক্ত হন</h3>
            <p className="text-xs text-slate-500">আপনার পেশা ও ফোন নম্বর দিয়ে বিনামূল্যে নিবন্ধিত হন</p>

            {regSuccess ? (
              <div className="bg-emerald-50 p-6 rounded-xl text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-emerald-800 text-base">আপনার নিবন্ধন সফল হয়েছে!</h4>
                <p className="text-xs text-emerald-700">খুব শীঘ্রই আপনার সার্ভিস প্রোফাইল লাইভ করা হবে।</p>
              </div>
            ) : (
              <form onSubmit={handleRegSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">আপনার নাম:</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: মোঃ জহিরুল ইসলাম"
                    className="w-full p-2.5 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">সেবার ক্যাটাগরি:</label>
                  <select className="w-full p-2.5 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-bold">
                    {serviceCategories.filter(c => c !== 'সকল সেবা').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">জেলা:</label>
                    <input
                      type="text"
                      required
                      placeholder="যেমন: বগুড়া"
                      className="w-full p-2.5 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">উপজেলা:</label>
                    <input
                      type="text"
                      required
                      placeholder="যেমন: শেরপুর"
                      className="w-full p-2.5 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">ফোন নম্বর:</label>
                    <input
                      type="tel"
                      required
                      placeholder="01700000000"
                      className="w-full p-2.5 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">সার্ভিস ফি / দর:</label>
                    <input
                      type="text"
                      required
                      placeholder="যেমন: ৫০০ টাকা/ভিজিট"
                      className="w-full p-2.5 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex space-x-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-md hover:bg-emerald-700"
                  >
                    নিবন্ধন সম্পন্ন করুন
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowRegModal(false)}
                    className="py-3 px-4 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-200"
                  >
                    বাতিল
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
