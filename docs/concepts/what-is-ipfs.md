---
title: What is IPFS?
description:  Learn what IPFS is and isn't.
---

# What is IPFS

IPFS 是一套模块化的 <VueCustomTooltip label="一组用于在计算机之间传输数据的标准、规则或程序，包括信息的结构方式以及每台计算机如何发送和接收信息。值得注意的示例包括 TCP/IP、HTTP/S、SMTP 和 DNS。" underlined multiline is-medium is-bottom>协议</VueCustomTooltip>，用于组织和传输数据，从头开始设计，遵循 <VueCustomTooltip label="一种通过哈希而不是位置 (IP) 来寻址数据的方法。" underlined multiline>内容寻址</VueCustomTooltip> 和 <VueCustomTooltip label="一种计算机网络模型，其中每一方都具有同等能力并可以发起通信会话。" underlined multiline is-medium>点对点网络</VueCustomTooltip>。因为 IPFS 是 <VueCustomTooltip label="软件在授予用户使用、研究、更改和分发软件及其源代码给任何人和用于任何目的的许可下发布。开源软件通常以协作的公共方式开发，鼓励用户做出贡献。" underlined multiline is-medium>开源</VueCustomTooltip>，所以有多个 <VueCustomTooltip label="软件，用任何编程语言编写，具有处理和传输内容寻址数据的功能。某些实现针对特定用例或设备进行了优化，或者使用不同的子系统来处理内容寻址数据。IPFS 中有多个用于处理内容寻址数据的规范，但并非所有实现都实现了它们。" underlined multiline is-medium>实现</VueCustomTooltip>。
虽然 IPFS 有多个用例，但其主要用例是以分散的方式发布数据（文件、目录、网站等）。

:::callout
本指南是 [IPFS 基本概念](../concepts/README.md#learn-the-basics) 3 部分介绍中的第 1 部分。第二部分 [**IPFS 及其解决的问题**](../concepts/ipfs-solves.md) 涵盖了互联网和 IPFS 解决的 HTTP 等当前协议的问题。
:::

在本概念指南中，您将了解IPFS是什么 ，不是什么。

## 定义IPFS

术语“IPFS”可以指多个概念：

- 一个 <VueCustomTooltip label="用任何编程语言编写的软件，具有处理和传输内容寻址数据的功能。一些实现针对特定用例或设备进行了优化，或者使用不同的子系统来处理内容寻址数据。IPFS 中有多个用于处理内容寻址数据的规范，但并非所有实现都实现了它们。" underlined multiline is-medium>实现</VueCustomTooltip> IPFS 协议 [规范](https://github.com/ipfs/specs)，例如 <VueCustomTooltip label="IPFS 的第一个实现，用 Go 编写。" underlined multiline>Kubo</VueCustomTooltip>。了解有关 [定义 IPFS 实现的原则](./implementations.md) 的更多信息。
- 一个 由 <VueCustomTooltip label="通过运行 IPFS 实现参与 IPFS 网络的计算机。也称为对等点" underlined multiline>IPFS 节点</VueCustomTooltip> 组成的<VueCustomTooltip label="一个计算机网络，其中多个服务器充当单个处理点，而无需中央服务器来管理网络活动。" underlined multiline is-medium>去中心化网络</VueCustomTooltip>，是开放且参与性的。
- 用于组织和传输内容寻址数据的模块化协议和标准套件。

## IPFS _不是什么_

虽然 IPFS 与下述系统有相似之处，且经常用于此类系统的架构中，但 IPFS 并非如此：

- _存储提供商_：虽然有使用 IPFS 支持构建的存储提供商（通常称为_固定服务_），但 IPFS 本身是一种协议，而不是提供商。
- _<VueCustomTooltip label="通过互联网向用户提供按需计算资源（如数据库和存储）的组织。" underlined multiline is-medium>云服务提供商</VueCustomTooltip>_：IPFS 可以部署在云基础设施上并对其进行补充，但它本身并不是云服务提供商。

## 进一步阅读
- 有关 IPFS 解决的问题的概述，请参阅对 [IPFS 的基本概念](../concepts/README.md#learn-the-basics)、[**IPFS 及其解决的问题**](../concepts/ipfs-solves.md) 的 3 部分介绍中的第 2 部分。
- 想要深入了解 IPFS 与其他类似技术的比较？请参阅 [IPFS 比较页面](../concepts/comparisons.md)。