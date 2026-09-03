import { NextResponse } from 'next/server';
import { getStore } from '@/lib/store';

export async function GET() {
  const { products, marketRates, services } = getStore();

  const stats = {
    totalUsers: 14250,
    activeFarmers: 9800,
    activeBuyers: 4450,
    totalProducts: products.length,
    marketRatesCount: marketRates.length,
    serviceProvidersCount: services.length,
    totalTransactions: "১.৮ কোটি টাকা",
    pendingReviews: 3,
    topDistricts: [
      { name: "বগুড়া", count: 420 },
      { name: "দিনাজপুর", count: 380 },
      { name: "রাজশাহী", count: 350 },
      { name: "রংপুর", count: 310 }
    ]
  };

  return NextResponse.json({ success: true, data: stats });
}
