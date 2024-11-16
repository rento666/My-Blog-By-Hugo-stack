---

title: "Github Personal HomePage(Profile) Beautification"
slug: "Github Profile"
description: 
date: "2024-11-14T22:49:20+08:00"
lastmod: "2024-11-14T22:49:20+08:00"
image: "https://picsum.photos/seed/231s2/800/600"
math: 
license: 
hidden: false
draft: false 
categories: ["Github"]
tags: ["Github"]
reaction: true

---
## Introduction

Every time I see a big guy's Github homepage is very cool, I always envy him. Those big guys are really amazing. Not only are they technically strong, but even their Github personal homepages are cool.  
So I looked up information and finally decided to beautify my Github homepage  
~~(although I am a rookie and have not written any good open source projects...)~~

## Beautify your personal homepage

> GitHub supports custom homepages.   
> Related documents: [Setting up and managing GitHub profiles | Github official documents](https://docs.github.com/zh/account-and-profile/setting-up-and-managing-your-github-profile)

### Create a new repository

Create a new repository in your Github homepage. The repository name must be **your GitHub username**, for example, the following figure is `rento666`, and then add a `README.md` file. We just need to add the required information to this file.

As shown in the figure below, the option `Add a README file` is not checked. It is recommended to check it (checking it will save you the trouble of creating it manually). Click Create to complete the creation.

* rento666/rento666 is a ✨special ✨ repository that you can use to add README.md to your GitHub profile. Make sure it is public and initialize it with README to get started.

![Information when creating a repository](https://s2.loli.net/2024/11/14/yMGe8SKFQrwNCjc.png)

### Edit README

Here is the interface for editing the README.md file:

![Initial content of the README file](https://s2.loli.net/2024/11/14/TSXN2cr86Oy3jeI.png)

### Started

The content that can be added to README can be your own introduction, open source projects, personal information, blogs, resumes, etc.

Markdown is highly extensible and supports HTML, Emoji, etc., so you can customize your own unique homepage~

However, human energy is limited, so we can fork the templates we think are good to our own warehouse, and then modify them to our own style.

Share an excellent collection: 
[awesome-github-profile-readme | Github](https://github.com/abhisheknaiidu/awesome-github-profile-readme)  
[awesome-github-profiles | Github](https://github.com/EddieHubCommunity/awesome-github-profiles)  
[beautify-github-profile | Github](https://github.com/rzashakeri/beautify-github-profile)  
[awesome github profile readme chinese | Github](https://github.com/eryajf/awesome-github-profile-readme-chinese)  
[awesome-github-profile-readme-templates | Github](https://github.com/durgeshsamariya/awesome-github-profile-readme-templates) 

#### My homepage

Because I like to watch the Battle of the Two Cities, I used pictures from the anime. The screenshot of the homepage is as follows (long screenshot, loading may be slow):

![My Github homepage](https://s2.loli.net/2024/11/15/nhH23GmdZXsBbIw.png)

#### Modification
In my homepage, I used the following template, you can copy it to your own `README.md` file:

- The first step is to copy README:
{{% spoiler "README content is as follows" %}}
```
### Hey <img src="https://media.giphy.com/media/hvRJCLFzcasrR4ia7z/giphy.gif" width="25px">, I’m Rento
![Typing SVG](https://readme-typing-svg.demolab.com/?lines=Welcome+to+my+Github+homepage;I'm+honored+to+help+you)

<table>
<tr>
<td valign="center" width="30%">

- 🤖 My favorite anime: Battle of Two Cities
- 👨‍💻 I know Golang, Node.js, Java, React, Vue, Uni APP, React Native, Unity(C#) and so on...
- ✍️ [Welcome to visit my blog](https://cai-hong-tu-blog.pages.dev/)
- 💬 Keep thinking
- 📫 Contact me: [Email contact](mailto:putongruwo@outlook.com)
- 👏 Follow me: [![](https://img.shields.io/github/followers/rento666?label=Follow me&style=social)](https://github.com/rento666/)
- 🎣 Interests: Reading [Ruan Yifeng's blog](https://www.ruanyifeng.com/blog/), writing [my own blog](https://cai-hong-tu-blog.pages.dev/), watching [Youtube](https://www.youtube.com/@caihongtu)
**「Happy every day」** ❤️
</td>
<td valign="center" width="100%" height="100%">
<img src="https://github.com/user-attachments/assets/7e018694-352d-494a-9a22-89d7d21f52b6" width="703" height="300">
</td>
</tr>
</table>

<hr/>

🏆 **My GitHub statistics:**

|![](https://github-readme-stats.vercel.app/api?username=rento666)|![My most commonly used programming language](https://github-readme-stats.vercel.app/api/top-langs/?username=rento666&layout=compact&hide_border=true&langs_count=10)|
|-|-|

<table>
<tr>
<td valign="center" width="50%">

#### 🐍 Contributions
<picture>
<source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/rento666/rento666/output/github-contribution-grid-snake-dark.svg"> <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/rento666/rento666/output/github-contribution-grid-snake.svg"> <img al t="github contribution grid snake animation" src="https://raw.githubusercontent.com/rento666/rento666/output/github-contribution-grid-snake.svg"> </picture> </td> <td valign="center" width="50%"> 📕 &nbsp;[**My latest blog**](https://cai-hong-tu-blog.pages.dev/) <!-- BLOG-POST-LIST:START -->
<!-- BLOG-POST-LIST:END -->

</td>
</tr>
</table>

```
{{% /spoiler %}}

- Step 2: After copying, press `CTRL+F` to replace the name, user name, hobbies, blog link and other information.

- Step 3. After modifying README.md, click Actions in the repository to create a workflow, as shown below:

![Click Actions to create a workflow](https://s2.loli.net/2024/11/15/WxnbTOy3mQkp175.png)

After entering, click `Configure` of `Simple workflow`, as shown below:

![Click Configure](https://s2.loli.net/2024/11/15/EmW2fhUDlIRr1wT.png)

Add the following code (need to be separated, don't put it in one file):
{{% spoiler "Greedy Snake workflow" %}}
```
name: generate animation

on:
# run automatically every 2 hours
schedule:
- cron: "0 */2 * * *"

# allows to manually run the job at any time
workflow_dispatch:

# run on every push on the master branch push: branches: - master jobs: generate: permissions: contents: write runs-on: ubuntu-latest timeout-minutes: 5 steps: # generates a snake game from a github user (<github_user_name>) contributions graph, output a svg animation at <svg_out_path> - name: generate github-contribution-grid-snake.svg uses: Platane/snk/svg-only @v3 with: github_user_name: ${{ github.repository_owner }} outputs: | dist/github-contribution-grid-snake.svg dist/github-contribution-grid-snake-dark.svg?palette=github-dark # push the content of <build_dir> to a branch # the content will be available at https://raw.githubusercontent.com/<github_user>/<repository>/<target_branch>/<file> , or as github page - name: push github-contribution-grid-snake.svg to the output branch
uses: crazy-max/ghaction-github-pages@v3.1.0
with:
target_branch: output
build_dir: dist
env:
GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
{{% /spoiler %}}

**Please note that in the blog workflow below, you need to replace `feed_list` with your own blog RSS address.**  
**If you are also using Hugo and the theme is Stack, the RSS address should be `https://your blog address/index.xml`**
{{% spoiler "Get the latest blog workflow" %}}
```
name: Latest blog post workflow
on:
schedule: # Run workflow automatically
- cron: '0 */2 * * *' # Runs every hour, on the hour
workflow_dispatch: # Run workflow manually (without waiting for the cron to be called), through the GitHub Actions Workflow page directly
permissions:
contents: write # To write the generated contents to the readme

jobs:
update-readme-with-blog:
name: Update this repo's README with latest blog posts
runs-on: ubuntu-latest
steps:
- name: Checkout
uses: actions/checkout@v3
- name: Pull in blog's posts
uses: gautamkrishnar/blog-post-workflow@v1
with:
feed_list: "https://cai-hong-tu-blog.pages.dev/index.xml"
template: "<div><a href=\"$url\">$title $date</a></div>"
date_format: "yyyy-mm-dd"
```
{{% /spoiler %}}

## Star trend chart

In the `README.md` file in the root directory of your own open source project, add the following code:
* Among them, `your own GitHub username` needs to be replaced with your own Github username, for example, the figure below is `rento666`.
* `Open source project warehouse name` needs to be replaced with your own open source project warehouse name, the figure below is `My-Blog-By-Hugo-stack`.

{{% spoiler "Star Trend Chart Code" %}}
```
<picture>
<source
media="(prefers-color-scheme: dark)"
srcset="
https://api.star-history.com/svg?repos=self GitHub username/open source project warehouse name&type=Date&theme=dark
"
/>
<source
media="(prefers-color-scheme: light)"
srcset="
https://api.star-history.com/svg?repos=self GitHub username/open source project warehouse name&type=Date
"
/>
<img
alt="Star History Chart"
src="https://api.star-history.com/svg?repos=self GitHub username/open source project warehouse name&type=Date"
/>
</picture>
```
{{% /spoiler %}}

If you are not sure about the two names, you can refer to the following figure to find them:

![The arrow in the figure points to the username + project repository name](https://s2.loli.net/2024/11/14/6PkYugWUShOdfcx.png)

## Appendix

### References

* [Super detailed GitHub personal homepage beautification tutorial | peterjxl blog](https://www.cnblogs.com/PeterJXL/p/18437094)

* [Hugo Markdown support test | Github-Pages deployed blog, author: edward852](https://edward852.github.io/post/markdown支持情况测试/)

* [Github open source project Star trend chart | Github](https://github.com/star-history/star-history/tree/main)

### Copyright information

This article was originally published on [CaiHongTu Blog](https://cai-hong-tu-blog.pages.dev/) follows the CC BY-NC-SA 4.0 agreement. Please keep the original source when copying.