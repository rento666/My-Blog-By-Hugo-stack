---

title: "【02】学习Next.js框架之链接、导航"
slug: "learn-nextjs-02"
description: "本文介绍了Next.js的入门、路由、布局等知识，适合有一定React基础的人阅读。"
date: "2025-10-27T09:17:42+08:00"
lastmod: "2025-10-27T09:17:42+08:00"
image: ""
math: 
license: 
hidden: false
draft: false 
categories: ["nextjs"]
tags: ["nextjs"]
reaction: true
top: false

---

## 链接 `Link`

### 基础用法

```ts
import Link from "next/link";

export default function Home() {
    return (
        <>
            <h1>Welcome home!</h1>
            <Link href="/blog">Blog</Link>
            <Link href="/login" replace>Login</Link>
        <>
    );
}
```

- 上述代码，点击Blog后会跳转到`http://localhost:3000/blog`

- 点击Login后会替换当前历史条目，此时再点返回，就会回到首页。

### 高亮当前链接

```ts
// app/(auth)/layout.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./styles.css";

const navLinks = [
    { name: "Register", href: "/register" },
    { name: "Login", href: "/login" },
    { name: "Forgot Password", href: "/forgot-password" }
];

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    return (
        <div>
            { navLinks.map((link) => {
                const isActive = 
                    pathname === link.href || 
                    (pathname.startsWith(link.href) && link.href !== "/");
                return (
                    <Link 
                        classNam={isActive ? "font-bold mr-4" : "text-blue-500 mr-4"} 
                        href={link.href} 
                        key={link.name}
                    >
                        {link.name}
                    </Link>
                )
            }) }
            {children}
        </div>
    );
}

```

```css
/* app/(auth)/style.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 获取URL的搜索参数

诸如`http://localhost:3000/articles/123?lang=zh`之类的链接，如何获取`123`和`zh`呢？

可以通过`params`获取这个articleId，通过`searchParams`获取这个lang。

```ts
// app/articles/[articleId]/page.tsx
import Link from next/link";

export default async function NewsArticle({
    params,
    searchParams,
}: {
    params: Promise<{ articleId: string }>;
    searchParams: Promise<{ lang?: "en" | "zh" }>;
}) {
    const { articleId } = await params;
    const { lang = "en" } = await searchParams;;
    return (
        <div>
            <h1>News article {articleId}</h1>
            <p>Reading in {lang}</p>

            <div>
                <Link href={`/article/${articleId}?lang=en`}>English</Link>
                <Link href={`/article/${articleId}?lang=zh`}>Chinese</Link>
            </div>
        </div>
    )
}
```

#### 服务端组件使用async与await，客户端组件使用use

使用`"use client";`时，不能使用async与await，需要使用React的Hook：`use`。

```ts
"use client";

import Link from next/link";
import { use } from "react";

export default async function NewsArticle({
    params,
    searchParams,
}: {
    params: Promise<{ articleId: string }>;
    searchParams: Promise<{ lang?: "en" | "zh" }>;
}) {
    const { articleId } = use(params);
    const { lang = "en" } = use(searchParams);
    return (
        <div>
            <h1>News article {articleId}</h1>
            <p>Reading in {lang}</p>

            <div>
                <Link href={`/article/${articleId}?lang=en`}>English</Link>
                <Link href={`/article/${articleId}?lang=zh`}>Chinese</Link>
            </div>
        </div>
    )
}
```

- 所有的`page.tsx`都能获取到`params`与`searchParams`。
- 所有的`layout.tsx`仅能获取到`params`。

## 导航

### 程序化导航

使用Next.js的App Router来实现的。

```ts
"use client";

import { useRouter } from "next/navigation";

export default function OrderProduct() {
    const router = useRouter();
    const handleClick = () => {
        console.log("下单完成");
        router.push("/");           // 进入首页
        // router.replace("/");     // 重定向到首页
        // router.back();              // 返回上一页
        // router.forward();           // 在历史记录中向前移动
    };
    return (
        <>
            <h1>Order product</h1>
            <button onClick={handleClick}>下单</button>
        </>
    )
}

```

### 重定向函数
```ts
import { redirect }  from "next/navigation";

// ...

redirect("/products")       // 重定向到 http://localhost:3000/products 页面

// ...
```

## 模板

`template.tsx`类似于`layout.tsx`，因为它们也是在你的应用中**被多个页面共享的 UI**。

每当用户在共享模板的路由之间导航时，你会得到一个全新的开始：

- 一个新的模板组件实例被挂载<br>
- DOM 元素被重新创建<br>
- 状态被清除<br>
- 效果被重新同步


### 对比

```ts
"use client";

import { useState } from "react"; 

// ...

const [input, setInput] = useState("");

// ...

<input value={input} onChange={e => setInput(e.target.value)} />

<Link href="/login">Login</Link>
<Link href="/register">Register</Link>

// ...
```

- 在`app/(auth)/layout.tsx`中填写上述代码时，从login页面跳转到register页面时，input中的值会保留<br>
- 在`app/(auth)/template.tsx`中,跳转页面，input的值会恢复为默认空白值<br>
- 我们可以同时使用`layout.tsx`和`template.tsx`：`layout`会首先渲染，然后其子组件将会根据`template`组件的输出重新放置。<br>
-`template`不是一个常见的需求，`layout`应该是您共享UI的首选。

![layout & template](https://s2.loli.net/2025/10/27/kSucoLf2EaTNI4b.png)

## 加载页面

我们已经学习了`page.tsx`、`layout.tsx`、`template.tsx`、`not-found.tsx`，下面我们继续学习新的特殊文件：`loading.tsx`

## 附录
 
### 参考

- [7小时精通Next.js 15终极教程 (1小时15分钟到) | bilibili](https://www.bilibili.com/video/BV1kvPcekE3K/?share_source=copy_web&vd_source=1068a5fa51e306b8564255b5bf628111&t=4493)

### 版权信息

本文原载于 [彩虹兔の博客](https://cai-hong-tu-blog.pages.dev/)，遵循 CC BY-NC-SA 4.0 协议，复制请保留原文出处。