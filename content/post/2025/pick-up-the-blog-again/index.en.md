---

title: "Pick Up the Blog Again"
slug: "Pick Up the Blog Again"
description: 
date: "2025-06-20T13:56:15+08:00"
lastmod: "2025-06-20T13:56:15+08:00"
image: "https://picsum.photos/seed/pick-up-the-blog-again11/800/600"
math: 
license: 
hidden: false
draft: false 
categories: ["build-website"]
tags: ["hugo"]
reaction: true
top: false

---
## Introduction

When I got a new computer and was bored, it occurred to me that I hadn't updated my blog for a long time, so here is this post.

## Analysis

Looking back at the blog, it uses hugo framework, and the source code is still in my [GitHub repository](https://github.com/rento666/My-Blog-By-Hugo-stack), so I need to use **Git** to clone the project, and then since it is a blog of Hugo framework, I need to install Hugo**, the image is stored in [SMMS website](https://smms.app/), no need to download it.

## Install Git

There is nothing to say about installing Git, it is installed in D disk, the address is as follows: [Git Installation Address](https://git-scm.com/), always default to the next step on the line.

### Configure your username and email 
After the installation is complete, you need to configure your username and email.

> Why do I need to configure my username and email?

This information is used every time git commits, and it is recommended that you use the same GitHub username and email address.

``` 
$ git config --global user.name "abc" 
$ git config --global user.email "abc@def.com" 
```

** --global** means that this command works globally, i.e. all projects will use this username and email.

### Setting up SSH

Right mouse button, click on **Git Bash** and type the following command: 
``` 
ssh-keygen -t rsa 
```

You can go all the way back to the Enter key, or you can set up the storage location `D:\Programs\Git\.ssh\id_rsa` as shown in the picture below. (You need to create your own folder `D:\Programs\Git\.ssh` to be able to)

![Setting up SSH and modifying the storage location](https://s2.loli.net/2025/06/20/fQ6OHnxcG8Ng3W2.png)

### Configuring the proxy

Since the operation may fail or be slowed down due to the network when clone is performed, we set up a proxy here.

Open the `C:\Users\ your username` folder, find the `.gitconfig` file, and add the following:

``` 
[http] 
 proxy = socks5://127.0.0.1:1234 
[https] 
 proxy = socks5://127.0.0.1:1234 
[git] 
 proxy = socks5://127.0.0.1:1234 
```

### Bind to Github

Open Github, click on the avatar, click on `Settings`, click on `SSH and GPG keys` and add a new SSH key.

![Github SSH key](https://s2.loli.net/2025/06/20/526Xyw3MsOWbNSu.png)

### End of installing Git


## Installing Hugo

The `Winget` installation method is used here.

### Winget

Winget is Microsoft's official free and open-source package manager for Windows. To install the extended edition of Hugo: 
``` 
winget install Hugo.Hugo.Extended 
````

To uninstall the extended edition of Hugo: 
``` 
winget uninstall --name "Hugo (Extended)" 
```

### Note!

If you are a `Windows` user:

Do not use ``command prompt (cmd)``.

Do not use `Windows PowerShell`.

Run these commands in `PowerShell` or a `Linux terminal` (such as `WSL` or `Git Bash`).

`PowerShell` and `Windows PowerShell` are different applications.

If you happen to be using vscode, you can set it up like this: 
![VSCODE Setup Git Bash](https://s2.loli.net/2025/06/20/okz8jQ7C3qYblVN.png)

### End of installing Hugo

Now that all the preliminaries are done, feel free to blog!


### Appendix

### Reference

- [Github Desktop | Download](https://github.com/apps/desktop)

- [Install Hugo | Doc](https://gohugo.io/installation/windows/)

- [Hugo doesn't work in cmd on Windows.](https://hugo.opendocs.io/getting-started/quick-start/#命令)

### Copyright information

This article was originally published in [CaiHongTu Blog](https://caihongtu.top) and follows the CC BY-NC-SA 4.0 agreement. Please keep the original source when copying.

---
## END