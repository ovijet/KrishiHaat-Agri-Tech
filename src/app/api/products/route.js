import { NextResponse } from 'next/server';
import { getStore, addProduct } from '@/lib/store';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const district = searchParams.get('district');
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const isOrganic = searchParams.get('isOrganic');
  const isFeatured = searchParams.get('isFeatured');

  let { products } = getStore();

  if (district && district !== 'সকল জেলা') {
    products = products.filter(p => p.district === district);
  }

  if (category && category !== 'সকল ক্যাটাগরি') {
    products = products.filter(p => p.category === category);
  }

  if (isOrganic === 'true') {
    products = products.filter(p => p.isOrganic);
  }

  if (isFeatured === 'true') {
    products = products.filter(p => p.isFeatured);
  }

  if (search) {
    const q = search.toLowerCase();
    products = products.filter(p => 
      p.title.toLowerCase().includes(q) || 
      p.district.toLowerCase().includes(q) ||
      p.farmer.name.toLowerCase().includes(q)
    );
  }

  return NextResponse.json({ success: true, data: products });
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.title || !body.category || !body.price || !body.quantity) {
      return NextResponse.json({ success: false, error: 'আবশ্যকীয় ঘরগুলো পূরণ করুন' }, { status: 400 });
    }

    const newProduct = addProduct(body);
    return NextResponse.json({ success: true, data: newProduct });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
