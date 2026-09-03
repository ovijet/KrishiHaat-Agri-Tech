'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Star, Trash2, Eye, CheckCircle, RefreshCw } from 'lucide-react';

export default function ManageProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.success) setProducts(data.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('আপনি কি নিশ্চিত যে এই ফসলটি ডিলিট করতে চান?')) {
      try {
        const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
        const data = await res.json();
        if (data.success) fetchProducts();
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
      
      <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2 text-amber-700 font-bold text-xs uppercase tracking-wider mb-1">
            <ShoppingBag className="w-4 h-4" />
            <span>এডমিন ড্যাশবোর্ড</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900">ফসল ও পণ্য মডারেশন প্যানেল</h1>
        </div>

        <button
          onClick={fetchProducts}
          className="p-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold flex items-center space-x-1"
        >
          <RefreshCw className="w-4 h-4" />
          <span>রিফ্রেশ</span>
        </button>
      </div>

      {loading ? (
        <div className="py-12 text-center text-slate-400">ডাটা লোড হচ্ছে...</div>
      ) : (
        <div className="overflow-x-auto border border-slate-200 rounded-2xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 text-white font-bold">
              <tr>
                <th className="p-3">ফসল ও ছবি</th>
                <th className="p-3">কৃষক / স্থান</th>
                <th className="p-3 text-right">মূল্য</th>
                <th className="p-3 text-center">স্ট্যাটাস</th>
                <th className="p-3 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="p-3">
                    <div className="flex items-center space-x-3">
                      <img src={p.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                      <div>
                        <p className="font-bold text-slate-900 line-clamp-1">{p.title}</p>
                        <span className="text-[10px] text-emerald-700 font-semibold">{p.category}</span>
                      </div>
                    </div>
                  </td>

                  <td className="p-3">
                    <p className="font-bold text-slate-800">{p.farmer.name}</p>
                    <p className="text-[10px] text-slate-400">{p.district}, {p.upazila}</p>
                  </td>

                  <td className="p-3 text-right font-black text-emerald-700">
                    ৳ {p.price} /{p.unit}
                  </td>

                  <td className="p-3 text-center">
                    {p.isFeatured ? (
                      <span className="bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded text-[10px]">
                        ★ ফিচার্ড
                      </span>
                    ) : (
                      <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px]">
                        সাধারণ
                      </span>
                    )}
                  </td>

                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Link
                        href={`/products/${p.id}`}
                        className="p-1.5 bg-slate-100 text-slate-700 rounded hover:bg-slate-200"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>

                      <button
                        onClick={() => handleDelete(p.id)}
                        className="p-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}
