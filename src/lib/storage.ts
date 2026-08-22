import { getSupabaseClient } from '@/storage/database/supabase-client';

const BUCKET_NAME = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || 'Morpho_gallery';

/**
 * 获取当前使用的 Storage Bucket 名称（用于调试）
 */
export function getBucketName(): string {
  return BUCKET_NAME;
}

/**
 * 获取当前连接的 Supabase URL（用于调试，脱敏显示）
 */
export function getSupabaseUrlMasked(): string {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.COZE_SUPABASE_URL || '';
  if (!url) return '(not set)';
  try {
    const u = new URL(url);
    // 只显示项目ID部分，方便用户确认
    return u.hostname;
  } catch {
    return url.substring(0, 30) + '...';
  }
}

/**
 * 获取公开访问的图片 URL（Supabase Storage public bucket）
 */
export function getImageUrl(fileKey: string): string {
  const supabase = getSupabaseClient();
  const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(fileKey);
  return data.publicUrl;
}

/**
 * 上传文件到 Supabase Storage
 */
export async function uploadFile(
  fileKey: string,
  file: File | Buffer,
  contentType?: string
): Promise<string> {
  const supabase = getSupabaseClient();

  const fileContent = file instanceof File ? file : file;

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(fileKey, fileContent, {
      contentType: contentType || 'image/jpeg',
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    throw new Error(
      `上传失败 [bucket: ${BUCKET_NAME}] [url: ${getSupabaseUrlMasked()}] ${error.message}`
    );
  }

  return fileKey;
}

/**
 * 从 Supabase Storage 删除文件
 */
export async function deleteFile(fileKey: string): Promise<void> {
  const supabase = getSupabaseClient();
  const { error } = await supabase.storage.from(BUCKET_NAME).remove([fileKey]);

  if (error) {
    throw new Error(
      `删除文件失败 [bucket: ${BUCKET_NAME}] [url: ${getSupabaseUrlMasked()}] ${error.message}`
    );
  }
}
