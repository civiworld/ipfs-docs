---
title：使用 x-ipfs-path
description：了解有关如何在 IPFS Companion 中使用“x-ipfs-path”标头的更多信息。
---

# 在 IPFS Companion 中支持 `x-ipfs-path` 标头

如果提供了 `x-ipfs-path` 响应标头，IPFS Companion 可以将传统 HTTP 请求重定向到 IPFS。

此外，当当前选项卡中的根文档返回此标头时，某些浏览器供应商（如 [Brave](https://brave.com/ipfs-support/)）可能会在地址栏上显示 **使用 IPFS 打开** 按钮。

## 概述

IPFS HTTP 网关可以在每次响应中返回一个 `x-ipfs-path` 标头。标头的值是返回的有效负载的 IPFS 路径。

```shell
curl -sI https://en.wikipedia-on-ipfs.org | grep x-ipfs-path

> x-ipfs-path: /ipns/en.wikipedia-on-ipfs.org/
```

```shell
curl -sI https://dweb.link/ipfs/bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi | grep x-ipfs-path

> x-ipfs-path: /ipfs/bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi
```

WebExtension API [onHeadersReceived](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/onHeadersReceived) 可以在响应标头到达后立即取消并重定向 HTTP 请求。这意味着客户端可以放弃初始请求，避免重复下载内容。

可以在“首选项”屏幕中禁用“x-ipfs-path”标头的检测（但默认情况下处于启用状态）。

## 用例

### 针对 URL 中不存在 IPFS 路径的极端情况的回退

网站所有者可以将 HTTP 网关置于反向代理后面，但将其配置为在 `/` 下公开 `/ipfs/<cid>/`，在这种情况下，IPFS Companion 的基于路径的 IPFS 检测（请参阅 [onBeforeRequest](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/webRequest/onBeforeRequest)）将不起作用。

得益于 `x-ipfs-path` 标头，我们为这些配置提供了可靠的回退。

### 提示 DNSLink 查找

`x-ipfs-path` 标头的存在清楚地表明网站使用了 IPFS。

默认情况下启用“尽力而为”[DNSLink 策略](dnslink-companion.md)，以对返回标头的 FQDN 执行阻止 DNS TXT 查找。

请注意，如果 [DNSLink 策略](dnslink-companion.md) 为“关闭”或缺少 DNS TXT 记录，则以 `/ipns/` 开头的 `x-ipfs-path` 值将被忽略。

### 其他资源

- 可以在 [WebExtensions API：webRequest](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest) 文档中找到 `onBeforeRequest` 和 `onHeadersReceived` 监听器的概述