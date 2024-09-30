---
title: IPNS (星际名称系统)
description: 了解 IPFS、星际名称系统 (IPNS) 中的可变性以及如何将其与 IPFS 结合使用。
---

# 星际名称系统 (IPNS)

- [星际名称系统 (IPNS)](#interplanetary-name-system-ipns)
  - [IPFS 中的可变性](#IPFS中的可变性)
  - [IPNS 的工作原理](#how-ipns-works)
    - [IPNS 名称的剖析](#anatomy-of-an-ipns-name)
      - [IPNS 名称与内容路径的关系](#how-ipns-names-relate-to-content-paths)
    - [IPNS 名称是自我认证的](#ipns-names-are-self-certifying)
    - [常见 IPNS 操作](#common-ipns-operations)
    - [IPNS 与传输无关](#ipns-is-transport-agnostic)
      - [DHT 上的 IPNS](#ipns-over-the-dht)
      - [PubSub 上的 IPNS](#ipns-over-pubsub)
        - [在 PubSub 生命周期内发布 IPNS 记录](#publishing-ipns-records-over-pubsub-lifecycle)
    - [一致性与可用性之间的权衡](#tradeoffs-between-consistency-vs-availability)
      - [IPNS 记录有效性](#ipns-record-validity)
      - [实际考虑](#practical-considerations)
  - [IPNS 实践](#ipns-in-practice)
    - [使用 IPFS 网关解析 IPNS 名称](#resolving-ipns-names-using-ipfs-gateways)
    - [发布 IPNS 名称](#publishing-ipns-names)
  - [IPNS 的替代方案](#alternatives-to-ipns)
  - [更多资源](#further-resources)

## IPFS 中的可变性

IPFS 中的 [内容寻址](content-addressing.md) 本质上是 _不可变的_：当您将文件添加到 IPFS 时，它会根据数据创建一个哈希，并以此构建 CID。更改文件会更改其哈希，从而更改用作地址的 CID。

然而，在很多情况下，内容寻址数据需要定期更新，例如，发布一个经常更改的网站。每次更新网站时都共享一个新的 CID 是不切实际的。使用 **可变指针**，您可以共享一次指针的地址，并在每次发布更改时将指针更新为新的 CID。

星际名称系统 (IPNS) 是一种用于创建指向 CID 的可变指针（称为 **names** 或 **IPNS names**）的系统。IPNS 名称可视为可随时间更新的链接，同时保留内容寻址的可验证性。

::: callout
IPNS 名称可以指向任意内容路径（`/ipfs/` 或 `/ipns/`），*包括另一个 IPNS 名称或 DNSLink 路径*。但是，它通常指向完全解析且不可变的路径，即 `/ipfs/[CID]`。
:::

## IPNS 的工作原理

### IPNS 名称的剖析

IPNS 中的 **名称** 是公钥的 [哈希](hashing.md)。它与一个 [**IPNS 记录**](https://github.com/ipfs/specs/blob/main/ipns/IPNS.md#ipns-record) 相关联，其中包含它链接到的内容路径 (`/ipfs/CID`) 以及其他信息，例如到期日期、版本号以及由相应私钥签名的加密签名。私钥持有者可以随时签署和发布新记录。

例如，以下是用公钥的 CIDv1 表示的 IPNS 名称： [`k51qzi5uqu5dlvj2baxnqndepeb86cbk3ng7n3i46uzyxzyqj2xjonzllnv0v8`](https://cid.ipfs.tech/#k51qzi5uqu5dlvj2baxnqndepeb86cbk3ng7n3i46uzyxzyqj2xjonzllnv0v8).

> **Note:** Kubo 使用 `self` 密钥（用于 PeerID 的 ed25519 私钥）作为默认 IPNS 名称。但可以通过 [`ipfs key gen`](https://docs.ipfs.tech/reference/kubo/cli/#ipfs-key-gen) 生成多个密钥，并使用它们来管理多个 IPNS 名称。

#### IPNS 名称与内容路径的关系

IPNS 记录可以指向不可变或可变的路径。路径中使用的 CID 背后的含义取决于使用的命名空间：

- `/ipfs/<cid>` – [IPFS 上的不可变内容](https://cid.ipfs.tech/#bafybeibml5uieyxa5tufngvg7fgwbkwvlsuntwbxgtskoqynbt7wlchmfm)（因为 CID 包含多重哈希）
- `/ipns/<cid-of-libp2p-key>` – 一个可变的、加密的 [IPNS 名称](https://cid.ipfs.tech/#k51qzi5uqu5dlvj2baxnqndepeb86cbk3ng7n3i46uzyxzyqj2xjonzllnv0v8)，与 libp2p 公钥相对应。

以下是一个有用的思维模型，有助于理解两者之间的区别：

```mermaid
graph LR;
    IPNS-- 可变指针 -->IPFS-CID;
    IPFS-CID-- 不可变指针 -->content;
```

```
IPFS = immutable *Pointer => content
IPNS = **Pointer => content
```

IPNS 名称本质上是指向指针（IPFS CID）的指针（IPNS 名称），而 IPFS CID 是不可变的（因为它们源自内容）指向内容的指针。

### IPNS 名称是自我认证的

IPNS 名称是自我验证的。这意味着 IPNS 记录包含证明其真实性所需的所有信息。IPNS 使用公钥和私钥对来实现这一点：

- 每个 IPNS 名称对应一个密钥对
- IPNS 名称是具有公钥多重哈希的 CID
- IPNS 记录包含公钥和签名，允许任何人验证记录是否由私钥持有者签名

这种自我认证的性质为 IPNS 提供了分层和共识系统（如 DNS 和区块链标识符）中不存在的多项优势。值得注意的是，IPNS 记录可以来自任何地方，而不仅仅是特定的服务/系统，并且确认记录是否真实非常快速和容易。


### 常见 IPNS 操作

作为使用 IPNS 进行命名的用户或开发者，有三种常见的操作值得了解：

- **更新/创建 IPNS 记录：** 是指创建 IPNS 记录并使用私钥对其进行签名。
- **发布 IPNS 记录：** 发布 IPNS 记录，以便其他节点可以解析它。详细信息取决于传输。
- **解析 IPNS 名称：** 将 IPNS 名称解析为内容路径。

### IPNS 与传输无关

```mermaid
graph TB
    Record>"IPNS Record"]
    subgraph Routing
      Publisher
      Resolver
      Local[("Local store")]
      subgraph Transports
        PubSub[(PubSub)]
        DHT[(DHT)]
      end
    end
    Resolver-- resolve -->Record-- "(re)publish" -->Publisher
    Publisher-- PUT -->DHT-. GET .->Resolver
    Publisher-- PUT -->PubSub-. GET .->Resolver
    Publisher-- Cache -->Local-. GET .->Resolver-- Cache -->Local
```

IPNS 记录的自认证性质意味着它们不依赖于特定的传输协议。实际上，大多数 IPFS 实现都依赖于 [**DHT**](dht.md) 和 [**libp2p PubSub**](https://docs.libp2p.io/concepts/publish-subscribe/) 来发布和解析 IPNS 记录。

需要注意的是，**DHT** 和 **PubSub** 之间存在细微的差别和权衡。

两者之间的主要差异在于，DHT 上的 IPNS 发布并解析为全局共享状态，而 PubSub 上的 IPNS 使用主题上的消息传递（其中每个 IPNS 名称都有一个唯一的主题）来发布到**感兴趣的同行**并进行解析。

这种差异的主要含义是，通过 DHT 进行的 IPNS 操作（发布和解析）可能比通过 PubSub 花费更长的时间，但可能确保更高的一致性（你解析到最新版本）。

> **注意：** [CAP 定理](https://en.wikipedia.org/wiki/CAP_theorem) 可以最好地解释这种权衡。

#### DHT 上的 IPNS

DHT 是许多 IPFS 实现中 IPNS 记录的默认传输机制。

由于 DHT 的短暂性，对等点会在 24 小时后忘记记录。这适用于 DHT 中的任何记录，无论 IPNS 记录中的“有效性”（也称为“生命周期”）字段如何。

因此，需要定期将 IPNS 记录（重新）发布到 DHT。此外，定期发布到 DHT 可确保即使在节点频繁变动（节点来来去去）的情况下也能解析 IPNS 名称。

By default, Kubo will republish IPNS records to the DHT based on the [`Ipns.RepublishPeriod`](https://github.com/ipfs/kubo/blob/master/docs/config.md#ipnsrepublishperiod) configuration which defaults to 4 hours. [Republishing](https://github.com/ipfs/go-namesys/blob/1bf7d3d9cbe8f988b232b92288b24d25add85a00/republisher/repub.go#L130-L167) involves two steps:

1. Creating an updated IPNS record with the `validity` timestamp field updated (by default based on [`Ipns.RecordLifetime`](https://github.com/ipfs/kubo/blob/master/docs/config.md#ipnsrecordlifetime)), and signing it with the private key. The `sequence` number will only be incremented if the content path changes.
2. Publish the [IPNS record to the DHT](https://docs.ipfs.tech/concepts/dht/#ipns-records)

> **Note:** See the [DHT documentation](dht.md#ipns-records) for more information on the lifecycle of GETs and PUTs of IPNS records.

It's worth noting that publishing and resolving IPNS names using the DHT can be slow. This is because multiple records need to be found to ensure the latest version (record with the highest `sequence`), which involves round trips to multiple nodes.

#### PubSub 上的 IPNS

IPNS over PubSub uses the [Libp2p PubSub](https://docs.libp2p.io/concepts/publish-subscribe/) to publish records and resolve names amongst **interested peers**.

This is achieved by deriving the PubSub topic name from the IPNS name so that each IPNS name has a unique topic.

Because PubSub doesn't have the notion of persistence (messages are ephemeral and dropped after propagation), IPNS over PubSub [adds a persistence layer](https://github.com/ipfs/specs/blob/main/ipns/IPNS_PUBSUB.md#layering-persistence-onto-libp2p-pubsub) to ensure that IPNS records are always available to the network.

In Kubo, IPNS over PubSub is not enabled by default and can be enabled using the [`Ipns.UsePubsub`](https://github.com/ipfs/kubo/blob/master/docs/config.md#ipnsusepubsub) configuration.

Initial operations, e.g. resolving or publishing an IPNS name for the first time can take time as they involve a roundtrip to the DHT (to lookup or publish provider records for the topic).

After the subscription to the topic is established, PubSub usually improves both publishing and resolving times of IPNS by relying on interested peers for both operations.

It should be noted that there's an upper limit to the number of unique IPNS names you can resolve over PubSub, because for each name, a subscription is created which opens several (by default 6) network connections to mesh members.

##### 在 PubSub 生命周期内发布 IPNS 记录

1. Create a record and sign it.
2. Calculate PubSub topic name from IPNS name.
3. Join the topic by querying the DHT for the topic's provider records.
4. Publish the IPNS record to the topic.
5. Whenever [a new peer joins the topic](https://github.com/libp2p/go-libp2p-pubsub-router/blob/292d99457d224853706c5e49f8ddc112740a856a/pubsub.go#L538-L560) (specifically your mesh), ask them for the record. If they respond with a newer record, update it locally and publish the updated record to the topic.
6. Periodically (by default every 10 minutes) rebroadcast the IPNS record.

Steps 5 and 6 describe from a high level how IPNS record persistence is layered over PubSub by ensuring continuous propagation of the IPNS record in the face of node churn (nodes dropping in and out of the network).

> Further details about the IPNS over PubSub protocol can be found in the [IPNS over PubSub Spec](https://github.com/ipfs/specs/blob/main/ipns/IPNS_PUBSUB.md#protocol)

### 一致性与可用性之间的权衡

The self-certifying nature of IPNS comes with an inherent tradeoff between **consistency** and **availability**.

Consistency means ensuring that users resolve to the latest published IPNS record for the name (with the highest sequence number) at the cost of potentially not being able to resolve.

Availability means resolving to a valid IPNS record, at the cost of potentially resolving to an outdated record.

#### IPNS 记录有效性

When setting the `validity` (referred to as [`lifetime` by Kubo](https://github.com/ipfs/kubo/blob/master/docs/config.md#ipnsrecordlifetime)) field of an IPNS record, you typically need to choose whether you favor **consistency** (short validity period, e.g. 24 hours) or **availability** (long validity period, e.g. 1 month), due to the inherent trade-off between the two.

#### 实际考虑

One of the most important things to consider with IPNS names is **how frequently you intend on updating the name**.

Practically, two levers within your control determine where your IPNS name is on the spectrum between consistency and availability:

- **IPNS record validity:** longer validity will veer towards availability. Moreover, longer validity will reduce the dependence on the key holder (which for most purposes is stored on a single machine and rare shared) since the record can continue to persist without requiring the private key holder to sign a new record. Another benefit of a longer validity is that the transport can be delegated to other nodes or services (such as [w3name](https://staging.web3.storage/docs/how-tos/w3name/)), without compromising the private key.
- **Transport mechanism:** the DHT veers towards consistency while PubSub veers towards availability. However, with Kubo, IPNS names are always published to the DHT, while PubSub is opt-in. For most purposes, enabling PubSub is a net gain unless you hit the upper limit of connections as a result of too many PubSub subscriptions.

## IPNS 实践

### 使用 IPFS 网关解析 IPNS 名称

IPNS names can be resolved by [IPFS gateways](ipfs-gateway.md) in a _trusted_ fashion using both path resolution and subdomain resolution style:

- Path resolution: `https://ipfs.io/ipns/{ipns-name}`
- Subdomain resolution: `https://{ipns-name}.ipns.dweb.link`

> **Note** IPNS resolution via an IPFS gateway is **trusted** (in the sense of trusting the gateway) which means you delegate IPNS resolution to the gateway without any means to verify the authenticity response you get, i.e the content path and signature of the IPNS record.

<!-- ### Third-party providing/publishing w3name -->

### 发布 IPNS 名称

See the following guide on [publishing IPNS names with Kubo and Helia](../how-to/publish-ipns.md).

## IPNS 的替代方案

IPNS is not the only way to create mutable addresses on IPFS. You can also use [DNSLink](dnslink.md), which is currently much faster than IPNS, uses human-readable names, and can also point to IPNS names. Other community members are exploring ways to use blockchains to store common name records.

## 更多资源

- [ResNetLab on Tour - Mutable Content](https://research.protocol.ai/tutorials/resnetlab-on-tour/mutable-content/)
