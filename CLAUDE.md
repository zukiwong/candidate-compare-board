# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述
Candidate Compare Board 是一个基于 React + TypeScript 的候选人比较看板应用，使用 Vite 作为构建工具。项目基于 Figma 设计（https://www.figma.com/design/XIpGhQua9c5Sae8Vkl1Sfq/Candidate-Compare-Board）实现。

## 开发命令
```bash
# 安装依赖
npm i

# 启动开发服务器（端口3000，自动打开浏览器）
npm run dev

# 构建生产版本
npm run build
```

## 技术栈和主要依赖
- **React 18.3.1** - 主框架
- **TypeScript** - 类型系统
- **Vite** - 构建工具和开发服务器
- **Tailwind CSS** - 样式框架（使用 v4.1.3）
- **Radix UI** - 完整的UI组件库（所有组件都是@radix-ui/*）
- **Lucide React** - 图标库
- **Sonner** - Toast通知组件
- **React Hook Form** - 表单处理
- **Recharts** - 图表组件
- **Next Themes** - 主题管理

## 核心架构

### 主要组件结构
```
src/
├── App.tsx                    # 主应用组件，包含所有状态管理和布局
├── main.tsx                   # React应用入口
├── components/
│   ├── ui/                    # shadcn/ui 风格的基础UI组件
│   ├── ComparisonTable.tsx    # 候选人比较表格组件
│   ├── CandidateCard.tsx      # 候选人详情卡片组件
│   ├── MainSidebar.tsx        # 主导航侧边栏
│   ├── DimensionFilterSidebar.tsx # 维度筛选侧边栏
│   └── mockData.ts           # 模拟数据定义
└── index.css                 # Tailwind CSS样式入口
```

### 应用核心功能
1. **候选人列表展示** - 网格布局显示候选人卡片
2. **搜索过滤** - 按姓名、学校、公司、技能等多字段搜索
3. **候选人选择** - 最多可选择5个候选人进行比较
4. **比较模式** - 切换到仅显示选中候选人的比较视图
5. **比较表格** - 横向对比候选人的各个维度
6. **维度管理** - 动态启用/禁用比较维度，支持拖拽排序
7. **行高亮** - 点击比较表格行突出显示该维度的表现

### 状态管理
所有状态都在 `App.tsx` 中管理：
- `candidates` - 候选人数据（来自mockData）
- `searchQuery` - 搜索关键词
- `activeDimensions` - 当前启用的比较维度
- `selectedCandidates` - 选中用于比较的候选人ID列表
- `isCompareMode` - 是否处于比较模式
- `highlightedRow` - 当前高亮的维度行

### UI组件系统
使用 shadcn/ui 组件库，所有UI组件位于 `src/components/ui/` 目录，包含：
- 基础组件（Button, Input, Badge等）
- 布局组件（Card, Tabs, Sheet等）
- 数据展示组件（Table, Progress, Chart等）
- 交互组件（Dialog, Popover, Tooltip等）

### 样式系统
- 使用 Tailwind CSS v4.1.3
- 支持深色/浅色主题切换（next-themes）
- CSS变量定义了设计系统的颜色和尺寸

## Vite配置特点
- 使用 SWC 插件进行 React 编译优化
- 配置了大量依赖的别名映射
- 构建输出到 `build/` 目录
- 开发服务器默认端口3000并自动打开浏览器

## 开发注意事项
- 所有React组件使用函数式组件和Hooks
- TypeScript严格模式，需要类型声明
- 使用 `useMemo` 优化搜索和筛选性能
- Toast通知使用sonner库，通过 `toast.success()` / `toast.error()` 调用
- 图标统一使用 lucide-react
- 响应式设计，使用Tailwind的响应式类名

## 测试和构建
项目未配置测试框架。构建使用 `npm run build` 命令，输出ES模块格式。