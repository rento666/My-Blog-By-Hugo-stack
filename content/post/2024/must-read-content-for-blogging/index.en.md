---

title: "Must Read Content for Blogging"
slug: "Must Read Content for Blogging"
description: "Things you need to pay attention to when writing a blog with Hugo."
date: "2024-11-14T15:13:30+08:00"
image: "https://picsum.photos/seed/645brg/800/600"
math: 
license: 
hidden: false
draft: false 
categories: ["Build Website"]
tags: ["hugo"]
reaction: true
top: false

---

## Introduction (updated on 2024.11.14)
Recently, I want to pick up the habit of blogging again, but I found that the previous [Hexo blog | (Github-Pages)](https://rento666.github.io) was a bit fancy. After searching for a long time, I found that this [Hugo | (Github)](https://github.com/gohugoio/hugo)'s [Stack theme | (Github)](https://github.com/CaiJimmy/hugo-theme-stack) is quite in line with my aesthetics, so I decided to use Hugo to write a blog.

There are a few points to note:
* The version I use is [Hugo-stack theme-magic modification version | (Github)](https://github.com/Mantyke/Hugo-stack-theme-mod).
* Since this version (as of now) has not been updated for two years (the last update was in 2022), for the latest version of Hugo, executing `hugo server` may report an error. **You need to copy the error cause yourself and ask AI** (such as ChatGPT, etc.) **to solve the error**.

## Usage (MarkDown syntax)
### Collapsible code block

{{% spoiler "This is the title" %}}
```
// Remove the \ in front of %
{{\% spoiler %}}

Content

{{\% /spoiler "This is the title" %}}
// Remove the \ in front of %
```
{{% /spoiler %}}

## Common sense (for me, I need to remember this)

### HTML character set - space

* Space: `&nbsp;` Press the `space` key to display it. The width is affected by the font.
* Space: `&ensp;` has a width of $\frac{1}{2}$ Chinese characters, not affected by fonts.
* Space: `&emsp;` has a width of 1 Chinese character, not affected by fonts.

## Unresolved issues (updated at any time)

* The following issues are based on `hugo v0.138.0` (maybe I don't know how to operate/doge).

{{% spoiler "How to check hugo version?" %}}
Enter `hugo version` in cmd

```
Output: hugo v0.138.0-ad82998d54b3f9f8c2741b67356813b55b3134b9+extended+withdeploy windows/amd64 BuildDate=2024-11-06T11:22:34Z VendorInfo=gohugoio
```
{{% /spoiler %}}

### Multi-language adaptation of categories

I tried to use `_index.md` and `_index.en.md` in the `test` file in the `./content/categories` directory, but the result was not what I expected. In the **homepage category**, it can only be displayed as `test` or `test`, and there is no multi-language adaptation.

![The right column of the icon is not suitable for multiple languages](https://s2.loli.net/2024/11/14/wJNV8LWTyKCSsom.png)

{{% spoiler "Initial directory structure" %}}
```
├─content
│ ├─categories
│ │ _index.en.md
│ │ _index.md
│ │
│ └─test
│ │ _index.md
│ └─ _index.en.md
```
{{% /spoiler %}}

In the end, only the `test` and `test` directories can be configured separately:
{{% spoiler "Final directory structure" %}}
```
├─content
│ ├─categories
│ │ │ _index.en.md
│ │ │ _index.md
│ │ │
│ └─test
│ │ _index.md
│ └─ _index.en.md
```
{{% /spoiler %}}

In the end, only the `test` and `test` directories can be configured separately:
{{% spoiler "Final directory structure" %}}
```
├─content
│ ├─categories
│ │ │ _index.en.md
│ │ │ _index.md
│ │ │
│ │ ├─test
│ │ │ _index.en.md
│ │ │
│ │ └─test
│ │ _index.md
```
{{% /spoiler %}}

As shown in the figure:
![Directory structure](https://s2.loli.net/2024/11/14/ps4S2Jmn9IbtArC.png)

## Appendix

### Copyright information

This article was originally published in [CaiHongTu Blog](https://caihongtu.asia) and follows the CC BY-NC-SA 4.0 agreement. Please keep the original source when copying.

---
## END