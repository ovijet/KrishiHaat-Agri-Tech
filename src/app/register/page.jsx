"use client";

import Link from "next/link";
import {
  Sprout,
  Phone,
  Lock,
  User,
  MapPin,
  ArrowRight,
  Mail,
} from "lucide-react";
import { useState } from "react";

export default function RegisterPage() {
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // File size check - 5MB
    if (file.size > 5 * 1024 * 1024) {
      alert("ছবির সাইজ সর্বোচ্চ 5MB হতে হবে");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      // ImgBB API
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();

      if (data.success) {
        setImageUrl(data.data.url);
      } else {
        alert("ছবি আপলোড করা যায়নি");
      }
    } catch (error) {
      console.error(error);
      alert("ছবি আপলোড করতে সমস্যা হয়েছে");
    } finally {
      setUploading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const form = e.target;

    const name = form.name.value;
    const phone = form.phone.value;
    const district = form.district.value;
    const password = form.password.value;

    const userData = {
      name,
      phone,
      district,
      password,
      image: imageUrl,
    };

    console.log("Register Data:", userData);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
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
            নতুন অ্যাকাউন্ট তৈরি করুন
          </h2>

          <p className="text-xs text-slate-500">
            প্রান্তিক কৃষক ও সরাসরি পাইকারি শস্য ক্রয়-বিক্রয়ে যোগ দিন
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleRegisterSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              আপনার নাম
            </label>

            <div className="relative">
              <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />

              <input
                name="name"
                type="text"
                placeholder="আপনার নাম"
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              মোবাইল নম্বর
            </label>

            <div className="relative">
              <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />

              <input
                name="phone"
                placeholder="01700000000"
                // pattern="01[3-9][0-9]{8}"
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>
          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              ইমেইল
            </label>

            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />

              <input
                name="email"
                type="email"
                placeholder="your@email.com"
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {/* District
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              জেলা নির্বাচন করুন
            </label>

            <div className="relative">
              <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />

              <select
                name="district"
                required
                defaultValue=""
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none cursor-pointer"
              >
                <option value="" disabled>
                  জেলা নির্বাচন করুন
                </option>

                {[
                  "বগুড়া",
                  "দিনাজপুর",
                  "রাজশাহী",
                  "পাবনা",
                  "রংপুর",
                  "ঢাকা",
                  "যশোর",
                  "খুলনা",
                  "সিলেট",
                ].map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>
          </div> */}

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              পাসওয়ার্ড সেট করুন
            </label>

            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />

              <input
                name="password"
                type="password"
                placeholder="••••••••"
                minLength={6}
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Profile Image Upload */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              প্রোফাইল ছবি
            </label>

            <div className="flex items-center gap-5 p-4 rounded-xl">
              <label className="group relative w-200 h-50 border-2 border-dashed border-slate-200 hover:border-emerald-400 rounded-xl cursor-pointer overflow-hidden flex items-center justify-center bg-white transition-all">
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={handleImageUpload}
                />

                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="profile"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                ) : (
                  <span className="text-sm text-slate-400 group-hover:text-emerald-500 text-center transition-colors">
                    ইমেজ আপলোড করুন <br /> ক্লিক করুন বা ড্র্যাগ করুন <br /> PNG, JPG, WEBP
                    (সর্বোচ্চ 5MB)
                  </span>
                )}
              </label>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || uploading}
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white font-bold text-sm rounded-xl shadow-md transition-colors flex items-center justify-center space-x-2"
          >
            <span>{loading ? "নিবন্ধন হচ্ছে..." : "নিবন্ধন করুন"}</span>

            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        {/* Login */}
        <div className="text-center pt-2">
          <p className="text-xs text-slate-500">
            পূর্বেই অ্যাকাউন্ট রয়েছে?{" "}
            <Link
              href="/login"
              className="font-bold text-emerald-700 hover:underline"
            >
              লগইন করুন
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
