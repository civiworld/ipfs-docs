---
title：节点类型
description：了解 IPFS Companion 中可用的节点类型。
---

# 了解 IPFS Companion 中的节点类型

IPFS Companion 的首选项屏幕允许你从不同的节点类型中进行选择。你在 Companion 首选项中看到的可用类型取决于你使用的浏览器（即 Firefox、Chrome、Brave），但完整列表如下：

[[toc]]

**如果你已经在运行本地 IPFS 节点，请选择 _External_。**如果没有，请执行以下操作之一：

- [安装](../install/README.md) 并将 IPFS 作为 [外部节点](#external) 运行（推荐）。
- 使用内置于浏览器的 [本机节点](#native)（仅限 Brave v1.19 或更高版本）。

## 外部

_外部_ 节点可以是任何 IPFS 守护进程实例：

- 在 Web 浏览器之外运行。
- 在 TCP 端口上通过 HTTP 公开 _网关_ 和可写 _API_ 。

IPFS 的 [Kubo](https://github.com/ipfs/kubo) 实现是运行外部 IPFS 节点的推荐选择。它比其他实现耗电量更少，并使用 `dhtclient` 模式来减少环境带宽使用并减少电池消耗。

一个好的做法是在本地主机 (`127.0.0.1`) 上运行 Kubo 守护进程，因为它提供：

- 增强安全性：使用本机 IPFS 作为端到端传输。
- 浏览器中更好的用户体验：没有混合内容警告。
- 改进的性能：使用本地环回，因此没有网络开销。

你可以通过多种方式在本地机器上运行 Kubo 节点：

- [IPFS Desktop](https://github.com/ipfs-shipyard/ipfs-desktop) 为你安装和管理本地节点，并提供简单、方便的用户界面来管理文件和对等节点。
- 如果你熟悉命令行，并且不需要 IPFS Desktop UI 的便利性，请按照 [命令行快速入门指南](command-line-quick-start.md) 中的说明进行操作。
- Docker 爱好者可以从 [Docker 容器内](https://github.com/ipfs/kubo#running-ipfs-inside-docker) 运行和使用 Kubo。

## 原生

### 由 Brave 提供

[Brave](https://brave.com/) 浏览器（v1.19 或更高版本）的用户可以使用直接内置在浏览器本身中的 Kubo 节点启用对 IPFS 的原生支持。这是试验 IPFS 的好方法，无需安装或运行 IPFS Desktop 或命令行守护程​​序。

此节点类型提供与 [外部](#external) 节点相同的好处，并且 Brave 本身还提供了其他功能：

- 对 `ipfs://` 和 `ipns://` URI 的原生支持：
- 内置回退到公共网关。
- 能够从 Brave 的设置页面更改你首选的公共网关。
- IPFS 资源的默认解析选项：通过公共网关、通过本地节点或每次询问。
- IPFS 节点由 Brave 本身管理：
- 自动 Kubo 更新和迁移。
- 你的节点仅在 Brave 打开时运行。
- 你可以通过单击 IPFS Companion 主菜单中的电源按钮图标来启动/停止基于 Brave 的节点。

::: 提示 BRAVE 用户工具

- `ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi`
  用于触发和测试本机 IPFS 支持的流行 URI
- `brave://settings/extensions`
  一键式 Companion 安装和 URI 解析设置
- `brave://ipfs`
  Brave 内置 Kubo 节点的状态页面

:::