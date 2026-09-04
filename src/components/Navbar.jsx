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
        <div className="flex justify-between items-center h-16">
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
            <div>
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="border flex border-emerald-600 px-3 text-emerald-700 font-semibold rounded-lg text-center py-2"
              >
               <User/> প্রবেশ করুন
              </Link>
            </div>
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
