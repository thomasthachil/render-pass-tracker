import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST() {
  try {
    await prisma.renderPassReport.deleteMany();
    return NextResponse.json({ message: 'All data cleared successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error clearing data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}