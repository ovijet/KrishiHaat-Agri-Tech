'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Phone, CheckCircle2, Leaf, Eye, ArrowRight, Package } from 'lucide-react';

export default function ProductCard({ product }) {
  const [showCallModal, setShowCallModal] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden group">
      
      {/* Image Showcase */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className="bg-emerald-600/90 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs">
            {product.category}
          </span>
          {product.isOrganic && (
            <span className="bg-amber-500/90 backdrop-blur-md text-slate-950 text-[11px] font-extrabold px-2 py-1 rounded-full shadow-xs flex items-center gap-1">
              <Leaf className="w-3 h-3 fill-slate-950" /> অর্গানিক
            </span>
          )}
        </div>

        {/* Location Badge */}
        <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-lg flex items-center space-x-1 shadow-sm">
          <MapPin className="w-3.5 h-3.5 text-emerald-400" />
          <span>{product.district}, {product.upazila}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div>
          <Link href={`/products/${product.id}`} className="group-hover:text-emerald-700 transition-colors">
            <h3 className="font-bold text-slate-900 text-lg leading-snug line-clamp-2 mb-2">
              {product.title}
            </h3>
          </Link>
          
          <div className="flex items-baseline justify-between pt-1">
            <div>
              <span className="text-2xl font-extrabold text-emerald-700">৳ {product.price.toLocaleString('bn-BD')}</span>
              <span className="text-xs text-slate-500 font-medium ml-1">/ {product.unit}</span>
            </div>

            <div className="flex items-center space-x-1 text-xs text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md font-medium">
              <Package className="w-3.5 h-3.5 text-slate-500" />
              <span>মজুদ: {product.quantity} {product.unit}</span>
            </div>
          </div>
        </div>

        {/* Farmer Info Bar */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <img
              src={product.farmer.avatar}
              alt={product.farmer.name}
              className="w-8 h-8 rounded-full object-cover ring-1 ring-emerald-500"
            />
            <div>
              <div className="flex items-center space-x-1">
                <span className="text-xs font-bold text-slate-800 line-clamp-1">{product.farmer.name}</span>
                {product.farmer.verified && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
                )}
              </div>
              <span className="text-[10px] text-slate-400 block">কৃষক (অভিজ্ঞতা {product.farmer.experience})</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <Link
            href={`/products/${product.id}`}
            className="flex items-center justify-center space-x-1 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-slate-600" />
            <span>বিবরণ</span>
          </Link>

          <button
            onClick={() => setShowCallModal(true)}
            className="flex items-center justify-center space-x-1 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>কল করুন</span>
          </button>
        </div>

      </div>

      {/* Quick Call Modal */}
      {showCallModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4 border border-slate-100 text-center">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <Phone className="w-6 h-6" />
            </div>
            
            <div>
              <h4 className="font-bold text-slate-900 text-lg">{product.farmer.name}</h4>
              <p className="text-xs text-slate-500 mt-0.5">{product.farmer.district}, {product.farmer.upazila}</p>
            </div>

            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
              <p className="text-xs text-emerald-800 font-medium mb-1">কৃষকের সরাসরি ফোন নম্বর:</p>
              <a
                href={`tel:${product.farmer.phone}`}
                className="text-2xl font-black text-emerald-700 hover:underline tracking-wider"
              >
                {product.farmer.phone}
              </a>
            </div>

            <p className="text-[11px] text-slate-400">
              পণ্য: {product.title} (মূল্য: ৳{product.price}/{product.unit})
            </p>

            <div className="flex space-x-2 pt-2">
              <a
                href={`tel:${product.farmer.phone}`}
                className="flex-1 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-md hover:bg-emerald-700 transition-colors"
              >
                ডায়াল করুন
              </a>
              <button
                onClick={() => setShowCallModal(false)}
                className="py-2.5 px-4 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-200"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
