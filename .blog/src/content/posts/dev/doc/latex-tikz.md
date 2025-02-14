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
---

# TikZ：LaTeX绘图渲染效果样例

[TikZ](https://tikz.dev/)是LaTeX的绘图工具，它的特点是：
- 语法复杂，但功能强大，生成的图形效果专业、美观
- 支持各种专业图形，如电路图、化学结构式、贝叶斯网络、费曼图等
- 与LaTeX无缝集成，支持直接嵌入文档

> 很遗憾，现在MathJax还不支持TikZ的渲染（而且看起来可能永远都没法支持）

## 效果展示

### 电路图

$$
\documentclass{article}
\usepackage{tikz}
\usepackage{circuitikz}
\begin{document}
\begin{figure}[h!]
  \begin{center}
    \begin{circuitikz}
      \draw (0,0)
      to[V,v=$U_q$] (0,2) % 电压源
      to[short] (2,2)
      to[R=$R_1$] (2,0) % 电阻
      to[short] (0,0);
    \end{circuitikz}
    \caption{first circuit.}
  \end{center}
\end{figure}
\end{document}
$$

### 化学结构式

$$
\documentclass{article}
\usepackage{chemobabel}
\usepackage{chemfig}
\begin{document}
\noindent Chemfig\\[5mm]
\chemfig{*6 (-=-=-=)}\\[1cm]
Chemobabel\\[5mm]
\smilesobabel{c1ccccc1}{}
\end{document}
$$

### 贝叶斯网络

$$
\documentclass[tikz,border=0.1cm]{standalone}
\usepackage{tikz}
\usetikzlibrary{bayesnet}
\usepackage{amsmath, amsfonts, amssymb}
\tikzset{>=latex}

\begin{document}
\begin{tikzpicture}
\node[circle,draw=black,fill=gray!20,inner sep=0pt,minimum size=0.8cm] (obs) at (2,-1) {\small{$y_{ijt}$}};
\node[circle,draw=black,fill=green!10] (ui) at (0.8,0) {\small{$\boldsymbol{u}_{i}$}};
\node[circle,draw=black,fill=green!10] (vj) at (2,1) {\small{$\boldsymbol{v}_{j}$}};
\node[circle,draw=black,fill=green!10] (xt) at (3.2,0) {\small{$\boldsymbol{x}_{t}$}};
\node[circle,draw=black,fill=green!10] (tau) at (4.2,-1) {\small{$\tau$}};
\path[draw=black,->] (ui) edge (obs);
\path[draw=black,->] (vj) edge (obs);
\path[draw=black,->] (xt) edge (obs);
\path[draw=black,->] (tau) edge (obs);
\node [text width=0.8cm] (m) at (1,-1.2) {\small{$m$}};
\plate[] {plate1} {(obs)(ui)(m)} { };
\node [text width=0.9cm] (n) at (2,-2.3) {\small{$n$}};
\plate[] {plate2} {(obs)(vj)(n)} { };
\node [text width=0.2cm] (f) at (3.2,-1.3) {\small{$f$}};
\plate[] {plate3} {(obs)(xt)(f)} { };
\node[circle,draw=black,fill=red!10,inner sep=0pt,minimum size=0.7cm] (muv) at (1.3,2.2) {\small{$\boldsymbol{\mu}_{v}$}};
\node[circle,draw=black,fill=red!10,inner sep=0pt,minimum size=0.7cm] (lambdav) at (2.7,2.2) {\small{$\Lambda_{v}$}};
\node[text width=0.6cm] (gamma) at (4.2,0) {\small{$\alpha,\beta$}};
\node[text width=0.4cm] (mu0) at (1.3,3.2) {\small{$\boldsymbol{\mu}_{0}$}};
\node[text width=0.9cm] (wnu0) at (2.7,3.2) {\small{$W_{0},\nu_{0}$}};
\node[text width=0.6cm] (cdots1) at (0.8,0.8) {\LARGE\color{red!50}{$\cdots$}};
\node[text width=0.6cm] (cdots2) at (3.2,0.8) {\LARGE\color{red!50}{$\cdots$}};
\path[draw=black,->] (muv) edge (vj);
\path[draw=black,->] (lambdav) edge (vj);
\path[draw=black,->] (lambdav) edge (muv);
\path[draw=black,->] (mu0) edge (muv);
\path[draw=black,->] (wnu0) edge (lambdav);
\path[draw=black,->] (gamma) edge (tau);
\end{tikzpicture}
\end{document}
$$

### 费曼图

$$
\feynmandiagram [horizontal=a to b] {
i1 [particle=\(e^{-}\)] -- [fermion] a -- [fermion] i2 [particle=\(e^{+}\)],
a -- [photon, edge label=\(\gamma\), momentum&#39;=\(k\)] b,
f1 [particle=\(\mu^{+}\)] -- [fermion] b -- [fermion] f2 [particle=\(\mu^{-}\)],
};
$$
