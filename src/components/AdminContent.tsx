'use client';

import { useState, useEffect, useCallback } from 'react';

interface GalleryImage {
  id: number;
  category: string;
  file_key: string;
  sort_order: number;
  title: string | null;
  product_tag: string | null;
  url?: string;
}

const categories = [
  { value: 'hero', label: '首页Hero图' },
  { value: 'core_values', label: '核心价值图' },
  { value: 'product', label: '产品图' },
  { value: 'app', label: '应用场景图' },
  { value: 'cert', label: '资质认证图' },
  { value: 'advantage', label: '核心优势图' },
];

const ADMIN_PASSWORD = 'morpho2026'; // Demo: 生产环境应使用环境变量+服务端验证

export default function AdminContent() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeCat, setActiveCat] = useState('hero');
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [sortOrder, setSortOrder] = useState('0');
  const [productTag, setProductTag] = useState('');

  const loadImages = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/gallery/${activeCat}`);
      const data = await res.json();
      if (data.success) {
        setImages(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [activeCat]);

  useEffect(() => {
    if (authed) {
      loadImages();
    }
  }, [authed, activeCat, loadImages]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
      setError('');
    } else {
      setError('密码错误');
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    const file = fileInput?.files?.[0];
    if (!file) {
      alert('请选择图片文件');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', activeCat);
    if (title) formData.append('title', title);
    if (sortOrder) formData.append('sort_order', sortOrder);

    // 产品图和应用图必须选择产品标签
    if (activeCat === 'product' || activeCat === 'app') {
      if (!productTag) {
        alert('请选择产品标签');
        setUploading(false);
        return;
      }
      formData.append('product_tag', productTag);
    }

    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setTitle('');
        setSortOrder('0');
        setProductTag('');
        if (fileInput) fileInput.value = '';
        loadImages();
      } else {
        alert('上传失败：' + data.error);
      }
    } catch (err) {
      alert('上传失败');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('确认删除这张图片？')) return;
    try {
      const res = await fetch(`/api/gallery/item/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        loadImages();
      } else {
        alert('删除失败：' + data.error);
      }
    } catch {
      alert('删除失败');
    }
  };

  const handleUpdateSort = async (id: number, newSort: number) => {
    try {
      const res = await fetch(`/api/gallery/item/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sort_order: newSort }),
      });
      const data = await res.json();
      if (data.success) {
        loadImages();
      }
    } catch {
      // ignore
    }
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream px-6">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
          <div className="mb-6 text-center">
            <img src="/morpho-logo.png" alt="Logo" className="mx-auto mb-3 h-12 w-12" />
            <h1 className="text-xl font-bold text-text-main">管理后台</h1>
            <p className="mt-1 text-sm text-text-muted"></p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="请输入密码"
                className="w-full rounded-lg border border-border px-4 py-3 text-sm focus:border-morpho focus:outline-none focus:ring-2 focus:ring-morpho/20"
              />
              {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-morpho py-3 text-sm font-semibold text-white transition-all hover:bg-morpho-dark"
            >
              登录
            </button>
          </form>
          <p className="mt-4 text-center text-xs text-text-muted">
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream pt-20">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-text-main">图片管理后台</h1>
          <button
            onClick={() => setAuthed(false)}
            className="rounded-lg border border-border bg-white px-4 py-2 text-sm text-text-muted hover:text-morpho"
          >
            退出
          </button>
        </div>

        {/* Category Tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCat(cat.value)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                activeCat === cat.value
                  ? 'bg-morpho text-white'
                  : 'bg-white text-text-muted hover:text-morpho border border-border'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Upload Form */}
        <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-text-main">上传新图片</h2>
          <form onSubmit={handleUpload} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-text-muted">图片文件</label>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  className="w-full text-xs text-text-muted file:mr-3 file:rounded-lg file:border-0 file:bg-morpho-light file:px-4 file:py-2 file:text-sm file:font-medium file:text-morpho hover:file:bg-morpho/10"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-text-muted">标题（可选）</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="图片标题"
                  className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-morpho focus:outline-none focus:ring-2 focus:ring-morpho/20"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-text-muted">排序（数字越小越前）</label>
                <input
                  type="number"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-morpho focus:outline-none focus:ring-2 focus:ring-morpho/20"
                />
              </div>
            </div>
            {(activeCat === 'product' || activeCat === 'app') && (
              <div className="max-w-xs">
                <label className="mb-1 block text-xs font-medium text-text-muted">
                  产品标签 <span className="text-red-500">*</span>
                </label>
                <select
                  value={productTag}
                  onChange={(e) => setProductTag(e.target.value)}
                  className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-morpho focus:outline-none focus:ring-2 focus:ring-morpho/20"
                >
                  <option value="">请选择产品</option>
                  <option value="cloud">闪蝶浮云 (cloud)</option>
                  <option value="cheese">闪蝶芝云 (cheese)</option>
                </select>
              </div>
            )}
            <button
              type="submit"
              disabled={uploading}
              className="rounded-lg bg-morpho px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-morpho-dark disabled:opacity-50"
            >
              {uploading ? '上传中...' : '上传图片'}
            </button>
          </form>
        </div>

        {/* Image List */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-text-main">
            当前图片 ({images.length})
          </h2>
          {loading ? (
            <p className="py-8 text-center text-sm text-text-muted">加载中...</p>
          ) : images.length === 0 ? (
            <p className="py-8 text-center text-sm text-text-muted">暂无图片，请上传</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {images.map((img) => (
                <div key={img.id} className="group relative overflow-hidden rounded-lg border border-border bg-muted">
                  <div className="aspect-square w-full overflow-hidden">
                    <img
                      src={img.url}
                      alt={img.title || `Image ${img.id}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="bg-white p-3">
                    <p className="truncate text-xs font-medium text-text-main">
                      {img.title || `#${img.id}`}
                    </p>
                    {img.product_tag && (
                      <span className="mt-1 inline-block rounded-full bg-morpho-light px-2 py-0.5 text-[10px] font-medium text-morpho">
                        {img.product_tag === 'cloud' ? '闪蝶浮云' : img.product_tag === 'cheese' ? '闪蝶芝云' : img.product_tag}
                      </span>
                    )}
                    <div className="mt-2 flex items-center gap-2">
                      <input
                        type="number"
                        value={img.sort_order}
                        onChange={(e) => handleUpdateSort(img.id, parseInt(e.target.value) || 0)}
                        className="w-16 rounded border border-border px-2 py-1 text-xs"
                        title="排序"
                      />
                      <button
                        onClick={() => handleDelete(img.id)}
                        className="ml-auto text-xs text-red-500 hover:text-red-600"
                      >
                        删除
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
