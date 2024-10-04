---
title: How IPFS works
description: Learn how the InterPlanetary File System (IPFS) works and why it's an essential part of the future internet.
---

# IPFS 的工作原理

在本概念指南中，您将了解 <VueCustomTooltip label="InterPlanetary File System" abbreviation is-small>IPFS</VueCustomTooltip> 的主要子系统及其工作原理。IPFS 子系统的三个主要职责是：
- **表示和寻址数据**
- **路由数据**
- **传输数据**

虽然这些是主要职责，但 IPFS 的功能超越了这三点。

IPFS 中的数据通过其内容来寻址（<VueCustomTooltip label="一种通过其哈希而不是其位置（IPs）来寻址数据的方法。" underlined multiline>内容寻址</VueCustomTooltip>），而不是通过位置（例如 IP 地址（位置寻址））来寻址。

:::callout
本指南是 [IPFS 基本概念](../concepts/README.md#learn-the-basics) 3 部分介绍中的第 3 部分。第一部分 [IPFS 是什么和不是什么](../concepts/what-is-ipfs.md) 定义了 IPFS，而第二部分 [**IPFS 及其解决的问题**](../concepts/ipfs-solves.md) 涵盖了互联网和 IPFS 解决的 HTTP 等当前协议的问题。
:::

## 子系统概述

所有 IPFS 子系统按用途排序如下，并附有本指南讨论的主要子系统的链接。

| 目的 | 子系统 |
| ------- | --------- |
| 表示和组织数据 | [CIDs](#content-identifier-cid), [IPLD, UnixFS](#interplanetary-linked-data-ipld), MFS, DAG-CBOR, DAG-JSON, [CAR files](#content-addressable-archive-car-files) |
| 内容路由，CID 和 IP 地址之间的链接 | [Kademlia DHT](#kademlia-distributed-hash-table-dht), [Delegated routing over HTTP](#delegated-routing-over-http), [Bitswap](#bitswap-for-content-routing), [mDNS](#mdns) |
| 传输数据 | [Bitswap](#bitswap-for-data-transfer), [HTTP Gateways](#ipfs-http-gateways), [Sneakernet](#sneakernet), Graphsync, more in development |
| 数据和对等点寻址 | [Multiformats](#content-identifier-cid) |
| IPFS 与 HTTP 之间的桥梁 | [IPFS Gateways](#ipfs-http-gateways), Pinning API Spec |
| 点对点连接 | libp2p (TCP, QUIC, WebRTC, WebTransport) |
| 可变性和动态命名 | IPNS (Interplanetary Naming System), DNSLink |


## IPFS 如何表示和处理数据

IPFS 将数据表示为内容寻址的 <VueCustomTooltip label="IPFS 中单个数据单元的术语。" underlined multiline is-medium>块</VueCustomTooltip>，并使用以下子系统对这些数据块进行操作：
- [内容标识符 (CID)](#content-identifier-cid)
- [行星际链接数据 (IPLD)](#interplanetary-linked-data-ipld)
- [内容可寻址存档 (CAR) 文件](#content-addressable-archive-car-files)

### 内容标识符 (CID)

在 IPFS 中，数据被分成 <VueCustomTooltip label="IPFS 中单个数据单元的术语。" underlined multiline is-medium>块</VueCustomTooltip>，并为其分配一个唯一标识符，称为 <VueCustomTooltip label="用于指向 IPFS 中数据的地址，基于内容本身，而不是位置。" underlined multiline is-medium>内容标识符 (CID)</VueCustomTooltip>。通常，CID 是通过将数据的哈希值与其 <VueCustomTooltip label="能够编码和/或解码数据的软件。" underlined multiline is-medium>编解码器</VueCustomTooltip> 相结合来计算的。编解码器是使用 <VueCustomTooltip label="用于使数据可自我描述的可互操作、可扩展协议的集合。" underlined multiline is-medium>多格式</VueCustomTooltip> 生成的。

CID 对于计算数据而言是唯一的，这为 IPFS 提供了以下好处：
- 可以根据数据内容而不是位置获取数据。
- 可以计算收到的数据的 CID 并将其与请求的 CID 进行比较，以验证数据是否是所请求的数据。

:::callout
**了解更多**

通过 [深入探究 CID](../concepts/content-addressing.md#cid-versions) 详细了解此处描述的 CID 背后的概念。
:::


### 星际链接数据 (IPLD)

IPFS 使用 <VueCustomTooltip label="一组支持网络去中心化、内容可寻址数据结构的规范。" underlined multiline is-medium>星际链接数据 (IPLD)</VueCustomTooltip> 来处理 CID 和内容寻址数据。IPFS 使用 IPLD 来表示内容寻址数据（如文件目录和其他层次结构）之间的关系，使用 <VueCustomTooltip label="数据结构化为图形，其节点在方向上相互相关，但不形成定向闭环。" underlined multiline is-medium>有向无环图 (DAG)</VueCustomTooltip>，称为 <VueCustomTooltip label="一种特殊类型的 DAG，其中每个节点都有一个唯一标识符，该标识符是节点内容的哈希值。" underlined multiline is-medium>Merkle DAG</VueCustomTooltip>。使用 IPLD 实现一般功能，IPFS 能够提供一种更加定制化、更具体的机制来表示和处理文件、目录及其符号链接，称为 [UnixFS](../concepts/file-systems.md#unix-file-system-unixfs)。借助 UnixFS，IPFS 可以 <VueCustomTooltip label="当对象添加到 IPFS 时，它会被拆分成更小的部分，每个部分都会被哈希处理，并为每个部分创建一个 CID。" underlined multiline is-medium>chunk</VueCustomTooltip> 和链接太大而无法放入单个块的数据，并使用分块表示来存储和管理数据。

IPLD 为 IPFS 提供了以下好处：

- 能够表示和处理任意数据，无论该数据是标准文件和目录、链接数据、Merkle DAG 还是其他数据类型。
- 基本功能用于构造、序列化、遍历和链接内容寻址数据，这些功能可以通过 UnixFS 等抽象来实现更具体的用例。
- 可互操作的协议。
- 易于升级。
- 向后兼容。

:::callout
**了解更多**
想要了解有关 IPLD 的更多信息？请参阅 [官方文档](https://ipld.io/docs/intro/primer/)。
:::

### 内容可寻址档案 (CAR) 文件

IPFS 使用内容可寻址档案 (CAR) 文件来存储和传输 IPLD 内容寻址数据的序列化档案。CAR 文件类似于 TAR 文件，因为它们是为存储内容寻址数据集合而设计的。

## 内容路由在 IPFS 中的工作原理

_内容路由_ 是指 IPFS 确定在网络上查找给定 CID 的位置的方式；具体来说，哪些网络对等点正在提供您请求的 CID。换句话说，节点不能仅凭 CID 在网络中找到数据；它需要有关其在网络上的 <VueCustomTooltip label="Programs that implement the IPFS protocol and particulate in IPFS network. Also refer to a node." underlined multiline is-left>peers</VueCustomTooltip> 的 IP 地址和端口的信息。为了路由内容，IPFS 使用以下子系统：

- [Kademlia 分布式哈希表 (DHT)](#kademlia-distributed-hash-table-dht)
- [Bitswap](#bitswap-for-content-routing)
- [mDNS](#mdns)
- [HTTP 上的委托路由](#delegated-routing-over-http)

### Kademlia 分布式哈希表 (DHT)

IPFS 使用 Kademlia，这是一种专为去中心化对等网络设计的 <VueCustomTooltip label="基于键值对映射数据的去中心化数据存储。" underlined multiline is-left>分布式哈希表 (DHT)</VueCustomTooltip>。Kademlia 可帮助您在 IPFS 网络中找到存储您正在寻找的数据的对等点。Kademlia DHT 可以被认为是一个分布在许多节点上的大型表，它存储了有关哪些对等点 (IP) 拥有哪些数据 (CID) 的信息。 Kademlia 提供了一个高效的自组织系统，可以承受节点流失。Kademlia 使用 <VueCustomTooltip label="“library peer-to-peer” 的缩写，libp2p 是一组协议、规范和库，用于促进对等网络中节点之间的连接。"  underlined multiline is-left> [libp2p](../concepts/libp2p.md)</VueCustomTooltip> 来建立连接。

:::callout
**了解更多**

想要了解有关 Kademlia 和 DHT 的更多信息？请参阅 [分布式哈希表 (DHT) 概念指南](../concepts/dht.md#kademlia)。
:::

### Bitswap（用于内容路由）

IPFS 节点使用 Bitswap，这是一种 <VueCustomTooltip label="与请求-响应协议不同，系统中的所有节点都会接收传输的每条消息，并决定是否应立即丢弃、存储或处理收到的消息。" underlined multiline is-medium>基于消息的</VueCustomTooltip>、<VueCustomTooltip label="一种计算机网络模型，其中每一方都具有同等能力并可以发起通信会话。" underlined multiline is-medium>对等网络</VueCustomTooltip> 协议，用于传输数据，也用于路由数据。使用 Bitswap，IPFS 节点可以询问它所连接的任何对等节点是否具有该节点正在寻找的任何 CID，所有这些都无需遍历 [Kademlia DHT](#kademlia-distributed-hash-table-dht)。对等节点还存储需求列表，这样如果对等节点稍后收到请求的数据，它可以将其发送到最初请求的节点。与 Kademlia 一样，Bitswap 使用 <VueCustomTooltip label="“library peer-to-peer” 的缩写，libp2p 是一组协议、规范和库，用于促进对等网络中节点之间的连接。"  underlined multiline is-left> [libp2p](../concepts/libp2p.md)</VueCustomTooltip> 建立连接。

:::callout
**了解更多**

想要了解有关 Bitswap 的更多信息？请参阅 [Bitswap 深入研究](../concepts/bitswap.md)。

:::

### 通过 HTTP 进行委托路由

委托内容路由是 IPFS 实现的一种机制，用于使用 HTTP API 将内容路由卸载到另一个进程/服务器。例如，如果 IPFS 节点未实现 DHT，则委托路由器可以代表其在 DHT 中搜索对等点。委托路由的主要好处是，如果节点没有计算资源，或者希望构建具有自定义路由后端的 IPFS 系统，则无需自己实现路由功能。因此，通过 HTTPS 进行的委托路由为 IPFS 节点提供了一个标准接口，在内容路由的工作方式方面提供了更大的灵活性。

:::callout
**了解更多**

有关更多信息，请参阅 [委托内容路由 HTTP API 规范](https://specs.ipfs.tech/ipips/ipip-0337/)。

:::

### mDNS

为了快速有效地发现本地网络中的对等点，IPFS 使用多播域名系统 (mDNS)，这是一种 <VueCustomTooltip label="一种将人类可读的互联网域名映射到 IP 地址的系统。" underlined multiline is-medium>DNS</VueCustomTooltip> 协议，无需使用 <VueCustomTooltip label="任何实现将人类可读的互联网域名映射到 IP 地址 (DNS) 的系统的计算机应用程序。"  underlined multiline is-medium>名称服务器</VueCustomTooltip>。

使用 mDNS 可以在本地网络中快速高效地发现 IPFS 节点，无需任何协调，例如，无需互联网连接或访问 [引导节点](./nodes.md#bootstrap)。

## IPFS 如何传输数据

除了 [路由数据](#how-content-routing-works-in-ipfs)，IPFS 网络中的节点还必须高效地分发和传递内容寻址数据，同时考虑到网络中有些节点已经拥有数据副本，而其他节点没有数据副本但想要一份。为了处理数据传输，IPFS 使用以下子系统：

- [Bitswap](#bitswap-for-data-transfer)
- [IPFS HTTP 网关](#ipfs-http-gateways)
- [Sneakernet](#sneakernet)

### Bitswap（用于数据传输）

如 [IPFS 中的内容路由工作原理](#bitswap-for-content-routing) 中所述，IPFS 节点使用 Bitswap，这是一种 <VueCustomTooltip label="与请求-响应协议不同，系统中的所有节点都会接收传输的每条消息，并决定是否应立即丢弃、存储或处理收到的消息。" underlined multiline is-medium>基于消息的</VueCustomTooltip>、<VueCustomTooltip label="一种计算机网络模型，其中每一方都具有同等能力并可以发起通信会话。" underlined multiline is-medium>对等网络</VueCustomTooltip> 协议，用于内容路由和数据传输。使用 Bitswap，IPFS 节点所连接的任何对等节点都可以将请求的块直接传输到该节点，而无需遍历 [DHT](#kademlia-distributed-hash-table-dht)。对等节点还存储需求列表，这样如果对等节点稍后收到请求的数据，它可以将其传输到最初请求的节点。

:::callout
**了解更多**

想要了解有关 Bitswap 的更多信息？请参阅 [Bitswap 深入研究](../concepts/bitswap.md)。
:::

### IPFS HTTP 网关

HTTP 网关允许不支持或实现所有 IPFS 子系统的应用程序使用 HTTP 接口从 IPFS 网络获取数据。在最简单的形式中，网关是一个 IPFS 节点，它还公开 [HTTP 网关 API](https://github.com/ipfs/specs/blob/main/http-gateways/README.md)。

:::callout
**了解更多**

想要了解有关 IPFS 网关的更多信息？请参阅 [IPFS 网关概念指南](../concepts/ipfs-gateway.md)。
:::

### Sneakernet

对于无法通过网络连接传输数据的用例，IPFS 支持使用 <VueCustomTooltip label="一种非正式术语，用于通过可移动设备（硬盘驱动器、闪存驱动器、光盘等）在计算机之间传输数据，这些设备在计算机之间进行物理传输，而不是通过网络传输数据。" underlined multiline is-small is-right>sneakernet</VueCustomTooltip> 在 IPFS 节点之间传输内容寻址数据。使用 IPFS，CAR 文件（在 [IPFS 如何表示和寻址数据](#content-addressable-archive-car-files) 中讨论）可以在两个网络驱动器之间传输，而无需任何网络连接。由于 IPFS，数据是 [可验证的](../concepts/what-is-ipfs.md#verifiability)，并且在气隙两侧（on both sides of the air gap）具有相同的 CID。

## 进一步阅读

- 您是否希望深入了解 IPFS 的设计、架构和理论？请参阅 [原始 IPFS 白皮书](../concepts/further-reading/academic-papers.md#ipfs---content-addressed-versioned-p2p-file-system)。
- 深入了解 [不变性](../concepts/immutability.md)、[哈希](../concepts/hashing.md)、[内容寻址和 CID](../concepts/content-addressing.md) 的相关概念。
- 了解 [IPFS 固定，以及持久性、永久性和固定之间的区别](../concepts/persistence.md)。
- 理解 [IPFS 中的隐私和加密](../concepts/privacy-and-encryption.md)。
- 了解有关 [IPFS 节点的更多信息，包括不同类型](../concepts/nodes.md)。