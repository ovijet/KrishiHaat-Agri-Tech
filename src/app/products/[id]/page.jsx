'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { 
  MapPin, 
  Phone, 
  CheckCircle2, 
  Leaf, 
  Calendar, 
  Package, 
  ShieldCheck, 
  ArrowLeft, 
  Share2, 
  MessageSquare,
  Truck,
  Star
} from 'lucide-react';

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [showPhone, setShowPhone] = useState(false);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [inquiryText, setInquiryText] = useState('');
  const [inquirySent, setInquirySent] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params?.id) {
      setLoading(true);
      fetch(`/api/products/${params.id}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setProduct(data.data);
            // Fetch related
            fetch('/api/products')
              .then(r => r.json())
              .then(rel => {
                if (rel.success) {
                  setRelatedProducts(rel.data.filter(p => p.id !== data.data.id).slice(0, 3));
                }
              });
          }
        })
        .finally(() => setLoading(false));
    }
  }, [params?.id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-400 font-medium">
        ফসলের বিস্তারিত লোড হচ্ছে...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">পণ্যটি পাওয়া যায়নি!</h2>
        <Link href="/products" className="inline-block px-5 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl">
          ফসল ডিরেক্টরিতে ফিরে যান
        </Link>
      </div>
    );
  }

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => {
      setShowInquiryModal(false);
      setInquirySent(false);
      setInquiryText('');
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Back button */}
      <div>
        <button
          onClick={() => router.back()}
          className="inline-flex items-center space-x-2 text-xs font-bold text-slate-600 hover:text-emerald-700 bg-white border border-slate-200 px-4 py-2 rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>পেছনে ফিরে যান</span>
        </button>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Col: Image & Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative rounded-3xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-md h-80 sm:h-[420px]">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            {product.isOrganic && (
              <span className="absolute top-4 left-4 bg-amber-500 text-slate-950 text-xs font-black px-3 py-1.5 rounded-full shadow-md flex items-center gap-1">
                <Leaf className="w-4 h-4 fill-slate-950" /> অর্গানিক ফসল
              </span>
            )}
            <span className="absolute top-4 right-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
              {product.category}
            </span>
          </div>

          <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 flex items-center justify-between text-xs text-emerald-900 font-semibold">
            <span className="flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>কৃষিহাট ভেরিফাইড কৃষক পণ্য</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Truck className="w-4 h-4 text-emerald-600" />
              <span>পাইকারি ও পরিবহণ সুবিধা</span>
            </span>
          </div>
        </div>

        {/* Right Col: Crop Info & Farmer Profile */}
        <div className="lg:col-span-6 space-y-6">
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-xs text-slate-500">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>অবস্থান: {product.district}, {product.upazila}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
              {product.title}
            </h1>

            {/* Price Box */}
            <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-xs text-emerald-400 font-medium">নির্ধারিত দর:</p>
                <div className="flex items-baseline space-x-1">
                  <span className="text-3xl font-black text-white">৳ {product.price.toLocaleString('bn-BD')}</span>
                  <span className="text-xs text-slate-300 font-bold">/ {product.unit}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs bg-emerald-800 text-emerald-200 px-3 py-1 rounded-full font-bold inline-block mb-1">
                  মজুদ: {product.quantity} {product.unit}
                </span>
                <p className="text-[11px] text-slate-400">সর্বনিম্ন অর্ডার: {product.minOrder} {product.unit}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">ফসলের বিবরণ ও মান:</h3>
            <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
            <div className="pt-2 flex items-center space-x-2 text-xs text-slate-500 border-t border-slate-100">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <span>ফসলের কাটাই/তোলার তারিখ: {product.harvestDate}</span>
            </div>
          </div>

          {/* FARMER PROFILE CARD */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-md space-y-4">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">কৃষকের পরিচিতি:</h3>
            
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3.5">
                <img
                  src={product.farmer.avatar}
                  alt={product.farmer.name}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-emerald-500"
                />
                <div>
                  <div className="flex items-center space-x-1.5">
                    <h4 className="font-bold text-slate-900 text-base">{product.farmer.name}</h4>
                    {product.farmer.verified && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                    )}
                  </div>
                  <p className="text-xs text-slate-500">জেলা: {product.farmer.district}, {product.farmer.upazila}</p>
                  <div className="flex items-center space-x-2 text-xs text-amber-600 font-bold mt-1">
                    <span className="flex items-center">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-0.5" />
                      {product.farmer.rating}
                    </span>
                    <span className="text-slate-300">|</span>
                    <span className="text-slate-600 font-normal">অভিজ্ঞতা: {product.farmer.experience}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Farmer Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              
              {showPhone ? (
                <a
                  href={`tel:${product.farmer.phone}`}
                  className="flex items-center justify-center space-x-2 py-3 bg-emerald-600 text-white font-bold text-sm rounded-xl shadow-md animate-in fade-in"
                >
                  <Phone className="w-4 h-4" />
                  <span>{product.farmer.phone} (কল দিন)</span>
                </a>
              ) : (
                <button
                  onClick={() => setShowPhone(true)}
                  className="flex items-center justify-center space-x-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>কৃষকের ফোন নম্বর দেখুন</span>
                </button>
              )}

              <button
                onClick={() => setShowInquiryModal(true)}
                className="flex items-center justify-center space-x-2 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>মেসেজ / অনুসন্ধান বার্তা</span>
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6 pt-8 border-t border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900">অন্যান্য প্রাসঙ্গিক শস্যসমূহ</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map(rel => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}

      {/* INQUIRY MODAL */}
      {showInquiryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-slate-100">
            <h3 className="font-bold text-slate-900 text-lg">কৃষকের নিকট বার্তা পাঠান</h3>
            <p className="text-xs text-slate-500">পণ্য: {product.title}</p>

            {inquirySent ? (
              <div className="bg-emerald-50 p-4 rounded-xl text-center text-emerald-800 text-sm font-bold">
                ✓ আপনার বার্তা সফলভাবে কৃষকের নিকট পাঠানো হয়েছে!
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">আপনার বার্তা/অর্ডার পরিমাণ:</label>
                  <textarea
                    rows={4}
                    value={inquiryText}
                    onChange={(e) => setInquiryText(e.target.value)}
                    required
                    placeholder="যেমন: আমি ৫০ মণ নাজিরশাইল চাল ঢাকায় নিতে চাই, আপনার সর্বনিম্ন দর কত?"
                    className="w-full p-3 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  ></textarea>
                </div>

                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-md hover:bg-emerald-700"
                  >
                    পাঠিয়ে দিন
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowInquiryModal(false)}
                    className="py-2.5 px-4 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-200"
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
