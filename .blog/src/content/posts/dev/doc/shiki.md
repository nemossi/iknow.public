---
title: "Shiki：代码语法高亮"
description: "让你的技术博客看起来更专业"
pubDate: "2025-02-05 10:01:09"
category: "dev"
banner: "@images/banners/banner-dev-doc.jpg"
tags: ["dev", "doc", "markdown", "shiki"]
oldViewCount: 0
oldKeywords: []
---

# Shiki：代码语法高亮

[Shiki](https://shiki.style/)是一个用于代码语法高亮的JavaScript库，它的特点是：
- 支持多种编程语言
- 渲染效果精确、美观
- 轻量级，性能优秀

`shiki`已经通过与`unified`(`remark`和`rehype`)生态集成实现了markdown的代码块高亮，知名框架[Astro](https://astro.build/)已经内置了`shiki`代码语法高亮的支持。
- [编程语言](https://shiki.style/languages)
- [配色风格](https://shiki.style/themes)

## 通用编程语言

### 汇编

``` asm
global  go
extern  _ExitProcess@4
extern  _GetStdHandle@4
extern  _WriteConsoleA@20

section .data
msg:    db      'Hello, World', 10
handle: db      0
written:
db      0

section .text
go:
; handle = GetStdHandle(-11)
push    dword -11
call    _GetStdHandle@4
mov     [handle], eax

; WriteConsole(handle, &msg[0], 13, &written, 0)
push    dword 0
push    written
push    dword 13
push    msg
push    dword [handle]
call    _WriteConsoleA@20

; ExitProcess(0)
push    dword 0
call    _ExitProcess@4
```

### Rust

``` rust
fn main()
{
    println!("Hello, World!");
}
```

### C#

``` cs
Console.WriteLine("Hello, World!");
```

### Typescript

``` ts
console.log("Hello, World!");
```

### Python

``` python
print("Hello, World!")
```

### C

``` c
#include <stdio.h>
int main()
{
    printf("Hello, World!");
}
```

### C++

``` cpp
#include <iostream>
int main()
{
    std::cout << "Hello World!";
}
```

### Go

``` go
package main
import "fmt"
func main() {
    fmt.Println("Hello, World!")
}
```

### Java

``` java
public class HelloWorld
{
    public static void main(String[] args)
    {
        System.out.println("Hello, World!");
    }
}
```

### JavaScript

``` js
console.log("Hello, World!");
```

### Kotlin

``` kotlin
fun main()
{
    println("Hello, World!")
}
```

### Swift

``` swift
print("Hello, World!")
```

### Scala

``` scala
object HelloWorld
{
    def main(args: Array[String]): Unit =
    {
        println("Hello, World!")
    }
}
```

### Visual Basic

``` vb
Module HelloWorld
    Sub Main()
        Console.WriteLine("Hello, World!")
    End Sub
End Module
```

### Pascal

``` pascal
program HelloWorld;
begin
    writeln('Hello, World!');
end.
```

### Fortran

``` fortran
program HelloWorld
    print *, "Hello, World!"
end program HelloWorld
```

### Haskell

``` haskell
main = putStrLn "Hello, World!"
```

### Erlang

``` erlang
main() -> io:format("Hello, World!~n").
```

### Lua

``` lua
print("Hello, World!")
```

## 专用编程语言

### Docker

``` docker
FROM alpine:latest
CMD echo "Hello, World!"
```

### HTML

``` html
<!DOCTYPE html>
<html>
<head>
    <title>Hello, World!</title>
</head>
<body>
    <h1>Hello, World!</h1>
</body>
</html>
```

### CSS

``` css
body
{
    background-color: #f0f0f0;
    color: #333;
}
```

### SQL

``` sql
SELECT * FROM users WHERE name = 'Alice';
```

### GraphQL

``` graphql
query {
    user(id: 1) {
        name
        age
    }
}
```

### Shell

``` sh
#!/bin/bash
echo "Hello, World!"
```

### PowerShell

``` powershell
Write-Host "Hello, World!"
```

### TeX

``` tex
\documentclass{article}
\begin{document}
Hello, World!
\end{document}
```

### Solidity

``` solidity
pragma solidity ^0.8.0;
contract HelloWorld
{
    function sayHello() public pure returns (string memory)
    {
        return "Hello, World!";
    }
}
```

### Verilog

``` verilog
module HelloWorld;
initial
begin
    $display("Hello, World!");
    $finish;
end
endmodule
```
### VHDL

``` vhdl
entity T01_HelloWorldTb is
end entity;
  
architecture sim of T01_HelloWorldTb is
begin
  
    process is
    begin
  
        report "Hello World!";
        wait;
  
    end process;
  
end architecture;
```    

## 数据

### .env

``` dotenv
NAME=Alice
AGE=20
```

### JSON

``` json
{
    "name": "Alice",
    "age": 20
}
```

### YAML

``` yaml
name: Alice
age: 20
```

### TOML

``` toml
name = "Alice"
age = 20
```

### XML

``` xml
<data>
    <to>Alice</to>
    <from>Bob</from>
</data>
```

### INI

``` ini
[info]
name = Alice
age = 20
```

### CSV

``` csv
name,age
Alice,20
Bob,21
```

### Markdown

``` markdown
# Hello, World!

This is a **markdown** document.
| Name | Age |
| :-- | --: |
| Alice | 20 |
| Bob | 21 |

```

## 其它

### 改动比较

```diff
@@ -1,4 +1,4 @@
-import rehypeKatex from 'rehype-katex'
+import rehypeMathjax from 'rehype-mathjax'
 import rehypeStringify from 'rehype-stringify'
 import remarkMath from 'remark-math'
 import remarkParse from 'remark-parse'
@@ -10,7 +10,7 @@ const file = await unified()
   .use(remarkParse)
   .use(remarkMath)
   .use(remarkRehype)
-  .use(rehypeKatex)
+  .use(rehypeMathjax)
   .use(rehypeStringify)
   .process(await read('example.md'))
```
