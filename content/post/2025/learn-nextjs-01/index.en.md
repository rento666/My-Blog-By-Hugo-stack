---

title: "[01] Learning Next.js Framework: Installation, Routing, and Layouts"
slug: "learn-nextjs-01"
description: "This article introduces the basics, routing, and layouts of Next.js, suitable for those with some React foundation."
date: "2025-10-26T11:37:50+08:00"
lastmod: "2025-10-26T11:37:50+08:00"
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

## Introduction

Next.js is a web framework for React. This article is the first tutorial in the "Learning Next.js Framework" series.

Before starting, it is assumed that readers are familiar with HTML, CSS, TypeScript, and React.

## Installation

Create a new Next.js application and run it locally.

### Quick Start

1. Create a Next.js project named `my-app`.
2. `cd my-app` and `npm run dev`.
3. Visit http://localhost:3000.

```cmd
npx create-next-app@latest my-app --yes
cd my-app
npm run dev
```

- Here we use `npm`. If you are more familiar with `pnpm`, `yarn`, `bun`, etc., you can run the project in your preferred way.
- `--yes` skips prompts by using saved preferences or defaults. The default settings enable TypeScript, Tailwind, App Router, and Turbopack, with the import alias `@/*`.

### System Requirements

Before starting, ensure your system meets the following requirements:

