# AGENTS.md

## 项目概览
- **名称**：AMANDA LAB · MORPHO 闪蝶浮云官方网站
- **描述**：面向 B 端客户（餐饮、咖啡、茶饮品牌）的双语产品官网，展示闪蝶浮云系列产品、资质认证与企业信息
- **技术栈**：Next.js 16 (App Router) + React 19 + TypeScript 5 + Tailwind CSS 4 + shadcn/ui

## 目录结构
```
├── src/
│   ├── app/
│   │   ├── globals.css          # 全局样式 + 品牌主题色
│   │   ├── layout.tsx           # 根布局（Metadata）
│   │   └── page.tsx             # 主页（单页滚动）
│   ├── components/
│   │   ├── Navbar.tsx           # 导航栏 + 语言切换
│   │   ├── HeroSection.tsx      # 首页 Hero 区域
│   │   ├── CoreValues.tsx       # 核心价值展示
│   │   ├── ProductSection.tsx   # 产品介绍（Tab 切换）
│   │   ├── FAQSection.tsx       # 常见问题（手风琴）
│   │   ├── AboutSection.tsx     # 关于我们（时间线 + 资质）
│   │   ├── Footer.tsx           # 页脚
│   │   └── ui/                  # shadcn/ui 组件库
│   ├── hooks/
│   │   ├── use-mobile.ts        # 移动端检测
│   │   └── use-fade-in.ts       # 滚动淡入动画 Hook
│   ── lib/
│       ├── utils.ts             # cn() 工具函数
│       ── i18n.ts              # 双语内容字典
├── DESIGN.md                    # 设计规范
└── .coze                        # 构建与运行配置
```

## 构建与测试
```bash
pnpm install          # 安装依赖
pnpm dev              # 开发服务器（HMR）
pnpm build            # 生产构建
pnpm ts-check         # 类型检查
pnpm lint --quiet     # Lint 检查
```

## 开发规范
- **包管理器**：仅使用 pnpm
- **TypeScript**：strict 模式，禁止隐式 any
- **组件规范**：使用 shadcn/ui 组件，遵循 Radix UI 无障碍标准
- **Hydration**：动态内容必须用 'use client' + useEffect + useState
- **样式**：Tailwind CSS 4，品牌色在 globals.css 的 @theme 中定义

## 品牌色
- 主色（闪蝶蓝）：`#2B6CB0` → Tailwind: `text-morpho`, `bg-morpho`
- 辅助色（奶白）：`#FAFAF8` → Tailwind: `bg-cream`
- 暖金：`#C9A96E` → Tailwind: `text-warm-gold`
- 文字主色：`#1A1A2E` → Tailwind: `text-text-main`
- 文字辅助：`#6B7280` → Tailwind: `text-text-muted`

## 双语支持
- 所有文案在 `src/lib/i18n.ts` 中管理
- 类型 `Lang = 'zh' | 'en'`
- 通过 `content.xxx[lang]` 访问对应语言文案

## 常见修改位置
- 修改文案 → `src/lib/i18n.ts`
- 修改品牌色 → `src/app/globals.css` 的 `@theme inline` 和 `:root`
- 修改导航 → `src/components/Navbar.tsx`
- 修改产品内容 → `src/components/ProductSection.tsx` + `i18n.ts`
- 修改资质/时间线 → `src/components/AboutSection.tsx` + `i18n.ts`
