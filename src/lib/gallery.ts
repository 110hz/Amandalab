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

export async function getImagesByCategory(category: string): Promise<GalleryImageRecord[]> {
  if (!isValidCategory(category)) {
    return [];
  }
  const client = getSupabaseClient();
  const { data, error } = await client
    .from('gallery_images')
    .select('*')
    .eq('category', category)
    .order('sort_order', { ascending: true })
    .order('id', { ascending: true });

  if (error) throw new Error(`查询图片失败: ${error.message}`);

  const records = (data || []) as GalleryImageRecord[];
  // Generate URLs
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

export async function addImage(params: {
  category: string;
  fileName: string;
  fileContent: Buffer;
  contentType: string;
  title?: string;
  productTag?: string;
  sortOrder?: number;
}): Promise<GalleryImageRecord> {
  if (!isValidCategory(params.category)) {
    throw new Error('无效的分类');
  }

  // Upload to storage
  const safeName = params.fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
  const storedKey = await storage.uploadFile({
    fileContent: params.fileContent,
    fileName: `gallery/${params.category}/${Date.now()}_${safeName}`,
    contentType: params.contentType,
  });

  // Get sort order
  const sortOrder = params.sortOrder ?? 0;

  // Insert into DB
  const client = getSupabaseClient();
  const { data, error } = await client
    .from('gallery_images')
    .insert({
      category: params.category,
      file_key: storedKey,
      sort_order: sortOrder,
      title: params.title || null,
      product_tag: params.productTag || null,
    })
    .select()
    .single();

  if (error) throw new Error(`添加图片失败: ${error.message}`);

  const record = data as GalleryImageRecord;
  record.url = await getImageUrl(record.file_key);
  return record;
}

export async function updateImage(
  id: number,
  params: { title?: string; sortOrder?: number; productTag?: string }
): Promise<GalleryImageRecord> {
  const client = getSupabaseClient();
  const updateData: Record<string, string | number | null> = {};
  if (params.title !== undefined) updateData.title = params.title || null;
  if (params.sortOrder !== undefined) updateData.sort_order = params.sortOrder;
  if (params.productTag !== undefined) updateData.product_tag = params.productTag || null;
  updateData.updated_at = new Date().toISOString();

  const { data, error } = await client
    .from('gallery_images')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(`更新图片失败: ${error.message}`);

  const record = data as GalleryImageRecord;
  record.url = await getImageUrl(record.file_key);
  return record;
}

export async function deleteImage(id: number): Promise<void> {
  const client = getSupabaseClient();

  // Get file key first
  const { data, error: fetchError } = await client
    .from('gallery_images')
    .select('file_key')
    .eq('id', id)
    .single();

  if (fetchError) throw new Error(`获取图片信息失败: ${fetchError.message}`);

  const record = data as { file_key: string };

  // Delete from storage
  await storage.deleteFile({ fileKey: record.file_key }).catch(() => {
    // Ignore storage delete errors, still delete DB record
  });

  // Delete from DB
  const { error } = await client.from('gallery_images').delete().eq('id', id);
  if (error) throw new Error(`删除图片失败: ${error.message}`);
}
