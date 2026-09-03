import { NextResponse } from 'next/server';
import { getStore, deleteProduct } from '@/lib/store';

export async function GET(request, { params }) {
  const { id } = await params;
  const { products } = getStore();
  const product = products.find(p => p.id === id);

  if (!product) {
    return NextResponse.json({ success: false, error: 'পণ্যটি পাওয়া যায়নি' }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: product });
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  deleteProduct(id);
  return NextResponse.json({ success: true, message: 'পণ্য সফলভাবে মুছে ফেলা হয়েছে' });
}
