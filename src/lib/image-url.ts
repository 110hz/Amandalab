// 纯工具函数：根据文件 key 构建 Supabase Storage 公开 URL
// 此文件不依赖 supabase client，可安全地在客户端组件中使用

export function getImageUrl(fileKey: string): string {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.Coze_SUPABASE_URL ||
    process.env.COZE_SUPABASE_URL ||
    '';
  const bucket = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || 'Morpho_gallery';
  if (!url || !fileKey) return '';
  return `${url}/storage/v1/object/public/${bucket}/${fileKey}`;
}
