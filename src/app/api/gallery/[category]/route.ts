import { NextRequest, NextResponse } from 'next/server';
import { getImagesByCategory } from '@/lib/gallery';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ category: string }> }
) {
  try {
    const { category } = await params;
    const images = await getImagesByCategory(category);
    return NextResponse.json({ success: true, data: images });
  } catch (error) {
    const message = error instanceof Error ? error.message : '未知错误';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