- [Node.js 20.9](https://nodejs.org/) or later.
- macOS, Windows (including WSL), or Linux.

### App Directory

Next.js uses file-system routing, which means the routes in your application depend on how you structure your files.

The `app` folder is the root directory for the application's routes. To modify the content of `http://localhost:3000`, simply edit the content in `app/page.tsx`.

For other pages, such as `http://localhost:3000/user`, you only need to set up the content in `app/user/page.tsx`.

### Public Folder

Create a `public` folder to store static assets such as images, fonts, etc.

In your code, you can reference these assets using the root path (`/`). For example, `public/profile.png` can be referenced as `/profile.png`.

```ts
import Image from 'next/image'
 
export default function Page() {
  return <Image src="/profile.png" alt="Profile" width={100} height={100} />
}
```

## Project Structure

Regarding the project structure, the Next.js official documentation explains it well.

## Routing

### Catch-All Route Segments

Using `doc/[...slug]/page.tsx` allows you to capture all sub-routes under the `doc` route.

```ts
export default async function Docs({
    params,
}: {
    params: Promise<{ slug: string[] }>;
}) {
    const { slug } = await params;
    if(slug?.length === 2) {
        return (
            <h1>
                Viewing docs for feature {slug[0]} and concept {slug[1]}
            </h1>
        );
    } else if (slug?.length === 1) {
        return <h1>Viewing docs for feature {slug[0]}</h1>
    } 
    return <h1>Viewing docs</h1>
}
```

- In the above code, if you visit `http://localhost:3000/docs/routing`, you will get the content `Viewing docs for feature routing`.

- Similarly, visiting `http://localhost:3000/docs/routing/catch-all-segments` will display `Viewing docs for feature routing and concept catch-all-segments`.

- If there is no `page.tsx` in the `docs` directory, accessing `http://localhost:3000/docs` will result in an error. If you want to display `Viewing docs` without creating a separate `page.tsx`, you need to rename the folder to `[[...slug]]`, i.e., `doc/[[...slug]]/page.tsx`.

![Catch-All Route Segments](https://s2.loli.net/2025/10/26/y5cKa63xzH8fbr2.png)

### Custom 404 Page `not-found.tsx`

Create an `app/not-found.tsx` file, which serves as the 404 page for the project.

If you want certain pages to have their own 404 pages, such as "Product not found" or "User not found", you can create a page file in the corresponding folder. For example, if the number of product reviews should not exceed 100, and a 404 should be shown for numbers exceeding that, you can write the following code:

This is the page code:

```ts
// app/products/[productId]/reviews/[reviewId]/page.tsx
import { notFound } from "next/navigation";
export default async function ProductReview({
    params,
}: {
    params: Promise<{ productId: string; reviewId: string }>;
}) {
    const { productId, reviewId } = await params;
    if(parseInt(reviewId) > 1000) {
        notFound();
    }
    return (
        <h1>Review {reviewId} for product {productId}</h1>
    );
}
```

This is the 404 code: 

```ts
// app/products/[productId]/reviews/[reviewId]/not-found.tsx
"use client";

import { usePathname } from "next/navigation"

export default function NotFound() {
    const pathname = usePathname();
    const productId = pathname.split("/")[2];
    const reviewId = pathname.split("/")[4];
    return (
        <div>
            <h2>
                Review {reviewId} not found for product {productId}
            </h2>
        </div>
    );
}
```

- Visiting `http://localhost:3000/products/1/reviews/1001` will display `Review not found` instead of the content from `app/not-found.tsx`.

- In other words, **a deeper-level 404 page overrides a shallower-level one**. For example, `app/products/[productId]/reviews/[reviewId]/not-found.tsx` overrides `app/not-found.tsx`.

- `"use client"` indicates that this component is a client-rendered component. Since Next.js defaults all React components to be server components, and here we use the Next.js hook `import { usePathname } from "next/navigation"`, which can only be used on the client side, we need to add `"use client"`.

### Public & Private Access

A route becomes publicly accessible only when a `page.tsx` or `page.js` is added.

- If you want certain files to be used internally only and not exposed via public links, you can prefix the folder with an underscore `_`. This **excludes the folder and all its subfolders** from public access.

- If your project actually needs to use an underscore `_`, replace it with `%5F`.

- This is **not mandatory**. You can also place folders outside the `app` directory to ensure they are not publicly accessible.

## Route Groups

Route groups allow you to organize your project structure without affecting the URL structure.

> In short, wrap folders in parentheses `()`, and the wrapped part will not appear in the URL.<br>
> For example: `app/(auth)/login` can be accessed via `http://localhost:3000/login`.<br>
> Whereas `app/auth/login` is accessed via `http://localhost:3000/auth/login`.<br>

Notably, **route groups are actually the only way to share layouts between different routes without affecting the URL**.

Suppose you have a requirement: `http://localhost:3000/register` and `http://localhost:3000/login` are the registration and login pages. Creating `app/register/page.tsx` directly in the `app` directory works, but in a multi-developer environment (or even after a few weeks), it may take time to locate the code for these pages, which is disorganized. A solution could be `app/auth/register/page.tsx` and `app/auth/login/page.tsx`, but this changes the access links. Is there a way to keep the access links the same while grouping the registration and login code files together? Yes, by wrapping the folder in parentheses `()`, i.e., `app/(auth)`, and placing registration and login inside it. This way, the access links remain unchanged, and the code is organized.

## Layouts

Like `page.tsx`, `layout.tsx` is a convention-based file name in Next.js.

### Basic Usage

```ts
export const metadata = {
    title: 'Next.js',
    description: 'Generated by Next.js',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
```

- The root directory of `app` must have a `layout.tsx`, which is the root layout. If you delete it, it will be automatically regenerated the next time you run `next dev`.

### Nested Multiple Layouts

In addition to the root layout, you can add `layout.tsx` to other pages. When accessing the corresponding page, the layouts will be displayed nested.

For example, add the following code to `app/products/[productId]/layout.tsx`:

```ts
export default function ProductDetailsLayout({
    children,
}: {
children: React.ReactNode;
}) {
    return (
        <>
            {children}
            <h2>Featured products</h2>
        </>
    );
}
```

The result is shown in the following image:

![Nested Multiple Layouts](https://s2.loli.net/2025/10/26/mWoHMr6DSUpguxl.png)

### Multiple Root Layouts

Sometimes, you may want all pages except the **login and registration** pages to have headers and footers. If you add headers and footers in the root layout app/layout.tsx, they will apply to all pages, including login and registration, which is not desired.

This is where the **route groups** feature comes in.

The final directory structure might look like this:

```
app
├─(auth)
│  ├─login
│  ├─register
│  └─layout.tsx        // Root layout
├─(dashboard)
│  ├─page1
│  ├─page2
│  ├─layout.tsx        // Root layout
│  └─page.tsx          // Root page
│ ...
```

## Metadata

The most intuitive example of metadata is the page title. Next.js provides an API to define metadata for each page.

### Rules

- Both `layout.tsx` and `page.tsx` can export metadata. Layout metadata applies to all its pages, while page metadata is specific to that page.

- Metadata follows a top-down order, starting from the root level.

- When metadata exists in multiple locations within a route, they are merged, with page metadata overriding the corresponding properties of layout metadata.

Priority order: `Page metadata > Page layout metadata > Root page metadata > Root page layout metadata`. Page metadata takes precedence.

- *(Important)* It does not work on pages using `"use client";`. You need to keep metadata in server components and extract any client-side functionality into separate components.

### Static Metadata

In `page.tsx` or `layout.tsx`, add the following code:
```ts
export const metadata = {
    title: 'Next.js',
    description: 'Generated by Next.js',
}
```
- This is a metadata object.

### Dynamic Metadata
This is useful when metadata depends on dynamic information such as current route parameters, external data, or metadata defined in parent segments.
```ts
import { Metadata } from "next";

type Props = {
    params: Promise<{ productId: string }>;
};

export const generateMetadata = async ({
    params,
}: Props): Promise<Metadata> => {
    const id = (await params).productId;
    const title = await new Promise((resolve) => {
        setTimeout(() => {
            resolve(`iPhone ${id}`);
        }, 100);
    });
    return {
        title: `Product ${title}`,
    };
};

export default async function ProductDetails({ params }: Props) {
    return (
        <div>123123</div>
    )
}
```
- This is a function to generate metadata.
- **You cannot use both a metadata object and a metadata generation function in the same route.**

### Title Field
#### String Format
This is straightforward.
```ts
export const metadata = {
    title: 'Next.js',
    description: 'Generated by Next.js',
}

----------------------------------

export const generateMetadata = async ({
    params,
}: Props): Promise<Metadata> => {
    const id = (await params).productId
    return {
        title: `Product ${id}`,
    };
};
```
- Both static and dynamic data use string format.

#### Object Format
Using the object format for the title can save effort in certain cases.
```ts
import { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        default: "",
        template: "%s | caihongtu",
        absolute: "",
    },
}
```
- If you are unsure what to put in `absolute`, remove the field instead of setting `absolute: ""`, as it will make the title empty!

- default: The default title, used by child pages that do not specify a title.

- template: Allows adding a prefix or suffix to child page titles, where %s represents the child page title.

- absolute: This can override the parent's title template. The value here is used as-is.


## Appendix

### References

- [7-Hour Mastery of Next.js 15 Ultimate Tutorial (before 1 hour and 15 minutes) | YouTube](https://www.youtube.com/watch?v=k7o9R6eaSes)

### Copyright Information

This article was originally published on [CaiHongtu's Blog](https://cai-hong-tu-blog.pages.dev/) and is licensed under CC BY-NC-SA 4.0. Please retain the original source when reproducing.