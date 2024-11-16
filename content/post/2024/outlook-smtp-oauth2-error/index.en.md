---
title: "Outlook Smtp Oauth2 Error"
slug: "Outlook Smtp Oauth2 Error"
description: "In this blog, I used Outlook's SMTP service when accessing email alerts in the comment system, but I found an error when using it."
date: "2024-11-15T22:57:15+08:00"
lastmod: "2024-11-15T22:57:15+08:00"
image: "https://picsum.photos/seed/34535s/800/600"
math:
license:
hidden: false
draft: false
categories: ["email"]
tags: ["outlook", "smtp"]
reaction: true
---

## Introduction

When the comment system of this blog was connected to the email reminder, the SMTP service of Outlook was used, but when using it, it was found that there was no email reminder.

## View the log

So I went to Vercel to check the log, as shown below:

![Walline project deployed by Vercel - Sending email reminder error](https://s2.loli.net/2024/11/15/wl5o4EAj2GBv3sI.png)

The error stack is as follows:
```
Mail send fail: Error: Invalid login: 535 5.7.139 Authentication unsuccessful, basic authentication is disabled. [CH0PR13CA0024.namprd13.prod.outlook.com 2024-11-15T12:41:27.364Z 08DD02E8CBA00082]
at SMTPConnection._formatError (/var/task/node_modules/nodemailer/lib/smtp-connection/index.js:807:19)
at SMTPConnection._actionAUTHComplete (/var/task/node_modules/nodemailer/lib/smtp-connection/index.js:1586:34) at SMTPConnection.<anonymous> (/var/task/node_modules/nodemailer/lib/smtp-connection/index.js:1540:18) at SMTPConnection._processResponse (/var/task /node_modules/nodemailer/lib/smtp-connection/index.js:991:20) at SMTPConnection._onData (/var/task/node_modules/nodemailer/lib/smtp-connection/index.js:772:14) at TLSSocket.SMTPConnection._onSocketData (/var/task/node_modules/nodemailer/lib/smtp-connection/index.js:195:44) at TLSSocket.emit (node:events:519:28) at TLSSocket.emit (node:domain:488:12) at addChunk (node:internal/streams/readable:559:12) at readableAddChunkPushBy teMode (node:internal/streams/readable:510:3) { code: 'EAUTH', response: '535 5.7.139 Authentication unsuccessful, basic authentication is disabled. [CH0PR13CA0024.namprd13.prod.outlook.com 2024-11-15T12:41:27.364Z 08DD02E8CBA00082]', responseCode: 535,
command: 'AUTH LOGIN'
}
```

## Source of this article

No one seems to have raised this question in [waline's discussions](https://github.com/orgs/walinejs/discussions), maybe I'm the only one using Outlook...

Just look at the first line: `Mail send fail: Error: Invalid login: 535 5.7.139 Authentication unsuccessful, basic authentication is disabled.`, which means that Outlook's SMTP service does not support basic authentication.
I searched and found that Outlook stopped supporting basic authentication for individual users on September 16, 24, and recommended using OAuth2 authentication. [See | Microsoft official website](https://techcommunity.microsoft.com/blog/outlook/keeping-our-outlook-personal-email-users-safe-reinforcing-our-commitment-to-secu/4164184)
But I didn't find support for OAuth2 in the [waline document](https://waline.js.org/reference/server/env.html#邮件).

Write a plug-in yourself?

It seems unnecessary to write one for a comment system, after all, human energy is limited (~~ I won't say I'm a novice~~)

## Solution

So today's protagonist: [sendas.email](https://sendas.email/)

I will use the project deployed by the author here, and I won't redeploy it again.
If you want to deploy it yourself, you can fork the author's project first, and then deploy it yourself.
The deployment method is as shown below:

![Deployment method](https://s2.loli.net/2024/11/16/Z2ROoCiN78X9bcA.jpg)

### Start solving

Enter [sendas.email](https://sendas.email/), then scroll down to the bottom and click `Sign in with Microsoft`

![Sign in with Microsoft | sendas.email](https://s2.loli.net/2024/11/16/nvXBIkVYOZ2CSQx.png)

When logging in, Microsoft will prompt you whether to allow third-party applications to access your account. Click **Accept**.

![Authorize](https://s2.loli.net/2024/11/16/5OY3qFZXu2NGvgb.png)

After authorization, the Microsoft account team will send an email reminder:

![Email reminder](https://s2.loli.net/2024/11/16/SkPVCUp45gBunwI.png)

At this time, return to sendas.email, the website automatically redirects to the [configuration page](https://sendas.email/configuration), the page is as shown below:

![Show new username + password](https://s2.loli.net/2024/11/16/XV5Gr8wY1hdtJ4H.png)

### Modify environment variables

Next, return to the deployment of vercel and replace the previous password with the new password.

![Correspondence](https://s2.loli.net/2024/11/16/ixrA7yskvpw9H4h.png)

Please note that if you used `SMTP_SERVICE` before, you need to delete it now and add `SMTP_HOST` and `SMTP_PORT`.

![SMTP_SERVICE is used](https://s2.loli.net/2024/11/16/zxqafYFO6iVjIMR.png)

Complete the environment variable configuration of vercel, as shown below:

![Email configuration](https://s2.loli.net/2024/11/16/aHElFG3j1M6XZwC.png)

Restart the project, and then you can send emails normally.

![Restart the project](https://s2.loli.net/2024/11/16/vncROktPExoCH8h.png)

## Appendix

### Reference

* [waline discussions | Github](https://github.com/orgs/walinejs/discussions)
* [sendas.email | This time's protagonist (this target)](https://sendas.email/)
* [Gmail-to-outlook-proxy | Github](https://github.com/jasperchan/gmail-to-outlook-proxy)
* [Gmail Help | Google Mail Community](https://support.google.com/mail/thread/298145809/outlook-smtp-authentication-errors?hl=en)
* [Update Policy | Microsoft Official website](https://techcommunity.microsoft.com/blog/outlook/keeping-our-outlook-personal-email-users-safe-reinforcing-our-commitment-to-secu/4164184)
* [Wrong Microsoft credentials | Microsoft](https://support.microsoft.com/en-us/office/pop-imap-and-smtp-settings-for-outlook-com-d088b986-291d-42b8-9564-9c414e2aa040)

### Copyright information

This article was originally published on [CaiHongTu Blog](https://cai-hong-tu-blog.pages.dev/), following the CC BY-NC-SA 4.0 agreement, please keep the original source when copying.
