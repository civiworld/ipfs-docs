---
title: IPFS and the problems it solves
description:  Learn about the problems that IPFS solves.
---

# IPFS 及其解决的问题

IPFS 及其解决的问题IPFS 致力于解决当前 Web 和现有数据表示 / 路由 / 传输协议的问题，例如 <VueCustomTooltip label="一种通过互联网传输数据的协议，主要用于 Web 浏览。它支持客户端（例如 Web 浏览器）和服务器之间的通信，其中客户端发送请求，服务器返回包含请求信息的响应。" underlined multiline is-medium>HTTP</VueCustomTooltip> 包括：

- [可验证性](#verifiability)
- [弹性](#resilience)
- [中心化](#centralization)
- [性能](#performance)
- [链接腐烂](#link-rot)
- [数据主权和所有权](#data-sovereignty)
- [链下存储](#off-chain-storage)
- [本地优先软件](#local-first-software)
- [供应商锁定](#vendor-lock-in)

在本指南中，你将了解 IPFS 解决的每个问题。

:::callout
本指南是 [IPFS 基本概念](../concepts/README.md#learn-the-basics) 三部分介绍中的第二部分。第三部分 [**IPFS 的工作原理**](../concepts/how-ipfs-works.md) 介绍了 IPFS 的不同子系统以及每个子系统的工作原理。
:::

## 可验证性

IPFS 使用 <VueCustomTooltip label="一个接受任意输入（内容）并返回固定长度值的函数。完全相同的输入数据将始终生成与输出相同的哈希值。有许多哈希算法。" underlined multiline is-medium>加密哈希</VueCustomTooltip> 来验证文件的真实性和完整性，使恶意行为者难以篡改或删除文件。

## 弹性

IPFS 没有单点故障，用户无需相互信任。换句话说，网络中单个甚至多个节点的故障不会影响整个网络的运行，并且只要网络中至少有一个其他节点拥有该数据，IPFS 节点就可以从网络获取数据，无论其位于何处。
## 集中化

IPFS 是一个开放、分布式和参与式网络，可减少来自集中式服务器的数据孤岛，使 IPFS 比传统系统更具弹性。没有任何单个实体或个人控制、管理或拥有 IPFS；相反，它是一个社区维护的项目，具有多种协议实现、多种利用该协议的工具和应用程序，以及多个用户和组织为其设计和开发做出贡献。

## 性能

IPFS 允许将数据复制到多个位置并从多个位置检索数据，并允许用户使用内容寻址而不是 <VueCustomTooltip label="Data determined and linked to by its location. An example is HTTP." underlined multiline>基于位置的寻址</VueCustomTooltip> 从最近的位置访问数据，从而提供更快的数据访问速度。换句话说，由于可以根据数据的内容对其进行寻址，因此网络上的节点可以从网络中具有该数据的任何其他节点获取该数据；因此，延迟等性能问题得以减少。

## 链接腐烂

IPFS 通过允许通过数据内容而不是位置来寻址数据，消除了 <VueCustomTooltip label="由于资源重新定位到新地址或资源永久不可用，超链接随着时间的推移不再指向其目标文件、网页或服务器的趋势。" underlined multiline>链接腐烂</VueCustomTooltip> 的问题。因此，换句话说，无论 IPFS 中的内容位于何处，它仍然可以访问，并且不依赖于特定服务器是否可用。

## 数据主权

IPFS 保护 <VueCustomTooltip label="个人或组织可以控制自己的数据并能够确定谁可以访问和使用这些数据的想法。" underlined multiline is-medium>数据主权</VueCustomTooltip>，方法是让用户直接在分散的节点网络上（而不是集中的第三方服务器上）存储和访问数据。这样就无需中介机构来控制和管理数据，让用户完全控制和拥有自己的数据。

## 链下存储

IPFS 通过在区块链状态和发布到 IPFS 的内容寻址之间建立链接，实现了可验证的 <VueCustomTooltip label="区块链之外的存储，用于存储区块链处理的数据。用于存储无法直接存储在区块链上的大量数据，从而提高可扩展性和效率。" underlined multiline is-medium>链下存储</VueCustomTooltip>。这通过在智能合约中存储 <VueCustomTooltip label="用于指向 IPFS 中数据的地址，基于内容本身，而不是位置。" underlined multiline is-medium>内容标识符 (CID)</VueCustomTooltip>（在 [IPFS 的工作原理](../concepts/how-ipfs-works.md#content-identifier-cid) 中解释）来实现。

## 本地优先软件

IPFS 的优势在于 <VueCustomTooltip label="在本地存储和处理数据，然后在网络连接可用时与其他设备同步和共享的软件。通过将数据保持在本地，本地优先软件减少了对互联网连接的依赖，并强调了数据主权和隐私。" underlined multiline is-medium>本地优先软件</VueCustomTooltip> 通过提供高性能、分散、点对点的数据寻址、路由和传输协议，该协议优先考虑单个设备上的数据存储和处理。使用 IPFS，可以在本地存储、验证和处理数据，然后在网络连接可用时与其他 IPFS 节点同步和共享数据。

## 供应商锁定

IPFS 可防止 <VueCustomTooltip label="当用户被迫继续使用产品（例如云计算服务）时，因为切换到另一个供应商是不切实际的、昂贵的、法律上受限制的或技术上不简单/不兼容的。" underlined multiline is-medium>供应商锁定</VueCustomTooltip> ，因为用户对其数据和基础设施拥有主权。这是通过内容寻址实现的，它将数据与单个位置或基础设施提供商分离。与传统的云供应商不同，IPFS 使你能够更改数据存储位置，而无需更改 API 和数据管理等内容。此外，由于 IPFS 是开源的、社区维护的和模块化的，因此用户没有义务使用特定的子系统（在 [IPFS 的工作原理](../concepts/how-ipfs-works.md) 中描述）。相反，用户可以根据自己喜欢的技术、需求和价值观自定义 IPFS。

## 进一步阅读

- 刚接触 IPFS，想深入了解 IPFS 组成的不同子系统以及每个子系统的工作原理？请参阅 [IPFS 基本概念简介](README.md#learn-the-basics) 的第 3 部分 [**IPFS 的工作原理**](how-ipfs-works.md)
- 你是否在寻找 IPFS 协议实现的列表，以及有关每个实现的更多信息？请参阅 [IPFS 实现页面](ipfs-implementations.md)。
- 你是否有兴趣将 IPFS 与其他类似技术进行比较？请参阅 [IPFS 比较页面](comparisons.md)。