import React from 'react';
import Link from 'next/link';
import { Sprout, PhoneCall, Mail, MapPin, Globe, Share2, MessageCircle, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-slate-800">
          
          {/* Col 1: About */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-green-400 flex items-center justify-center text-slate-900 shadow-md">
                <Sprout className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">
                কৃষিহাট <span className="text-xs font-normal text-emerald-400 block -mt-1">KrishiHaat Agri-Tech</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              প্রান্তিক কৃষক, স্থানীয় সেবা প্রদানকারী এবং পাইকারি ও খুচরা ক্রেতাদের সরাসরি সংযুক্ত করার জন্য একটি বিশ্বস্ত ডিজিটাল এগ্রি-টেক ও ডিরেক্টরি প্ল্যাটফর্ম।
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-colors text-slate-400"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-colors text-slate-400"
              >
                <Share2 className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-colors text-slate-400"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider">দ্রুত লিংকসমূহ</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition-colors">হোম পেজ</Link>
              </li>
              <li>
                <Link href="/market-rates" className="hover:text-emerald-400 transition-colors">দৈনন্দিন বাজারদর</Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-emerald-400 transition-colors">সকল শস্য ও ফসল</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-emerald-400 transition-colors">গ্রামীণ সেবা ডিরেক্টরি</Link>
              </li>
              <li>
                <Link href="/dashboard/add-product" className="hover:text-emerald-400 transition-colors">ফসল বিক্রি করুন</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider">শস্য ক্যাটাগরি</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products?category=ধান ও চাল" className="hover:text-emerald-400 transition-colors">ধান ও চাল</Link>
              </li>
              <li>
                <Link href="/products?category=সবজি" className="hover:text-emerald-400 transition-colors">তাজা শাক-সবজি</Link>
              </li>
              <li>
                <Link href="/products?category=ফলমূল" className="hover:text-emerald-400 transition-colors">মৌসুমী ফলমূল</Link>
              </li>
              <li>
                <Link href="/products?category=ডাল ও তেলবীজ" className="hover:text-emerald-400 transition-colors">ডাল ও তেলবীজ</Link>
              </li>
              <li>
                <Link href="/products?category=সবজি ও মশলা" className="hover:text-emerald-400 transition-colors">দেশি মশলা</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Support */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider">যোগাযোগ ও হেল্পলাইন</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <PhoneCall className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-400">টোল ফ্রি হেল্পলাইন:</p>
                  <p className="font-bold text-white">১৬১২৩ / ০৯৬১২-৩৪৫৬৭৮</p>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="text-slate-300">support@krishihaat.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-xs leading-snug text-slate-400">
                  কৃষি ভবন, খামারবাড়ি, ফার্মগেট, ঢাকা-১২১৫, বাংলাদেশ
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>© ২০২৬ কৃষিহাট (KrishiHaat)। সর্বস্বত্ব সংরক্ষিত।</span>
          </div>
          <div className="flex items-center space-x-1 text-slate-400">
            <span>ডিজিটাল বাংলাদেশ ও স্মার্ট কৃষির সাথে</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline mx-1" />
            <span>সরাসরি কৃষকবান্ধব উদ্যোগ।</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
