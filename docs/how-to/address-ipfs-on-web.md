---
title：在网络上处理 IPFS
description：使用和开发 IPFS 以构建去中心化网络应用和服务的实践指南。
---

# 在网络上处理 IPFS

此页面介绍如何处理 IPFS 网络中的节点。支持 IPFS 协议的客户端可以忽略 HTTP 详细信息并本地检索数据，而不支持 IPFS 协议的客户端只要具有内容标识符 (CID)，就可以从 `ipfs.io` 网关的 HTTP 服务器获取资源。
当 `ipfs.io` 或任何其他 [公共网关](https://ipfs.github.io/public-gateway-checker/) 发生故障时，只要至少有一个节点仍向网络提供 CID 背后的数据，IPFS 感知客户端仍然能够从 IPFS 网络获取内容：

使用网关的地址使用以下形式，其中 `<gateway>` 是网关地址，`<CID>` 是内容标识符

```shell
https://<gateway>/ipfs/<CID>
```

例如：

```shell
https://ipfs.io/ipfs/bafybeihkoviema7g3gxyt6la7vd5ho32ictqbilu3wnlo3rs7ewhnp7lly
```

也可以使用 [自托管本地网关](https://docs.ipfs.io/install/)，而不是`ipfs.io`。

## IPFS 寻址简介

在 IPFS 中，内容地址是路径式的；也就是说，地址是用斜杠分隔的组件。第一个组件是协议，它告诉你如何解释其后的所有内容。

哈希引用的内容可能有命名链接。例如，Git 提交有一个名为“parent”的链接，它实际上只是指向另一个 Git 提交哈希的指针。IPFS 地址中 CID 后面的组件是命名链接。

由于内容地址不是 URL，因此在 Web 浏览器中使用它们需要重新格式化。为此，选项包括：

1. [路径网关](#path-gateway)

```shell
https://<gateway-host>/ipfs/<cid>/<path>
```

2. [子域网关](#subdomain-gateway)，用于托管具有源隔离的网站。这更安全，但设置起来更困难。

```shell
https://<cid>.ipfs.<gateway-host>/<path>
```

3. 本机协议处理程序，当你不想在 URI 中硬编码特定 HTTP 网关时：

```shell
ipfs://<cid>/<path>
```

```shell
ipns://<ipns-name>/<path>
```

## HTTP 网关

HTTP 网关允许“说”HTTP 但不说“IPFS”的工具进行通信。它们是 Web 升级路径的第一阶段。[有关 IPFS 网关的更多信息](../concepts/ipfs-gateway.md)。

HTTP 网关的一个缺点是集中化。网关的基于位置的寻址依赖于 DNS 和 HTTPS/TLS，这依赖于对 [证书颁发机构](https://en.wikipedia.org/wiki/Certificate_authority) (CA) 和 [公钥基础设施](https://en.wikipedia.org/wiki/Public_key_infrastructure) (PKI) 的信任。从长远来看，这些问题应该通过使用机会性协议升级方案来缓解。

### 协议升级

从长远来看，公共 HTTP 网关返回的反序列化响应仅在没有可用的 IPFS 本机实现时用作后备。

IPFS 客户端、用户代理、工具和扩展应检测 URL、DNSLink 或 IPFS 内容路径中的 CID，并通过 IPFS 协议直接解析它们。这可确保检索到的数据与预期的哈希值匹配。

原生支持 IPFS 的用户代理示例包括：

- [Brave](https://brave.com/ipfs-support/)
- 安装在 IPFS 节点旁边的标准 Web 浏览器，其中安装了 [IPFS Companion](https://docs.ipfs.tech/install/ipfs-companion/)，例如 [IPFS Desktop](https://docs.ipfs.tech/install/ipfs-desktop/)

## 路径网关

路径网关是最基本的方案。在此方案中，用于内容寻址的 URL 路径实际上是没有规范位置的资源名称。HTTP 服务器提供位置部分，这使得浏览器能够解释相对于当前服务器的 IPFS 内容路径，并且无需任何转换即可工作。给定网关主机地址（即 `ipfs.io`）和资源路径（即 `/path/to/resource`），可以使用 [CID](../concepts/content-addressing.md) (`<cid>`)、IPNS ID (`<ipnsid>`) 或 [DNSLink](../concepts/dnslink.md) (`<dnslink>`)。

[使用 CID](#cid)
[使用 IPNS](#ipns)
[使用 DNSLink](#dnslink)

### CID
给定 CID `<cid>`，可以构建 URL 路径如下如下：

```纯文本
https://<gateway-host>.tld/ipfs/<cid>/path/to/resource
```

示例：

```纯文本
https://ipfs.io/ipfs/bafybeiemxf5abjwjbikoz4mc3a3dla6ual3jsgpdr4cjr3oz3evfyavhwq/wiki/Vincent_van_Gogh.html
https://ipfs.io/ipfs/QmT5NvUtoM5nWFfrQdVrFtvGfKFmG7AHE8P34isapyhCxX/wiki/Mars.html
```

### IPNS
给定一个 [IPNS 名称](https://specs.ipfs.tech/ipns/ipns-record/#ipns-name) `<ipns-name>`，URL 路径可以构造如下：

```纯文本
https://<gateway-host>.tld/ipns/<ipns-name>/path/to/resource
```

示例：

```纯文本
https://ipfs.io/ipns/k51qzi5uqu5dlvj2baxnqndepeb86cbk3ng7n3i46uzyxzyqj2xjonzllnv0v8
```
### DNSLink
给定一个带有 [DNSLink](https://dnslink.dev/) 文本记录 `<dnslink>` 的 DNS 名称，可以按如下方式构建 URL 路径：

```纯文本
https://<gateway-host>.tld/ipns/<dnslink>/path/to/resource
```

示例：

```纯文本
https://ipfs.io/ipns/tr.wikipedia-on-ipfs.org/wiki/Anasayfa.html
```

::: danger
在此方案中，所有页面共享 [单一来源](https://en.wikipedia.org/wiki/Same-origin_policy)。因此，仅当站点隔离无关紧要时才应使用此类网关。示例包括没有 cookie 的静态内容、本地存储或需要用户权限的 API。

如有疑问，请使用 [子域网关](#subdomain-gateway)。
:::

## 子域网关

当需要 [基于来源的安全性](https://en.wikipedia.org/wiki/Same-origin_policy)时，应在 [CIDv1](../concepts/content-addressing.md#identifier-formats) 中使用不区分大小写的编码（例如 Base32 或 Base36）子域名：

```纯文本
https://<cidv1b32>.ipfs.<gateway-host>.tld/path/to/resource
```

示例：

```纯文本
https://bafybeiemxf5abjwjbikoz4mc3a3dla6ual3jsgpdr4cjr3oz3evfyavhwq.ipfs.dweb.link/wiki/
http://bafybeiemxf5abjwjbikoz4mc3a3dla6ual3jsgpdr4cjr3oz3evfyavhwq.ipfs.localhost:8080/wiki/Vincent_van_Gogh.html
```

#### Kubo 中的原生支持

[Kubo](https://dist.ipfs.tech/#kubo) 为在[`Gateway.PublicGateways`](https://github.com/ipfs/kubo/blob/master/docs/config.md#gatewaypublicgateways) 配置图。

详细了解用于托管公共网关的 Kubo 配置：

- [`Gateway.PublicGateways`](https://github.com/ipfs/kubo/blob/master/docs/config.md#gatewaypublicgateways) 用于定义指定主机名上的网关行为
- [`Gateway` 配方](https://github.com/ipfs/kubo/blob/master/docs/config.md#gateway-recipes) 包含可用于最常见用例的现成单行代码

::: 警告 已知问题

1. 某些浏览器和其他用户代理强制将 URL 的权限部分小写，从而在 HTTP 网关有机会读取区分大小写的 CID 之前破坏它们。
1. DNS 标签长度限制为 63 个字符 ([RFC 1034](https://datatracker.ietf.org/doc/html/rfc1034#page-7))

由于这些限制，建议在子域上下文中使用简短、不区分大小写的 CIDv1。
Base32 是安全的默认设置；不太流行的 Base36 可用于较长的 ED25519 libp2p 密钥。

请参阅下一节，了解如何将现有 CIDv0 转换为 DNS 安全表示。

:::

#### 子域的 CID 转换

如果你有由较旧的 CIDv0 标识的内容，则可以使用自动和手动选项将其安全地表示为 CIDv1，以便在子域和其他不区分大小写的上下文中使用。

- [自动](#automatic--利用 kubo 中的网关)
- [手动](#manual--使用 cidipfsio 或命令行)

##### 自动 — 利用 Kubo 中的网关

使用子域网关作为路径一的临时替代品，无需手动进行 CID 转换。

发送到网关域的内容路径请求将返回 HTTP 301 重定向到正确的子域版本，并在需要时处理任何必要的编码转换：

```纯文本
https://<gateway-host>.tld/ipfs/<cid> -> https://<cidv1>.ipfs.<gateway-host>.tld/
```

例如，在 [`https://dweb.link/ipfs/QmT5NvUtoM5nWFfrQdVrFtvGfKFmG7AHE8P34isapyhCxX/wiki/Mars.html`](https://dweb.link/ipfs/QmT5NvUtoM5nWFfrQdVrFtvGfKFmG7AHE8P34isapyhCxX/wiki/Mars.html) 处打开 CIDv0 资源
将返回重定向到 CIDv1 表示[`https://bafybeicgmdpvw4duutrmdxl4a7gc52sxyuk7nz5gby77afwdteh3jc5bqa.ipfs.dweb.link/wiki/Mars.html`](https://bafybeicgmdpvw4duutrmdxl4a7gc52sxyuk7nz5gby77afwdteh3jc5bqa.ipfs.dweb.link/wiki/Mars.html)。

网关将 CID 转换为不区分大小写的编码。
CIDv1 中的多重哈希与原始 CIDv0 中的多重哈希相同。
#### 手动 — 使用 cid.ipfs.io 或命令行

转换也可以手动完成。

要将 CID 转换为无填充的 Base32 ([RFC4648](https://datatracker.ietf.org/doc/html/rfc4648#section-6))，请使用 [cid.ipfs.io](https://cid.ipfs.io) 或命令行。下面是使用命令行的示例：

```shell
ipfs cid base32 QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR
```

其输出为：

```shell
bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi
```

PeerID 可以表示为 [带有 `libp2p-key` 多编解码器的 CID](https://github.com/libp2p/specs/blob/master/RFC/0001-text-peerid-cid.md)。
对于较长的密钥，建议使用 Base36 作为更安全的默认设置：

```shell
ipfs key list -l --ipns-base base36
k51qzi5uqu5dh9ihj4p2v5sl3hxvv27ryx2w0xrsv6jmmqi91t9xp8p9kaipc2 self

ipfs cid format -v 1 -b base36 --codec libp2p-key QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN
k2k4r8jl0yz8qjgqbmc2cdu5hkqek5rj6flgnlkyywynci20j0iuyfuj
```

## DNSLink 网关

Kubo 提供的网关了解 HTTP 请求中存在的“Host”标头，并将检查对于指定的 [域名](https://en.wikipedia.org/wiki/Fully_qualified_domain_name)，存在 [DNSLink](../concepts/dnslink.md)。
如果存在 DNSLink，网关将返回通过 DNS TXT 记录解析的路径中的内容。
这种类型的网关提供完整的 [来源隔离](https://en.wikipedia.org/wiki/Same-origin_policy)。

例如，此网站 [https://docs.ipfs.tech](https://docs.ipfs.tech)。

::: 提示
有关完整的 DNSLink 指南，包括教程、使用示例和常见问题解答，请参阅 [dnslink.io](https://dnslink.io)。
:::

## 原生 URL

原生地址格式与 [子域网关](https://docs.ipfs.tech/how-to/address-ipfs-on-web/#subdomain-gateway) HTTP URL 相同，但有两点不同：

- 协议方案由 `ipfs` 或 `ipns` 命名空间替换
- 基于位置的权限组件（网关主机和端口）由CID

```纯文本
ipfs://{cid}/path/to/subresource/cat.jpg
```

示例：

```纯文本
ipfs://{cidv1}
ipfs://{cidv1}/path/to/resource
ipfs://{cidv1}/path/to/resource?query=foo#fragment

ipns://{cidv1-libp2p-key}
ipns://{cidv1-libp2p-key}/path/to/resource
ipns://{dnslink-name}/path/to/resource?query=foo#fragment
```

::: 提示
我们的主要目标是重用现有标准，以最大限度地提高与现有用户代理（如浏览器和 CLI 工具）的互操作性。如果某些内容不清楚，则适用 HTTP URL 规则。
:::

双斜杠后的第一个元素是表示内容根的标识符。它被解释为用于原点计算的权限组件，为不同内容树的安全上下文提供必要的隔离。

示例：

```纯文本
ipfs://bafybeiemxf5abjwjbikoz4mc3a3dla6ual3jsgpdr4cjr3oz3evfyavhwq/wiki/Vincent_van_Gogh.html
```

::: 警告 避免区分大小写的 CID
某些用户代理会强制将类似 URL 地址的 CID 组件小写。
为确保与现有库和软件的互操作性，请使用不区分大小写的 CID 编码。建议使用 Base32 或 Base36 中的 CIDv1。
:::
### 将原生地址转换为规范内容路径

每个“URL”地址都可以轻松转换回内容路径：

示例：
- `ipfs://{immutable-root}/path/to/resourceA` 转换为 `/ipfs/{immutable-root}/path/to/resourceA`
- `ipns://{mutable-root}/path/to/resourceB` 转换为 `/ipns/{mutable-root}/path/to/resourceB`

## 更多资源

### 实施者的技术规范

请参阅 [IPFS 网页浏览器内存储库](https://github.com/ipfs/in-web-browsers/blob/master/ADDRESSING.md)。

### 地址方案讨论背景

自从 [@jbenet](https://github.com/jbenet) 发布 [IPFS 白皮书](https://ipfs.io/ipfs/QmR7GSQM93Cx5eAg6a6yRzNde1FQv7uL6X1o4k7zrJa3LX/ipfs.draft3.pdf) 以来，围绕 IPFS 寻址的讨论一直在进行，并提出了许多其他方法。这个长期的设计讨论包括许多冗长的 GitHub 问题线程，但可以在 [此 PR](https://github.com/ipfs/specs/pull/152) 中找到一个很好的摘要。

### IPFS Companion

[IPFS Companion](https://github.com/ipfs/ipfs-companion#readme) 是一个简化对 IPFS 资源的访问的浏览器扩展。

它提供对本机 URL 的支持，并会自动将 IPFS 网关请求重定向到你的本地 Kubo 守护程序，这样你就不会依赖或信任远程网关。