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
    - [x] 首页：
    - [x] 索引：时间线、主题分类及过滤
    - [x] 配色：两套配色方案（深色、浅色），动态切换
    - [ ] 外链：友链、项目、收藏
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

## 网站构建及部署
