---

title: "Hugo Theme"
slug: "Hugo Theme"
description: 
date: "2024-11-21T12:08:53+08:00"
lastmod: "2024-11-21T12:08:53+08:00"
image: "https://picsum.photos/seed/hugo-theme11/800/600"
math: 
license: 
hidden: false
draft: false 
categories: ["Build Website"]
tags: ["hugo"]
reaction: true
top: false

---

## Introduction

- This blog uses [stack theme | hugo](https://github.com/rento666/My-Blog-By-Hugo-stack), and the original GitHub repository is [Hugo-stack-theme-mod | GitHub](https://github.com/Mantyke/Hugo-stack-theme-mod)

- If your **Hugo version** is higher than **2022**, running the source repository code directly will result in an error, because some of the functions and methods have been deprecated. For modification, please refer to: Send the error reason to AI and modify it according to the error prompted by AI. Since I didn't take a screenshot when I modified it, I can't show it for the time being.

- If you use [my blog repository code](https://github.com/rento666/My-Blog-By-Hugo-stack), please delete all my articles and then add your own articles. At the same time, you need to replace all the words such as `Rainbow Rabbit` and `caihongtu` that appear.

## Welcome banner on the homepage

> 2025-10-14 update，domain change to`caihongtu.top`

Preview:
![Welcome banner](https://s2.loli.net/2024/11/21/XhInQYoesvJf1N3.png)

Since the project is deployed on Cloudflare, the **permanent domain name** will probably not expire (~~unless Cloudflare goes bankrupt~~), but the **current domain name** is not necessarily, because the **caihongtu.com** I want to register is currently registered by someone, so I registered this `caihongtu.asia` first, and when the `com` domain name is available for registration, I will immediately take action. (Don't ask why I don't go to the other party to buy it, because there is no 💰)

### Modify the code

- Create a new `layouts` folder in the root directory of the blog (it exists by default, if not, create it manually), then copy the files under `./themes/hugo-theme-stack/layouts/index.html` to the newly created layouts folder (if there are corresponding files in this folder, you don’t need to copy them), then add the following content to `index.html`:

{{% spoiler "click here to view code" %}}
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
 
- Above is all the code of my `index.html`, you only need to focus on the "Home Welcome Banner Section".

Below is the CSS style of the banner, the directory is in `./assets/scss/custom.scss`
{{% spoiler "Click me to view the code" %}}
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

## Appendix

### Reference

- [🎉Add a welcome banner to the homepage - linsnow blog](https://linsnow.cn/posts/bloglab/hugo-stack/modify-hugo/)

### Copyright information

This article was originally published on [Cai Hong Tu Blog](https://cai-hong-tu-blog.pages.dev/), following the CC BY-NC-SA 4.0 agreement. Please keep the original source when copying.
