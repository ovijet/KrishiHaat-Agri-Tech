"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sprout, Phone, Lock, ArrowRight, AlertCircle, Mail } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries());
    console.log("Login data:", userData);

    const { data, error } = await authClient.signIn.email({
      ...userData,
    });

    if (error) {
      toast.error(error?.message || "error");
      return;
    }

    if (data) {
      toast("Signup successful");
      router.push("/");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xl">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
              <Sprout className="w-6 h-6" />
            </div>
            <span className="text-2xl font-black text-slate-900">কৃষিহাট</span>
          </Link>
          <h2 className="text-2xl font-extrabold text-slate-900">
            অ্যাকাউন্টে লগইন করুন
          </h2>
          <p className="text-xs text-slate-500">
            আপনার মোবাইল নম্বর ও পাসওয়ার্ড প্রদান করুন
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-700 text-xs font-semibold">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        <div>
          <button
            type="button"
            className="w-full py-3.5 border border-slate-400 hover:border-yellow-400 disabled:bg-emerald-300 text-slate-700 font-bold text-sm rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
          >
            <FcGoogle className="text-2xl" />
            <span>Google দিয়ে প্রবেশ করুন</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              ইমেইল (ঐচ্ছিক)
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <input
                name="email"
                type="email"
                placeholder="your@email.com"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              পাসওয়ার্ড:
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md transition-colors flex items-center justify-center space-x-2"
          >
            <span>{loading ? "লগইন হচ্ছে..." : "লগইন করুন"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2">
          <p className="text-xs text-slate-500">
            নতুন একাউন্ট খুলতে চান?{" "}
            <Link
              href="/register"
              className="font-bold text-emerald-700 hover:underline"
            >
              এখানে রেজিস্ট্রেশন করুন
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
