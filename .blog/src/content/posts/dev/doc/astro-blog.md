---
title: "Astro：搭建个人博客"
description: "内容至上，前端只是配角"
pubDate: "2025-02-04 16:25:35"
category: "dev"
banner: "@images/banners/banner-dev-doc.jpg"
tags: ["dev", "doc", "markdown", "astro"]
oldViewCount: 0
oldKeywords: []
---

# Astro：搭建个人博客

[静态网站生成工具排行榜](https://ossinsight.io/collections/static-site-generator/)

流行度比较高的静态网站生成工具很多，[Astro](https://astro.build/)是其中比较专业和强大的一个：
- 内容驱动，侧重静态内容网站，性能优秀
- 无需绑定特定的前端技术框架
- 无需搭建Python/Go等复杂开发环境
- 社区活跃，文档完善，网站模板丰富

[Astro官方文档](https://docs.astro.build/)非常详细，支持多国语言：
- 新手教程
- 主题模板
- 参考手册

本文将利用Astro定制个人博客网站，其主要功能包括：
- 网站模板
    - [x] 支持网站路径（如Github非同名仓库）
    - [x] 首页：导航条、尾部链接、推荐文章、最新文章
    - [x] 配色：两套配色方案（深色、浅色），动态切换
    - [x] 索引页：时间线、主题分类
    - [ ] 数据页：友链、项目、收藏
    - [ ] 讲演：Slidev集成
    - [ ] 评论：Giscus集成
- 文章渲染
    - [x] Github Flavor Markdown（GFM方言）兼容
    - [x] 代码语法高亮
    - [x] Mermaid图表
    - [x] Katex数学公式
    - [x] Emoji表情符号
    - [x] 解决H1标题重复渲染问题
    - [x] TOC目录
    - [x] 估算阅读时间
- 网站部署
    - [x] Github Pages
    - [ ] Netlify
    - [ ] Vercel

## 环境配置与项目初始化

``` shell
# 检查开发环境（前提条件）
node -v                     # 确保安装node
pnpm -v                     # 确保安装pnpm/npm

# 创建并初始化astro项目
pnpm create astro@latest                                # 使用内置模板，建议选Starter Kit或Blog模板
pnpm create astro@latest --template godruoyi/gblog      # 指定第三方模板，示例为个人博客模板
cd <my-blog>                                            # 进入项目目录（上一步指定）
pnpm install                                            # 安装依赖

# 启动开发服务器，用于本地调试
pnpm run dev                # 启动完成，可打开浏览器，访问提示地址，实时预览效果
```

不同模板可能略有差异，基本目录结构大致如下：
``` shell
.blog
├── .astro               # Astro配置文件
├── node_modules         # 依赖包
└── src
     ├── components      # 组件
     ├── content         # 内容（Markdown）
     ├── images          # 图像
     ├── layouts         # 布局
     └── pages           # 页面
```

可对项目模板做一些简单的个性化定制：
- 图文展示信息的修改
- 主题分类的调整

## Markdown的渲染

下面是`astro.config.mjs`的完整配置示例。

``` javascript
TODO
```
### Mermaid图表

按下面方法安装`rehype-mermaid`及其依赖环境playwright和浏览器：

``` shell
# 安装rehype-mermaid，用于渲染Markdown中的mermaid图表
pnpm install rehype-mermaid  
# 安装playright，rehype-mermaid依赖playwright和浏览器环境将Markdown中的mermaid图表渲染为SVG图像
pnpm add -D playwright
# 安装chrome浏览器，playwright不能用headless模式渲染mermaid图表
pnpm exec playwright install --with-deps chromium
```

`Astro`内置的`shiki`语法高亮默认运行在其它插件之前，这会对所有代码块（包括标记为 "mermaid" 的代码块）进行处理，转换为带内联样式的HTML，这会导致`rehypeMermaid`无法识别并转换这些`mermaid`图表。因此，我们要在`astro.config.mjs`中禁止`Astro`内置的`shiki`语法高亮，改用第三方的`rehype-shiki`语法高亮来替换，并确保语法高亮的处理放在`mermaid`图表渲染之后，以避免对`rehype-mermaid`渲染的干扰。

### 代码高亮

引用第三方的rehype-mermaid配置，要特别注意三点：
- 配合`rehype-mermaid`的渲染顺序，确保`rehype-shiki`在`rehype-mermaid`之后执行
- 调整`rehype-shiki`的配置，确保提供深色、浅色两套风格，以配合动态切换
- 内联代码（形如\``code`\`）的正确渲染
    - 内联代码会被`remark`解析为`<code>`标签，但我们禁止了可以处理内联代码的`astro`内置的`shiki`语法高亮，而随后添加的`rehype-shiki`又只处理多行代码块，不会处理内联代码，因此内联代码只会原样输出，不能被正确渲染
    - 为解决这个问题，我们需要添加一个`p code`的样式，以使内联代码能够被正确渲染

``` javascript
```

``` css
/* in src/styles/global.css */
p code {
  background-color: rgba(27, 31, 35, 0.05);
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
  font-size: 85%;
}
```

### 数学公式

- 引用和配置`remark-math`和`rehype-katex`插件
- 引入`katex.min.css`

TODO

## 评论

推荐使用`Giscus`评论系统，其特点如下：
- 无需注册，支持匿名评论
- 支持Github账号登录
- 支持多种主题风格

使用Giscus评论系统的前提条件有：
- 公开的[Github代码仓库](https://docs.github.com/zh/repositories/creating-and-managing-repositories/quickstart-for-repositories)，可直接用Astro博客网站的源码仓库
- 启用[Github Discussions](https://docs.github.com/zh/discussions/quickstart)功能

### 配置Github仓库

在Github讨论区里增加一个新分类，创建信息如下：

| 条目 | 配置 | 备注 |
| :-- | :-- | :-- |
| 名称, Name | Blog Post Comments | - |
| 描述, Description | for Giscus Comments on Astro Blog Posts | (可选) |
| 格式, Format | Open-ended discussion | - |

访问[giscus](https://github.com/apps/giscus)，根据提示安装并授权Giscus应用访问讨论区。

### 访问giscus.app 

访问[Giscus](https://giscus.app/)官网，按照提示进行配置：

| 条目 | 格式 | 备注 |
| :-- | :-- | :-- |
| 语言 | 自选，中英均可 | - |
| Github仓库 | 用户名/仓库名 | - |
| 页面映射方式 | 讨论标题包含页面URL | - |
| 讨论区分类 | Blog Post Comments | - |
| 功能特性 | 自选 | - |
| 主题配色 | 用户偏好的色彩方案 | - |

在启动giscus章节，你会得到一个类似下面的代码片段（记下来）：

``` html
<script src="https://giscus.app/client.js"
        data-repo="nemossi/iknow.public"
        data-repo-id="R_kgDONvs2BA"
        data-category="Blog Post Comments"
        data-category-id="DIC_kwDONvs2BM4Cm2sm"
        data-mapping="url"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="1"
        data-input-position="top"
        data-theme="preferred_color_scheme"
        data-lang="zh-CN"
        data-loading="lazy"
        crossorigin="anonymous"
        async>
</script>

### 配置Astro博客



## 网站构建及部署

| Host | Github Pages | Netlify | Vercel |
| :-- | :-- | :-- | :-- |
| 可访问性 | 较好，可能被GFW误伤 | 适合国内访问（全球CDN加速） | 适合海外访问 |
| 免费流量 | 无限制 | 100G（每月） | 100G（每月） |
| 免费构建 | 无限制 | 300分钟/月 | 1000分钟/月 |
| 自定义域名 | 支持 | 支持 | 支持 |
| 部署配置 | 略显复杂 | 简单 | 简单 |
| 日志监控 | 基础 | 详细 | 详细 |
| Serverless | 不支持 | 支持 | 支持 |
| 数据库 | 不支持 | 支持 | 支持 |

> 建议：
> - Github Pages：对编程技术有一定了解且不需要任何动态服务，可考虑Github Pages
> - Netlify：其它情况下的默认选择，尤其是中文网站（中国大陆用户访问较多）

### Github Pages

下面是一个简单的Github Pages部署示例：
- 构建触发条件
    - push到main分支
    - 每天0点16分
    - 手动触发
- 构建步骤
    - actions/checkout@v4: 拉取代码到本地仓库
    - withastro/action@v3: 编译、导出Astro网站
    - actions/deploy-pages@v4: 发布网站到gh-pages分支

``` yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  schedule:
    - cron: '16 0 * * *'
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Install dependencies, build, and export site
        uses: withastro/action@v3
        with:
          node-version: 22
          package-manager: pnpm
          path: .blog
          build-command: npm run build
          export-dir: dist
          
  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v4
        with:
          branch: gh-pages
          folder: .blog/dist
```
