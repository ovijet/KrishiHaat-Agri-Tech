import { NextResponse } from 'next/server';
import { getStore, addRate } from '@/lib/store';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const district = searchParams.get('district');
  const category = searchParams.get('category');
  const query = searchParams.get('query');

  let { marketRates } = getStore();

  if (district && district !== 'সকল জেলা') {
    marketRates = marketRates.filter(r => r.district === district);
  }

  if (category && category !== 'সকল ক্যাটাগরি') {
    marketRates = marketRates.filter(r => r.category === category);
  }

  if (query) {
    const q = query.toLowerCase();
    marketRates = marketRates.filter(r => 
      r.crop.toLowerCase().includes(q) || 
      r.district.toLowerCase().includes(q)
    );
  }

  return NextResponse.json({ success: true, data: marketRates });
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.crop || !body.district || !body.todayPrice) {
      return NextResponse.json({ success: false, error: 'সকল তথ্য প্রদান করুন' }, { status: 400 });
    }

    const newRate = addRate(body);
    return NextResponse.json({ success: true, data: newRate });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
