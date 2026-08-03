import { NextRequest, NextResponse } from 'next/server';
import { getAllImages, addImage } from '@/lib/gallery';

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

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const record = await addImage({
      category,
      fileName: file.name,
      fileContent: buffer,
      contentType: file.type,
      title: title || undefined,
      productTag: productTag || undefined,
      sortOrder: sortOrderStr ? parseInt(sortOrderStr, 10) : undefined,
    });

    return NextResponse.json({ success: true, data: record });
  } catch (error) {
    const message = error instanceof Error ? error.message : '未知错误';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
