---
title: "TikZ：LaTeX绘图渲染效果样例"
description: "LaTex绘图工具的使用"
pubDate: "2025-02-04 23:35:02"
category: "dev"
banner: "@images/banners/banner-dev-doc.jpg"
tags: ["dev", "doc", "latex", "tikz"]
oldViewCount: 0
oldKeywords: []
formula: mathjax
tikz: true
---

# TikZ：LaTeX绘图渲染效果样例

[TikZ](https://tikz.dev/)是LaTeX的绘图工具，它的特点是：
- 语法复杂，但功能强大，生成的图形效果专业、美观
- 支持各种专业图形，如电路图、化学结构式、贝叶斯网络、费曼图等
- 与LaTeX无缝集成，支持直接嵌入文档

很遗憾，现在[MathJax](https://www.mathjax.org/)还不支持TikZ的渲染（而且看起来可能永远都没法支持）。

不过，我们可利用[TikZJax](https://tikzjax.com/)单独渲染TikZ图形（无法内嵌在LaTeX中统一排版），具体实现可参考以下两个项目：
- [obsidian-tikzjax](https://github.com/artisticat1/obsidian-tikzjax)
- [hexo-tikzjax](https://github.com/prinsss/hexo-filter-tikzjax/tree/main)

> 尽管暂时还无法完整支持TikZ渲染，但已可创作很多专业图形了

## 效果展示

### 函数图像

``` tikz
\begin{document}
  \begin{tikzpicture}[domain=0:4,scale=1.1]
    \draw[very thin,color=gray] (-0.1,-1.1) grid (3.9,3.9);
    \draw[->] (-0.2,0) -- (4.2,0) node[right] {$x$};
    \draw[->] (0,-1.2) -- (0,4.2) node[above] {$f(x)$};
    \draw[color=red]    plot (\x,\x)             node[right] {$f(x) =x$};
    \draw[color=blue]   plot (\x,{sin(\x r)})    node[right] {$f(x) = \sin x$};
    \draw[color=orange] plot (\x,{0.05*exp(\x)}) node[right] {$f(x) = \frac{1}{20} \mathrm e^x$};
  \end{tikzpicture}
\end{document}
```

### 电路图

``` tikz
\usepackage{circuitikz}
\begin{document}

\begin{circuitikz}[american, voltage shift=0.5]
\draw (0,0)
to[isource, l=$I_0$, v=$V_0$] (0,3)
to[short, -*, i=$I_0$] (2,3)
to[R=$R_1$, i>_=$i_1$] (2,0) -- (0,0);
\draw (2,3) -- (4,3)
to[R=$R_2$, i>_=$i_2$]
(4,0) to[short, -*] (2,0);
\end{circuitikz}

\end{document}
```

### 化学结构式（ChemFig）

``` tikz
\usepackage{chemfig}
\begin{document}

\chemfig{[:-90]HN(-[::-45](-[::-45]R)=[::+45]O)>[::+45]*4(-(=O)-N*5(-(<:(=[::-60]O)-[::+60]OH)-(<[::+0])(<:[::-108])-S>)--)}

\end{document}
```

### PGF数据图

``` tikz
\usepackage{pgfplots}
\pgfplotsset{compat=1.16}

\begin{document}

\begin{tikzpicture}
\begin{axis}[colormap/viridis]
\addplot3[
	surf,
	samples=18,
	domain=-3:3
]
{exp(-x^2-y^2)*x};
\end{axis}
\end{tikzpicture}

\end{document}
```
