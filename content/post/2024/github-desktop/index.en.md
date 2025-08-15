---

title: "How to solve the problem of Chinese localization failure after moving Github Desktop"
slug: "Github Desktop"
description: 
date: "2024-11-19T11:25:27+08:00"
lastmod: "2024-11-19T11:25:27+08:00"
image: "https://picsum.photos/seed/GithubDesktop11/800/600"
math: 
license: 
hidden: false
draft: false 
categories: ["Github"]
tags: ["Github"]
reaction: true
top: false

---

## Introduction

When I installed GitHub Desktop, it was automatically installed to the C drive.

## Download the Chinese package

I definitely won't spoil him for this. I went directly to the `Local` and `Roaming` directories under `C:\Users\%username%\AppData` and cut the `Github Desktop` and `GithubDesktop` folders in them to my own `D:\Development\Github` folder.

Just like the picture below:

![Github Directory](https://s2.loli.net/2024/11/19/43h19yEMbDw8sTr.png)

After moving the folder, the administrator opens CMD and enters:

- I forgot whether the GitHub folder in the Local directory or the Roaming directory has a space. You can see your own directory changes in the following code.

```cmd
mklink "C:\Users\%username%\AppData\Local\Github Desktop" "D:\Development\Github\Github Desktop"
mklink "C:\Users\%username%\AppData\Local\GithubDesktop" "D:\Development\Github\GithubDesktop"
```

Then go to this [Github Desktop Chinese version - Github repository](https://github.com/robotze/GithubDesktopZhTool), click `Releases` on the right to download the Chinese version tool for the **corresponding version**

## Start Chinese version

### Chinese version failed

After decompression, click Chinese version, and find that the Chinese version failed, prompting that the path cannot be found.

### Solution

Open the unzipped Chinese package folder, enter the `Windows` folder, copy the `main.js` and `renderer.js` (you can also cut them)

Enter the `Github\GitHubDesktop\app-3.4.9\resources\app` directory, paste directly, replace the files, and the Chinese translation is complete.

Such as:

![Here](https://s2.loli.net/2024/11/19/bnCZkivTFtdy5jL.png)

## Reminder

- Please make sure to close the GitHub Desktop software before Chinese translation! ! !
- Please make sure that the software version is the same as the Chinese version! ! !

## Appendix

### Reference

- [GithubDesktopZhTool - Github](https://github.com/robotze/GithubDesktopZhTool?tab=readme-ov-file)

### Copyright Information

This article was originally published in [彩虹兔の博客](https://cai-hong-tu-blog.pages.dev/), following the CC BY-NC-SA 4.0 agreement. Please keep the original source when copying.