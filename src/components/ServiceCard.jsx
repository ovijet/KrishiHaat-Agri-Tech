'use client';

import React, { useState } from 'react';
import { Phone, Star, MapPin, Wrench, CheckCircle, Clock } from 'lucide-react';

export default function ServiceCard({ service }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300 p-6 flex flex-col justify-between space-y-4">
      
      <div className="space-y-4">
        {/* Top Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3.5">
            <img
              src={service.avatar}
              alt={service.name}
              className="w-12 h-12 rounded-xl object-cover ring-2 ring-emerald-500/20"
            />
            <div>
              <h3 className="font-bold text-slate-900 text-base">{service.name}</h3>
              <p className="text-xs text-emerald-700 font-semibold">{service.category}</p>
            </div>
          </div>

          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
            service.status === 'available' 
              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
              : 'bg-amber-100 text-amber-800 border border-amber-200'
          }`}>
            {service.status === 'available' ? '● পাওয়া যাচ্ছে' : '● ব্যস্ত'}
          </span>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
          <div className="flex items-center space-x-1.5 text-slate-600">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span className="line-clamp-1">{service.district}, {service.upazila}</span>
          </div>
          <div className="flex items-center space-x-1.5 text-slate-600">
            <Clock className="w-3.5 h-3.5 text-emerald-600" />
            <span>অভিজ্ঞতা: {service.experience}</span>
          </div>
          <div className="flex items-center space-x-1.5 text-amber-600 font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{service.rating} ({service.reviewsCount} রিভিউ)</span>
          </div>
          <div className="font-bold text-slate-900">
            ৳ {service.rate}
          </div>
        </div>

        {/* Bio */}
        <p className="text-slate-600 text-xs leading-relaxed line-clamp-2">
          {service.bio}
        </p>

        {/* Skills Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {service.skills.map((skill, idx) => (
            <span key={idx} className="bg-slate-100 text-slate-700 text-[10px] font-medium px-2 py-0.5 rounded-md">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={() => setShowModal(true)}
        className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center space-x-1.5"
      >
        <Phone className="w-4 h-4" />
        <span>সেবাদাতাকে সরাসরি কল করুন</span>
      </button>

      {/* Phone Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4 text-center border border-slate-100">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <Phone className="w-6 h-6" />
            </div>

            <div>
              <h4 className="font-bold text-slate-900 text-lg">{service.name}</h4>
              <p className="text-xs text-emerald-700 font-semibold">{service.category}</p>
              <p className="text-xs text-slate-500 mt-1">{service.district}, {service.upazila}</p>
            </div>

            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
              <p className="text-xs text-emerald-800 font-medium mb-1">ফোন নম্বর:</p>
              <a
                href={`tel:${service.phone}`}
                className="text-2xl font-black text-emerald-700 hover:underline tracking-wider"
              >
                {service.phone}
              </a>
            </div>

            <p className="text-[11px] text-slate-500">
              সার্ভিস চার্জ: {service.rate}
            </p>

            <div className="flex space-x-2 pt-2">
              <a
                href={`tel:${service.phone}`}
                className="flex-1 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-md hover:bg-emerald-700"
              >
                কল দিন
              </a>
              <button
                onClick={() => setShowModal(false)}
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
