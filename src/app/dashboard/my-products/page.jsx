'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PackageCheck, Trash2, Eye, PlusCircle, CheckCircle } from 'lucide-react';

export default function MyProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyProducts();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('আপনি কি নিশ্চিত যে এই পোস্টটি মুছে ফেলতে চান?')) {
      try {
        const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
        const data = await res.json();
        if (data.success) {
          fetchMyProducts();
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-emerald-700 font-bold text-xs uppercase tracking-wider mb-1">
            <PackageCheck className="w-4 h-4" />
            <span>আমার শস্য তালিকা</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900">পোস্ট করা ফসলসমূহ</h1>
        </div>

        <Link
          href="/dashboard/add-product"
          className="inline-flex items-center space-x-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs"
        >
          <PlusCircle className="w-4 h-4" />
          <span>নতুন ফসল পোস্ট করুন</span>
        </Link>
      </div>

      {loading ? (
        <div className="py-12 text-center text-slate-400 font-medium">
          ডাটা লোড হচ্ছে...
        </div>
      ) : products.length > 0 ? (
        <div className="divide-y divide-slate-100">
          {products.map(product => (
            <div key={product.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <img src={product.image} alt="" className="w-16 h-16 rounded-xl object-cover" />
                <div>
                  <h3 className="font-bold text-slate-900 text-sm line-clamp-1">{product.title}</h3>
                  <p className="text-xs text-emerald-700 font-black">৳ {product.price} /{product.unit}</p>
                  <p className="text-[11px] text-slate-400">অবস্থান: {product.district}, {product.upazila} | মজুদ: {product.quantity} {product.unit}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 self-end sm:self-center">
                <Link
                  href={`/products/${product.id}`}
                  className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold flex items-center space-x-1"
                >
                  <Eye className="w-4 h-4" />
                  <span>দেখুন</span>
                </Link>

                <button
                  onClick={() => handleDelete(product.id)}
                  className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-bold flex items-center space-x-1"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>মুছে ফেলুন</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center text-slate-400">
          আপনার কোনো সক্রিয় ফসল পোস্ট নেই।
        </div>
      )}

    </div>
  );
}
