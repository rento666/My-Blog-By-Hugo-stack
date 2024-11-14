---

title: "GitHub 个人主页 README 美化 & Star 趋势图"
slug: "Github Profile"
description: 
date: "2024-11-14T22:49:27+08:00"
lastmod: "2024-11-14T22:49:27+08:00"
image: 
math: 
license: 
hidden: false
draft: false 
categories: ["Github"]
tags: ["Github"]
reaction: true

---

## 引言

每次看到有大佬的Github主页很炫酷，自己总是羡慕不已，那些大佬真是厉害，不仅技术强，就连Github个人主页都酷的一批。  
于是我便查阅资料，最终决定美化一下自己的Github主页 ~~（虽然我是个小菜鸡，什么开源好项目都没写出来...）~~

## 个人主页的美化

> GitHub支持定制主页，相关文档：[设置和管理 GitHub 配置文件 | Github 官方文档](https://docs.github.com/zh/account-and-profile/setting-up-and-managing-your-github-profile)

### 新建仓库

在自己的Github主页中新建一个仓库，仓库名必须为**自己GitHub用户名**，例如下图为`rento666`，然后添加一个`README.md`文件，我们只需向这个文件添加需要的信息即可。

如下图所示，图中**没有勾选**`Add  a README file`，推荐勾选上（勾选上就省去自己手动创建了），此时点击创建，即为创建成功。

* rento666/rento666 是一个 ✨特殊 ✨ 存储库，您可以用它来将 README.md 添加到您的 GitHub 个人资料中。确保它是公开的，并使用 README 对其进行初始化以开始使用。

![创建仓库时的信息](https://s2.loli.net/2024/11/14/yMGe8SKFQrwNCjc.png)

### 编辑 README

下面是编辑README.md文件的界面：

![README文件初始内容](https://s2.loli.net/2024/11/14/TSXN2cr86Oy3jeI.png)

未完待续...
---

## Star 趋势图

在自己开源项目根目录下的`README.md`文件中，添加如下代码即可：  
* 其中，`自己GitHub用户名`需要替换为自己的Github用户名，例如下图为`rento666`.  
* `开源项目仓库名`需要替换为自己的开源项目仓库名，下图为`My-Blog-By-Hugo-stack`。

{{% spoiler "Star趋势图代码" %}}
```
<picture>
  <source
    media="(prefers-color-scheme: dark)"
    srcset="
      https://api.star-history.com/svg?repos=自己GitHub用户名/开源项目仓库名&type=Date&theme=dark
    "
  />
  <source
    media="(prefers-color-scheme: light)"
    srcset="
      https://api.star-history.com/svg?repos=自己GitHub用户名/开源项目仓库名&type=Date
    "
  />
  <img
    alt="Star History Chart"
    src="https://api.star-history.com/svg?repos=自己GitHub用户名/开源项目仓库名&type=Date"
  />
</picture>
```
{{% /spoiler %}}

不确定两个名称的，可参考如下图所示寻找：

![图示箭头指向用户名+项目仓库名](https://s2.loli.net/2024/11/14/6PkYugWUShOdfcx.png)

## 附录

### 参考文献

* [超详细的 GitHub 个人主页美化教程 |  peterjxl博客](https://www.cnblogs.com/PeterJXL/p/18437094)
* [Hugo对Markdown支持情况测试 | Github-Pages部署的博客，作者：edward852](https://edward852.github.io/post/markdown支持情况测试/)
* [Github开源项目Star趋势图 | Github](https://github.com/star-history/star-history/tree/main)

### 版权信息

本文原载于 [彩虹兔の博客](https://caihongtu.asia)，遵循 CC BY-NC-SA 4.0 协议，复制请保留原文出处。