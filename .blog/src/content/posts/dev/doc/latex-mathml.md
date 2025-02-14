---
title: "MathML：公式渲染效果样例"
description: "W3C标准的数学公式渲染"
pubDate: "2025-02-04 21:40:02"
category: "dev"
banner: "@images/banners/banner-dev-doc.jpg"
tags: ["dev", "doc", "latex", "mathml"]
oldViewCount: 0
oldKeywords: []
formula: "mathml"
---

# MathML：公式渲染效果样例

[MathML](https://w3c.github.io/mathml/)是由`W3C`制定的一套基于`XML`的数学标记语言，专门设计用于在网页中嵌入和呈现数学公式，它的特点如下：
- 注重公式的结构化和语义化
- 语法非常冗长，不适合直接手写

块级公式`<math>`...`</math>`:

## 圆面积公式

<math xmlns='http://www.w3.org/1998/Math/MathML' display='block'>
        <mi>&#x03C0;<!-- p --></mi>
        <mo>&#x2062;<!-- &InvisibleTimes; --></mo>
        <msup>
          <mi>r</mi>
          <mn>2</mn>
        </msup>
</math>

## 二次方程求根公式

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

## 爱因斯坦质能方程

<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
<mtable>
  <mlabeledtr id="e-is-m-c-square">
  	<mtd>
  	<mtext></mtext>
  	</mtd>
      <mrow>
       <mi>E</mi>
       <mo>=</mo>
       <mrow>
       <mtd>
        <mi>m</mi>
        <mo>⁢<!--INVISIBLE TIMES--></mo>
        <msup>
         <mi>c</mi>
         <mn>2</mn>
        </msup>
        </mtd></mrow>
     </mrow>
    
  </mlabeledtr>
</mtable>
</math>
