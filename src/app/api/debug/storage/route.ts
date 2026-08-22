import { NextResponse } from 'next/server';
import { getBucketName, getSupabaseUrlMasked } from '@/lib/storage';
import { getSupabaseClient } from '@/storage/database/supabase-client';

/**
 * 调试接口：查看当前 Supabase 连接和 bucket 状态
 * 访问 /api/debug/storage
 */
export async function GET() {
  try {
    const supabase = getSupabaseClient();
    const bucketName = getBucketName();
    const urlMasked = getSupabaseUrlMasked();

    // 尝试列出所有 bucket，确认连接是否正确
    const { data: buckets, error } = await supabase.storage.listBuckets();

    return NextResponse.json({
      success: true,
      data: {
        supabaseUrl: urlMasked,
        targetBucket: bucketName,
        targetBucketExists: buckets?.some(b => b.name === bucketName) || false,
        allBuckets: buckets?.map(b => ({
          name: b.name,
          public: b.public,
          file_size_limit: b.file_size_limit,
        })) || [],
      },
      error: error ? error.message : null,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || '未知错误' },
      { status: 500 }
    );
  }
}
