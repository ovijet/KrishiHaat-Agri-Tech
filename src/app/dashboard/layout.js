'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  PlusCircle, 
  PackageCheck, 
  UserCheck, 
  ShieldAlert, 
  TrendingUp, 
  ShoppingBag, 
  Sprout, 
  LogOut,
  ChevronRight
} from 'lucide-react';

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetch('/api/auth')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setCurrentUser(data.user);
        }
      });
  }, [pathname]);

  const navItems = [
    { name: 'ড্যাশবোর্ড ওভারভিউ', href: '/dashboard', icon: LayoutDashboard },
    { name: 'নতুন ফসল যোগ করুন', href: '/dashboard/add-product', icon: PlusCircle },
    { name: 'আমার ফসল তালিকা', href: '/dashboard/my-products', icon: PackageCheck },
    { name: 'আমার প্রোফাইল', href: '/dashboard/profile', icon: UserCheck },
  ];

  const adminItems = [
    { name: 'এডমিন অ্যানালিটিক্স', href: '/dashboard/admin', icon: ShieldAlert },
    { name: 'বাজারদর পরিবর্তন', href: '/dashboard/admin/manage-rates', icon: TrendingUp },
    { name: 'ফসল মডারেশন', href: '/dashboard/admin/manage-products', icon: ShoppingBag },
  ];

  const isActive = (path) => pathname === path;

  return (
    <div className="min-h-screen bg-slate-100/60 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* User Banner */}
        {currentUser && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <img
                src={currentUser.avatar}
                alt=""
                className="w-14 h-14 rounded-full object-cover ring-2 ring-emerald-500"
              />
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-xl font-bold text-slate-900">{currentUser.name}</h2>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    currentUser.role === 'admin' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {currentUser.role === 'admin' ? 'এডমিন ড্যাশবোর্ড' : 'কৃষক অ্যাকাউন্ট'}
                  </span>
                </div>
                <p className="text-xs text-slate-500">ফোন: {currentUser.phone} | জেলা: {currentUser.district}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Link
                href="/dashboard/add-product"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center space-x-1"
              >
                <PlusCircle className="w-4 h-4" />
                <span>ফসল বিক্রির বিজ্ঞাপন</span>
              </Link>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar */}
          <aside className="lg:col-span-3 space-y-4">
            
            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-1">
              <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                কৃষক মেনু
              </p>
              {navItems.map(item => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      active
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-emerald-700'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-slate-400'}`} />
                      <span>{item.name}</span>
                    </div>
                    {active && <ChevronRight className="w-4 h-4 text-white" />}
                  </Link>
                );
              })}
            </div>

            {/* Admin Menu Section if Admin */}
            {currentUser?.role === 'admin' && (
              <div className="bg-amber-500/10 rounded-2xl p-4 border border-amber-200 space-y-1">
                <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-amber-800">
                  এডমিন প্যানেল কন্ট্রোল
                </p>
                {adminItems.map(item => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        active
                          ? 'bg-amber-600 text-white shadow-xs'
                          : 'text-amber-900 hover:bg-amber-100/60'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-amber-700'}`} />
                        <span>{item.name}</span>
                      </div>
                      {active && <ChevronRight className="w-4 h-4 text-white" />}
                    </Link>
                  );
                })}
              </div>
            )}

          </aside>

          {/* Main Dashboard Area */}
          <main className="lg:col-span-9 space-y-6">
            {children}
          </main>

        </div>

      </div>
    </div>
  );
}
