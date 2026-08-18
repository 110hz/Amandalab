import { NextRequest, NextResponse } from 'next/server';
import { getAllImages, createImage } from '@/lib/gallery';
import { verifyAdminPassword } from '@/lib/auth';

export async function GET() {
  try {
    const images = await getAllImages();
    return NextResponse.json({ success: true, data: images });
  } catch (error) {
    const message = error instanceof Error ? error.message : '未知错误';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // 鉴权验证
    if (!verifyAdminPassword(request)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const category = formData.get('category') as string;
    const title = formData.get('title') as string | null;
    const productTag = formData.get('product_tag') as string | null;
    const sortOrderStr = formData.get('sort_order') as string | null;

    if (!file) {
      return NextResponse.json({ success: false, error: '缺少文件' }, { status: 400 });
    }
    if (!category) {
      return NextResponse.json({ success: false, error: '缺少分类' }, { status: 400 });
    }

    const record = await createImage(
      category,
      file,
      title || undefined,
      sortOrderStr ? parseInt(sortOrderStr, 10) : undefined,
      productTag || undefined
    );

    return NextResponse.json({ success: true, data: record });
  } catch (error) {
    const message = error instanceof Error ? error.message : '未知错误';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
