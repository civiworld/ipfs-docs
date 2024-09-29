---
title: IPFS 中数据的生命周期
description: Learn about the lifecycle of data in IPFS.
---

# IPFS 中数据的生命周期

- [1. 内容可寻址表示 content-addressable-representation](#1-内容可寻址表示)
- [2. 固定（Pinning）](#2-固定（Pinning）)
- [3. 检索（Retrieval）](#3-检索（Retrieval）)
- [4. 删除 Deleting](#4-删除 Deleting)
- [更多学习](#更多学习)

## 1. 内容可寻址表示

使用 CID 将文件转换为内容可寻址表示。基本思想是，通过将文件分块为较小的块、计算其哈希值并构建 [Merkle DAG](./merkle-dag.md)，此表示使文件和目录通过 CID 实现 **内容可寻址**。

## 2. 固定（Pinning）

在此阶段，CID 的区块会保存在 IPFS 节点（或固定服务）上，并可供网络检索。简单地将 CID 保存在节点上并不意味着 CID 可检索，因此必须使用固定。固定允许节点宣传其具有 CID，并将其提供给网络。

- **广告:** 在此步骤中，通过将链接 CID 和服务器 IP 地址的记录广告到 [DHT](./dht.md)，使 IPFS 网络可以发现 CID。广告是一个连续的过程，通常每 12 小时重复一次。术语 **发布** 也通常用于指代此步骤。

- **提供:** CID 的内容可寻址表示保存在 web3.storage 的 IPFS 节点（运行 IPFS 节点的服务器）之一上，并向 IPFS 网络公开。

## 3. 检索 （Retrieval）

在此阶段，IPFS 节点获取 CID 的块并构建 Merkle DAG。这通常涉及几个步骤：

- **内容路由:** IPFS 节点查找提供您请求的 CID 的其他 IPFS 节点。内容路由由 [DHT](./dht.md)、通过 [Bitswap](./bitswap.md) 询问已连接的对等节点或对 [委托路由](https://github.com/ipfs/specs/blob/main/IPIP/0337-delegated-routing-http-api.md) 服务器（如 [网络索引器](https://cid.contact/)）进行 HTTP 调用来实现。术语 **内容发现** 也常用于指代此步骤。

- **区块获取:** IPFS 节点从提供商处获取 Merkle DAG（文件或文件夹）的块。

- **验证:** IPFS 节点通过对获取的块进行哈希处理并确保生成的哈希值正确来验证获取的块。请注意，这种类型的检索是 _无需信任的_；也就是说，块可以来自网络中的任何节点。

- **本地访问:** 一旦所有块都存在，就可以构建 Merkle DAG，从而成功复制和访问 CID 底层的文件或目录。

## 4. 删除（Deleting）

此时，与 CID 关联的块将从节点中删除。**删除始终是本地操作**。如果 CID 已复制到其他节点，则它将继续在 IPFS 网络上可用。

:::callout
一旦 CID 被另一个节点复制，它通常会默认被通告给 DHT，即使它没有被明确固定。
:::

## 更多学习

在以下视频中了解有关 IPFS 中数据生命周期的更多信息：

@[youtube](iaVXRPsRCUc)
