import { NextResponse } from 'next/server';
import { getStore, setCurrentUser, initialUsers } from '@/lib/store';

export async function GET() {
  const { currentUser } = getStore();
  return NextResponse.json({ success: true, user: currentUser });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { role } = body;

    let userToSet;
    if (role === 'admin') {
      userToSet = initialUsers.find(u => u.role === 'admin');
    } else {
      userToSet = initialUsers.find(u => u.role === 'farmer');
    }

    if (body.customName) {
      userToSet = {
        ...userToSet,
        name: body.customName,
        phone: body.phone || userToSet.phone,
        role: body.role || 'farmer'
      };
    }

    setCurrentUser(userToSet);
    return NextResponse.json({ success: true, user: userToSet });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
