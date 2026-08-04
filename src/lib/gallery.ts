import { getSupabaseClient } from '@/storage/database/supabase-client';
import { storage, getImageUrl } from '@/lib/storage';

export interface GalleryImageRecord {
  id: number;
  category: string;
  file_key: string;
  sort_order: number;
  title: string | null;
  product_tag: string | null;
  created_at: string;
  updated_at: string | null;
  url?: string;
}

const validCategories = ['hero', 'core_values', 'product', 'app', 'cert', 'advantage'];

function isValidCategory(category: string): boolean {
  return validCategories.includes(category);
}

export async function getImagesByCategory(
  category: string,
  productTag?: string
): Promise<GalleryImageRecord[]> {
  if (!isValidCategory(category)) {
    return [];
  }
  const client = getSupabaseClient();
  let query = client
    .from('gallery_images')
    .select('*')
    .eq('category', category);

  if (productTag) {
    query = query.eq('product_tag', productTag);
  }

  const { data, error } = await query
    .order('sort_order', { ascending: true })
    .order('id', { ascending: true });

  if (error) throw new Error(`查询图片失败: ${error.message}`);

  const records = (data || []) as GalleryImageRecord[];
  const recordsWithUrls = await Promise.all(
    records.map(async (r) => ({
      ...r,
      url: await getImageUrl(r.file_key),
    }))
  );
  return recordsWithUrls;
}

export async function getAllImages(): Promise<GalleryImageRecord[]> {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from('gallery_images')
    .select('*')
    .order('category', { ascending: true })
    .order('sort_order', { ascending: true })
    .order('id', { ascending: true });

  if (error) throw new Error(`查询图片失败: ${error.message}`);

  const records = (data || []) as GalleryImageRecord[];
  const recordsWithUrls = await Promise.all(
    records.map(async (r) => ({
      ...r,
      url: await getImageUrl(r.file_key),
    }))
  );
  return recordsWithUrls;
}

export async function createImage(
  category: string,
  file: File,
  title?: string,
  sortOrder?: number,
  productTag?: string
): Promise<GalleryImageRecord> {
  if (!isValidCategory(category)) {
    throw new Error('无效的分类');
  }

  // 上传文件到对象存储
  const timestamp = Date.now();
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const objectKey = `gallery/${category}/${timestamp}_${safeName}`;

  const arrayBuffer = await file.arrayBuffer();
  const fileKey = await storage.uploadFile({
    fileContent: Buffer.from(arrayBuffer),
    fileName: safeName,
    contentType: file.type || 'image/jpeg',
  });

  // 写入数据库
  const client = getSupabaseClient();
  const { data, error } = await client
    .from('gallery_images')
    .insert({
      category,
      file_key: fileKey,
      sort_order: sortOrder ?? 0,
      title: title || null,
      product_tag: productTag || null,
    })
    .select()
    .single();

  if (error) throw new Error(`保存图片失败: ${error.message}`);

  return {
    ...data,
    url: await getImageUrl(data.file_key),
  } as GalleryImageRecord;
}

export async function deleteImage(id: number): Promise<void> {
  const client = getSupabaseClient();

  // 先查 file_key
  const { data: record, error: fetchErr } = await client
    .from('gallery_images')
    .select('file_key')
    .eq('id', id)
    .single();

  if (fetchErr || !record) throw new Error('图片不存在');

  // 删除对象存储文件
  try {
    await storage.deleteFile({ fileKey: (record as { file_key: string }).file_key });
  } catch {
    // 文件删除失败不影响数据库删除
  }

  // 删除数据库记录
  const { error } = await client
    .from('gallery_images')
    .delete()
    .eq('id', id);

  if (error) throw new Error(`删除失败: ${error.message}`);
}

export async function updateImage(
  id: number,
  data: { title?: string; sort_order?: number; product_tag?: string }
): Promise<GalleryImageRecord> {
  const client = getSupabaseClient();
  const { data: updated, error } = await client
    .from('gallery_images')
    .update({
      ...data,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(`更新失败: ${error.message}`);

  return {
    ...updated,
    url: await getImageUrl(updated.file_key),
  } as GalleryImageRecord;
}
