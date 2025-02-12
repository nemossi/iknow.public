---
title: "Katex：公式渲染效果样例"
description: "小巧、快速，支持常见LaTeX语法"
pubDate: "2025-02-04 19:35:02"
category: "dev"
banner: "@images/banners/banner-dev-doc.jpg"
tags: ["dev", "doc", "latex", "katex"]
oldViewCount: 0
oldKeywords: []
---

# Katex：公式渲染效果样例

内联公式：$E=mc^2$

块级公式：
$$
E = mc^2
$$

## 数学

### 勾股定理

$$
a^2 + b^2 = c^2
$$

### 三角函数
$$
\sin^2\theta + \cos^2\theta = 1
$$

### 欧拉公式
$$
e^{i\pi} + 1 = 0
$$

### 椭圆曲线方程

$$
y^2 = x^3 + ax + b
$$

### 范德蒙行列式

$$
\det\begin{pmatrix}
1 & 1 & \cdots & 1\\[1mm]
x_1 & x_2 & \cdots & x_n\\[1mm]
x_1^2 & x_2^2 & \cdots & x_n^2\\[1mm]
\vdots & \vdots & \ddots & \vdots\\[1mm]
x_1^{n-1} & x_2^{n-1} & \cdots & x_n^{n-1}
\end{pmatrix}
=\prod_{1\le i<j\le n}(x_j-x_i)\,.
$$

### 泰勒级数展开

$$
f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!}(x-a)^n\,.
$$

### 牛顿–莱布尼茨公式

$$
\int_a^b f'(x)\,dx = f(b) - f(a)\,.
$$

## 物理

### 爱因斯坦质能方程

$$
E = mc^2
$$

### 麦克斯韦方程组

$$
\nabla \cdot \mathbf{E} = \frac{\rho}{\varepsilon_0}\,,
$$

$$
\nabla \cdot \mathbf{B} = 0\,.
$$

$$
\nabla \times \mathbf{E} = -\frac{\partial \mathbf{B}}{\partial t}\,.
$$

$$
\nabla \times \mathbf{B} = \mu_0\mathbf{J} + \mu_0\varepsilon_0 \frac{\partial \mathbf{E}}{\partial t}\,.
$$

### 薛定谔方程

$$
i\hbar\,\frac{\partial \psi(\mathbf{r},t)}{\partial t} = \left[-\frac{\hbar^2}{2m}\nabla^2 + V(\mathbf{r},t)\right]\psi(\mathbf{r},t)
$$

- $i$，虚数单位
- $\hbar$，约化普朗克常数
- $m$，粒子的质量
- $\nabla^2$，拉普拉斯算符
- $V(\mathbf{r},t)$，粒子所处的势能，
- $\psi(\mathbf{r},t)$，粒子在位置$\mathbf{r}$和时间 $t$下的波函数

## 化学

### 电解水

$$
2H_2O \rightarrow 2H_2 + O_2
$$

### 光合作用

$$
6CO_2 + 6H_2O \rightarrow C_6H_{12}O_6 + 6O_2
$$

### 黑火药

$$
2KNO_3 + S + 3C \rightarrow K_2S + 3CO_2 + N_2
$$

### TNT炸药

$$
2C_7H_5N_3O_6 \rightarrow 3N_2 + 5H_2O + 7CO + 7C
$$

### ATP水解

$$
\text{ATP} + \text{H}_2\text{O} \rightarrow \text{ADP} + \text{P}_i + \Delta G\,,
$$
