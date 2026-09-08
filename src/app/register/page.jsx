"use client";

import Link from "next/link";
import {
  Sprout,
  Phone,
  Lock,
  User,
  ArrowRight,
  Mail,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const { data: session } = authClient.useSession();
  const user = session?.user;
  console.log(user, "xxxxxxxxxxxxxxx");

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("ছবির সাইজ সর্বোচ্চ 5MB হতে হবে");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      if (!apiKey) {
        throw new Error("ImgBB API Key পাওয়া যায়নি");
      }

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
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
    } catch (err) {
      console.error(err);
      alert("ছবি আপলোড করতে সমস্যা হয়েছে");
    } finally {
      setUploading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries());
    userData.profileImage = imageUrl;

    console.log("User Data:", userData);

    const { data, error } = await authClient.signUp.email({
      ...userData,
    });
    if (error) {
      toast.error(error?.message || "Signup failed");
      return;
    }

    if (data) {
      toast("Signup successful");
      router.push("/");
    }

    // google
  };

  const handleGoogleSignUp = async () => {
    try {
      const { data, error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        console.error("Google Auth Error:", error);
        toast.error(error.message || "Google signup failed");
        return;
      }

      console.log("Google Auth:", data);
    } catch (err) {
      console.error("Google Auth Exception:", err);
      toast.error("Something went wrong");
    }
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

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-700 text-xs font-semibold">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        <div>
          <button
            onClick={handleGoogleSignUp}
            type="button"
            className="w-full py-3.5 border border-slate-400 hover:border-yellow-400 disabled:bg-emerald-300 text-slate-700 font-bold text-sm rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
          >
            <FcGoogle className="text-2xl" />
            <span>Google দিয়ে অ্যাকাউন্ট তৈরি করুন</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleRegisterSubmit} className="space-y-4">
          {/* Role selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              অ্যাকাউন্টের ধরন
            </label>
            <select
              name="role"
              defaultValue="farmer"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none cursor-pointer"
            >
              <option value="farmer">কৃষক (ফসল বিক্রি করব)</option>
              <option value="buyer">ক্রেতা/পাইকারি ব্যবসায়ী (ফসল কিনব)</option>
            </select>
          </div>

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
                placeholder="আপনার পূর্ণ নাম"
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
                type="tel"
                placeholder="01700000000"
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

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

          {/* District */}
          {/* <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              জেলা নির্বাচন করুন
            </label>
            <select
              name="district"
              defaultValue="বগুড়া"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none cursor-pointer"
            >
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
              প্রোফাইল ছবি (ঐচ্ছিক)
            </label>
            <div className="flex items-center gap-5 p-4 rounded-xl">
              <label className="group relative w-full h-24 border-2 border-dashed border-slate-200 hover:border-emerald-400 rounded-xl cursor-pointer overflow-hidden flex items-center justify-center bg-white transition-all">
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
                  <span className="text-xs text-slate-400 group-hover:text-emerald-500 text-center transition-colors">
                    {uploading
                      ? "ছবি আপলোড হচ্ছে..."
                      : "ইমেজ আপলোড করুন (PNG, JPG, WEBP, সর্বোচ্চ 5MB)"}
                  </span>
                )}
              </label>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white font-bold text-sm rounded-xl shadow-md transition-colors flex items-center justify-center space-x-2"
          >
            <span>নিবন্ধন করুন</span>
            <ArrowRight className="w-4 h-4" />
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
