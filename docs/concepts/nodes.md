---
title: "Nodes"
description: "Participants in the IPFS network are called nodes. Nodes are the most important aspect of IPFS - without nodes running the IPFS daemon, there would be no IPFS network. This page discusses what nodes are, current IPFS implementations, and the types of services different nodes can offer."
sidebarDepth: 2
---

# 节点

IPFS 网络中的参与者称为“节点”。节点是 IPFS 实现的一个实例，您可以在本地计算机上（直接或通过浏览器）运行它来存储文件并连接到 IPFS 网络。它们是 IPFS 最重要的方面。没有 IPFS 节点，就没有 IPFS 网络。

您可能会在 IPFS 文档、问题和相关代码中看到术语 _node_。这是一个非常通用的术语，因此其含义取决于上下文。节点主要分为三类：IPFS 节点、数据节点和用于应用程序的 libp2p 节点。

* __IPFS 节点__ 是在计算机上运行的程序，可以与其他 IPFS 节点交换数据。它们有几种不同的名称，但我们根据上下文使用不同的术语来指代它们：

* _node_：当您指的是网络上的单个点时，请使用 _node_。这是一个非常通用的术语。例如，当您打开 IPFS Desktop 时，您将自己确立为具有与其他节点交互潜力的节点。请参阅 [配置节点](../how-to/configure-node.md)。
* _peer_：当您谈论一个节点（甚至是您自己的节点）与其他节点的关系时，请使用 _peer_。它指的是它们之间的关系是平等的，没有中央权威，因此您的节点是其他对等点的对等点。请参阅 [观察对等点](../how-to/observe-peers.md) 和 [与内容提供商对等](../how-to/peering-with-content-providers.md)。
* 守护进程：在谈论节点的活动状态时使用守护进程。当节点在线并在后台运行，监听对其数据的请求时，它被称为守护进程。请参阅 [让您的节点上线](../how-to/command-line-quick-start.md#take-your-node-online)。请注意，浏览器中的 IPFS Helia 节点通常不称为守护进程。但是，在本文档的上下文中，我们将在浏览器中充当节点的 Helia 实例称为守护进程。有关更多信息，请参阅 [Helia 文档](https://github.com/ipfs/helia/wiki)。
* _instance_：在谈论在特定时间点作为 IPFS 节点运行的库或程序（例如 Go 或 JS 版本）时使用 _instance_。对等 ID 相同，因此就 IPFS 网络而言，它仍然是相同的 _node_。请参阅 [Kubo](../reference/go/api.md) 和 [Helia](../reference/js/api.md#TODO_JS_IPFS_DEPRECATION)。

* __数据节点__，在谈论 IPFS 上的实际数据片段（例如 DAG 节点、UnixFS 节点和 IPLD 节点）时使用 _数据节点_。当您使用 `ipfs add myfile.txt` 命令添加文件时，IPFS 会将它们分解为几个节点，每个节点包含文件的一个块并相互链接。请参阅 [Merkle 有向无环图 (DAG)](../concepts/merkle-dag.md)、[Unix 文件系统 (UnixFS)](../concepts/file-systems.md#unix-file-system-unixfs)，并继续关注正在进行中的 [星际链接数据 (IPLD) 模型](../concepts/ipld.md) 文档。

* __libp2p peer__ 在谈论可以在其上构建应用程序的 libp2p 节点时，使用 _libp2p peer_。它们通常在 libp2p 中被称为 _peers_，因为它为传输、安全、对等路由和内容发现等基本对等元素提供了解决方案。请参阅 [概念](../concepts/libp2p.md)

## 类型

IPFS 节点有多种类型。根据用例，单个 IPFS 节点可以实现多种功能之一：

- [中继](#relay)
- [引导](#bootstrap)
- [委托路由](#delegated-routing)

### 中继

如果 IPFS 节点认为自己无法通过公共互联网访问，则 IPFS 节点可以选择使用中继节点作为一种 VPN 来尝试访问无法访问的节点。

#### 中继节点的功能

- 实现 Circuit Relay 协议的 [v2](https://github.com/libp2p/specs/blob/master/relay/circuit-v2.md)。
- 可以是 Kubo 或 Helia 节点；但是也有独立的实现：
- [js-libp2p/circuit-relay](https://github.com/libp2p/js-libp2p/blob/master/doc/CONFIGURATION.md#setup-with-relay)
- [go-libp2p-relay-daemon](https://github.com/libp2p/go-libp2p-relay-daemon)
- Kubo 和 Helia 节点均使用它们。
- 浏览器中的 Helia _node_ 无法使用 TCP，因此中继可以帮助增加可以通信的 _peers_ 数量。具有浏览器支持的 [传输](https://github.com/libp2p/js-libp2p/blob/master/doc/CONFIGURATION.md#transport) 的 Helia 节点可以使用中继对等点与 Kubo 对等点进行通信，且传输不重叠，前提是该中继对等点支持彼此之间的一种传输：
1. 至少一种浏览器支持的传输（适当的传输[在 Helia 浏览器节点中默认启用](https://github.com/ipfs/helia/blob/d2a928aa1590d5aa642c4c6747d5282f665af43f/packages/helia/src/utils/libp2p-defaults.browser.ts))
2. 至少一种 Kubo 对等点支持的传输。

#### 中继节点的限制：
- v2 中继是“受限中继”，旨在用于 [通过中继直接连接升级](https://github.com/libp2p/specs/blob/master/relay/DCUtR.md)（又称打洞）。

请参阅 [p2p 电路中继](https://github.com/libp2p/specs/tree/master/relay)

### 引导

Kubo 和 Helia _nodes_ 都使用引导 _nodes_ 在 DHT 上查找对等节点。

#### 引导节点的功能：

- 所有默认引导 _nodes_ 都是 Amino DHT 的一部分。
- Helia 节点所连接的引导节点列表由配置 [libp2p 的 peerDiscovery 选项](https://github.com/libp2p/js-libp2p/blob/master/doc/CONFIGURATION.md#peer-discovery) 控制。

#### 引导节点的限制：

- 如果 IPFS 节点在该配置中仅列出一个引导节点，并且该引导节点离线，则如果重新启动，IPFS 节点将无法访问 Amino DHT。
- 您可以在实现中配置对等存储以缓存健康的可连接对等节点，以便您可以在重新启动后再次连接到它们，而不是引导节点。[Kubo 存储库中的第 8856 号问题](https://github.com/ipfs/kubo/pull/8856) 解决了此问题，并提供了更多信息和上下文。

[有关 Bootstrapping 的更多信息](../how-to/modify-bootstrap-list.md)

### 委托路由

IPFS 节点将内容和对等路由任务委托给 **委托路由 V1 HTTP API** ([spec](https://specs.ipfs.tech/routing/http-routing-v1/))。

HTTP 上的委托路由不是路由系统，而是一种用于卸载路由工作的通用 API。这在浏览器和其他受限环境中非常有用，在这些环境中，作为 DHT 服务器/客户端联系许多其他对等点是不可行的。更广泛地说，它支持在内容路由中进行实验和创新，同时保持互操作性。

[HTTP API](https://specs.ipfs.tech/routing/http-routing-v1/) 可用于解析 **内容**、**对等点** 和 **IPNS 名称** 路由请求。

#### 支持 IPFS 实现中的委托路由

- [someguy](https://github.com/ipfs-shipyard/someguy) 是一个委托路由 V1 服务器，它将请求代理到 IPFS Amino DHT 和 [cid.contact 网络索引器](https://cid.contact/)。IPFS 基金会运营一个由 someguy 支持的公共委托路由端点，URL 为 `https://delegated-ipfs.dev/routing/v1`。
- [cid.contact 网络索引器](https://cid.contact/) 还实现了委托路由 V1 HTTP API。
- [Helia](https://github.com/ipfs/helia/tree/main/packages/http#example---with-custom-gateways-and-delegated-routing-endpoints) 可以配置为使用委托路由端点。
- [Kubo](https://github.com/ipfs/kubo/blob/master/docs/delegated-routing.md) 可以配置多个委托路由端点 ([Kubo 作为客户端](https://github.com/ipfs/kubo/blob/master/docs/config.md#routingtype))，此外还可以在网关上公开委托路由端点 ([Kubo 作为委托路由服务器](https://github.com/ipfs/kubo/blob/master/docs/config.md#gatewayexposeroutingapi))。

## 实现

[阅读有关 IPFS 实现的更多信息](./ipfs-implementations.md)