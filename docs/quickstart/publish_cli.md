---
title: '使用命令发布'
description: '了解如何通过使用命令行将文件Pin到Pinning Services来使用 IPFS 发布内容。'
---

# 使用命令行通过 IPFS 发布文件

:::warning
由于 [web3.storage 的变化](https://blog.web3.storage/posts/the-data-layer-is-here-with-the-new-web3-storage)，本指南的某些步骤目前已过时。
:::

与 [使用 IPFS 发布文件](./publish.md) 快速入门类似，本指南将向你介绍 [Pinning Services](../concepts/persistence.md#pinning-in-context) 以及如何使用它们通过 IPFS 发布内容寻址数据。但是，你不会使用 [相关指南中使用的 Web3 UI](./publish.md#upload-and-pin-a-file) ，而是使用 [w3 命令行界面](https://github.com/web3-storage/w3cli) 将文件上传到 [web3.storage](https://web3.storage/)。在本指南结束时，你应该从高层次更好地了解内容寻址和 CID 的工作原理，以及如何使用 w3 命令行界面将数据发布到 IPFS。
:::callout
web3.storage Pinning Services纯粹是出于演示目的而选择的，它是你可以选择的众多 [Pinning Services](../concepts/persistence.md#pinning-in-context) 之一。虽然每个Pinning Services都有不同的 SDK 和 API，但它们的基本作用是相同的 - 存储文件并使其可用于 IPFS 网络。事实上，IPFS 的主要优势之一是可以将文件Pin到多个Pinning Services，从而减少供应商锁定。
:::

## 内容 <!-- omit from toc -->

- [概览](#overview)
- [Pinning Services](#pinning-services)
- [先决条件](#prerequisites)
- [上传和固定文件](#uploading-and-pinning-a-file)
- [CID 说明](#cids-explained)
- [使用网关检索](#retrieving-with-a-gateway)
- [总结和后续步骤](#summary-and-next-steps)

## 概览

_固定_ 是指确保特定内容可通过 IPFS 检索的过程。换句话说，固定相当于将文件存储在连接到互联网的计算机或服务器上，从而使其可供 IPFS 网络的其余部分使用。

固定可以在各个级别进行，从单个文件到由 CID 寻址的整个目录。你还可以将 CID Pin到多个 IPFS 节点，以增加网络上文件的冗余度和弹性。

## Pinning Services

[Pinning Services](../concepts/persistence.md#pinning-services) 类似于托管服务，因为它们为你运行 IPFS 节点并确保你的文件可用于 IPFS 网络。

:::callout
默认情况下，Pin到 IPFS 网络的数据是公开的，任何人都可以检索。避免发布私人数据或在发布前对其进行充分加密。
:::

## 先决条件

- 类似 unix 的终端。
- 在终端环境中安装了 Node.js。
- 下载并保存在计算机上的 [以下图片](../quickstart/images/welcome-to-IPFS.jpg)：

![图片](../quickstart/images/welcome-to-IPFS.jpg)

## 安装并注册到 w3

1. 安装 [w3 命令行界面](https://github.com/web3-storage/w3cli)。

```shell
npm install -g @web3-storage/w3cli

1. 授权 w3 工具代表与你的电子邮件地址 `<your@email.com>` 关联的帐户行事：

```shell
w3 login <your@email.com>

## 上传并固定文件

1. 为你的文件创建一个空间。

```shell
w3 space create 图片

1. 上传你的文件。

```shell
w3 up welcome-to-IPFS.jpg
```

恭喜，你已成功使用 w3 cli 将文件**固定**到 IPFS！🎉

让我们通过查看 CID 来解开刚刚发生的事情。
## CID 解释

在 IPFS 中，每个文件和目录都用内容标识符 ([CID](../concepts/content-addressing.md)) 进行标识。CID 用作文件的**永久地址**，任何人都可以使用它来在 IPFS 网络上找到它。

当文件首次添加到 IPFS 节点时（如本指南中使用的图像），它首先转换为内容可寻址表示，其中文件被拆分成较小的块（如果大于 ~1MB），这些块链接在一起并进行哈希处理以生成 CID。

在本指南中，上传图像的 CID 为：

```纯文本
bafybeicn7i3soqdgr7dwnrwytgq4zxy7a5jpkizrvhm5mv6bgjd32wm3q4
```

你现在可以与任何人共享 CID，他们可以使用 IPFS 获取文件。

要深入了解 CID 的结构，请查看 [CID 检查器](https://cid.ipfs.tech/#bafybeicn7i3soqdgr7dwnrwytgq4zxy7a5jpkizrvhm5mv6bgjd32wm3q4)。

:::callout
转换为内容可寻址表示是一种本地操作，不需要任何网络连接。使用 web3.storage，此转换发生在客户端（在浏览器中）。
:::

## 使用网关检索

现在你的文件已Pin到Pinning Services，你将使用 IPFS 网关获取它。[**IPFS 网关**](../concepts/ipfs-gateway.md) 是一个 HTTP 接口，可作为 IPFS 网络的桥梁。换句话说，它允许你使用 HTTP 从 IPFS 获取 CID。

Pinning Services通常提供 IPFS 网关，以便轻松检索你的 CID。例如，Web3.storage 运营 [w3s.link](https://w3s.link) 网关，你可以从中检索已上传的 CID。

要检索 CID，请打开以下 URL：
[bafybeicn7i3soqdgr7dwnrwytgq4zxy7a5jpkizrvhm5mv6bgjd32wm3q4.ipfs.w3s.link](https://bafybeicn7i3soqdgr7dwnrwytgq4zxy7a5jpkizrvhm5mv6bgjd32wm3q4.ipfs.w3s.link/)

:::callout
将文件Pin到 IPFS 时，默认情况下不会存储文件名。为了确保保留文件名，通常将文件包装在目录中。在这种情况下，文件和目录都将具有唯一的 CID。 Web3.storage 默认将文件包装在目录中，这就是为什么你会看到一个目录列表，其中文件“welcome-to-IPFS.jpg”后跟该文件的简写 CID：“bafk…beom”。
:::

## 摘要和后续步骤

在本快速入门指南中，你了解了 [Pinning Services](../concepts/persistence.md#pinning-in-context)，以及如何使用它们通过 IPFS 发布内容寻址数据。你还了解了 CID 如何通过将文件上传到名为 [web3.storage](https://web3.storage/) 的Pinning Services来寻址 IPFS 中的文件和目录。

Pinning Services为运行 IPFS 节点和基础设施提供了一种方便的替代方案。但是，这两者并不相互排斥；你可以将Pinning Services与计算机上的 IPFS 节点相结合，以提高 CID 的弹性。

可能的后续步骤包括：

- 查看 [IPFS 中的数据生命周期](../concepts/lifecycle.md)，详细了解通过固定发布如何融入 IPFS 中数据的完整生命周期。
- 尝试按照 [检索快速入门](./retrieve.md) 获取固定文件。
- 如果你希望使用 JavaScript 或 Go 以编程方式上传文件，请查看 [Web3.storage 文档](https://web3.storage/docs/how-tos/store/)。
- 或者，尝试 [Filebase](https://filebase.com/)，这是一项Pinning Services，提供 [与 AWS S3 兼容的固定 API](https://docs.filebase.com/getting-started/s3-api-getting-started-guide)，因此你可以使用任何与 S3 兼容的 SDK，例如[aws-sdk](https://www.npmjs.com/package/aws-sdk)，以及[许多](https://github.com/s3tools/s3cmd)其他工具。