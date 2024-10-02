---
title：IPFS Companion
description：IPFS Companion 浏览器扩展允许你通过浏览器与 IPFS 节点和扩展的 IPFS 网络进行交互。在此处了解如何安装。
---

# 安装 IPFS Companion 浏览器扩展

IPFS Companion 允许你通过浏览器与 IPFS 节点和扩展的 IPFS 网络进行交互。该插件适用于 Brave、Chrome、Edge、Firefox、Opera 和任何其他基于 Chromium 的 Web 浏览器。

它支持 `ipfs://` 和 `ipns://` 地址，自动从本地 IPFS 网关加载网站和文件路径，允许你轻松导入和与 IPFS 共享文件，等等。

## 先决条件

要启用其全部功能，IPFS Companion 需要本地 IPFS 节点。因此，建议你在计算机上安装并运行 IPFS 节点。以下任何一种都可以满足要求：

- [安装 IPFS 桌面应用程序](../install/ipfs-desktop.md)
- [安装 IPFS Kubo CLI 和守护进程](../install/command-line.md)

## 安装

安装 IPFS Companion 的最简单方法是通过浏览器的特定扩展和附加组件商店：

| [Firefox](https://www.mozilla.org/firefox/new/) \| [适用于 Android 的 Firefox](https://play.google.com/store/apps/details?id=org.mozilla.firefox) | [Chrome](https://www.google.com/chrome/) \| [Brave](https://brave.com/) \| [Opera](https://www.opera.com/) \| [Edge](https://www.microsoftedgeinsider.com/) |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [![从 AMO 安装](https://ipfs.io/ipfs/QmWNa64XjA78QvK3zG2593bSMizkDXXcubDHjnRDYUivqt)](https://addons.mozilla.org/firefox/addon/ipfs-companion/) | [![从 Chrome 商店安装](https://ipfs.io/ipfs/QmU4Qm5YEKy5yHmdAgU2fD7PjZLgrYTUUbxTydqG2QK3TT)](https://chrome.google.com/webstore/detail/ipfs-companion/nibjojkomfdiaoajekhjakgkdhaomnch) |

## 功能

IPFS Companion 为你的浏览器增强了 DWeb 功能，其功能包括：

### 检测具有 IPFS 路径的 URL

IPFS Companion 可检测并测试任何网站上类似 IPFS 路径的请求，例如 `/ipfs/{cid}` 或 `/ipns/{peerid_or_host-with-dnslink}`。如果路径是有效的 IPFS 地址，则会将其重定向到你的本地网关加载，从而将数据从一种协议转换为另一种协议。`localhost` 处的网关还将自动切换到子域，为每个网站提供唯一的来源。提供唯一来源可适应仅限于共享相同协议、域和端口的内容的操作，也称为[同源内容](https://en.wikipedia.org/wiki/Same-origin_policy#:~:text=In%20computing%2C%20the%20same%2Dorigin,pages%20have%20the%20same%20origin)。

> `https://ipfs.io/ipfs/QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR`
> → `http://localhost:8080/ipfs/QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR`
> → `http://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi.ipfs.localhost:8080`

### 检测启用 DNSLink 的 URL

IPFS Companion 检测网站 DNS 记录中的 DNSLink 信息。DNSLink 是一种简单的协议，它链接来自 DNS 的内容和可服务性并利用 DNS 分布式架构。请参阅 [词汇表 > DNSLink](../concepts/glossary.md#dnslink)。如果站点使用 DNSLink，IPFS Companion 会将 HTTP 请求重定向到你的本地网关：

> `http://docs.ipfs.tech`
> → `http://localhost:8080/ipns/docs.ipfs.tech` → `http://docs.ipfs.tech.ipns.localhost:8080/`

### 检测带有 `x-ipfs-path` 标头的页面

如果 IPFS Companion 在任何 HTTP 响应标头中找到 `x-ipfs-path`，它还会将传输升级到 IPFS。当 URL 中不存在 IPFS 路径时，这可以作为后备方案。

### 全局或每个站点切换重定向

你可以通过多种方式禁用和重新启用本地网关重定向：

- 在 IPFS Companion 的首选项中全局暂停重定向。
- 使用当前选项卡下或 IPFS Companion 偏好设置中的切换按钮暂停每个站点的重定向。
- 将 `x-ipfs-companion-no-redirect` 作为哈希添加到 URL 本身（[示例](https://ipfs.io/ipfs/QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR#x-ipfs-companion-no-redirect)) 或查询参数（[示例](https://ipfs.io/ipfs/QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR?x-ipfs-companion-no-redirect))。

### 从浏览器栏访问常用的 IPFS 操作

IPFS Companion 可让你通过几次点击从浏览器栏快速轻松地访问常用操作：

- 只需浏览浏览器栏中的立方体图标，即可查看你连接的对等方数量。
- 单击立方体图标以显示主菜单，检查你的 IPFS API 和网关状态。
- 右键单击图像和其他页面资产，轻松将它们添加到 IPFS，包括保留文件名的选项。
- 在主菜单中选择“快速导入/共享...”选项，以便从浏览器选项卡快速拖放导入。
- 直接从主菜单固定或取消固定 IPFS 资源。
- 直接从主菜单复制可共享的公共网关链接、IPFS 内容路径或 IPFS 资源的 CID。
- 只需单击一下，即可从主菜单启动 [IPFS Web UI 仪表板](https://github.com/ipfs/ipfs-webui)。
- 从主菜单快速轻松地切换网关重定向或打开或关闭所有 IPFS Companion 功能。

## 更多文档

如果你想深入了解 IPFS Companion，请查看 [github.com/ipfs/ipfs-companion →](https://github.com/ipfs/ipfs-companion) 上的项目文档