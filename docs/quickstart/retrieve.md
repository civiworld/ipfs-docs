---
title: '使用 IPFS 检索'
description: '了解从 IPFS 网络中的其他对等点获取 CID 的不同方式'
---

# 使用 IPFS 检索 CID

在本快速入门指南中，你将了解从 IPFS 网络检索 CID 的不同方法，以及如何根据你的特定需求选择最合适的方法。

你将获取在 [使用Pinning Services发布快速入门指南](./publish.md) 中固定的图像，该图像具有以下 CID：`bafybeicn7i3soqdgr7dwnrwytgq4zxy7a5jpkizrvhm5mv6bgjd32wm3q4`。

:::callout
你将检索的 CID 实际上是包含单个图像文件的文件夹。原因是，当文件添加到 IPFS 时，默认情况下不会存储文件名。为了保留文件名，通常的做法是将文件包装在目录中。在这种情况下，你最终会得到两个 CID - 一个用于文件，另一个用于包含该文件的目录。
:::

## 内容 <!-- 从 toc 中省略 -->

- [IPFS 检索方法](#ipfs-retrieval-methods)
- [已验证与受信任的 CID 检索](#verified-vs-trusted-cid-retrieval)
- [使用 Kubo 获取 CID](#fetching-the-cid-with-kubo)
- [使用 IPFS 网关获取 CID](#fetching-the-cid-with-an-ipfs-gateway)
- [总结和后续步骤](#summary-and-next-steps)

## IPFS 检索方法

检索发布到 IPFS 的文件和目录有两种主要方法：

- 通过安装其中一个 IPFS 实现来使用 [**IPFS 节点**](../concepts/nodes.md)，例如在你的计算机上安装 [Kubo](../concepts/nodes.md#kubo)。这允许你从 IPFS 网络中的其他节点获取和验证 CID。
- 使用 [**IPFS 网关**](../concepts/ipfs-gateway.md)，这是一个与 IPFS 网络的 HTTP 接口，允许你使用 HTTP 从 IPFS 获取数据。Pinning Services通常提供 IPFS 网关，以便轻松检索你的 CID。

**node** 选项允许你访问全套 IPFS 协议。**Gateway** 选项在你可能被限制使用 HTTP 的情况下充当桥梁，例如在 Web 应用程序中，你的应用程序用户可能没有运行 IPFS 节点。

IPFS 网关最基本的形式通常是由其他人托管的 IPFS 节点，并公开 HTTP 接口以获取 CID，如下图所示：

![网关图](./images/gateway.png)

## 已验证与受信任的 CID 检索

在两种方法之间做出选择时，需要考虑的另一件事是_验证_。默认情况下，IPFS 节点会对每个块进行哈希处理，并确保当文件由块构建（进入 Merkle DAG）时，会产生你请求的 CID。但是，对于 IPFS 网关，验证是可选的。

未验证的检索通常也称为_受信任的检索_，因为你信任网关会在不计算哈希的情况下返回正确的响应。

虽然几乎总是建议进行验证，但实际上，在某些情况下，受信任的检索是务实的选择，例如在网站上嵌入图像时。

## 使用 Kubo 获取 CID

要使用 [Kubo](../install/command-line.md) 获取 CID，请完成以下步骤：

1. 确保 Kubo 守护程序已安装并正在运行：

```bash
$ ipfs daemon
```

2. 要获取文件，请运行 [`ipfs get [CID]`](../reference/kubo/cli.md#ipfs-get) 命令：

```bash
$ ipfs get bafybeicn7i3soqdgr7dwnrwytgq4zxy7a5jpkizrvhm5mv6bgjd32wm3q4
```

输出应如下所示：

```bash
将文件保存到bafybeicn7i3soqdgr7dwnrwytgq4zxy7a5jpkizrvhm5mv6bgjd32wm3q4
647.61 KiB / 647.61 KiB [==============================================================================================================================] 100.00% 0s
```

创建了一个与 CID 同名的新文件夹：

```bash
$ ls bafybeicn7i3soqdgr7dwnrwytgq4zxy7a5jpkizrvhm5mv6bgjd32wm3q4/
welcome-to-IPFS.jpg
```

恭喜，你已成功获取 CID。

## 使用 IPFS 网关获取 CID

使用 IPFS 网关获取 CID 非常简单，只需加载以下 URL 之一即可：

- [https://ipfs.io/ipfs/bafybeicn7i3soqdgr7dwnrwytgq4zxy7a5jpkizrvhm5mv6bgjd32wm3q4](https://ipfs.io/ipfs/bafybeicn7i3soqdgr7dwnrwytgq4zxy7a5jpkizrvhm5mv6bgjd32wm3q4)
- [https://dweb.link/ipfs/bafybeicn7i3soqdgr7dwnrwytgq4zxy7a5jpkizrvhm5mv6bgjd32wm3q4](https://dweb.link/ipfs/bafybeicn7i3soqdgr7dwnrwytgq4zxy7a5jpkizrvhm5mv6bgjd3 2wm3q4) - [https://gateway.pinata.cloud/ipfs/bafybeicn7i3soqdgr7dwnrwytgq4zxy7a5jpkizrvhm5mv6bgjd32wm3q4](https://gateway.pinata.cloud/ipfs/bafybeicn7i3soqdgr7dwnrwytgq4zxy7a5jpkizrvhm5mv6bgjd32wm3q4)

## 总结和后续步骤

在本快速入门指南中，你了解了从 IPFS 网络检索 CID 的不同方法，以及如何根据你的特定需求选择最合适的方法。

然后，你使用 IPFS Kubo 节点和 IPFS 网关获取了 [使用Pinning Services发布快速入门指南](./publish.md) 中固定的图像。

可能的后续步骤包括：

- 了解有关 [IPFS 的工作原理](../concepts/how-ipfs-works.md) 和 [IPFS 中数据的生命周期](../concepts/lifecycle.md) 的更多信息。