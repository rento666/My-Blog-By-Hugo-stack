---

title: "Use Coze.cn To Translate Web"
slug: "Make use of the coze to make an AI translation"
description: 
date: "2025-06-20T16:38:34+08:00"
lastmod: "2025-06-20T16:38:34+08:00"
image: ""
math: 
license: 
hidden: false
draft: false 
categories: ["ai"]
tags: ["ai"]
reaction: true
top: false

---

> The official website of Coze Space: [https://www.coze.cn](https://www.coze.cn/) <br>
> Note that the author has only tested on Coze Space with the.cn suffix and is not aware of the situation of Coze Space with the.com suffix.

### Preparation before Development
First, go to the official website, log in to your account, then select the development platform and click "Quick Start".

![Coze Space - Development Platform](https://s2.loli.net/2025/06/20/Y6QPEDNhcmzuHkp.png)

Then click on "Workspace" and "Project Development" to create a new application.

![Click on Project Development](https://s2.loli.net/2025/06/20/AoyP9jsufCqY1Gb.png)

Use this template and give your own project name.
![Use the Template](https://s2.loli.net/2025/06/20/6HeVSTn1vz2FORN.png)

The preparation work is completed. Next are some modifications to the project.

### Develop a Translation Project
The newly created application looks like this:
![Inside the Project](https://s2.loli.net/2025/06/20/Umk2pZJywzDg6b4.png)

#### Delete Redundant Content
Since only the translation function is used, the other three pages can be completely deleted. Operate as shown in the figure.
![First set Translation as the home page, then delete the other three pages](https://s2.loli.net/2025/06/20/BSrUMcJIpYzDKXw.png)

Since page navigation between pages is used, the pages cannot be directly deleted. First, delete the elements of the other three pages and then delete the pages.

![The Translation page needs to delete the click event of the button on the right side of the top navigation bar](https://s2.loli.net/2025/06/20/g9IRVCtdN2mFoYJ.png)

The final preview effect is as follows:
![Preview Image](https://s2.loli.net/2025/06/20/ld94kqIOLTyvCEs.png)

#### Modify the Page
The default template does not support Chinese. If you want to translate from English to Chinese, there is no way. So add Chinese here. Similarly, you can also add other languages (as long as they can be translated by AI).

![Support Chinese](https://s2.loli.net/2025/06/20/ra15RFqc4fynZwE.png)

Add a default text to the text:
```
{{ translation.data || 'There is no content to be translated for now' }}
```
![Default Text for Text](https://s2.loli.net/2025/06/20/IzEfbv2qMO6acRm.png)

Then, in the business logic, delete everything except `translation`, including workflows and data, as shown in the following figure.

![Delete the useless in the business logic](https://s2.loli.net/2025/06/20/CUcvTLq5wiED3AS.png)

This is the final effect:

![You can refer to the organization tree on the left](https://s2.loli.net/2025/06/20/eL8fRxKrj9wStHF.png)

### Preview the Page
After the project modification is completed, you need to see how it looks. You can preview the page here:

![Preview Page](https://s2.loli.net/2025/06/20/c4xEKuRibQkjA3n.png)

In the future, if you want to use translation, you can select all in the url address bar and then drag it to the desktop. This will create a shortcut to the web page, and you can directly open the translation website on the desktop next time!

### Appendix
#### References
#### Copyright Information
This article was originally published on [CaiHongTu Blog](https://cai-hong-tu-blog.pages.dev/). It follows the CC BY-NC-SA 4.0 license. Please keep the original source when replicating. 