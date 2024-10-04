---
title：IPFS 构建者的最佳实践
description：某些 IPFS 功能已禁用或不是默认功能，但我们鼓励在适当的情况下使用它们。我们在此处列出它们，以便忙碌的构建者轻松访问。
date：2022-03-11
---

# IPFS 构建者的最佳实践

某些 IPFS 功能未启用或设置为默认功能，但我们鼓励你在适当的情况下使用它们。

## 使用 CIDv1 进行面向未来的寻址和不区分大小写的上下文

有两个版本的 CID（[内容标识符](../concepts/content-addressing.md)），CIDv0 和 CIDv1。

CIDv0 比 CIDv1 更简单，但灵活性要差得多。它不提供 CIDv1 提供的未来性和不区分大小写的寻址。你可以快速分辨出 v0 和 v1 CID 之间的区别，因为 v0 CID 始终以“Qm”开头。许多现有的 IPFS 工具仍在 v0 中生成 CID，例如：

- [IPFS 桌面](../install/ipfs-desktop.md#ipfs-desktop)
- [/api/v0/add](../reference/kubo/rpc.md#api-v0-add)，其中 `cid-version` 默认为 0，除非传递了依赖于 CIDv1 的选项。

某些功能默认使用 CIDv1：

- `files`（[可变文件系统](../concepts/file-systems.md#mutable-file-system-mfs))
- `dag` 操作（[ipfs 对象](../reference/kubo/cli.md#ipfs-dag))

在需要时使用 CIDv1：

- 面向未来的寻址：CIDv1 提供领先的标识符，例如 [multicodec](https://github.com/multiformats/multicodec)，它指示目标内容的格式，以便 CID 可以支持未来的 CID 格式。
- 不区分大小写的寻址，更加灵活

要选择加入，请在 CLI 中使用 `--cid-version` 标志：

```shell
ipfs add --cid-version 1
```

要将 CID 从 v0 转换为 v1，请参阅 [CID 转换](https://docs.ipfs.tech/concepts/content-addressing/#cid-conversion)。

有关内容寻址和 CID 版本的更多信息，请参阅 [内容寻址和 CID](../concepts/content-addressing.md#content-addressing-and-cids)。

## 启用 pubsub 以实现快速 IPNS

作为独立功能，`pubsub` 是一种发布和订阅消息的方式。但是，在 `ipns` 中，你可以使用它来加速 IPNS 记录的发布和解析。Pubsub 是一项实验性功能，因此请谨慎使用。默认情况下，它是禁用的。

要使用此功能，请在启动 IPFS 守护进程之前使用 `Ipns.UsePubsub`：

```shell
ipfs config --json Ipns.UsePubsub true
ipfs 守护进程
```

从此时起，IPNS 将同时使用 `pubsub` 和 DHT 进行解析。在此处详细了解此实验性功能的局限性：

- [实验性功能 > IPNS pubsub](https://github.com/ipfs/kubo/blob/master/docs/experimental-features.md#ipns-pubsub)
- [默认通过 pubsub 启用 IPNS，问题 8591](https://github.com/ipfs/kubo/issues/8591)

## 如果预计数据流失率较高，请启用垃圾收集

存储空间有限，因此节点需要清除一些先前缓存的资源，为新资源腾出空间。此过程称为 _垃圾收集_。

如果你预计数据流失率会很高，则可能需要启用垃圾收集来回收不再使用的对象占用的内存。

但是，你可能还拥有有价值的数据。为确保保留对你有价值的数据，请固定有价值的数据。以下页面对于了解固定的工作原理很有用：

- [持久性、永久性和固定](../concepts/persistence.md#persistence-permanence-and-pinning)
- [在上下文中固定](../concepts/persistence.md#pinning-in-context)
- [使用 IPFS 固定文件](../how-to/pin-files.md#three-kinds-of-pins)。

然后，你可以安全地为所有其他数据启用垃圾收集。请参阅：

- [垃圾收集](../concepts/persistence.md#garbage-collection)
- [api/v0/repo/gc](../reference/kubo/rpc.md#api-v0-repo-gc)

## 发布应用时使用子域网关或 DNSLink 实现安全上下文和源隔离

为防止一个网站不当访问与其他网站关联的 HTTP 会话数据，请使用：

- 子域网关，或
- DNSLink

请参阅：

- [违反同源策略](../concepts/ipfs-gateway.md#limitations-and-potential-workarounds)
- [子域网关](../how-to/address-ipfs-on-web.md#subdomain-gateway)
- [DNSLink网关]（../how-to/address-ipfs-on-web.md#http-gateways）
