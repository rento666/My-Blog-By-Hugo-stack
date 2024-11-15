---

title: "写博客之必读内容"
slug: "Must Read Content for Blogging"
description: "用Hugo写博客，需要留意的点。"
date: "2024-11-14T15:13:23+08:00"
lastmod: "2024-11-14T15:13:23+08:00"
image: 
math: true
license: 
hidden: false
draft: false 
categories: ["建站"]
tags: ["hugo"]
reaction: true

---
## 引言（2024.11.14更新）
最近想重新拾起写博客的习惯，但是发现之前的[Hexo博客 | (Github-Pages)](https://rento666.github.io)有点花里胡哨的，找了半天，发现这个[Hugo | (Github)](https://github.com/gohugoio/hugo)的[Stack主题 | (Github)](https://github.com/CaiJimmy/hugo-theme-stack)挺符合我审美的，就决定用Hugo来写博客。

有以下几点需要注意：
* 我使用的版本是[Hugo-stack主题-魔改版 | (Github)](https://github.com/Mantyke/Hugo-stack-theme-mod)。
* 由于这个版本(截至目前为止)已经两年没有更新了(上次更新时间为2022年)，所以对于最新版本的Hugo，执行`hugo server`可能会报错，**需要自己复制出错原因，询问AI**（如ChatGPT等）**去解决报错**。

## 使用方式（MarkDown语法）
### 可收缩代码块

{{% spoiler "这是标题" %}}
```
// 去掉 % 前面的 \
{{\% spoiler  %}}

内容

{{\% /spoiler "这是标题" %}}
// 去掉 % 前面的 \
```
{{% /spoiler %}}

## 常识（对我来说需要记在这里）

### HTML字符集——空格

* 空格：`&nbsp;` 按下`space`键出来的，宽度受字体影响。
* 空格：`&ensp;` 宽度为$\frac{1}{2}$个中文宽度，不受字体影响。
* 空格：`&emsp;` 宽度为1个中文宽度，不受字体影响。

## 未解决问题（随时更新）

* 以下问题是在`hugo v0.138.0`的基础上出现的（可能是我不会操作/doge）。

{{% spoiler "如何查看hugo版本？" %}}
在cmd中输入`hugo version`

```
输出：hugo v0.138.0-ad82998d54b3f9f8c2741b67356813b55b3134b9+extended+withdeploy windows/amd64 BuildDate=2024-11-06T11:22:34Z VendorInfo=gohugoio
```
{{% /spoiler %}}

### categories的多语言适配

我尝试了在`./content/categories`目录下的`test`文件中，使用`_index.md`和`_index.en.md`，结果并不是我预想的那样，在**首页分类**处，只能显示为`test`或者`测试`，并没有多语言适配。

![图示右侧栏不适配多语言](https://s2.loli.net/2024/11/14/wJNV8LWTyKCSsom.png)

{{% spoiler "起初目录结构" %}}
```
├─content
│  ├─categories
│  │  _index.en.md
│  │  _index.md
│  │  
│  └─test
│     │    _index.md
│     └─   _index.en.md
```
{{% /spoiler %}}

最终只能将`test`、`测试`两个目录分开配置：
{{% spoiler "最终目录结构" %}}
```
├─content
│  ├─categories
│  │  │  _index.en.md
│  │  │  _index.md
│  │  │
│  │  ├─test
│  │  │      _index.en.md
│  │  │
│  │  └─测试
│  │          _index.md
```
{{% /spoiler %}}

如图所示：
![目录结构](https://s2.loli.net/2024/11/14/ps4S2Jmn9IbtArC.png)

## 附录

### 参考文献

* [Hugo对Markdown支持情况测试 | Github-Pages部署的博客，作者：edward852](https://edward852.github.io/post/markdown支持情况测试/)

### 版权信息

本文原载于 [彩虹兔の博客](https://cai-hong-tu-blog.pages.dev/)，遵循 CC BY-NC-SA 4.0 协议，复制请保留原文出处。