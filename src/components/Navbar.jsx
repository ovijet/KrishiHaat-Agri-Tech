"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Sprout,
  TrendingUp,
  ShoppingBag,
  Wrench,
  PlusCircle,
  User,
  LogOut,
  LayoutDashboard,
  Shield,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const fetchUser = async () => {
    try {
      const res = await fetch("/api/auth");
      const data = await res.json();
      if (data.success) {
        setCurrentUser(data.user);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [pathname]);

  // const handleRoleSwitch = async (role) => {
  //   try {
  //     const res = await fetch('/api/auth', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ role })
  //     });
  //     const data = await res.json();
  //     if (data.success) {
  //       setCurrentUser(data.user);
  //       setIsDropdownOpen(false);
  //       if (role === 'admin') {
  //         router.push('/dashboard/admin');
  //       } else {
  //         router.push('/dashboard');
  //       }
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  const navLinks = [
    { name: "হোম", href: "/", icon: Sprout },
    { name: "বাজারদর", href: "/market-rates", icon: TrendingUp },
    { name: "ফসল/পণ্য তালিকা", href: "/products", icon: ShoppingBag },
    { name: "স্থানীয় সেবা", href: "/services", icon: Wrench },
  ];

  const isActive = (path) => pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-green-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-200">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-600 bg-clip-text text-transparent">
                কৃষিহাট
              </span>
              <span className="text-[10px] font-semibold tracking-wider text-emerald-600 uppercase block -mt-1">
                KrishiHaat Agri-Tech
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? "bg-emerald-50 text-emerald-700 font-semibold"
                      : "text-slate-600 hover:text-emerald-600 hover:bg-slate-50"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${active ? "text-emerald-600" : "text-slate-400"}`}
                  />
                  <span>{link.name}</span>
                </Link>
              );
            })}

            {/* Sell Crop Button */}
            <Link
              href="/dashboard/add-product"
              className="flex items-center space-x-1.5 ml-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-200 transform active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>ফসল বিক্রি করুন</span>
            </Link>
          </nav>

          {/* User Auth Section */}
          <div className="hidden md:flex items-center space-x-3">
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 p-1.5 rounded-full hover:bg-slate-100 transition-colors border border-slate-200"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500"
                  />
                  <div className="text-left hidden lg:block pr-1">
                    <p className="text-xs font-semibold text-slate-800 line-clamp-1">
                      {currentUser.name}
                    </p>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full font-medium">
                      {currentUser.role === "admin"
                        ? "এডমিন"
                        : "কৃষক / বিক্রয়ক"}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                {/* User Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95">
                    <div className="px-4 py-2.5 border-b border-slate-100">
                      <p className="text-sm font-bold text-slate-900">
                        {currentUser.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {currentUser.phone}
                      </p>
                      <span className="inline-block mt-1 text-[11px] bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded-md">
                        জেলা: {currentUser.district}
                      </span>
                    </div>

                    <div className="py-1">
                      <Link
                        href="/dashboard"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                      >
                        <LayoutDashboard className="w-4 h-4 text-emerald-600" />
                        <span>ইউজার ড্যাশবোর্ড</span>
                      </Link>

                      {currentUser.role === "admin" && (
                        <Link
                          href="/dashboard/admin"
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-amber-700 hover:bg-amber-50"
                        >
                          <Shield className="w-4 h-4 text-amber-600" />
                          <span>এডমিন প্যানেল</span>
                        </Link>
                      )}

                      <Link
                        href="/dashboard/profile"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                      >
                        <User className="w-4 h-4 text-emerald-600" />
                        <span>আমার প্রোফাইল</span>
                      </Link>
                    </div>

                    {/* Quick Demo Switcher */}
                    <div className="px-3 py-2 bg-slate-50 border-t border-b border-slate-100 my-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        ডেমো রোল পরিবর্তন করুন
                      </p>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleRoleSwitch("farmer")}
                          className={`flex-1 text-xs py-1 rounded font-medium ${
                            currentUser.role === "farmer"
                              ? "bg-emerald-600 text-white"
                              : "bg-white border text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          কৃষক
                        </button>
                        <button
                          onClick={() => handleRoleSwitch("admin")}
                          className={`flex-1 text-xs py-1 rounded font-medium ${
                            currentUser.role === "admin"
                              ? "bg-amber-600 text-white"
                              : "bg-white border text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          এডমিন
                        </button>
                      </div>
                    </div>

                    <div className="pt-1">
                      <Link
                        href="/login"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>লগআউট করুন</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                >
                  লগইন
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-colors"
                >
                  রেজিস্ট্রেশন
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-emerald-600 hover:bg-slate-100"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-2 pb-6 space-y-3 shadow-lg">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
              >
                <Icon className="w-5 h-5 text-emerald-600" />
                <span>{link.name}</span>
              </Link>
            );
          })}
          <Link
            href="/dashboard/add-product"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-center space-x-2 w-full py-3 bg-emerald-600 text-white font-semibold rounded-xl"
          >
            <PlusCircle className="w-5 h-5" />
            <span>ফসল বিক্রি করুন</span>
          </Link>
          {currentUser ? (
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={currentUser.avatar}
                  alt=""
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    {currentUser.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {currentUser.role === "admin" ? "এডমিন" : "কৃষক"}
                  </p>
                </div>
              </div>
              <Link
                href="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-lg"
              >
                ড্যাশবোর্ড
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-center py-2 border border-emerald-600 text-emerald-700 font-semibold rounded-lg"
              >
                লগইন
              </Link>
              <Link
                href="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-center py-2 bg-emerald-600 text-white font-semibold rounded-lg"
              >
                রেজিস্টার
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
