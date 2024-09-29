---
title: IPFS 文档
description: The home page for developer documentation for IPFS, the InterPlanetary File System.
---

# 欢迎使用 IPFS 文档

星际文件系统 （IPFS） 是一组可组合的点对点协议，用于寻址、路由和传输[内容寻址](concepts/glossary.md#content-addressing)数据。许多流行的 Web3 项目都是基于 IPFS 构建的 - 请参阅[生态系统目录](https://ecosystem.ipfs.tech)，了解其中一些项目的列表。

## 开始使用

您可以快速[存储和检索数据](#存储和检索数据)并[通过简单的 GUI 应用程序或标准浏览器与网络交互](#与网络交互)。如果您更愿意开发应用程序，请在[构建](#构建)部分中了解如何构建 IPFS 原生应用程序或使用标准 HTTP。

:::callout
刚开始了解 IPFS？从 [3 页的基本概念](./concepts/README.md#learn-the-basics)开始.
:::

### 存储和检索数据

快速存储和检索数据，无需复杂的应用程序或编程：

- 按照此[快速入门指南](./quickstart/publish.md)，使用固定服务将内容发布到 IPFS 网络。
- 通过其 <VueCustomTooltip label="用于指向 IPFS 中的数据的地址，基于内容本身，而不是位置。" underlined multiline is-medium>内容标识符 （CID）</VueCustomTooltip> [使用 IPFS 网关](./quickstart/retrieve.md#fetching-the-cid-with-an-ipfs-gateway).
- 如需长期储存，请使用 [Filecoin](https://docs.filecoin.io/) 文件，一个具有内置经济激励措施的点对点网络，将数据存储在 IPFS 上。

### 与网络交互

您可以使用简单的 GUI 或标准浏览器快速交互 IPFS 网络：

- 对于捆绑了 IPFS 节点、文件管理器、对等管理器和内容资源管理器的简单易用的 GUI 应用程序，请使用 [IPFS Desktop](./install/ipfs-desktop.md)。
- 使用任何 Brave、Chrome、Edge、Firefox、Opera 和任何其他基于 Chromium 的 Web 浏览器与网络交互，使用 [IPFS Companion 浏览器扩展](./install/ipfs-companion.md)。

### 构建

您可以构建利用 IPFS 实现的应用程序，也可以改用 HTTP：

#### 使用 IPFS

使用众多 IPFS 之一构建 IPFS 原生应用程序<VueCustomTooltip label="用任何编程语言编写的软件，具有处理和传输内容寻址数据的功能。一些实现针对特定用例或设备进行了优化，或使用不同的子系统来处理内容寻址数据。IPFS 中有多种用于处理内容寻址数据的规范，但并非所有实现都实现了这些规范。" underlined multiline is-medium>实现</VueCustomTooltip>以及由 Web3 用户构建并为 Web3 用户构建的工具：

- 要使用 Go 开发 IPFS 应用程序和/或从终端与 IPFS 交互，请使用 [IPFS Kubo（GO的实现）](./install/command-line.md)。
- 如果您更喜欢使用 JavaScript, 请尝试使用 [JavaScript 中的 IPFS Helia 实现](https://github.com/ipfs/helia).
- 尝试[许多其他工具和实施](./concepts/ipfs-implementations.md)中的任何一种，这些工具和实施都是用不同的语言编写的，并根据特定需求和用例量身定制。

#### 使用 HTTP

使用标准 HTTP 将您的 Web2 应用程序连接到 IPFS 网络：

- 使用 [Kubo RPC API](./reference/kubo/rpc.md) 通过 HTTP 控制 IPFS Kubo 节点，该 API 支持[多种语言的多个客户端](./reference/kubo-rpc-cli.md)。
- 对于用于检索数据的实现和运行时无关的 HTTP 接口，请使用 [IPFS 网关](./reference/http/gateway.md)。

## 学习

- 在[基本概念](./concepts/README.md#learn-the-basics)中了解 IPFS 是什么和不是什么、它解决的问题、它由不同的子系统组成以及每个子系统的工作原理。
- 深入研究 IPFS 中的哈希、不变性、持久性（等）等概念[思想和理论](./concepts/README.md#ideas-and-theory).
- 了解有关 IPFS 组成的[子系统和组件](./concepts/README.md#subsystems-and-components)的更多信息。
- 获取[IPFS 实现概述](./concepts/ipfs-implementations.md)。
- [将 IPFS 与其他类似系统进行比较](./concepts/comparisons.md)。
- 在[项目部分](./project/README.md)了解项目历史、生态系统状态等。
- 在[案例研究部分](./case-studies/arbol.md)了解其他软件系统如何利用IPFS.

## 加入IPFS社区 

:::tip
您是否正在使用 IPFS 实现和工具进行开发，并正在寻找 IPFS 专家的技术支持？要以最快的速度获得帮助并解决您的支持需求，请参阅[获取技术帮助和支持指南](./community/README.md#get-technical-support-and-help)。
:::

IPFS 拥有一个由设计师、开发人员、作家和活动家组成的熙熙攘攘的社区，他们都在帮助改进该项目。在[社区部分](./community/README.md)了解可用的活动和资源，以及如何参与。