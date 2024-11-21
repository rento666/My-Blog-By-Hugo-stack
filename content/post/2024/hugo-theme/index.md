---

title: "关于博客的样式改造"
slug: "Hugo Theme"
description: 
date: "2024-11-21T12:08:45+08:00"
lastmod: "2024-11-21T12:08:45+08:00"
image: "https://picsum.photos/seed/hugo-theme11/800/600"
math: 
license: 
hidden: false
draft: false 
categories: ["建站"]
tags: ["hugo"]
reaction: true

---

## 引言

- 本博客使用了[stack主题 | hugo](https://github.com/rento666/My-Blog-By-Hugo-stack)，原GitHub仓库为[Hugo-stack-theme-mod | GitHub](https://github.com/Mantyke/Hugo-stack-theme-mod)

- 如果你的**Hugo版本**是高于**2022年**发布的，直接运行源仓库代码会报错，因为其中部分函数方法已经弃用，修改请参考：将报错原因发送给AI，根据AI提示错误来修改，这里由于我修改时没截图，暂时无法展示。

- 如果使用[我的博客仓库代码](https://github.com/rento666/My-Blog-By-Hugo-stack)，请将我的文章全部删除后，再添加你自己的文章。同时需要替换所有出现的`彩虹兔`、`caihongtu`之类的词语。

## 首页的欢迎横幅

预览：
![欢迎横幅](https://s2.loli.net/2024/11/21/XhInQYoesvJf1N3.png)

由于项目是部署在Cloudflare上的，所以那个**永久域名**大概不会过期（~~除非Cloudflare倒闭~~），但是**当前域名**可就不一定了，因为我想要注册的**caihongtu.com**目前被人注册了，所以先注册了这个`caihongtu.asia`，等那个`com`域名可以注册了，我会立马出手的。（别问为什么不去找对方买，因为没💰）

### 修改代码

- 博客的根目录新建`layouts`文件夹（默认就有，没有的话手动创建），之后将`./themes/hugo-theme-stack/layouts/index.html`下的文件复制到刚刚创建的layouts文件夹内（如果这个文件夹下本来就有对应文件，则无须复制），之后再在`index.html`中添加以下内容：

{{% spoiler "点我查看代码" %}}
```html
{{ define "main" }} {{ $pages := where .Site.RegularPages "Type" "in"
.Site.Params.mainSections }} {{ $notHidden := where .Site.RegularPages
"Params.hidden" "!=" true }} {{ $filtered := ($pages | intersect $notHidden) }}
{{ $pag := .Paginate ($filtered) }}

<!-- 首页欢迎字幅板块 -->
<div class="welcome">
  <p style="font-size: 2rem; text-align: center; font-weight: bold">
    <span class="shake">{{ T "welcome.emoji" }}</span>
    <span class="jump-text1"> {{ T "welcome.msg1" }} </span>
    <span class="jump-text2"> {{ T "welcome.msg2" }} </span>
    <span id="site-title-static" style="color: #e99312">{{ .Site.Title }}</span>
    <span id="site-title" style="display: none; color: #e99312"></span>
  </p>
  <p style="font-size: 1.5rem; text-align: center; font-weight: bold">
    <span
      >{{ T "welcome.currentText" }}:
      <a href="{{ .Site.BaseURL }}"
        >{{ .Site.BaseURL | strings.TrimPrefix "http://" | strings.TrimPrefix
        "https://" | strings.TrimSuffix "/" }}</a
      ></span
    >&emsp;&emsp;
    <span
      >{{ T "welcome.permanentText" }}:
      <a href="https://cai-hong-tu-blog.pages.dev"
        >cai-hong-tu-blog.pages.dev</a
      ></span
    >
  </p>
</div>
<script type="module">
  // 动态生成字符和样式
  document.addEventListener("DOMContentLoaded", () => {
    const title = "{{ .Site.Title }}"; // 获取 Hugo 变量
    const titleContainer = document.getElementById("site-title");
    const staticTitle = document.getElementById("site-title-static");

    // 动态添加字符到 #site-title
    title.split("").forEach((char, index) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.className = `jump-text jump-text${index}`;
      titleContainer.appendChild(span);
    });

    // 动态生成 CSS 动画规则
    const styleSheet = document.styleSheets[0];
    title.split("").forEach((_, index) => {
      const delay = (index * 0.1).toFixed(1); // 每个字符延迟 0.1s
      const rule = `
        .jump-text${index} {
          display: inline-block;
          animation: jump 0.5s 1;
          animation-delay: ${delay}s;
        }
      `;
      styleSheet.insertRule(rule, styleSheet.cssRules.length);
      staticTitle.style.display = "none";
      titleContainer.style.display = "inline";
    });
  });
</script>
<!-- ------首页欢迎字幅板块------ -->

<section class="article-list">
  {{ range $index, $element := $pag.Pages }} {{ partial "article-list/default" .
  }} {{ end }}
</section>
<script type="module">
  import { commentCount } from "https://unpkg.com/@waline/client@v3/dist/comment.js";

  commentCount({
    serverURL: "{{.Site.Params.comments.waline.serverURL}}",
  });
</script>

{{- partial "pagination.html" . -}} {{- partial "footer/footer" . -}} {{ end }}
{{ define "right-sidebar" }} {{ partial "sidebar/right.html" . }} {{ end }}

```
{{% /spoiler %}}
 
- 上面是我的`index.html`所有的代码，你只需要关注“首页欢迎字幅板块”即可。

下面是横幅的css样式，目录在`./assets/scss/custom.scss`中
{{% spoiler "点我查看代码" %}}
```
//---------------------------------------------------------
//首页欢迎板块样式
.welcome {
  color: var(--card-text-color-main);
  background: var(--card-background);
  box-shadow: var(--shadow-l2);
  border-radius: 30px;
  display: inline-block;
}

// 👋emoji实现摆动效果
.shake {
  display: inline-block;
  animation: shake 1s;
  animation-duration: 1s;
  animation-timing-function: ease;
  animation-delay: 0s;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-fill-mode: none;
  animation-play-state: running;
  animation-name: shake;
  animation-timeline: auto;
  animation-range-start: normal;
  animation-range-end: normal;
  animation-delay: 2s;
  @keyframes shake {
    0% {
      transform: rotate(0);
    }
    25% {
      transform: rotate(45deg) scale(1.2);
    }
    50% {
      transform: rotate(0) scale(1.2);
    }
    75% {
      transform: rotate(45deg) scale(1.2);
    }
    100% {
      transform: rotate(0);
    }
  }
}
// 实现字符跳动动画
.jump-text1 {
  display: inline-block;
  animation: jump 0.5s 1;
}

.jump-text2 {
  display: inline-block;
  animation: jump 0.5s 1;
  animation-delay: 0.1s;
}

@keyframes jump {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
}
```
{{% /spoiler %}}


## 附录

### 参考

- [🎉首页添加欢迎横幅 - linsnow博客](https://linsnow.cn/posts/bloglab/hugo-stack/modify-hugo/)

### 版权信息

本文原载于 [彩虹兔の博客](https://cai-hong-tu-blog.pages.dev/)，遵循 CC BY-NC-SA 4.0 协议，复制请保留原文出处。
