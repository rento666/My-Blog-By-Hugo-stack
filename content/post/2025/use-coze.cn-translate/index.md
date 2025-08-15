---

title: "利用扣子空间做一个AI翻译"
slug: "Make use of the coze to make an AI translation"
description: "只适用于2025.06.20的https://www.coze.cn/，无法保证后续的消费计划（现阶段500资源点/天足够自己使用）"
date: "2025-06-20T16:38:30+08:00"
lastmod: "2025-06-20T16:38:30+08:00"
image: "https://picsum.photos/seed/use-coze.cn-translate11/800/600"
math: 
license: 
hidden: false
draft: false 
categories: ["ai"]
tags: ["ai"]
reaction: true
top: false

---

> 扣子空间官网 [https://www.coze.cn](https://www.coze.cn/) <br>
> 注意，作者只在后缀为cn的扣子空间测试过，并不清楚com后缀的扣子空间的情况

## 开发前准备

首先去官网，登录账号，然后选择开发平台，点快速开始。

![扣子空间——开发平台](https://s2.loli.net/2025/06/20/Y6QPEDNhcmzuHkp.png)

然后点工作空间、项目开发，新建一个应用

![点项目开发](https://s2.loli.net/2025/06/20/AoyP9jsufCqY1Gb.png)

使用这个模板，然后自己起一个项目名字
![使用模板](https://s2.loli.net/2025/06/20/6HeVSTn1vz2FORN.png)

准备工作完成，下面是对项目的一些改动。

## 开发翻译项目

新建好的应用，是这样的：
![项目内部](https://s2.loli.net/2025/06/20/Umk2pZJywzDg6b4.png)

### 删除冗余内容

由于只用到了翻译功能，所以可以将其余三个页面全部删除，如图所示操作。
![先设置Translation为主页，然后删除其他三个页面](https://s2.loli.net/2025/06/20/BSrUMcJIpYzDKXw.png)

由于页面之间跳转用到了页面，所以不能直接删除，需要先将其他三个页面的元素删除，再进行页面删除。

![Translation页面需要删除顶部导航栏右侧按钮的点击事件](https://s2.loli.net/2025/06/20/g9IRVCtdN2mFoYJ.png)

最终预览效果如下图：
![预览图](https://s2.loli.net/2025/06/20/ld94kqIOLTyvCEs.png)

### 修改页面

默认模板是没有对汉语的支持，如果想英译汉，是没有办法的，所以这里添加一个汉语，同理，你也可以添加其他语种（只要ai可以翻译的）。

![支持汉语](https://s2.loli.net/2025/06/20/ra15RFqc4fynZwE.png)

给text添加一个默认文本：
```
{{ translation.data || '暂时没有需要翻译的内容' }}
```
![text默认文本](https://s2.loli.net/2025/06/20/IzEfbv2qMO6acRm.png)

然后业务逻辑这里，除了`translation`其他全删掉,包括工作流、数据，如下图。

![业务逻辑需要删除无用的](https://s2.loli.net/2025/06/20/CUcvTLq5wiED3AS.png)

这个是最终效果：

![可参考左侧的组织树](https://s2.loli.net/2025/06/20/eL8fRxKrj9wStHF.png)

## 预览页面

项目修改完成后，需要看看具体咋样，可以在这里预览一下页面：

![预览页面](https://s2.loli.net/2025/06/20/c4xEKuRibQkjA3n.png)

以后想使用翻译的，可以在url地址栏全选，然后拖放到桌面，这样会出现一个网页的快捷方式，下次可以直接在桌面打开翻译网站啦！

---

## 补充一：资源点

将本文章翻译一下，实测用的资源点少于5，所以资源点方面是不用担心的：

![一天500资源点](https://s2.loli.net/2025/06/20/onyYHcp1S5awlxT.png)

## 附录

### 参考

### 版权信息

本文原载于 [彩虹兔の博客](https://cai-hong-tu-blog.pages.dev/)，遵循 CC BY-NC-SA 4.0 协议，复制请保留原文出处。
