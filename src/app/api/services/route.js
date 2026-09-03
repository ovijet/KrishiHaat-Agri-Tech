import { NextResponse } from 'next/server';
import { getStore } from '@/lib/store';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const district = searchParams.get('district');
  const category = searchParams.get('category');
  const search = searchParams.get('search');

  let { services } = getStore();

  if (district && district !== 'সকল জেলা') {
    services = services.filter(s => s.district === district);
  }

  if (category && category !== 'সকল সেবা') {
    services = services.filter(s => s.category === category);
  }

  if (search) {
    const q = search.toLowerCase();
    services = services.filter(s => 
      s.name.toLowerCase().includes(q) || 
      s.category.toLowerCase().includes(q) ||
      s.district.toLowerCase().includes(q)
    );
  }

  return NextResponse.json({ success: true, data: services });
}
