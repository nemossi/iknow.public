---
title: "MathJax：公式渲染效果样例"
description: "完整LaTeX语法支持，功能强大"
pubDate: "2025-02-04 19:40:02"
category: "dev"
banner: "@images/banners/banner-dev-doc.jpg"
tags: ["dev", "doc", "latex", "mathjax"]
oldViewCount: 0
oldKeywords: []
---

# MathJax：公式渲染效果样例

内联公式（`$`...`$`）：$E=mc^2$

块级公式（`$$`...`$$`）：
$$
E=mc^2
$$

块级公式(`math`代码块)：
``` math
E=mc^2
```

MathML

<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
  <mi>x</mi> <mo>=</mo>
  <mrow>
    <mfrac>
      <mrow>
        <mo>&#x2212;</mo>
        <mi>b</mi>
        <mo>&#x00B1;</mo>
        <msqrt>
          <msup><mi>b</mi><mn>2</mn></msup>
          <mo>&#x2212;</mo>
          <mn>4</mn><mi>a</mi><mi>c</mi>
        </msqrt>
      </mrow>
      <mrow>
        <mn>2</mn><mi>a</mi>
      </mrow>
    </mfrac>
  </mrow>
  <mtext>.</mtext>
</math>

## 样例展示

*在这里只展示`Tikz`等`KaTex`所不支持的渲染效果*

### 电路图

$$
\begin{circuitikz}[american]
\draw (0,0) to[isource, l=$I_0$] (0,3) --
        (2,3)
   to[R=$R_1$] (2,0) -- (0,0);
   \draw (2,3) -- (4,3) to[R=$R_2$]
(4,0) -- (2,0); \end{circuitikz}
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

### 费曼图

$$
\feynmandiagram [horizontal=a to b] {
i1 [particle=\(e^{-}\)] -- [fermion] a -- [fermion] i2 [particle=\(e^{+}\)],
a -- [photon, edge label=\(\gamma\), momentum&#39;=\(k\)] b,
f1 [particle=\(\mu^{+}\)] -- [fermion] b -- [fermion] f2 [particle=\(\mu^{-}\)],
};
$$
