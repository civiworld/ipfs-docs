---
title：使用 IPFS 存储 NFT 数据的最佳实践
description：非同质化代币可以代表各种数字媒体。了解使用 IPFS 存储 NFT 数据的一些最佳实践。
date：2021-04-02
---

# 使用 IPFS 存储 NFT 数据的最佳实践

IPFS 非常适合存储和寻址 NFT 或非同质化代币的数据。本指南介绍了如何在 IPFS 上存储 NFT 的数据，以便 NFT 创建者和所有者获得经得起时间考验的出色体验。

由于 NFT 在创建后无法轻易更改，因此最好考虑如何存储、寻址和持久化 NFT 的数据。这就是为什么我们要详细介绍[如何准备 NFT 元数据](#metadata)，我们还将研究[指向 IPFS 内容的不同类型链接](#ipfs 链接类型和使用时间)以及何时使用每种链接。最后，我们将了解为什么[制定数据持久性计划](#persistence-and-availability)对于良好的用户体验很重要。通过遵循这些建议，你可以帮助确保你的 NFT 数据拥有长期健康的未来。

本指南面向构建 NFT 平台和其他工具的开发人员，重点介绍如何格式化数据并链接到数据以获得最佳长期结果。

如果你有兴趣深入了解 NFT 最佳实践和 NFT 开发的世界，请前往 [NFT 学校](https://nftschool.dev) 获取概念指南、教程和操作方法。

## IPFS 链接的类型及其使用时间

有几种不同的方法来引用 IPFS 上的数据，每种方法都最适合不同的用例。

### CID

CID 唯一地标识一段内容。CID 可以以紧凑的二进制形式存储并通过网络发送，但当显示给用户时，它们会表示为看似随机的字符串。以下是一个例子：

```
bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi
```

IPFS 使用两种版本的 CID。上面的示例是版本 1 CID（或 CIDv1），它比旧的“版本 0”格式有一些优势，尤其是在使用 IPFS 网关在网络上查看 IPFS 内容时。最好使用版本 1 CID 来处理 NFT 数据，采用 base32 编码。

要在使用 IPFS 命令行时启用 CIDv1，请在运行 `ipfs add` 命令时添加 `--cid-version=1` 标志：

```shell
ipfs add --cid-version=1 ~/no-time-to-explain.jpeg
added bafkreigg4a4z7o5m5pwzcfyphodsbbdp5sdiu5bwibdw5wvq5t24qswula no-time-to-explain.jpeg
```

在 JavaScript 中，你可以对 `ipfs.add` 方法使用以下选项：

```javascript
const cid = await ipfs.add({ content }, {
cidVersion: 1,
hashAlg: 'sha2-256'
})
```

如果你的内容已经有版本 0 CID，则无需再次将其添加到 IPFS 即可获得新的 CID 格式！你可以使用 [ipfs 命令行](address-ipfs-on-web.md#manual-use-cid-ipfs-io-or-the-command-line) 或通过网络 [cid.ipfs.io](https://cid.ipfs.io) 将 v0 CID 转换为 v1。如果你不确定你拥有哪个版本，很容易分辨出差异。版本 0 CID 始终为 46 个字符长，以“Qm”开头。

::: 提示
你可以在我们的 [内容寻址指南][docs-cid] 中了解有关 CID 的更多信息，或者按照 [ProtoSchool 上的交互式教程][protoschool-cid] 进行操作。
:::

将数据添加到 IPFS 并拥有 CID 后，你可以准备代币的元数据并在区块链上“铸造”代币。要从智能合约或 NFT 元数据内部链接到你的内容，你应该将 CIDv1 转换为 IPFS URI，如下所述。

### IPFS URI

统一资源标识符 (URI) 用于指定给定上下文中的特定内容。上下文由 URI 方案决定（作为前缀附加到 URI，后跟 `://`）。IPFS 的 URI 方案只是 `ipfs`。

以下是完整 IPFS URI 的示例：`ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi`

IPFS URI 是 IPFS 链接的规范表示，因为 `ipfs` 方案明确无误地表明 CID 指的是 IPFS 上的内容，而不是其他系统。要生成 IPFS URI，只需在 CID 字符串前加上静态字符串 `ipfs://`。

你还可以在 IPFS URI 的路径组件中包含文件名。例如，如果你已将代币的元数据存储在 IPFS 目录中，则你的 URI 可能是：`ipfs://bafybeibnsoufr2renqzsh347nrx54wcubt5lgkeivez63xvivplfwhtpym/metadata.json`

我们建议使用 IPFS URI 从你的智能合约链接到使用 IPFS 存储的任何外部数据，包括描述和上下文化代币的任何_元数据_。

IPFS URI 也是从代币元数据内部链接到存储在 IPFS 上的图像和其他资产的推荐方式。有关更多详细信息，请参阅[下面的元数据建议](#metadata)。

### HTTP 网关 URL

HTTP 网关为无法本地解析 IPFS URI 的旧版用户代理提供互操作性。

以下是示例：`https://dweb.link/ipfs/bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi`

内置支持 IPFS 的用户代理（通过 IPFS Companion 浏览器扩展或通过 Brave 提供的本机支持）将能够识别网关链接并使用本机 IPFS 协议解析内容。其他用户代理只需按照链接到网关，网关将通过 IPFS 加载内容并使用 HTTP 提供内容。你可以在我们的 [IPFS 网关概念文章][docs-gateway] 中了解有关 HTTP 网关的更多详细信息。

网关链接非常适合互操作性，但它们不应成为你在 IPFS 上数据的主要或规范链接。虽然只要 IPFS 上的任何人都拥有数据，IPFS URI 就将保持可访问，但如果网关操作员离线，网关链接可能会失败。

在使用网关链接时，开发人员应确保网关遵循正确的 URL 约定。以下任一 URL 结构均可接受：

`https://<gateway-host>.tld/ipfs/<cid>/path/to/subresource`

`https://<cidv1b32>.ipfs.<gateway-host>.tld/path/to/subresource`

在面向用户的应用程序中，开发人员应通过以下两种方式链接到 IPFS 内容：

- IPFS URI
- HTTP 网关 URL

这将提供最佳用户体验，直到更多浏览器支持 IPFS URI 方案的本机解析。请注意，可以根据需要从 CID 或 IPFS URI 轻松生成这两种网关链接。
## 元数据

大多数 NFT 都需要某种结构化的元数据来描述代币的基本属性。可以使用许多编码和数据格式，但事实上的标准是将元数据存储为 JSON 对象，编码为 UTF-8 字节字符串。

以下是 NFT 的一些 JSON 元数据示例：

```json
{
“name”：“没有时间解释！”，
“description”：“我说没有时间解释，我坚持这一点。”，
“image”：“ipfs://bafybeict2kq6gt4ikgulypt7h7nwj4hmfi2kevrqvnx2osibfulyy5x3hu/no-time-to-explain.jpeg”
}
```

有很多方法可以为 NFT 构建元数据，很多细节取决于你的 NFT 平台的具体用例。上面的示例使用了 [ERC-721][eip-721] 标准中定义的模式。

一般而言，采用或扩展现有标准（如 [ERC-721][eip-721] 和 [ERC-1155][eip-1155] 中定义的模式）是个好主意，因为你的 NFT 将可以使用标准钱包和其他工具（如区块浏览器）查看。

要链接到图像、视频和其他媒体，只需使用 [IPFS URI](#ipfs-uri)。这比存储 HTTP 网关 URL 更好，因为它不与特定网关提供商绑定。如果你想使用网关 URL 以方便使用或实现互操作性，你始终可以在应用程序的表示层中生成它们。

::: 提示
在元数据中使用 IPFS URI 链接到图像和其他媒体有助于保持 NFT 数据的完整性！IPFS 链接在创建后不能被篡改或更改为指向不同的数据。

即使你今天没有将数据存储在 IPFS 中，为你的媒体生成 IPFS URI 并将其包含在元数据中，任何人从其他来源下载数据后都可以验证数据的完整性。如果你（或任何其他人）稍后将数据添加到 IPFS，URI 将开始工作！
:::

因为你需要知道要在元数据中引用的图像和其他媒体的 CID，所以最简单的方法是在将媒体资产添加到 IPFS 后创建元数据。

### 使用 IPFS 目录保留文件名

将数据添加到 IPFS 时，你可以通过将文件包装在目录中来保留人类可读的文件名。

在 javascript 中，调用 `ipfs.add` 时可以设置 `wrapWithDirectory` 选项：

```js
const cid = await ipfs.add(
{ path: 'metadata.json', content: aJsonString },
{ wrapWithDirectory: true }
)
```

添加目录中包装的文件时，`ipfs.add` 会返回目录对象的 CID。要为文件构建完整的 IPFS URI，可以在 CID 后添加 `/` 字符，后跟文件名。例如：`ipfs://bafybeibnsoufr2renqzsh347nrx54wcubt5lgkeivez63xvivplfwhtpym/metadata.json`。

## 持久性和可用性

当你的数据存储在 IPFS 上时，用户可以从任何具有副本的 IPFS 节点获取它，这可以使数据传输更高效，并减少任何单个服务器上的负载。当每个用户获取一段数据时，他们会保留一份本地副本，以帮助以后可能请求它的其他用户。但是，重要的是要记住，这些副本是临时的，最终将被删除，除非用户决定“固定”数据。固定 CID 告诉 IPFS 数据很重要，当节点接近其磁盘空间限制时不应删除。

如果你正在使用 IPFS 构建存储平台，那么将数据固定到强大且高度可用的 IPFS 节点非常重要，这意味着它们可以在没有大量停机时间的情况下以良好的性能运行。请参阅我们的 [服务器基础设施文档][docs-server-infra]，了解 [IPFS 集群][ipfs-cluster] 如何帮助你管理自己的 IPFS 节点云，这些节点协调固定平台的数据并将其提供给用户。

或者，你可以将基础设施责任委托给远程固定服务。远程固定服务（如 [Pinata](https://pinata.cloud) 和 [Eternum](https://www.eternum.io/)）为你的 IPFS 数据提供冗余、高可用性存储，而无需任何_供应商锁定_。由于基于 IPFS 的内容是通过 CID 而不是位置来寻址的，因此你可以在固定服务之间切换，或者随着平台的发展无缝迁移到你的私有基础设施。

你还可以使用 [Protocol Labs](https://protocol.ai) 提供的一项名为 [nft.storage](https://nft.storage) 的服务将你的数据放入 IPFS，并通过去中心化的 [Filecoin](https://filecoin.io) 存储网络实现长期持久性。为了促进 NFT 生态系统的发展并保护 NFT 所代表的文化遗产的新_数字公共资源_，[nft.storage](https://nft.storage) 为公共 NFT 数据提供免费存储和带宽。在 [https://nft.storage](https://nft.storage) 注册一个免费帐户并试用！

要了解有关持久性和固定的更多信息，包括如何使用远程固定服务，请参阅我们的 [持久性、永久性和固定概述][docs-persistence]。

## 摘要

IPFS 允许 NFT 以安全、可验证和分布式的方式表示任何大小和格式的数据，并经得起时间的考验。

以下是我们建议的简要回顾：

- 使用 IPFS URI 作为指向 IPFS 上数据的规范链接形式，例如：`ipfs://bafybeibnsoufr2renqzsh347nrx54wcubt5lgkeivez63xvivplfwhtpym/metadata.json`

- 应在应用程序的表示层中生成 HTTP 网关 URL，以便为使用不支持 IPFS 的浏览器的用户提供良好的体验。如果可能，请在应用程序的用户界面中同时提供 IPFS URI 和网关 URL。

- 在 NFT 的元数据中，使用 IPFS URI 链接到图像和其他媒体资产。`ipfs://` 方案明确了如何获取数据，而 CID 确保了数据完整性。

- 建议在添加到 IPFS 时将文件包装在目录中，因为它可以保留文件名并使 IPFS URI 更易于阅读。

- 数据持久性应成为平台设计的一部分。运行你自己的 IPFS 基础设施或使用远程固定服务将使你的数据保持在线且可访问。

[docs-cid]: ../concepts/content-addressing.md
[docs-persistence]: ../concepts/persistence.md
[docs-server-infra]: ../install/server-infrastructure.md
[docs-gateway]: ../concepts/ipfs-gateway.md

[docs-multibase]: https://github.com/multiformats/multibase

[ipfs-cluster]: https://ipfscluster.io/

[protoschool-cid]: https://proto.school/content-addressing
[eip-721]: https://eips.ethereum.org/EIPS/eip-721
[eip-1155]: https://eips.ethereum.org/EIPS/eip-1155