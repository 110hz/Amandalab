import { getSupabaseClient } from '@/storage/database/supabase-client';
import { getImageUrl, uploadFile, deleteFile } from '@/lib/storage';

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
  return records.map((r) => ({
    ...r,
    url: getImageUrl(r.file_key),
  }));
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
  return records.map((r) => ({
    ...r,
    url: getImageUrl(r.file_key),
  }));
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

  // 上传文件到 Supabase Storage
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const fileKey = `gallery/${category}/${Date.now()}_${safeName}`;

  await uploadFile(fileKey, file, file.type || 'image/jpeg');

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

  if (error) throw new Error(`保存图片记录失败: ${error.message}`);

  const record = data as GalleryImageRecord;
  return {
    ...record,
    url: getImageUrl(record.file_key),
  };
}

export async function updateImage(
  id: number,
  updates: { title?: string; sort_order?: number; product_tag?: string }
): Promise<GalleryImageRecord> {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from('gallery_images')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(`更新图片失败: ${error.message}`);

  const record = data as GalleryImageRecord;
  return {
    ...record,
    url: getImageUrl(record.file_key),
  };
}

export async function deleteImage(id: number): Promise<void> {
  const client = getSupabaseClient();

  // 先查 file_key
  const { data: record, error: queryError } = await client
    .from('gallery_images')
    .select('file_key')
    .eq('id', id)
    .single();

  if (queryError) throw new Error(`查询图片失败: ${queryError.message}`);

  // 删除存储文件
  if (record?.file_key) {
    try {
      await deleteFile(record.file_key);
    } catch (e) {
      console.warn('删除存储文件失败:', e);
    }
  }

  // 删除数据库记录
  const { error } = await client
    .from('gallery_images')
    .delete()
    .eq('id', id);

  if (error) throw new Error(`删除图片记录失败: ${error.message}`);
}

export { getImageUrl };
